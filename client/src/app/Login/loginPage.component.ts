import { Component, OnInit } from '@angular/core';

@Component({
    template: `
    <p>Login sad Page</p>
    <loginWebview *ngIf="showWebview" (onResult)="onWebviewResult($event)"></loginWebview>
    <p *ngIf="showLoader">Login.....</p>
    `
})
export class LoginPageComponent implements OnInit {
    
    showWebview = true;
    showLoader = false;
    
    constructor() { }

    ngOnInit() { }
    
    onWebviewResult(result){
        if(result.type == "code"){
            //succeffuly got the user code.
            let code = result.data;
            this.showWebview = false;
            this.login(code);
        }
    }

    login(code){
        this.showLoader = true;
        console.log('getting code now...')
    }
}