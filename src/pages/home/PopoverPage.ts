import { Component } from "@angular/core";
import { ViewController } from "ionic-angular/navigation/view-controller";

@Component({
    template: `
      <ion-list>
        <ion-item>
            <button ion-button icon-left clear small (click)="close('edit')">
                <ion-icon ios="md-create" md="md-create"></ion-icon>
                <div>Edit</div>
            </button>
        </ion-item>
        <ion-item>
            <button ion-button icon-left clear small (click)="close('close')">
                <ion-icon ios="md-close" md="md-close"></ion-icon>
                <div>Close</div>
            </button>
        </ion-item>
        <ion-item>
            <button ion-button icon-left clear small (click)="close('delete')">
                <ion-icon name="trash"></ion-icon>
                <div>Delete</div>
            </button>
        </ion-item>
    </ion-list>
    `
  })

  export class PopoverPage{
      constructor(public viewCtrl: ViewController){

      }

      close(options: string){
          let data = {
              options: options
          }
          this.viewCtrl.dismiss(data);
      }
  }