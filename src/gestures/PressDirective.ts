import { Directive, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';
//import { Output } from '@angular/core/src/metadata/directives';

@Directive({
    selector: '[longPress]'
})
export class PressDirective implements OnInit, OnDestroy{

    element: HTMLElement;
    pressGesture: Gesture;

    @Output()
    longPress : EventEmitter<any> = new EventEmitter();

    constructor(element: ElementRef){
        this.element = element.nativeElement;
    }

    ngOnInit(){
        this.pressGesture = new Gesture(this.element);
        this.pressGesture.listen();
        this.pressGesture.on('press', e => {
            this.longPress.emit(e);
        });
    }

    ngOnDestroy(){
        this.pressGesture.destroy();
    }
}