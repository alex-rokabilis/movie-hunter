import { UserService } from './../User/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
       <h3>Home Page</h3>
    `
})
export class HomePageComponent implements OnInit {

    constructor(private user: UserService) { }

    ngOnInit() { }

}