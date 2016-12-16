import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pluck';

// 'item-thumb:nth-child(1) { width: 48%; margin-right: 2%;}',
// 'item-thumb:nth-child(2) { width: 48%; margin-right: 0;}',
@Component({
    selector:'item-list',
    styles: [
        ':host { width:100%; margin-left: 2%;margin-right: 2%;margin-top: 10px; }',
        'item-thumb { width: 32%; margin-right: 2%;}',
        'item-thumb:nth-child(3n+3) { margin-right: 0; }',
        
        
        ],
    template: `       
        <item-thumb *ngFor='let item of items' [item]='item' ></item-thumb>
        `
})
export class ItemListComponent implements OnInit {

    items;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() { 
        console.log(this.route);
        this.route.data.pluck('items').subscribe(  m => this.items = m )
    }
    
}