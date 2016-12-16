import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'delayed-image',
    styles:[
        '.img-container {background-color: #1d1d1d;position: relative;overflow: hidden;}',
        '.img-container img {min-height: 100%;position: relative; top: 0; left: 0;  width: 100%;vertical-align: middle;}',
        `.visible{ visibility: visible; opacity: 1; transition: opacity .5s ease-out; }`,                
        `.hidden{ visibility: hidden; opacity: 0; transition: visibility 0s .5s, opacity .5s ease-out; }`                
    ],
    template: `
        <div class="img-container">
            <img class="visible"  #defaultImage src="https://trakt.tv/assets/placeholders/thumb/fanart-32a7c2081b8e6a119e69c001155908ed.png">        
            <img class="hidden" style="position:absolute"  #newImage>        
        </div>
        
    `
})
export class DelayedImageComponent implements OnInit {

    loadCompleted:boolean = false;
    @Input('image_src') image_src:string;
    @ViewChild('defaultImage') defaultImage:ElementRef;
    @ViewChild('newImage') newImage:ElementRef;
    constructor() { }

    ngOnInit() { 
        console.log(this.image_src)
        console.log(this.defaultImage)
        console.log(this.newImage)

        this.newImage.nativeElement.src = this.image_src;
        this.newImage.nativeElement.onerror = (err) =>{
            // console.log('retrying...');
            // setTimeout( () => this.newImage.nativeElement.src = this.image_src,2000)
        }
        this.newImage.nativeElement.onload = () =>{
            console.log('load completed');
            this.defaultImage.nativeElement.className = "hidden"
            this.newImage.nativeElement.className = "visible"
            
        }
    }

}