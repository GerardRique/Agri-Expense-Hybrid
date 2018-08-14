import { Component, Compiler, Injector, ViewChild, NgModule, NgModuleRef, ViewContainerRef } from '@angular/core';

/**
 * Generated class for the LabourComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'labour',
  templateUrl: 'labour.html'
})
export class LabourComponent {

  text: string;

  @ViewChild('view', {read: ViewContainerRef}) view;

  constructor(private compiler: Compiler, private injector: Injector, private moduleRef: NgModuleRef<any>) {
    console.log('Hello LabourComponent Component');
    this.text = 'Hello World';
  }

  loadTemplate(){
    const templateComponent = Component({
      templateUrl: './listing.html'})(class {
    });

    const tempModule = NgModule({declarations: [templateComponent]})(class{

    });

    this.compiler.compileModuleAndAllComponentsAsync(tempModule).then((factories) => {
      const factory = factories.componentFactories[0];
      const componentRef = factory.create(this.injector, [], null, this.moduleRef);
      componentRef.instance.name = 'dynamic';
      this.view.insert(componentRef.hostView);
    })
  }

}
