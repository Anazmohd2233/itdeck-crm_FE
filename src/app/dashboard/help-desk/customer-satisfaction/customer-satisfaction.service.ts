import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CustomerSatisfactionService {

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
                    series: [55, 45, 35],
                    chart: {
                        height: 395,
                        type: 'polarArea'
                    },
                    labels: [
                        'Highly Satisfied', 'Satisfied', 'Unsatisfied'
                    ],
                    fill: {
                        opacity: 1
                    },
                    stroke: {
                        width: 1,
                        colors: undefined
                    },
                    colors: [
                        "#00cae3", "#0f79f3", "#796df6"
                    ],
                    yaxis: {
                        show: false
                    },
                    legend: {
                        offsetY: -10,
                        fontSize: "14px",
                        position: "bottom",
                        horizontalAlign: "center",
                        labels: {
                            colors: "#919aa3",
                        },
                        itemMargin: {
                            horizontal: 12,
                            vertical: 7
                        }
                    },
                    plotOptions: {
                        polarArea: {
                            rings: {
                                strokeWidth: 0
                            }
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: function(val:any) {
                                return val + "%";
                            }
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#help_desk_customer_satisfaction_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}