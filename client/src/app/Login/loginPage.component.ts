import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    template: `
    <p>Login sad Page</p>
    <loginWebview *ngIf="showWebview" (onResult)="onWebviewResult($event)"></loginWebview>
    <p *ngIf="showLoader">Login.....</p>
    <p *ngIf="result">Result:: {{result}}</p>
    `
})
export class LoginPageComponent implements OnInit {

    showWebview = true;
    showLoader = false;
    result: string;

    constructor(private http: Http) { }

    ngOnInit() {

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
        this.http.post("http://localhost:3000/authorize", { code: code })
            .map(response => response.json())
            .toPromise()
            .then(response => {
                console.log(response);
                this.result = "Login Success";
                this.showLoader = false;
            })
            .catch(error => {
                console.error(error);
                this.result = "Login Failed";
                this.showLoader = false;
            })

    }
}