import { Http } from '@angular/http';
import { ChangeDetectorRef } from '@angular/core';

import 'rxjs/add/operator/map';

export class ExtService {
    static get parameters() {
        return [[Http], [ChangeDetectorRef]];
    }

    constructor(private http: Http) {

    }

    searchMovies() {
        var url = 'https://news-danceapp.azurewebsites.net/api/HttpTriggerCSharp1?name=minename';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
}