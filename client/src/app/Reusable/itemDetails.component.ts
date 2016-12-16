import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'item-details',
    template: `
        <h3>{{item.title}}</h3>
        <div>
            <img src="{{item.poster_path}}">
        </div>
        <pre>{{ item | json}}</pre>
    `
})
export class ItemDetailsComponent implements OnInit {

    item;
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {

        this.route.data
            .pluck('item')
            .subscribe((m) => this.item = m)

    }

}