webpackJsonp([0,3],{

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return APP_CONFIG; });

const config = {
    traktApiEndpoint: 'https://api.trakt.tv',
    tmdbApiEndpoint: 'https://api.themoviedb.org/3',
    tmdbApiBackdropEndpoint: 'http://image.tmdb.org/t/p/w780',
    tmdbApiPosterEndpoint: 'http://image.tmdb.org/t/p/w500',
    title: 'Movie Hunter'
};
/* harmony export (immutable) */ exports["c"] = config;

let APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* OpaqueToken */]('app.config');
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/app-config.js.map

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_config__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MovieService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







let MovieService = class MovieService {
    constructor(http, user, config) {
        this.http = http;
        this.user = user;
        this.config = config;
        console.log(this.config);
    }
    getMovieImages(movieID) {
        console.log('searching images for::', movieID);
        let requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestMethod */].Get,
            url: this.config.tmdbApiEndpoint + "/movie/" + movieID,
            search: "api_key=d26a0629dcc3f037723d6a91f4f46fc9"
        });
        return this.http.request(requestOptions)
            .map(response => response.json())
            .map(data => ({
            backdrop_path: data.backdrop_path ? this.config.tmdbApiBackdropEndpoint + data.backdrop_path : undefined,
            poster_path: data.poster_path ? this.config.tmdbApiPosterEndpoint + data.poster_path : undefined
        }))
            .catch(err => {
            console.error(err);
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of({
                backdrop_path: undefined,
                poster_path: undefined
            });
        })
            .toPromise();
    }
    getPopular(page = '1', limit = '25') {
        let requestSearchParams = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["g" /* URLSearchParams */]();
        requestSearchParams.append('page', page);
        requestSearchParams.append('limit', limit);
        let requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestMethod */].Get,
            url: this.config.traktApiEndpoint + "/movies/popular",
            search: requestSearchParams,
            headers: this.user.trakt_http_headers
        });
        return this.http.request(requestOptions)
            .do(console.log.bind(console))
            .map(response => response.json())
            .toPromise()
            .then(movies => movies.map(movie => Promise.all([movie, this.getMovieImages(movie.ids.tmdb)])))
            .then(movies => Promise.all(movies))
            .then(movies => movies.map(([movieData, movieImages]) => Object.assign(movieData, movieImages)));
        //.then(console.log.bind(console))
    }
    getTrending(page = '1', limit = '25') {
        let requestSearchParams = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["g" /* URLSearchParams */]();
        requestSearchParams.append('page', page || '1');
        requestSearchParams.append('limit', limit || '25');
        let requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestMethod */].Get,
            url: this.config.traktApiEndpoint + "/movies/trending",
            search: requestSearchParams,
            headers: this.user.trakt_http_headers
        });
        return this.http.request(requestOptions)
            .map(response => response.json())
            .map(response => response.map(({ movie, watchers }) => {
            movie.watchers = watchers;
            return movie;
        }))
            .toPromise()
            .then(movies => movies.map(movie => Promise.all([movie, this.getMovieImages(movie.ids.tmdb)])))
            .then(movies => Promise.all(movies))
            .then(movies => movies.map(([movieData, movieImages]) => Object.assign(movieData, movieImages)));
        //.then(console.log.bind(console))
    }
    getMovie(id) {
        let requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestMethod */].Get,
            url: this.config.traktApiEndpoint + "/movies/" + id,
            search: "extended=full",
            headers: this.user.trakt_http_headers
        });
        return this.http.request(requestOptions)
            .map(response => response.json())
            .do(console.log.bind(console))
            .toPromise()
            .then(movie => Promise.all([movie, this.getMovieImages(movie.ids.tmdb)]))
            .then(([movieData, movieImages]) => Object.assign(movieData, movieImages));
        //.then(console.log.bind(console))
    }
};
MovieService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* Injectable */])(),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* APP_CONFIG */])), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__app_config__["AppConfig"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__app_config__["AppConfig"]) === 'function' && _c) || Object])
], MovieService);
var _a, _b, _c;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/movie.service.js.map

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ItemDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ItemDetailsComponent = class ItemDetailsComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.route.data
            .pluck('item')
            .subscribe((m) => this.item = m);
    }
};
ItemDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        selector: 'item-details',
        template: `
        <h3>{{item.title}}</h3>
        <div>
            <img src="{{item.poster_path}}">
        </div>
        <pre>{{ item | json}}</pre>
    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* ActivatedRoute */]) === 'function' && _a) || Object])
], ItemDetailsComponent);
var _a;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/itemDetails.component.js.map

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_pluck__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_pluck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_pluck__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ItemListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// 'item-thumb:nth-child(1) { width: 48%; margin-right: 2%;}',
// 'item-thumb:nth-child(2) { width: 48%; margin-right: 0;}',
let ItemListComponent = class ItemListComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        console.log(this.route);
        this.route.data.pluck('items').subscribe(m => this.items = m);
    }
};
ItemListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        selector: 'item-list',
        styles: [
            ':host { width:100%; margin-left: 2%;margin-right: 2%;margin-top: 10px; }',
            'item-thumb { width: 32%; margin-right: 2%;}',
            'item-thumb:nth-child(3n+3) { margin-right: 0; }',
        ],
        template: `       
        <item-thumb *ngFor='let item of items' [item]='item' ></item-thumb>
        `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* ActivatedRoute */]) === 'function' && _a) || Object])
], ItemListComponent);
var _a;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/itemList.component.js.map

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ListPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ListPageComponent = class ListPageComponent {
    constructor(router, route) {
        this.router = router;
        this.route = route;
    }
    ngOnInit() {
        console.log('init', this.route);
        this.title = this.route.snapshot.data['title'];
    }
};
ListPageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        selector: 'item-list-page',
        styles: [
            '.container { display:inline-flex; }',
        ],
        template: `
        <div class="container">
            <list-sidebar [title]="title"></list-sidebar>
            <router-outlet></router-outlet>
        </div>

    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* ActivatedRoute */]) === 'function' && _b) || Object])
], ListPageComponent);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/itemListPage.component.js.map

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ItemThumbComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let ItemThumbComponent = class ItemThumbComponent {
    constructor() {
    }
    ngOnInit() { }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
    __metadata('design:type', Object)
], ItemThumbComponent.prototype, "item", void 0);
ItemThumbComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'item-thumb',
        styles: [
            ':host { display: inline-table; text-align: center;    }',
            '.img-container {background-color: #1d1d1d;position: relative;overflow: hidden;}',
            '.img-container img {min-height: 100%;position: relative; top: 0; left: 0;display: block;    width: 100%;vertical-align: middle;}'
        ],
        template: `
            <a [routerLink]='["../", item.ids?.slug]'>
                
                <delayed-image [image_src]="item.backdrop_path"></delayed-image>
                <p>{{item.title}}</p>
            </a>

    `
    }), 
    __metadata('design:paramtypes', [])
], ItemThumbComponent);
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/itemThumb.component.js.map

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ListPageSidebarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ListPageSidebarComponent = class ListPageSidebarComponent {
    constructor(router, route) {
        this.router = router;
        this.route = route;
    }
    ngOnInit() { }
    next() {
        let relativeRoute = this.route.firstChild ? this.route.firstChild : this.route;
        let currentPage = relativeRoute.snapshot.params['page'];
        currentPage = currentPage ? +currentPage : 1;
        this.router.navigate([{ page: currentPage + 1 }], { relativeTo: relativeRoute });
    }
    previous() {
        let relativeRoute = this.route.firstChild ? this.route.firstChild : this.route;
        let currentPage = relativeRoute.snapshot.params['page'];
        currentPage = currentPage ? +currentPage : 1;
        if (currentPage == 1)
            return;
        this.router.navigate([{ page: currentPage - 1 }], { relativeTo: relativeRoute });
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Input */])('title'), 
    __metadata('design:type', String)
], ListPageSidebarComponent.prototype, "title", void 0);
ListPageSidebarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        selector: 'list-sidebar',
        styles: [
            ':host { display: flex; width:25%; background:rgba(8, 8, 8, 0.68) }',
            '.sidebar{ width:100%;}',
            ' h3 {color:white; text-align:center}',
            'a {color:white}',
            'a.active {color:red}',
            'ul {list-style-type: none; padding:0; text-align:center;}',
            '.navigation {text-align:center;}',
            '.navigation a:hover {color:red}',
        ],
        template: `
            <div class="sidebar">
                <h3><u>{{title}}</u></h3>
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
                
            </div>`
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["g" /* ActivatedRoute */]) === 'function' && _b) || Object])
], ListPageSidebarComponent);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/listPageSidebar.component.js.map

/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_config__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TvService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







let TvService = class TvService {
    constructor(http, user, config) {
        this.http = http;
        this.user = user;
        this.config = config;
        console.log(this.config);
    }
    getTVImages(seriesID) {
        console.log('searching images for::', seriesID);
        let requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestMethod */].Get,
            url: this.config.tmdbApiEndpoint + "/tv/" + seriesID,
            search: "api_key=d26a0629dcc3f037723d6a91f4f46fc9"
        });
        return this.http.request(requestOptions)
            .map(response => response.json())
            .map(data => ({
            backdrop_path: data.backdrop_path ? this.config.tmdbApiBackdropEndpoint + data.backdrop_path : undefined,
            poster_path: data.poster_path ? this.config.tmdbApiPosterEndpoint + data.poster_path : undefined
        }))
            .catch(err => {
            console.error(err);
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].of({
                backdrop_path: undefined,
                poster_path: undefined
            });
        })
            .toPromise();
    }
    getPopular(page = '1', limit = '25') {
        let requestSearchParams = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["g" /* URLSearchParams */]();
        requestSearchParams.append('page', page);
        requestSearchParams.append('limit', limit);
        let requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestMethod */].Get,
            url: this.config.traktApiEndpoint + "/shows/popular",
            search: requestSearchParams,
            headers: this.user.trakt_http_headers
        });
        return this.http.request(requestOptions)
            .do(console.log.bind(console))
            .map(response => response.json())
            .toPromise()
            .then(shows => shows.map(show => Promise.all([show, this.getTVImages(show.ids.tmdb)])))
            .then(shows => Promise.all(shows))
            .then(shows => shows.map(([showData, showImages]) => Object.assign(showData, showImages)));
        //.then(console.log.bind(console))
    }
    getTrending(page = '1', limit = '25') {
        let requestSearchParams = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["g" /* URLSearchParams */]();
        requestSearchParams.append('page', page || '1');
        requestSearchParams.append('limit', limit || '25');
        let requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestMethod */].Get,
            url: this.config.traktApiEndpoint + "/shows/trending",
            search: requestSearchParams,
            headers: this.user.trakt_http_headers
        });
        return this.http.request(requestOptions)
            .map(response => response.json())
            .map(response => response.map(({ show, watchers }) => {
            show.watchers = watchers;
            return show;
        }))
            .toPromise()
            .then(shows => shows.map(show => Promise.all([show, this.getTVImages(show.ids.tmdb)])))
            .then(shows => Promise.all(shows))
            .then(shows => shows.map(([showData, showImages]) => Object.assign(showData, showImages)));
        //.then(console.log.bind(console))
    }
    getShow(id) {
        let requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Request */]({
            method: __WEBPACK_IMPORTED_MODULE_2__angular_http__["f" /* RequestMethod */].Get,
            url: this.config.traktApiEndpoint + "/shows/" + id,
            search: "extended=full",
            headers: this.user.trakt_http_headers
        });
        return this.http.request(requestOptions)
            .map(response => response.json())
            .do(console.log.bind(console))
            .toPromise()
            .then(show => Promise.all([show, this.getTVImages(show.ids.tmdb)]))
            .then(([showData, showImages]) => Object.assign(showData, showImages));
        //.then(console.log.bind(console))
    }
};
TvService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* Injectable */])(),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* APP_CONFIG */])), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__app_config__["AppConfig"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__app_config__["AppConfig"]) === 'function' && _c) || Object])
], TvService);
var _a, _b, _c;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/tv.service.js.map

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AppComponent = class AppComponent {
    constructor() {
    }
};
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'app-root',
        styles: [
            'a.active {color:red}',
        ],
        template: `
    <loader></loader>
    <navbar></navbar>
    <a routerLinkActive="active" routerLink="/movie">Movies</a>
    <a routerLinkActive="active" routerLink="/tv">TV</a>
    <a routerLinkActive="active" routerLink="/login">Login</a>
    <a routerLinkActive="active" routerLink="/home">Home</a>
    <router-outlet></router-outlet>

  `
    }), 
    __metadata('design:paramtypes', [])
], AppComponent);
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/app.component.js.map

/***/ },

/***/ 380:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 380;


/***/ },

/***/ 381:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(499);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_28" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/main.js.map

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let UserService = class UserService {
    constructor(http) {
        this.http = http;
    }
    get access_token() {
        return window.localStorage.getItem('access_token');
    }
    set access_token(token) {
        if (token === null)
            window.localStorage.removeItem('access_token');
        else
            window.localStorage.setItem('access_token', token);
    }
    init(data) {
        this.age = data.age;
        this.gender = data.gender;
        this.slug = data.ids ? data.ids.slug : null;
        this.username = data.username || data.name;
        try {
            this.avatar = data.images.avatar.full;
        }
        catch (err) {
            this.avatar = null;
        }
        console.log(this);
    }
    check() {
        if (!this.access_token)
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].throw("access token is missing");
        const TRAKT_PROFILE_URL = "https://api.trakt.tv/users/me?extended=full";
        let headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
            //'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'Authorization': `Bearer ${this.access_token}`,
            'trakt-api-key': '3b1a622b6f17a0f2d99618629a3e1c072fce2ae803203af643a1f882b12c15c4'
        });
        let options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* RequestOptions */]({ headers: headers });
        this.trakt_http_headers = headers;
        return this.http.get(TRAKT_PROFILE_URL, options).do(response => this.init(response.json()));
    }
    login(code) {
        const SERVER_AUTHORIZE_URL = "http://localhost:3000/authorize";
        return this.http.post(SERVER_AUTHORIZE_URL, { code: code })
            .map(response => response.json())
            .toPromise()
            .then(response => {
            console.log(response);
            this.access_token = response.access_token;
            return this.check().toPromise();
        });
    }
    logout() {
        this.access_token = null;
        this.init({});
    }
};
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Injectable */])(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
], UserService);
var _a;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/user.service.js.map

/***/ },

/***/ 487:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HomePageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let HomePageComponent = class HomePageComponent {
    constructor(user) {
        this.user = user;
    }
    ngOnInit() { }
};
HomePageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        template: `
       <h3>Home Page</h3>
    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */]) === 'function' && _a) || Object])
], HomePageComponent);
var _a;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/homePage.component.js.map

/***/ },

/***/ 488:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};


// <div *ngIf="loading"
//         style="
//             position: absolute;
//             background: rgba(0, 0, 0, 0.73);
//             height: 100%;
//             width: 100%;
//             left: 0;
//             top: 0;
//             z-index: 100;
//     "></div>
let LoaderComponent = class LoaderComponent {
    constructor(router) {
        router.events.subscribe((event) => {
            this.navigationInterceptor(event);
        });
    }
    set loading(data) {
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
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            let max = 10;
            while (true) {
                for (var i = 1; i <= max; i++) {
                    this.loadingText = 'Loading' + Array(i - 1).fill('.').join('');
                    yield this.delay(1000 / max);
                }
            }
        });
    }
    navigationInterceptor(event) {
        if (event instanceof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* NavigationStart */]) {
            this.loading = true;
        }
        if (event instanceof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* NavigationEnd */]) {
            this.loading = false;
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* NavigationCancel */]) {
            this.loading = false;
        }
        if (event instanceof __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* NavigationError */]) {
            this.loading = false;
        }
    }
};
LoaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        selector: 'loader',
        template: ` 
    <div *ngIf="loading" style="
    position: absolute;
    right: 0;
    top: 0;
    width: 93px;
"> 
        <p> {{loadingText}} </p>
    </div>
    
    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */]) === 'function' && _a) || Object])
], LoaderComponent);
var _a;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/loader.component.js.map

/***/ },

/***/ 489:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loginWebview_component__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loginCanActivate_service__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loginPage_component__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(18);
/* unused harmony export LoginRoutingModule */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







const routes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_4__loginPage_component__["a" /* LoginPageComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__loginCanActivate_service__["a" /* CanActivateLogin */]] }
];
let LoginRoutingModule = class LoginRoutingModule {
};
LoginRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_core__["I" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_6__angular_router__["f" /* RouterModule */].forChild(routes), __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* HttpModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_6__angular_router__["f" /* RouterModule */]],
        providers: [__WEBPACK_IMPORTED_MODULE_3__loginCanActivate_service__["a" /* CanActivateLogin */], __WEBPACK_IMPORTED_MODULE_2__User_user_service__["a" /* UserService */]]
    }), 
    __metadata('design:paramtypes', [])
], LoginRoutingModule);
const LoginRoutingComponents = [__WEBPACK_IMPORTED_MODULE_4__loginPage_component__["a" /* LoginPageComponent */], __WEBPACK_IMPORTED_MODULE_1__loginWebview_component__["a" /* LoginWebviewComponent */]];
const LoginModule = {
    routing: LoginRoutingModule,
    components: LoginRoutingComponents
};
/* harmony export (immutable) */ exports["a"] = LoginModule;

//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/login.module.js.map

/***/ },

/***/ 490:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CanActivateLogin; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let CanActivateLogin = class CanActivateLogin {
    constructor(user, router) {
        this.user = user;
        this.router = router;
    }
    canActivate(route, state) {
        return this.user.check().toPromise()
            .then(() => {
            this.router.navigate(['/home']);
            return false;
        })
            .catch(() => true);
    }
};
CanActivateLogin = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Injectable */])(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]) === 'function' && _b) || Object])
], CanActivateLogin);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/loginCanActivate.service.js.map

/***/ },

/***/ 491:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginPageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let LoginPageComponent = class LoginPageComponent {
    constructor(user, router) {
        this.user = user;
        this.router = router;
        this.showWebview = true;
        this.showLoader = false;
        this.loginFailed = false;
    }
    ngOnInit() {
        console.log(this.user);
    }
    onWebviewResult(result) {
        if (result.type == "code") {
            //succeffuly got the user code.
            let code = result.data;
            this.showWebview = false;
            this.login(code);
        }
    }
    tryAgain() {
        this.showWebview = true;
        this.showLoader = false;
        this.loginFailed = false;
    }
    login(code) {
        this.showLoader = true;
        console.log('getting code now...');
        this.user.login(code)
            .then(() => this.router.navigate(['/home']))
            .catch((err) => {
            console.error(err);
            this.loginFailed = true;
            this.showLoader = false;
        });
    }
};
LoginPageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["G" /* Component */])({
        template: `
    <p>Login Page</p>
    <loginWebview style="height: 610px;display: block;" *ngIf="showWebview" (onResult)="onWebviewResult($event)"></loginWebview>
    <p *ngIf="showLoader">Login.....</p>
    <div *ngIf="loginFailed"> 
        <p>Login Failed please <a href="#" (click)="tryAgain()">try again</a></p>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */]) === 'function' && _b) || Object])
], LoginPageComponent);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/loginPage.component.js.map

/***/ },

/***/ 492:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginWebviewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let LoginWebviewComponent = class LoginWebviewComponent {
    constructor() {
        this.loginURL = "https://trakt.tv/oauth/authorize?client_id=3b1a622b6f17a0f2d99618629a3e1c072fce2ae803203af643a1f882b12c15c4&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&response_type=code";
        this.onResult = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */]();
    }
    ngOnInit() {
        var webview = this.loginFrame.nativeElement;
        //set random partition id soo every new webview has a fresh memory storage
        webview.partition = Math.random();
        webview.src = this.loginURL;
        webview.addEventListener('loadcommit', (ev) => {
            console.log("load commit::", ev.url);
        });
        webview.addEventListener('loadstart', (ev) => {
            console.log("load start::", ev.url);
        });
        webview.onloadstart = (ev) => {
            let target_url = new URL(ev.url);
            if (target_url.host != "localhost:4200")
                return;
            if (target_url['searchParams'].has("error")) {
                this.onResult.emit({
                    type: 'error',
                    data: target_url['searchParams'].get("error")
                });
                webview.src = this.loginURL;
            }
            if (target_url['searchParams'].has("code")) {
                this.onResult.emit({
                    type: 'code',
                    data: target_url['searchParams'].get("code")
                });
                webview.src = this.loginURL;
            }
        };
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ViewChild */])('loginFrame'), 
    __metadata('design:type', Object)
], LoginWebviewComponent.prototype, "loginFrame", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
    __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* EventEmitter */]) === 'function' && _a) || Object)
], LoginWebviewComponent.prototype, "onResult", void 0);
LoginWebviewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'loginWebview',
        template: `
        <webview #loginFrame autosize="on" minwidth="576" minheight="432" style="display:block; height:100%" ></webview>
    `
    }), 
    __metadata('design:paramtypes', [])
], LoginWebviewComponent);
var _a;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/loginWebview.component.js.map

/***/ },

/***/ 493:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Reusable_itemDetails_component__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Reusable_listPageSidebar_component__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Reusable_itemThumb_component__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Reusable_itemList_component__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Reusable_itemListPage_component__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__movie_resolver__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__movie_service__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(73);
/* unused harmony export MovieRoutingModule */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











const routes = [
    {
        path: 'movie',
        children: [
            {
                path: '',
                component: __WEBPACK_IMPORTED_MODULE_4__Reusable_itemListPage_component__["a" /* ListPageComponent */],
                data: {
                    title: "Movies"
                },
                children: [
                    {
                        path: 'popular',
                        component: __WEBPACK_IMPORTED_MODULE_3__Reusable_itemList_component__["a" /* ItemListComponent */],
                        resolve: {
                            items: __WEBPACK_IMPORTED_MODULE_6__movie_resolver__["a" /* MovieResolver */]
                        }
                    },
                    {
                        path: 'trending',
                        component: __WEBPACK_IMPORTED_MODULE_3__Reusable_itemList_component__["a" /* ItemListComponent */],
                        resolve: {
                            items: __WEBPACK_IMPORTED_MODULE_6__movie_resolver__["a" /* MovieResolver */]
                        }
                    },
                    {
                        path: '',
                        redirectTo: 'popular'
                    }
                ]
            },
            {
                path: ':id',
                component: __WEBPACK_IMPORTED_MODULE_0__Reusable_itemDetails_component__["a" /* ItemDetailsComponent */],
                resolve: {
                    item: __WEBPACK_IMPORTED_MODULE_6__movie_resolver__["a" /* MovieResolver */]
                }
            }]
    },
];
let MovieRoutingModule = class MovieRoutingModule {
};
MovieRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__angular_core__["I" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_9__angular_router__["f" /* RouterModule */].forChild(routes), __WEBPACK_IMPORTED_MODULE_10__angular_http__["d" /* HttpModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_9__angular_router__["f" /* RouterModule */]],
        providers: [__WEBPACK_IMPORTED_MODULE_7__movie_service__["a" /* MovieService */], __WEBPACK_IMPORTED_MODULE_6__movie_resolver__["a" /* MovieResolver */], __WEBPACK_IMPORTED_MODULE_5__User_user_service__["a" /* UserService */]]
    }), 
    __metadata('design:paramtypes', [])
], MovieRoutingModule);
const MovieRoutingComponents = [
    __WEBPACK_IMPORTED_MODULE_0__Reusable_itemDetails_component__["a" /* ItemDetailsComponent */],
    __WEBPACK_IMPORTED_MODULE_4__Reusable_itemListPage_component__["a" /* ListPageComponent */],
    __WEBPACK_IMPORTED_MODULE_3__Reusable_itemList_component__["a" /* ItemListComponent */],
    __WEBPACK_IMPORTED_MODULE_2__Reusable_itemThumb_component__["a" /* ItemThumbComponent */],
    __WEBPACK_IMPORTED_MODULE_1__Reusable_listPageSidebar_component__["a" /* ListPageSidebarComponent */]
];
const MovieModule = {
    routing: MovieRoutingModule,
    components: MovieRoutingComponents
};
/* harmony export (immutable) */ exports["a"] = MovieModule;

//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/movie.module.js.map

/***/ },

/***/ 494:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__movie_service__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MovieResolver; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let MovieResolver = class MovieResolver {
    constructor(movieService, router) {
        this.movieService = movieService;
        this.router = router;
    }
    resolve(route) {
        const path = route.routeConfig.path;
        if (path == "popular")
            return this.movieService.getPopular(route.params['page'])
                .catch(err => {
                console.error("err happend", err);
                if (err.status == 403)
                    this.router.navigate(['/login']);
                return err;
            });
        if (path == "trending")
            return this.movieService.getTrending(route.params['page'])
                .catch(err => {
                console.error("err happend", err);
                if (err.status == 403)
                    this.router.navigate(['/login']);
                return err;
            });
        if (path == ":id")
            return this.movieService.getMovie(route.params['id'])
                .catch(err => {
                console.error("err happend", err);
                if (err.status == 403)
                    this.router.navigate(['/login']);
                return err;
            });
    }
};
MovieResolver = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Injectable */])(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__movie_service__["a" /* MovieService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__movie_service__["a" /* MovieService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]) === 'function' && _b) || Object])
], MovieResolver);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/movie.resolver.js.map

/***/ },

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let NavbarComponent = class NavbarComponent {
    constructor(router, user) {
        this.router = router;
        this.user = user;
    }
    ngOnInit() {
    }
};
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["G" /* Component */])({
        selector: 'navbar',
        template: `
        <div *ngIf="!user.username">
            <p>Hello Guest</p>
        </div>
        <div *ngIf="user.username">
            <p>Hello {{user.username}} -- {{router.url}}</p> 
            <button (click)='user.logout();router.navigate(["/login"]);'>Logout</button>
        </div>
    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */]) === 'function' && _b) || Object])
], NavbarComponent);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/navbar.component.js.map

/***/ },

/***/ 496:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Reusable_delayedImage_components__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Reusable_itemDetails_component__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Reusable_listPageSidebar_component__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Reusable_itemThumb_component__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Reusable_itemList_component__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Reusable_itemListPage_component__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__User_user_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tv_resolver__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tv_service__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(73);
/* unused harmony export TvRoutingModule */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












const routes = [
    {
        path: 'tv',
        children: [
            {
                path: '',
                component: __WEBPACK_IMPORTED_MODULE_5__Reusable_itemListPage_component__["a" /* ListPageComponent */],
                data: {
                    title: "Series"
                },
                children: [
                    {
                        path: 'popular',
                        component: __WEBPACK_IMPORTED_MODULE_4__Reusable_itemList_component__["a" /* ItemListComponent */],
                        resolve: {
                            items: __WEBPACK_IMPORTED_MODULE_7__tv_resolver__["a" /* TvResolver */]
                        }
                    },
                    {
                        path: 'trending',
                        component: __WEBPACK_IMPORTED_MODULE_4__Reusable_itemList_component__["a" /* ItemListComponent */],
                        resolve: {
                            items: __WEBPACK_IMPORTED_MODULE_7__tv_resolver__["a" /* TvResolver */]
                        }
                    },
                    {
                        path: '',
                        redirectTo: 'popular'
                    }
                ]
            },
            {
                path: ':id',
                component: __WEBPACK_IMPORTED_MODULE_1__Reusable_itemDetails_component__["a" /* ItemDetailsComponent */],
                resolve: {
                    item: __WEBPACK_IMPORTED_MODULE_7__tv_resolver__["a" /* TvResolver */]
                }
            }]
    },
];
let TvRoutingModule = class TvRoutingModule {
};
TvRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__angular_core__["I" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_10__angular_router__["f" /* RouterModule */].forChild(routes), __WEBPACK_IMPORTED_MODULE_11__angular_http__["d" /* HttpModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_10__angular_router__["f" /* RouterModule */]],
        providers: [__WEBPACK_IMPORTED_MODULE_8__tv_service__["a" /* TvService */], __WEBPACK_IMPORTED_MODULE_7__tv_resolver__["a" /* TvResolver */], __WEBPACK_IMPORTED_MODULE_6__User_user_service__["a" /* UserService */]]
    }), 
    __metadata('design:paramtypes', [])
], TvRoutingModule);
const TvRoutingComponents = [
    __WEBPACK_IMPORTED_MODULE_1__Reusable_itemDetails_component__["a" /* ItemDetailsComponent */],
    __WEBPACK_IMPORTED_MODULE_5__Reusable_itemListPage_component__["a" /* ListPageComponent */],
    __WEBPACK_IMPORTED_MODULE_4__Reusable_itemList_component__["a" /* ItemListComponent */],
    __WEBPACK_IMPORTED_MODULE_3__Reusable_itemThumb_component__["a" /* ItemThumbComponent */],
    __WEBPACK_IMPORTED_MODULE_2__Reusable_listPageSidebar_component__["a" /* ListPageSidebarComponent */],
    __WEBPACK_IMPORTED_MODULE_0__Reusable_delayedImage_components__["a" /* DelayedImageComponent */]
];
const TvModule = {
    routing: TvRoutingModule,
    components: TvRoutingComponents
};
/* harmony export (immutable) */ exports["a"] = TvModule;

//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/tv.module.js.map

/***/ },

/***/ 497:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tv_service__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TvResolver; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let TvResolver = class TvResolver {
    constructor(tvService, router) {
        this.tvService = tvService;
        this.router = router;
    }
    resolve(route) {
        const path = route.routeConfig.path;
        if (path == "popular")
            return this.tvService.getPopular(route.params['page'])
                .catch(err => {
                console.error("err happend", err);
                if (err.status == 403)
                    this.router.navigate(['/login']);
                return err;
            });
        if (path == "trending")
            return this.tvService.getTrending(route.params['page'])
                .catch(err => {
                console.error("err happend", err);
                if (err.status == 403)
                    this.router.navigate(['/login']);
                return err;
            });
        if (path == ":id")
            return this.tvService.getShow(route.params['id'])
                .catch(err => {
                console.error("err happend", err);
                if (err.status == 403)
                    this.router.navigate(['/login']);
                return err;
            });
    }
};
TvResolver = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* Injectable */])(), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__tv_service__["a" /* TvService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__tv_service__["a" /* TvService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */]) === 'function' && _b) || Object])
], TvResolver);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/tv.resolver.js.map

/***/ },

/***/ 498:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Loader_loader_component__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_config__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Login_login_module__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Movie_movie_module__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TV_tv_module__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Navbar_navbar_component__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Home_homePage_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_router__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












const routes = [
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_6__Home_homePage_component__["a" /* HomePageComponent */] },
    { path: '**', redirectTo: "/login" },
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__angular_core__["I" /* NgModule */])({
        schemas: [__WEBPACK_IMPORTED_MODULE_9__angular_core__["Y" /* NO_ERRORS_SCHEMA */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__Home_homePage_component__["a" /* HomePageComponent */],
            __WEBPACK_IMPORTED_MODULE_5__Navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_0__Loader_loader_component__["a" /* LoaderComponent */],
            ...__WEBPACK_IMPORTED_MODULE_2__Login_login_module__["a" /* LoginModule */].components,
            ...__WEBPACK_IMPORTED_MODULE_3__Movie_movie_module__["a" /* MovieModule */].components,
            ...__WEBPACK_IMPORTED_MODULE_4__TV_tv_module__["a" /* TvModule */].components
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["b" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_router__["f" /* RouterModule */].forRoot(routes, { useHash: true }),
            __WEBPACK_IMPORTED_MODULE_3__Movie_movie_module__["a" /* MovieModule */].routing,
            __WEBPACK_IMPORTED_MODULE_2__Login_login_module__["a" /* LoginModule */].routing,
            __WEBPACK_IMPORTED_MODULE_4__TV_tv_module__["a" /* TvModule */].routing
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_1__app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_1__app_config__["c" /* config */] }],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/app.module.js.map

/***/ },

/***/ 499:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(498);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/index.js.map

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
const environment = {
    production: false
};
/* harmony export (immutable) */ exports["a"] = environment;

//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/environment.js.map

/***/ },

/***/ 501:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/polyfills.js.map

/***/ },

/***/ 682:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(381);


/***/ },

/***/ 684:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DelayedImageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let DelayedImageComponent = class DelayedImageComponent {
    constructor() {
        this.loadCompleted = false;
    }
    ngOnInit() {
        console.log(this.image_src);
        console.log(this.defaultImage);
        console.log(this.newImage);
        this.newImage.nativeElement.src = this.image_src;
        this.newImage.nativeElement.onerror = (err) => {
            // console.log('retrying...');
            // setTimeout( () => this.newImage.nativeElement.src = this.image_src,2000)
        };
        this.newImage.nativeElement.onload = () => {
            console.log('load completed');
            this.defaultImage.nativeElement.className = "hidden";
            this.newImage.nativeElement.className = "visible";
        };
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])('image_src'), 
    __metadata('design:type', String)
], DelayedImageComponent.prototype, "image_src", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ViewChild */])('defaultImage'), 
    __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
], DelayedImageComponent.prototype, "defaultImage", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_26" /* ViewChild */])('newImage'), 
    __metadata('design:type', (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _b) || Object)
], DelayedImageComponent.prototype, "newImage", void 0);
DelayedImageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
        selector: 'delayed-image',
        styles: [
            '.img-container {background-color: #1d1d1d;position: relative;overflow: hidden;}',
            '.img-container img {min-height: 100%;position: relative; top: 0; left: 0;  width: 100%;vertical-align: middle;}',
            `.visible
               {
                       visibility: visible;
                       opacity: 1;
                       transition: opacity .5s ease-out;
               }
        `,
            `.hidden
               {
                       visibility: hidden;
                       opacity: 0;
                       transition: visibility 0s .5s, opacity .5s ease-out;
               }
        `
        ],
        template: `
        <div class="img-container">
            <img class="visible"  #defaultImage src="https://trakt.tv/assets/placeholders/thumb/fanart-32a7c2081b8e6a119e69c001155908ed.png">        
            <img class="hidden" style="position:absolute"  #newImage>        
        </div>
        
    `
    }), 
    __metadata('design:paramtypes', [])
], DelayedImageComponent);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/delayedImage.components.js.map

/***/ }

},[682]);
//# sourceMappingURL=main.bundle.map