import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { CalorieChartService } from './calorie-chart.service';

@Component({
    selector: 'app-calorie-chart',
    templateUrl: './calorie-chart.component.html',
    providers: [CalorieChartService]
})
export class CalorieChartComponent implements OnInit {

    public lineChartOptions: any = {
        responsive: true
    };

    public lineChartType: String = 'line';
    public lineChartData: Array<any> = [{ data: [], label: 'Label' }];
    public lineChartLabels: Array<any> = [''];

    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];

    constructor(public service: CalorieChartService) {
    }

    public ngOnInit() {
        this.service.getCalories('5DDNPR').subscribe((response: Response) => {
            let data = response.json();
            let _lineChartData: Array<any> = new Array();
            let _lineChartLabels: Array<any> = new Array<any>();

            _lineChartData[0] = { data: new Array(), label: 'Calories Burnt' };

            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                _lineChartData[0].data.push(Number.parseInt(item.value));
                _lineChartLabels.push(new Date(item.dateTime).toDateString());
            }

            this.lineChartLabels = [];
            for (let i = 0; i < _lineChartLabels.length; i++) {
                this.lineChartLabels.push(_lineChartLabels[i]);
            }

            this.lineChartData = _lineChartData;
        });
    }
}
