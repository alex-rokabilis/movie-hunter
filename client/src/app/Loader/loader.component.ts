import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'loader',
    template: ` 
    <div *ngIf="loading"
        style="
            display: table;
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            color: white;
            z-index: 101;
    ">
        <p style="
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        ">{{loadingText}}
        </p>
    </div>
    <div *ngIf="loading"
        style="
            position: absolute;
            background: rgba(0, 0, 0, 0.73);
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 100;
    "></div>`
})
export class LoaderComponent implements OnInit {

    loadingText;
    _loadingTimer;
    _loading;
    set loading(data: boolean) {
        if (data == true) {
            clearTimeout(this._loadingTimer);
            this._loadingTimer = setTimeout(() => this._loading = true, 250);
        }
        else {
            clearTimeout(this._loadingTimer);
            this._loading = false;
        }
    }
    get loading() {
        return this._loading;
    }

    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    async ngOnInit() {

        let max = 10;
        while (true) {
            for (var i = 1; i <= max; i++) {
                this.loadingText = 'Loading' + Array(i-1).fill('.').join('')
                await this.delay(1000 / max);
            }
        }


    }

    constructor(router: Router) {

        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });

    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }

}