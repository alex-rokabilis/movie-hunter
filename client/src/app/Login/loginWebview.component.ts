import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';


@Component({

    selector: 'loginWebview',
    template: `
        <webview #loginFrame autosize="on" minwidth="576" minheight="432" style="display:block; height:100%" ></webview>
    `
})
export class LoginWebviewComponent implements OnInit {


    @ViewChild('loginFrame') loginFrame;
    loginURL = "https://trakt.tv/oauth/authorize?client_id=3b1a622b6f17a0f2d99618629a3e1c072fce2ae803203af643a1f882b12c15c4&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&response_type=code"
    @Output() onResult: EventEmitter<{ type: string, data: string }> = new EventEmitter<{}>();

    constructor() { }

    ngOnInit() {

        var webview = this.loginFrame.nativeElement;

        //set random partition id so every new webview has a fresh memory storage
        webview.partition = Math.random();
        webview.src = this.loginURL;

        webview.addEventListener('loadcommit',(ev) => {
            console.log("load commit::",ev.url)
        })

        webview.addEventListener('loadstart',(ev) => {
            console.log("load start::",ev.url)
        })

        webview.onloadstart = (ev) => {
            

            let target_url = new URL(ev.url);

            if (target_url.host != "localhost:4200") return;

            if (target_url['searchParams'].has("error")) {
                this.onResult.emit({
                    type: 'error',
                    data: target_url['searchParams'].get("error")
                })
                webview.src = this.loginURL;
            }

            if (target_url['searchParams'].has("code")) {
                this.onResult.emit({
                    type: 'code',
                    data: target_url['searchParams'].get("code")
                })
                webview.src = this.loginURL;
            }


        }
    }
}