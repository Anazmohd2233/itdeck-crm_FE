import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class WelcomeService {

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
                    series: [75],
                    chart: {
                        type: "radialBar",
                        height: 220
                    },
                    plotOptions: {
                        radialBar: {
                            startAngle: -90,
                            endAngle: 90,
                            track: {
                                background: "#958df4",
                                strokeWidth: "100%",
                                margin: 3, // margin is in pixels
                                dropShadow: {
                                    enabled: false
                                }
                            },
                            dataLabels: {
                                name: {
                                    show: false
                                },
                                value: {
                                    offsetY: -2,
                                    fontSize: "25px",
                                    fontWeight: 500,
                                    color: "#ffffff"
                                }
                            }
                        }
                    },
                    colors: [
                        "#00cae3"
                    ]
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#mp_welcome_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}