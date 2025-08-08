import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class MostLeadsService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    async loadChart(): Promise<void> {
        if (this.isBrowser) {
            try {
                // Dynamically import ApexCharts
                const ApexCharts = (await import('apexcharts')).default;

                // Define chart options
                const options = {
                    series: [55, 30, 10, 5],
                    chart: {
                        width: 305,
                        type: "pie"
                    },
                    stroke: {
                        width: 2,
                        show: true
                    },
                    labels: [
                        "Email", "Social", "Call", "Others"
                    ],
                    legend: {
                        show: false
                    },
                    dataLabels: {
                        enabled: false,
                        style: {
                            fontSize: '14px'
                        },
                        dropShadow: {
                            enabled: false
                        }
                    },
                    colors: [
                        "#00cae3", "#0e7aee", "#796df6", "#ffb264"
                    ],
                    tooltip: {
                        y: {
                            formatter: function(val:any) {
                                return val + "%";
                            }
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#crm_most_leads_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}