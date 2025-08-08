import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TasksStatsService {

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
                            name: "Tasks Created",
                            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
                        },
                        {
                            name: "Tasks Solved",
                            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
                        }
                    ],
                    chart: {
                        height: 225,
                        type: "line",
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [
                        "#00cae3", "#ffb264"
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: 2,
                        curve: "straight",
                        dashArray: [0, 8, 5]
                    },
                    legend: {
                        show: false,
                        fontSize: '14px',
                        labels: {
                            colors: "#ffffff"
                        }
                    },
                    markers: {
                        size: 0,
                        hover: {
                            sizeOffset: 6
                        }
                    },
                    xaxis: {
                        categories: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec"
                        ],
                        axisBorder: {
                            show: true,
                            color: '#f1f1f1'
                        },
                        axisTicks: {
                            show: true,
                            color: '#f1f1f1'
                        },
                        labels: {
                            trim: false,
                            show: true,
                            style: {
                                colors: "#ffffff",
                                fontSize: "14px"
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 4,
                        labels: {
                            show: true,
                            style: {
                                colors: "#ffffff",
                                fontSize: "14px"
                            }
                        }
                    },
                    grid: {
                        strokeDashArray: 5,
                        borderColor: "#7a70eb",
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#crm_tasks_stats_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}