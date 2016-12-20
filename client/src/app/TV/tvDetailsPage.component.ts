import { TvService } from './tv.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'tv-details',
    template: `
        TV Series details
        <item-details [item]="show"></item-details>
        <seasons-list [seasons]="seasons"></seasons-list>
    `
})
export class TVDetailsPageComponent implements OnInit {

    show;
    seasons;
    constructor(private route:ActivatedRoute,private tvService:TvService) { }

    ngOnInit(){
        this.show = this.route.snapshot.data['show'];
        this.seasons =  this.route.snapshot.data['seasons'];
    }

}