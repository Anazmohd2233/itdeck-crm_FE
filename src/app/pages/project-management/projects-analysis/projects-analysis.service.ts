import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ProjectsAnalysisService {

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
                    series: [
                        {
                            name: "Project",
                            data: [44, 55, 57, 56, 61, 58, 63]
                        },
                        {
                            name: "Task",
                            data: [76, 85, 101, 98, 87, 105, 91]
                        },
                        {
                            name: "Revenue",
                            data: [35, 41, 36, 26, 45, 48, 52]
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 380,
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: "65%"
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: [
                        "#00cae3", "#0f79f3", "#796df6"
                    ],
                    stroke: {
                        width: 2,
                        show: true,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun"
                        ],
                        axisBorder: {
                            show: false,
                            color: '#e0e0e0'
                        },
                        axisTicks: {
                            show: true,
                            color: '#e0e0e0'
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: "#919aa3",
                                fontSize: "14px"
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: "#919aa3",
                                fontSize: "14px"
                            }
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    grid: {
                        strokeDashArray: 5,
                        borderColor: "#e0e0e0"
                    },
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "center",
                        labels: {
                            colors: "#919aa3"
                        },
                        itemMargin: {
                            horizontal: 10,
                            vertical: 0
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#pm_projects_analysis_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}