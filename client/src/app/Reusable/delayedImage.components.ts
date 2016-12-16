import { Component, Directive, Input } from '@angular/core';

@Directive({ selector: 'delayed-image' })
export class DelayedImage {
    @Input('src') src:string;
    constructor() {
         console.log(this.src);
     }
}