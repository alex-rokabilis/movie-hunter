import { Router } from '@angular/router';
import { UserService } from './../User/user.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    template: `
    <p>Login sad Page</p>
    <loginWebview style="height: 610px;display: block;" *ngIf="showWebview" (onResult)="onWebviewResult($event)"></loginWebview>
    <p *ngIf="showLoader">Login.....</p>
    <p *ngIf="result">Result:: {{result}}</p>
    `
})
export class LoginPageComponent implements OnInit {

    showWebview = true;
    showLoader = false;
    result: string;

    constructor(private user: UserService,private router: Router) { }

    ngOnInit() {
        console.log(this.user)
    }

    onWebviewResult(result) {
        if (result.type == "code") {
            //succeffuly got the user code.
            let code = result.data;
            this.showWebview = false;
            this.login(code);
        }
    }

    login(code) {
        this.showLoader = true;
        console.log('getting code now...');
        this.user.login(code)
            .then(()=> this.router.navigate(['/home']))
            .catch( (err) => console.error(err))

    }
}