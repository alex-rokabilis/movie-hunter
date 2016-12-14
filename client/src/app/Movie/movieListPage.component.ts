import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    styles: [
        '.container { display:inline-flex; }',
        '.sidebar { width:25%; background:rgba(8, 8, 8, 0.68) }',
        ' h3 {color:white; text-align:center}',
        'a {color:white}',
        'a.active {color:red}',
        'ul {list-style-type: none;}',
        '.navigation {text-align:center;}',
    ],
    template: `
        <div class="container">
            <div class="sidebar">
                <h3>Movies</h3>
                <br>
                <div class='navigation'>
                    <a href="javascript:void(0)" (click)='previous()'>Previous</a>
                    <a href="javascript:void(0)" (click)="next()" >Next</a>       
                </div>
                         
                <ul>
                    <li>
                        <a routerLinkActive="active" routerLink='popular'>Popular</a>
                    </li>
                    <li>
                        <a routerLinkActive="active" routerLink='trending'>Trending</a>
                    </li>
                </ul>
                
            </div>
            <router-outlet></router-outlet>
        </div>

    `
})
export class MovieListPageComponent implements OnInit {


    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        console.log('init', this.route)


    }

    next() {

        let relativeRoute = this.route.children[0] ? this.route.children[0] : this.route;

        let currentPage = relativeRoute.snapshot.params['page'];
        currentPage = currentPage ? +currentPage : 1;

        this.router.navigate([{ page: currentPage + 1 }], { relativeTo: relativeRoute });


    }
    previous() {

        let relativeRoute = this.route.children[0] ? this.route.children[0] : this.route;

        let currentPage = relativeRoute.snapshot.params['page'];
        currentPage = currentPage ? +currentPage : 1;
        if(currentPage == 1) return;

        this.router.navigate([{ page: currentPage - 1 }], { relativeTo: relativeRoute });


    }

}