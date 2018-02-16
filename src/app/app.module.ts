import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { UUID } from 'angular2-uuid';
import { ListPage } from '../pages/list/list';
import { PurchaseHandler } from '../core/PurchaseHandler';
import { NewCyclePage } from '../pages/new-cycle/new-cycle';
import { EditCyclePage } from '../pages/edit-cycle/edit-cycle';
import { EditPurchasePage } from '../pages/edit-purchase/edit-purchase';
import { TabsPage } from '../pages/tabs/tabs';
import { PurchaseListingPage } from '../pages/purchase-listing/purchase-listing'
import { NewPurchasePage } from '../pages/new-purchase/new-purchase';
import { LabourerListingPage } from '../pages/labourer-listing/labourer-listing';
import { NewLabourerPage } from '../pages/new-labourer/new-labourer';
import { SelectCyclePage } from '../pages/select-cycle/select-cycle';
import { NewTaskPage } from '../pages/new-task/new-task';
import { ReportsPage } from '../pages/reports/reports';
import { PopoverPage } from '../pages/home/PopoverPage';
import { PlantMaterialManager } from '../core/PlantMaterialManager';
import { ChemicalsManager } from '../core/ChemicalsManager';
import { FertilizerManager } from '../core/FertilizerManager';
import { SoilAmendmentsManager } from '../core/SoilAmendmentsManager';
import { MaterialManager } from '../core/MaterialManager';
import { LabourManager } from '../core/LabourManager';
import { TaskManager } from '../core/TaskManager';
import { DataManagerFactory } from '../core/DataManagerFactory';
import { MeasurableDataManagerFactory } from '../core/MeasurableDataManagerFactory';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ReportCreator } from '../core/ReportCreator';
import { CycleDataPage } from '../pages/cycle-data/cycle-data';
import { TaskListingPage } from '../pages/task-listing/task-listing';
import { CycleManager } from '../core/CyclesModule/CycleManager';
import { CycleHandler } from '../core/CycleHandler';
import { PurchaseManager } from '../core/PurchaseManager';
import { SelectPurchasePage } from '../pages/select-purchase/select-purchase';
import { UseMaterialPage } from '../pages/use-material/use-material';
import { MaterialUseManager } from '../core/MaterialUseManager';
import { ViewCycleUsePage } from '../pages/view-cycle-use/view-cycle-use';
import { ReportListingPage } from '../pages/report-listing/report-listing';
import { NewHarvestPage } from '../pages/new-harvest/new-harvest';
import { HarvestManager } from '../core/HarvestManager';
import { SaleListingPage } from '../pages/sale-listing/sale-listing';
import { HarvestListingPage } from '../pages/harvest-listing/harvest-listing';
import { NewSalePage } from '../pages/new-sale/new-sale';
import { SaleManager } from '../core/SaleManager';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/environments';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SignInPage } from '../pages/sign-in/sign-in';
import { AuthenticationService } from '../core/AunthenticationService';
import { AngularFirestore } from 'angularfire2/firestore';

import { GooglePlus } from '@ionic-native/google-plus';
import { FilterPipe } from '../pipes/filter/filter';
import { DateFilterPipe } from '../pipes/date-filter/date-filter';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    NewCyclePage,
    TabsPage,
    PurchaseListingPage,
    NewPurchasePage,
    EditCyclePage,
    EditPurchasePage,
    LabourerListingPage,
    NewLabourerPage,
    SelectCyclePage,
    NewTaskPage,
    ReportsPage,
    PopoverPage,
    CycleDataPage,
    TaskListingPage,
    SelectPurchasePage,
    UseMaterialPage,
    ViewCycleUsePage,
    ReportListingPage,
    NewHarvestPage,
    SaleListingPage,
    HarvestListingPage,
    NewSalePage,
    SignInPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    NewCyclePage,
    TabsPage,
    PurchaseListingPage,
    NewPurchasePage,
    EditCyclePage,
    EditPurchasePage,
    LabourerListingPage,
    NewLabourerPage,
    SelectCyclePage,
    NewTaskPage,
    ReportsPage,
    PopoverPage,
    CycleDataPage,
    TaskListingPage,
    SelectPurchasePage,
    UseMaterialPage,
    ViewCycleUsePage,
    ReportListingPage,
    NewHarvestPage,
    SaleListingPage,
    HarvestListingPage,
    NewSalePage,
    SignInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CycleManager,
    CycleHandler,
    PurchaseHandler,
    PurchaseManager,
    PlantMaterialManager,
    ChemicalsManager,
    FertilizerManager,
    SoilAmendmentsManager,
    MaterialManager,
    LabourManager,
    TaskManager,
    DataManagerFactory,
    MeasurableDataManagerFactory,
    UUID,
    File,
    FileOpener,
    ReportCreator,
    MaterialUseManager,
    HarvestManager,
    SaleManager,
    AngularFireDatabase,
    AuthenticationService,
    AngularFirestore,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
