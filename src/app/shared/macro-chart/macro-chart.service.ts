import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../app.settings';
import { toIsoDate } from '../shared.utilities';

@Injectable()
export class MacroChartService {

    constructor(private httpService: Http) { }

    getMacroSummary(encodedUserId: String): Observable<{}> {
        let date = toIsoDate(new Date());

        return this.httpService.get(`${AppSettings.API_ENDPOINT}/fitbit/food/${encodedUserId}/${date}/`);
    }
}
