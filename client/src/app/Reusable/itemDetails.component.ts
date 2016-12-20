import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

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
    @Input('item') item2;
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.item = this.item2 || this.route.snapshot.data['item']
    }

}