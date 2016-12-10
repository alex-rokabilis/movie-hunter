import { UserService } from './../User/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'navbar',
    template: `
        <div *ngIf="!user.username">
            <p>Hello Guest</p>
        </div>
        <div *ngIf="user.username">
            <p>Hello {{user.username}}</p>
            <button (click)='user.logout();router.navigate(["/login"]);'>Logout</button>
        </div>
    ` 
})
export class NavbarComponent implements OnInit {

    constructor(private router:Router,private user:UserService) { }

    ngOnInit() { 

    }

}