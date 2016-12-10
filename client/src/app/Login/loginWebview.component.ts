import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({

    selector: 'loginWebview',
    template: `
        <webview #loginFrame autosize="on" minwidth="576" minheight="432" style="display:block; width:640px; height:480px" ></webview>
    `
})
export class LoginWebviewComponent implements OnInit {

    @ViewChild('loginFrame') loginFrame;
    loginURL = "https://trakt.tv/oauth/authorize?client_id=3b1a622b6f17a0f2d99618629a3e1c072fce2ae803203af643a1f882b12c15c4&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&response_type=code"
    @Output() onResult: EventEmitter<{type:string,data:string}> = new EventEmitter<{}>();

    constructor() { }

    ngOnInit() {
        
        var webview = this.loginFrame.nativeElement;

        //set random partition id so every new webview has a fresh memory storage
        webview.partition = Math.random();
        webview.src = this.loginURL;


        webview.onloadstart = (ev) => {
            console.log(ev.url)
            if (ev.url.indexOf("localhost:4200/?error=") > 0) {

                var error = ev.url.match(/\?error=(.*)&/)[1];
                this.onResult.emit({
                    type: 'error',
                    data: error
                })
                webview.src = this.loginURL;

            }

            if (ev.url.indexOf("localhost:4200/?code=") > 0) {
                console.log(ev.url)
                //webview.terminate();
                var code = ev.url.match(/\?code=(.*)/)[1];
                console.log("code::",code)
                this.onResult.emit({
                    type: 'code',
                    data: code
                })
            }
        }
    }
}