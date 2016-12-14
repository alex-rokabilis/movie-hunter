webpackJsonp([0,3],{

/***/ 319:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_config__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User_user_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(652);
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

/***/ 320:
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

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};


let AppComponent = class AppComponent {
    constructor(router, route) {
        this.title = "...";
    }
    delay(milliseconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delay(2000);
            this.title = "Hello World";
        });
    }
};
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        selector: 'app-root',
        template: `
    <navbar></navbar>
    <a [routerLink]="['movie/popular']">Popular Movies</a>
    <a [routerLink]="['movie/trending']">Trending Movies</a>
    <router-outlet></router-outlet>

  `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object])
], AppComponent);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/app.component.js.map

/***/ },

/***/ 372:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 372;


/***/ },

/***/ 373:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(490);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_28" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/main.js.map

/***/ },

/***/ 479:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_user_service__ = __webpack_require__(74);
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

/***/ 480:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loginWebview_component__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__User_user_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loginCanActivate_service__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loginPage_component__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(36);
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
        imports: [__WEBPACK_IMPORTED_MODULE_6__angular_router__["c" /* RouterModule */].forChild(routes), __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* HttpModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_6__angular_router__["c" /* RouterModule */]],
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

/***/ 481:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_user_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
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
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
], CanActivateLogin);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/loginCanActivate.service.js.map

/***/ },

/***/ 482:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User_user_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(656);
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
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
], LoginPageComponent);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/loginPage.component.js.map

/***/ },

/***/ 483:
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

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User_user_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__movie_resolver__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__movieDetails_component__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__movie_service__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__movieList_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(36);
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
        children: [{
                path: '', redirectTo: 'popular'
            }, {
                path: 'popular',
                component: __WEBPACK_IMPORTED_MODULE_5__movieList_component__["a" /* MovieListComponent */],
                resolve: {
                    movies: __WEBPACK_IMPORTED_MODULE_2__movie_resolver__["a" /* MovieResolver */]
                }
            }, {
                path: 'trending',
                component: __WEBPACK_IMPORTED_MODULE_5__movieList_component__["a" /* MovieListComponent */],
                resolve: {
                    movies: __WEBPACK_IMPORTED_MODULE_2__movie_resolver__["a" /* MovieResolver */]
                }
            }, {
                path: ':id',
                component: __WEBPACK_IMPORTED_MODULE_3__movieDetails_component__["a" /* MovieDetailsComponent */],
                resolve: {
                    movie: __WEBPACK_IMPORTED_MODULE_2__movie_resolver__["a" /* MovieResolver */]
                }
            }]
    },
];
let MovieRoutingModule = class MovieRoutingModule {
};
MovieRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__angular_core__["I" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_7__angular_router__["c" /* RouterModule */].forChild(routes), __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* HttpModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_7__angular_router__["c" /* RouterModule */]],
        providers: [__WEBPACK_IMPORTED_MODULE_4__movie_service__["a" /* MovieService */], __WEBPACK_IMPORTED_MODULE_2__movie_resolver__["a" /* MovieResolver */], __WEBPACK_IMPORTED_MODULE_1__User_user_service__["a" /* UserService */]]
    }), 
    __metadata('design:paramtypes', [])
], MovieRoutingModule);
const MovieRoutingComponents = [__WEBPACK_IMPORTED_MODULE_5__movieList_component__["a" /* MovieListComponent */], __WEBPACK_IMPORTED_MODULE_3__movieDetails_component__["a" /* MovieDetailsComponent */]];
const MovieModule = {
    routing: MovieRoutingModule,
    components: MovieRoutingComponents
};
/* harmony export (immutable) */ exports["a"] = MovieModule;

//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/movie.module.js.map

/***/ },

/***/ 485:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__movie_service__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
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
            return this.movieService.getPopular()
                .catch(err => {
                console.error("err happend", err);
                if (err.status == 403)
                    this.router.navigate(['/login']);
                return err;
            });
        if (path == "trending")
            return this.movieService.getTrending()
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
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__movie_service__["a" /* MovieService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__movie_service__["a" /* MovieService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
], MovieResolver);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/movie.resolver.js.map

/***/ },

/***/ 486:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MovieDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let MovieDetailsComponent = class MovieDetailsComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        this.route.data
            .pluck('movie')
            .subscribe((m) => this.movie = m);
    }
};
MovieDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        selector: 'selector',
        template: `
        <h3>{{movie.title}}</h3>
        <div>
            <img src="{{movie.poster_path}}">
        </div>
        <pre>{{ movie | json}}</pre>
    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object])
], MovieDetailsComponent);
var _a;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/movieDetails.component.js.map

/***/ },

/***/ 487:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_pluck__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_pluck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_pluck__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MovieListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let MovieListComponent = class MovieListComponent {
    constructor(route) {
        this.route = route;
    }
    ngOnInit() {
        console.log(this.route);
        this.route.data.pluck('movies').subscribe(m => this.movies = m);
        //this.movieService.getTrending().then( m => this.movies = m)
    }
};
MovieListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* Component */])({
        template: `Movie List

        <div>
            <div>
                Sidebar
            </div>
        
            <div style="margin-left: 2%;margin-right: 2%;margin-top: 10px;">
                <div class="container" *ngFor="let movie of movies">
                    
                    <a [routerLink]='["/movie/" + movie.ids.slug]'>
                        <div style="background-color: #1d1d1d;position: relative;overflow: hidden;">
                            
                            <img style="min-height: 100%;position: relative; top: 0; left: 0;display: block;    width: 100%;vertical-align: middle;" 
                                src={{movie.backdrop_path}}>
                        
                        </div>
                        
                        <p>{{movie.title}}</p>
                    </a>
                </div>
            </div>
        </div>

        <style>
            .container{
                width: 23%;
                display: inline-table;
                margin-right: 2%;
                text-align: center;
            }
            .container:nth-child(4n+4) {  
                margin-right: 0;
            }
        
        </style>
    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object])
], MovieListComponent);
var _a;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/movieList.component.js.map

/***/ },

/***/ 488:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__User_user_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(36);
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
            <p>Hello {{user.username}}</p>
            <button (click)='user.logout();router.navigate(["/login"]);'>Logout</button>
        </div>
    `
    }), 
    __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__User_user_service__["a" /* UserService */]) === 'function' && _b) || Object])
], NavbarComponent);
var _a, _b;
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/navbar.component.js.map

/***/ },

/***/ 489:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_config__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Login_login_module__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Movie_movie_module__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Navbar_navbar_component__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Home_homePage_component__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_router__ = __webpack_require__(36);
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
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_4__Home_homePage_component__["a" /* HomePageComponent */] },
    { path: '**', redirectTo: "/login" },
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__angular_core__["I" /* NgModule */])({
        schemas: [__WEBPACK_IMPORTED_MODULE_7__angular_core__["Y" /* NO_ERRORS_SCHEMA */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4__Home_homePage_component__["a" /* HomePageComponent */],
            __WEBPACK_IMPORTED_MODULE_3__Navbar_navbar_component__["a" /* NavbarComponent */],
            ...__WEBPACK_IMPORTED_MODULE_1__Login_login_module__["a" /* LoginModule */].components,
            ...__WEBPACK_IMPORTED_MODULE_2__Movie_movie_module__["a" /* MovieModule */].components
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["b" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_router__["c" /* RouterModule */].forRoot(routes, { useHash: true }),
            __WEBPACK_IMPORTED_MODULE_2__Movie_movie_module__["a" /* MovieModule */].routing,
            __WEBPACK_IMPORTED_MODULE_1__Login_login_module__["a" /* LoginModule */].routing
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_0__app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_0__app_config__["c" /* config */] }],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/app.module.js.map

/***/ },

/***/ 490:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(489);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/index.js.map

/***/ },

/***/ 491:
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

/***/ 492:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/mnt/61A95524259CB759/douleies/movie-hunter/client/src/polyfills.js.map

/***/ },

/***/ 675:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(373);


/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(6);
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

/***/ }

},[675]);
//# sourceMappingURL=main.bundle.map