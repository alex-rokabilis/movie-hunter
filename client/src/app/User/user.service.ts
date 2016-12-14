import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UserService {

    age: string;
    gender: string;
    slug: string;
    username: string;
    avatar: string;

    trakt_http_headers:Headers;

    constructor(private http: Http) { }

    get access_token(): string {
        return window.localStorage.getItem('access_token')
    }

    set access_token(token: string) {
        if(token === null) window.localStorage.removeItem('access_token');
        else window.localStorage.setItem('access_token', token);
    }

    init(data):void {
        this.age = data.age;
        this.gender = data.gender;
        this.slug = data.ids ? data.ids.slug : null;
        this.username = data.username || data.name;
        try {
            this.avatar = data.images.avatar.full;
        } catch (err) {
            this.avatar = null;
        }
        console.log(this);
    }

    check(): Observable<any> {

        if(!this.access_token) return Observable.throw("access token is missing");
        const TRAKT_PROFILE_URL = "https://api.trakt.tv/users/me?extended=full";
        let headers = new Headers({
            //'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'Authorization': `Bearer ${this.access_token}`,
            'trakt-api-key': '3b1a622b6f17a0f2d99618629a3e1c072fce2ae803203af643a1f882b12c15c4'
        });

        let options = new RequestOptions({ headers: headers });
        this.trakt_http_headers = headers;

        return this.http.get(TRAKT_PROFILE_URL, options).do(response => this.init(response.json()))

    }

    login(code: string): Promise<any> {

        const SERVER_AUTHORIZE_URL = "http://localhost:3000/authorize";

        return this.http.post(SERVER_AUTHORIZE_URL, { code: code })
            .map(response => response.json())
            .toPromise()
            .then(response => {
                console.log(response);
                this.access_token = response.access_token;
                return this.check().toPromise();
            })

    }

    logout():void{
        this.access_token = null;
        this.init({});
    }
}