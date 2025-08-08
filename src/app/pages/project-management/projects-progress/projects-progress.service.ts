import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ProjectsProgressService {

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
                    series: [60, 30, 10],
                    chart: {
                        height: 396,
                        type: "donut"
                    },
                    labels: [
                        "In Progress", "Not Started", "Completed"
                    ],
                    legend: {
                        offsetY: 11,
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
                        "#00cae3", "#0e7aee", "#796df6"
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
                const chart = new ApexCharts(document.querySelector('#pm_projects_progress_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}