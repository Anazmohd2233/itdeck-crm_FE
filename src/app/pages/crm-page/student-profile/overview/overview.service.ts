import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class OverviewService {

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
                            name: "Total Projects",
                            data: [320, 332, 301, 334, 390, 300, 280]
                        },
                        {
                            name: "Total Orders",
                            data: [220, 182, 191, 234, 290, 200, 180]
                        },
                        {
                            name: "Total Revenue",
                            data: [150, 232, 201, 154, 190, 140, 120]
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 396,
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: "40%"
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: [
                        "#0f79f3", "#ffb264", "#e74c3c"
                    ],
                    stroke: {
                        width: 7,
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
                    },
                    tooltip: {
                        y: {
                            formatter: function(val:any) {
                                return "$" + val;
                            }
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#mp_overview_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}