import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppSettings } from '../../app.settings';
import { dateTwoWeeksAgo, toIsoDate } from '../shared.utilities';

@Injectable()
export class CalorieChartService {

    constructor(private httpService: Http) { }

    getCalories(encodedUserId: String): Observable<{}> {
        let from = toIsoDate(dateTwoWeeksAgo());
        let to = toIsoDate(new Date());

        return this.httpService.get(`${AppSettings.API_ENDPOINT}/fitbit/calories/${encodedUserId}/${from}/${to}/`);
    }
}
