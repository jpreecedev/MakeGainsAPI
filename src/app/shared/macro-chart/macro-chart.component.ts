import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { MacroChartService } from './macro-chart.service';

@Component({
    selector: 'app-macro-chart',
    templateUrl: './macro-chart.component.html',
    providers: [MacroChartService]
})
export class MacroChartComponent implements OnInit {
    // Pie
    public pieChartLabels: String[] = ['Carbs', 'Fat', 'Protein'];
    public pieChartData: Number[] = [];
    public pieChartType: String = 'pie';

    constructor(public service: MacroChartService) {

    }

    public ngOnInit() {
        this.service.getMacroSummary('5DDNPR').subscribe((response: Response) => {
            let data = response.json();
            let _pieChartData: Number[] = [];

            if (data) {
                _pieChartData.push(data.carbs);
                _pieChartData.push(data.fat);
                _pieChartData.push(data.protein);
            }

            this.pieChartData = _pieChartData;
        });
    }

}
