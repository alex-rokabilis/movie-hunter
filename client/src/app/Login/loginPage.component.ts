import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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
    
    constructor(private http:Http) { }

    ngOnInit() {
        
     }
    
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
        console.log('getting code now...');
        this.http.post("http://localhost:3000/authorize",{code:code})
            .map( response => response.json())
            .toPromise()
            .then(console.log.bind(console))
            .catch(console.error.bind(console))
        
    }
}