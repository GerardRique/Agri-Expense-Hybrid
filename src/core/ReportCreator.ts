import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {DataManager} from './DataManager';
import {Entry, File} from '@ionic-native/file';
import {FileOpener} from '@ionic-native/file-opener';
import {ToastController} from 'ionic-angular/components/toast/toast-controller';
import * as XLSX from 'xlsx';
import {CycleManager} from './CyclesModule/CycleManager';
import {DataManagerFactory} from './DataManagerFactory';
import {MaterialUseManager} from './MaterialUseManager';
import {MaterialManager} from './MaterialManager';
import {PurchaseManager} from './PurchaseManager';
import {SaleManager} from './SaleManager';
import {HarvestManager} from './HarvestManager';
import {TaskManager} from './TaskManager';

@Injectable()
export class ReportCreator {

  ws: XLSX.WorkSheet;
  ws1: XLSX.WorkSheet;
  ws2: XLSX.WorkSheet;
  ws3: XLSX.WorkSheet;
  wb: XLSX.WorkBook;
  wbout: string;
  readonly directory: string = "AgriExpense";

  constructor(private platform: Platform, private file: File, private fileOpener: FileOpener, private dataManagerFactory: DataManagerFactory, private toastCtrl: ToastController, private cycleManager: CycleManager, private materialUseManager: MaterialUseManager, private purchaseManager: PurchaseManager, private saleManager: SaleManager, private harvestManager: HarvestManager, private materialManager: MaterialManager, private taskManager: TaskManager) {
    this.wb = XLSX.utils.book_new();
  }

  public createNewWorkBook() {
    this.wb = XLSX.utils.book_new();
  }

  public addWorkSheet(data: Array<Array<string>>, sheetName: string) {
    let ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(this.wb, ws, sheetName);
  }

  public saveSpreadsheet() {
    let wbout: string = XLSX.write(this.wb, {bookType: 'xlsx', type: 'array'});
    let date = new Date();
    let blob = new Blob([wbout]);

    let filename = date.toString();

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      console.log('Saving file in browser...');
      this.saveInBrowser(blob, filename);
    }
    else {
      console.log('Saving file on device...');
      this.saveOnDevice(blob, filename);
    }
  }

  public getCycleSpreadsheetData(cycleManager: DataManager): Promise<Array<Array<string>>> {
    let list = Array<Array<string>>();
    return cycleManager.getAll().then((cycleData) => {
      let titleList = ['ID Number', 'Cycle Name', 'Crop Planted', 'Land Quantity', 'Units of land', 'Date Planted', 'Open'];
      this.colorHeading(titleList.length);
      list.push(titleList);
      for (let cycle of cycleData) {
        let currentCycle = Array<string>();
        let date: Date = new Date(cycle['datePlanted']);
        currentCycle.push(cycle['id']);
        currentCycle.push(cycle['name']);
        currentCycle.push(cycle['crop']);
        currentCycle.push(cycle['landQuantity']);
        currentCycle.push(cycle['landUnit']);
        currentCycle.push(date.toString());
        currentCycle.push(cycle['active']);
        list.push(currentCycle);
      }
      return list;
    });
  }

  public generateByMonthSummary(startDate: any, endDate: any): Promise<Array<Array<string>>>{
    let endDate1 = new Date(endDate);
    let startDate1 = new Date(startDate);

    let sYear = startDate1.getFullYear();
    let sDate = startDate1.getDate();
    let sMonth = startDate1.getMonth();
    sMonth += 1;
    let fsDate = "";
    let fsMonth = "";

    if (sDate < 10) {
      fsDate = "0" + sDate;
    }else fsDate = sDate.toString();

    if (sMonth < 10) {
      fsMonth = "0" + sMonth;
    }else fsMonth = sMonth.toString();

    let startDate2 = sYear+"-"+fsMonth+"-"+fsDate;

    const byMonthSummary = Array<Array<any>>();

    const dateArray = Array<Array<number>>();
    const sumArray = Array<number>();

    let byMonthSummaryHeadings = ['No.','Cycle Name','Crop','Date Planted (dd-mm-yy)','Category','Report Start Date (dd-mm-yy)'];

    let cDate = new Date();
    let cYear = cDate.getFullYear();
    let cMonth = cDate.getMonth();
    cMonth += 1;
    let tempMonth = sMonth;
    let tempYear = sYear;
    while (tempYear != cYear || tempMonth != cMonth){
      if (tempMonth>12){
        tempMonth = 1;
        tempYear += 1;
      }
      let dd = [tempMonth+1,tempYear];
      dateArray.push(dd);
      let tm = tempMonth+1;
      byMonthSummaryHeadings.push(tm+"-"+tempYear);
      tempMonth+=1;
    }
    sumArray.length=dateArray.length;
    // console.log(sumArray.length);
    for(let i=0;i<sumArray.length;i++) sumArray[i]=0;
    // console.log(dateArray);
    byMonthSummaryHeadings.push("Total Cost");
    byMonthSummary.push(byMonthSummaryHeadings);

    let CycleRecordPromises = [];
    return this.cycleManager.getAll().then((cycleListing) => {
      return this.materialManager.getAll().then((materialList) => {
        CycleRecordPromises.push(this.materialUseManager.getAll().then((materialListing) => {
          let count3 = 1;
          let subCount = 0;
          cycleListing.forEach((cycle) => {
            let newDate = new Date(cycle['datePlanted']);
            if (newDate > startDate1 && newDate < endDate1) {

                materialList.forEach((material) => {
                    materialListing.forEach((item) => {
                      if (item['materialId'].localeCompare(material['id'])==0 && cycle['id'].localeCompare(item['cycleId'])==0){
                        let dateUsed = new Date(item['dateUsed']);
                        let tMonth = dateUsed.getMonth();
                        tMonth+=1;
                        let tYear = dateUsed.getFullYear();
                        for (let i = 0;i<dateArray.length;i++){
                          if ( tMonth == dateArray[i][0] && tYear == dateArray[i][1]){
                            sumArray[i] += item['totalCost'];
                          }
                        }
                      }
                    })
                    let noString3 = "";
                    subCount += 1;
                    if (subCount%5 == 0) count3 += 1;
                    if(subCount%5 == 1) noString3 = count3 + "";
                    // if (!(material['name'].localeCompare('Other expenses')==0)) {
                      let row3 = [
                        noString3, // cycle number count
                        cycle['name'],
                        cycle['crop'], // cycle crop, you can change it to cycle['name'] if it is more approriate
                        cycle['datePlanted'].slice(0,10), // date cycle was planted
                        material['name'], // name of type of material used (eg. chemical, fertilizer, etc.)
                        startDate2 // start date of report being created
                      ];
                      let totalSum = 0;

                      for (let i = 0;i<sumArray.length; i++){
                        row3.push(sumArray[i]); // pushes sum of total money spent on a particular month for each month in the period specified
                        totalSum += sumArray[i];
                      }
                      row3.push(totalSum); // pushes total sum of all money spent in the entire period specified
                      byMonthSummary.push(row3); // pushes row of data to byMonthSummary table
                    // }
                    for(let i=0;i<sumArray.length;i++) sumArray[i]=0;


                })

            }
          })
        }))
        return Promise.all(CycleRecordPromises).then(() => {
          return byMonthSummary;
        });
      })
    })

  }

  public generateADBOutflowReport(startDate: any, endDate: any): Promise<Array<Array<Array<string>>>>{

    let endDate1 = new Date(endDate);
    let startDate1 = new Date(startDate);

    const recordsGroup = Array<Array<Array<string>>>();
    const transactions = Array<Array<string>>();
    const income = Array<Array<string>>();
    const inventory = Array<Array<string>>();

    let incomeHeadings = ['No.', 'Crops', 'Area Exploited In (Ha.s)', 'Total Yield Recorded', 'Yield Record Unit', 'Total Yield in Tonnes', 'Sale Recorded', 'Sale Record Unit', 'Sale in Tonnes','Price of Sale/Tonnes', 'Date Entered (dd-mm-yy)'];
    income.push(incomeHeadings);
    let inventoryHeadings = ['No.','Name','Category','Quantity Purchased','Unit','Unit Price ($)','Quantity in Stock','Total Value in Stock ($)','Date Purchased (dd-mm-yy)'];
    inventory.push(inventoryHeadings);

    // let purchaseManager = this.dataManagerFactory.getManager(DataManagerFactory.PURCHASE);
    // let purchaseDataMap = new Map<string, Object>();

    // this.taskManager.getAll().then((taskListing) => {
    //   console.log(taskListing);
    // })

// ------------------------------------- Income --------------------------------------------
    this.saleManager.getAll().then((saleListing) => {
      let count2 = 1;
      saleListing.forEach((sale) => {
        // console.log(sale);
        let noString2 = count2 + "";
        count2 += 1;
        this.harvestManager.get(sale['harvestId']).then((harvest) =>{
          // console.log(harvest);
          this.cycleManager.get(sale['cycleId']).then((cycle) =>{

            let areaOfLand = cycle['landQuantity'];
            const landUnit = cycle['landUnit'];

            // Acre to Hectare
            if (landUnit.localeCompare('Acre') === 0) {
              areaOfLand *= 0.404686;
            }
            // Square Meter to Hectare
            else if (landUnit.localeCompare('Bed (sq metre)') === 0){
              areaOfLand *= 0.00001;
            }
            else if (landUnit.localeCompare('Square Metres') === 0){
              areaOfLand *= 0.00001;
            }
            // 107640 sqft = 1 Ha
            else if (landUnit.localeCompare('Square Feet')  === 0){
              areaOfLand /= 107640;
            }
            // 1 Ha = 260 sq miles
            else if (landUnit.localeCompare('Square Miles')  === 0){
              areaOfLand *= 260;
            }

            areaOfLand = Number.parseFloat(areaOfLand).toFixed(2); // (2)
            const areaOfLandString = areaOfLand + "";

            let yieldTonnes = harvest['quantityHarvested'];
            if (harvest['unitsHarvested'].localeCompare('pounds(lb)')){
              yieldTonnes *= 0.000453592;
            }else if (harvest['unitsHarvested'].localeCompare('Kilograms(Kg)')){
              yieldTonnes *= 0.001;
            }else {
              yieldTonnes *= 0.000453592 * 5;
            }
            yieldTonnes = yieldTonnes.toFixed(6);

            let saleTonnes = sale['quantityOfUnitsSold'];
            if (sale['unitsSoldBy'].localeCompare('pounds(lb)')){
              saleTonnes *= 0.000453592;
            }else if (sale['unitsSoldBy'].localeCompare('Kilograms(Kg)')){
              saleTonnes *= 0.001;
            }else {
              saleTonnes *= 0.000453592 * 5;
            }
            saleTonnes = saleTonnes.toFixed(6);

            let salePerTonnes = sale['costPerunit'];
            if (sale['unitsSoldBy'].localeCompare('pounds(lb)')){
              salePerTonnes *= 2204.62;
            }else if (sale['unitsSoldBy'].localeCompare('Kilograms(Kg)')){
              salePerTonnes *= 1000;
            }else {
              salePerTonnes /= 5;
              salePerTonnes *= 2204.62;
            }
            salePerTonnes = salePerTonnes.toFixed(2);

            const row2 = [
              noString2,
              sale['crop'], // crop name
              areaOfLandString,//Area exploited in (Ha.s)
              harvest['quantityHarvested'],// total yield recorded
              harvest['unitsHarvested'], // yield unit
              yieldTonnes,// yield in tonnes
              sale['quantityOfUnitsSold'], //Sale recorded
              sale['unitsSoldBy'], // sale unit
              saleTonnes,//sale in tonnes
              salePerTonnes,
              sale['dateSold'].slice(0,10) // date sold
            ];
            let newDate = new Date(sale['dateSold']);
            if (newDate > startDate1 && newDate < endDate1)
              income.push(row2);

          })
        })
      })
    })
// --------------------------------------------------------------------------------------------

// ------------------------------------- Inventory --------------------------------------------
    this.purchaseManager.getAll().then((purchaseListing) => {
      let count1 = 1;

      purchaseListing.forEach((purchase) =>{
        let noString1 = count1 + "";
        count1 += 1;
        let valueInStock = purchase['cost']*purchase['quantityRemaining'];
        // let date = new Date(purchase['datePurchased']);
        // let dd = date.getDate();
        // let mm = date.getMonth()+1;
        // let yyyy = date.getFullYear();
        // date = dd+'-'+mm+'-'+yyyy;
        // console.log(date);
        this.materialUseManager.get(purchase['typeId']).then((material) => {
          const row1 = [
            noString1,
            material['name'],
            purchase['materialName'],
            purchase['quantityPurchased'],
            purchase['units'],
            purchase['cost'],
            purchase['quantityRemaining'],
            valueInStock,
            purchase['datePurchased'].slice(0,10)
          ];
          let newDate = new Date(purchase['datePurchased']);
          if (newDate > startDate1 && newDate < endDate1)
            inventory.push(row1);

        })
      })
    })
// --------------------------------------------------------------------------------------------

// ------------------------------------ Transactions ------------------------------------------
    let cycleDataMap = new Map<string, Array<Object>>();
    // Current retrieves all of the cycles available in the database - //TODO - Need to provide interface for user to specify timeframe
    return this.cycleManager.getAll().then((cycleListing) => {
      let transactionsHeadings = ['No.', 'Crops', 'Input Description', 'Quantity per Ha. (1)', 'Area Exploited In (Ha.s) (2)', 'Price (in Soles)/Unit (3)', 'Total Expenses (In Soles) (1x2x3=4)', 'Date Entered (dd-mm-yy)'];
      let count = 1;

      const materialUsedPromises = [];

      transactions.push(transactionsHeadings);

      // For each cycle, retrieve the materials used
      cycleListing.forEach((cycle) => {
        // The request to retrieve the data is handle as promises. The promises are pushed to an array to be processed collectively
        materialUsedPromises.push(this.materialUseManager.getByCycleId(cycle['id']).then((materialUseList) => {
          cycleDataMap.set(cycle['id'], materialUseList);
        }));
      });
      // console.log(materialUsedPromises);
      // When all of the promises (to retrieve materials) are successfully processed
      return Promise.all(materialUsedPromises).then(() => {
        let CycleRecordPromises = [];

        cycleListing.forEach((cycle) => {
          let materialUseListing = cycleDataMap.get(cycle['id']);
          materialUseListing.forEach((materialUse) => {
            console.log("Processing: " + JSON.stringify(materialUse));
            // console.log(materialUse);
            let noString = count + "";
            count += 1;

            let areaOfLand = cycle['landQuantity'];
            const landUnit = cycle['landUnit'];

            // Acre to Hectare
            if (landUnit.localeCompare('Acre') === 0) {
              areaOfLand *= 0.404686;
            }
            // Square Meter to Hectare
            else if (landUnit.localeCompare('Bed (sq metre)') === 0){
              areaOfLand *= 0.00001;
            }
            else if (landUnit.localeCompare('Square Metres') === 0){
              areaOfLand *= 0.00001;
            }
            // 107640 sqft = 1 Ha
            else if (landUnit.localeCompare('Square Feet')  === 0){
              areaOfLand /= 107640;
            }
            // 1 Ha = 260 sq miles
            else if (landUnit.localeCompare('Square Miles')  === 0){
              areaOfLand *= 260;
            }

            const quantityPerArea = Number.parseFloat(materialUse['quantityUsed']) / areaOfLand; // (1)
            areaOfLand = Number.parseFloat(areaOfLand).toFixed(2); // (2)
            const costPerMaterial = Number.parseFloat(materialUse['costPerMaterial']); // (3)
            const monthlyExpense = quantityPerArea * areaOfLand * costPerMaterial; // 1 * 2 * 3 //TODO Should be monthly but we calculating total at the moment

            const areaOfLandString = areaOfLand + "";
            let quantityPerAreaString = quantityPerArea.toFixed(2) + "";

            // Request the meta data for this material record. When the data is retrieved, build the row and add to list of records
            CycleRecordPromises.push(this.materialUseManager.get(materialUse['materialId']).then((material) => {

              const row = [
                noString, // No.
                cycle['crop'], // Crop
                material['name'], // Input description
                quantityPerAreaString, // Quantity per Ha (1).
                areaOfLandString, // Area Exploited in (Ha.s) (2)
                costPerMaterial, // Price in Soles/Unit (3)
                monthlyExpense, // Monthly Expense (in soles)
                materialUse['dateUsed'].slice(0,10)
              ];
              let newDate = new Date(materialUse['dateUsed']);
              if (newDate > startDate1 && newDate < endDate1)
                transactions.push(row);

            }));

          });
        });
        return Promise.all(CycleRecordPromises).then(() => {
            return this.generateByMonthSummary(startDate,endDate).then((summary)=>{
              recordsGroup.push(transactions);
              recordsGroup.push(income);
              recordsGroup.push(inventory);
              recordsGroup.push(summary);
              console.log(recordsGroup);
              return recordsGroup;
            })
        });
      })

    })
// --------------------------------------------------------------------------------------------
  }

  public getPurchases(materialList: Array<Object>): Promise<Array<Object>> {
    let purchaseManager = this.dataManagerFactory.getManager(DataManagerFactory.PURCHASE);
    let purchaseListing = [];
    let promises = [];

    for (let materialUse of materialList) {
      promises.push(purchaseManager.get(materialUse['purchaseId']).then((purchase) => {
        purchaseListing.push(purchase);
      }));
    }

    return Promise.all(promises).then(() => {
      return purchaseListing;
    }).catch((error) => {
      return error;
    })
  }

  public colorHeading(numberCols: number) {
    // let range = {
    //   s: {
    //     c: 0,
    //     r: 0
    //   },
    //   e: {
    //     c: 0,
    //     r: numberCols
    //   }
    // };

    for (let col = 0; col < numberCols; col++) {
      let cell_address = {c: col, r: 0};
      let cell_ref = XLSX.utils.encode_cell(cell_address);
      console.log(cell_ref);
    }
  }

  public deleteReport(path: string, filename: string): Promise<boolean> {
    const filePath = this.file.externalRootDirectory + path.substr(1);
    //console.log('Deleting file: ' + filename + ' from path: ' + path);
    return this.file.removeFile(filePath, filename).then((result) => {
      return result.success === true;
    }).catch((error) => {
      console.log('ERROR: ' + JSON.stringify(error));
      return error;
    });
  }

  public deleteFile(entry: Entry): Promise<boolean> {
    let filepath = "";
    if (this.platform.is('ios')) {
      filepath = this.file.dataDirectory + '' + this.directory + '/';
    }
    else if (this.platform.is('android')) {
      filepath = this.file.externalRootDirectory + '' + this.directory + '/';
    }
    return this.file.removeFile(filepath, entry.name).then((result) => {
      return true;
    }).catch((error) => {
      return false;
    });

  }

  public openReport(fileEntry: Entry): void {
    let filepath: string = "";
    if (this.platform.is('ios')) {
      filepath = this.file.dataDirectory + fileEntry.fullPath.substr(1);
    }
    else if (this.platform.is('android')) {
      filepath = this.file.externalRootDirectory + fileEntry.fullPath.substr(1);
    }
    let toast = this.toastCtrl.create({
      message: '',
      duration: 5000,
      position: 'middle'
    });

    this.fileOpener.open(filepath, 'application/vnd.ms-excel').then(() => {
      console.log('Successfully opened file');
    }).catch((error) => {
      console.log('File open error: ' + JSON.stringify(error));
      let errorString = JSON.stringify(error);
      toast.setMessage('Error: ' + errorString);
      toast.present();
    });
  }

  public createExcelSpreadSheet(data: Array<Array<any>>,data1: Array<Array<any>>,data2: Array<Array<any>>,data3: Array<Array<any>>): Promise<boolean> {
    this.ws = XLSX.utils.aoa_to_sheet(data);
    this.ws1 = XLSX.utils.aoa_to_sheet(data1);
    this.ws2 = XLSX.utils.aoa_to_sheet(data2);
    this.ws3 = XLSX.utils.aoa_to_sheet(data3);
    this.wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(this.wb, this.ws, 'Transactions');
    XLSX.utils.book_append_sheet(this.wb, this.ws1, 'Income');
    XLSX.utils.book_append_sheet(this.wb, this.ws2, 'Inventory');
    XLSX.utils.book_append_sheet(this.wb, this.ws3, 'ByMonthSummary');
    this.wbout = XLSX.write(this.wb, {bookType: 'xlsx', type: 'array'});

    console.log('Creating excel...');

    let blob: Blob = new Blob([this.wbout]);

    let filename = "adb_report_";
    filename += new Date().toDateString();

    let expression = / /gi;

    filename = filename.replace(expression, '-');

    filename += '.xlsx';
    console.log(filename);

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      console.log('Saving file in browser...');
      return this.saveInBrowser(blob, filename);
    }
    else {
      if (this.platform){
        console.log('Saving file on device...');
        return this.saveOnDevice(blob, filename).then((result) => {
          return result;
        }).catch((error) => {
          return false;
        });
      }else{
        return this.saveInBrowser(blob, filename);
      }

    }
  }

  public createExcelSpreadSheet1(data: Array<Array<any>>): Promise<boolean> {
    this.ws = XLSX.utils.aoa_to_sheet(data);
    this.wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(this.wb, this.ws, 'Standard Report');
    this.wbout = XLSX.write(this.wb, {bookType: 'xlsx', type: 'array'});

    console.log('Creating excel...');

    let blob: Blob = new Blob([this.wbout]);

    let filename = "s_report_";
    filename += new Date().toDateString();

    let expression = / /gi;

    filename = filename.replace(expression, '-');

    filename += '.xlsx';
    console.log(filename);

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
      console.log('Saving file in browser...');
      return this.saveInBrowser(blob, filename);
    }
    else {
      if (this.platform){
        console.log('Saving file on device...');
        return this.saveOnDevice(blob, filename).then((result) => {
          return result;
        }).catch((error) => {
          return false;
        });
      }else{
        return this.saveInBrowser(blob, filename);
      }

    }
  }

  public saveOnDevice(blob: Blob, filename: string): Promise<boolean> {
    let toast = this.toastCtrl.create({
      message: 'File created',
      duration: 3000,
      position: 'top'
    });

    let errorToast = this.toastCtrl.create({
      message: 'Error creating file',
      duration: 3000,
      position: 'top'
    });

    if (this.platform.is('android')) {
      return this.createDirectoryAndroid(this.directory).then((url) => {
        return this.file.writeFile(url, filename, blob, {replace: true}).then(() => {
          toast.present();
          return true;
        }).catch((error) => {
          let errorString = JSON.stringify(error);
          errorToast.setMessage("er: " + errorString);
          errorToast.present();
          return false;
        });
      })
    }
    else if (this.platform.is('ios')) {
      return this.createDirectoryIOS(this.directory).then((url) => {
        return this.file.writeFile(url, filename, blob, {replace: true}).then(() => {
          toast.present();
          return true;
        });
      }).catch((error) => {
        let errorString = JSON.stringify(error);
        errorToast.setMessage("ios5: " + errorString);
        errorToast.present();
        return false;
      });
    }
    else{
      return this.createDirectory(this.directory).then((url) => {
        return this.file.writeFile(url, filename, blob, {replace: true}).then(() => {
          toast.present();
          return true;
        });
      }).catch((error) => {
        let errorString = JSON.stringify(error);
        errorToast.setMessage("ios5: " + errorString);
        errorToast.present();
        return false;
      });
    }
  }

  public retrieveFiles(folderName: string): Promise<Array<Entry>> {
    if (this.platform.is('ios')) {
      return this.file.listDir(this.file.dataDirectory, folderName).then((entries) => {
        return entries;
      }).catch((error) => {
        console.log(error);
        return error;
      });
    }
    else if (this.platform.is('android')) {
      return this.file.listDir(this.file.externalRootDirectory, folderName).then((entries) => {
        return entries;
      }).catch((error) => {
        console.log(error);
        return error;
      });
    }else{ // To handle the other types of supported OS that may occur
      return this.file.listDir(this.file.dataDirectory, folderName).then((entries) => {
        return entries;
      }).catch((error) => {
        console.log(error);
        return error;
      });
    }
  }

  public createDirectoryIOS(directoryName: string): Promise<string> {
    return this.file.checkDir(this.file.dataDirectory, directoryName).then((result) => {
      if (result === true) {
        console.log(directoryName + ' folder already created');
        return this.file.dataDirectory + '' + directoryName + '/';
      } else {
        return this.file.createDir(this.file.dataDirectory, directoryName, true).then((entry) => {
          console.log('Created folder ' + directoryName);
          return entry.toURL();
        }).catch((error) => {
          return '';
        });
      }
    }).catch((error) => {
      return this.file.createDir(this.file.dataDirectory, directoryName, true).then((entry) => {
        console.log('Created folder ' + directoryName);
        return entry.toURL();
      });
    });
  }

  //The createDirectory function accepts a directory name. If a directory already exists with this name, the function will return a url to that directory. Otherwise the function will create a directory with the given name and return a url of the newly created directory.
  public createDirectoryAndroid(directoryName: string): Promise<string> {
    return this.file.checkDir(this.file.externalRootDirectory, directoryName).then((result) => {
      if (result === true) {
        console.log(directoryName + ' folder already created');
        return this.file.externalRootDirectory + '' + directoryName + '/';
      } else {
        return this.file.createDir(this.file.externalRootDirectory, directoryName, true).then((entry) => {
          console.log('Created folder ' + directoryName);
          return entry.toURL();
        }).catch((error) => {
          return '';
        });
      }
    }).catch((error) => {
      return this.file.createDir(this.file.externalRootDirectory, directoryName, true).then((entry) => {
        console.log('Created folder ' + directoryName);
        return entry.toURL();
      }).catch((error) => {
        return '';
      });
    });
  }

  public createDirectory(directoryName: string): Promise<string>{
    return this.file.checkDir(this.file.dataDirectory, directoryName).then((result) => {
      if (result === true) {
        console.log(directoryName + ' folder already created');
        return this.file.dataDirectory + '' + directoryName + '/';
      } else {
        return this.file.createDir(this.file.dataDirectory, directoryName, true).then((entry) => {
          console.log('Created folder ' + directoryName);
          return entry.toURL();
        }).catch((error) => {
          return '';
        });
      }
    }).catch((error) => {
      return this.file.createDir(this.file.dataDirectory, directoryName, true).then((entry) => {
        console.log('Created folder ' + directoryName);
        return entry.toURL();
      });
    });
  }

  // noinspection JSMethodCanBeStatic
  private saveInBrowser(blob: Blob, filename: string): Promise<boolean> {
    return new Promise<boolean>(function(resolve, reject) {
      console.log('Save in browser function');
      console.log(blob);
      try{
        let a = document.createElement("a");
        document.body.appendChild(a);
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        resolve(true);
      }catch (e) {
        console.error(e);
        reject(false);
      }
    });
  }

  // noinspection JSMethodCanBeStatic
  convertToCsv(manager: DataManager): Promise<string> {
    return manager.getAll().then((data) => {
      let csvString = '';
      let heading = '';
      for (let index in data[0]) {
        heading += index + ',';
      }
      heading = heading.slice(0, -1);
      csvString += heading + '\r\n';
      for (let item of data) {
        let line = '';
        for (let index in item) {
          if (line != '') line += ',';
          line += item[index];
        }

        csvString += line + '\r\n';
      }
      return csvString;
    })
  }
}
