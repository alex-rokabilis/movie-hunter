import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'item-thumb',
    styles: [
        ':host { display: inline-table; text-align: center;    }',
        '.img-container {background-color: #1d1d1d;position: relative;overflow: hidden;}',
        '.img-container img {min-height: 100%;position: relative; top: 0; left: 0;display: block;    width: 100%;vertical-align: middle;}'
    ],
    template: `
            <a [routerLink]='["../", item.ids?.slug]'>
                
                <div class="img-container">
                    <img src={{item.backdrop_path}}>
                </div>
                <p>{{item.title}}</p>
            </a>

    `
})
export class ItemThumbComponent implements OnInit {

    @Input() item;
    constructor() { }

    ngOnInit() {}

}