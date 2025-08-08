import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TicketsSolvedAndCreatedService {

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
                            name: "Tickets Created",
                            data: [250, 710, 450, 780, 390, 600, 350]
                        },
                        {
                            name: "Ticket Solved",
                            data: [200, 500, 300, 640, 250, 450, 150]
                        }
                    ],
                    chart: {
                        type: "area",
                        height: 350,
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [
                        "#796df6", "#00cae3"
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: [4, 4]
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            opacityFrom: 0.1,
                            opacityTo: 0.6
                        }
                    },
                    legend: {
                        offsetY: 0,
                        fontSize: "14px",
                        position: "bottom",
                        horizontalAlign: "center",
                        labels: {
                            colors: "#919aa3",
                        },
                        itemMargin: {
                            horizontal: 12,
                            vertical: 12
                        }
                    },
                    grid: {
                        strokeDashArray: 5,
                        borderColor: "#e0e0e0"
                    },
                    xaxis: {
                        categories: [
                            "January 7",
                            "January 8",
                            "January 9",
                            "January 10",
                            "January 11",
                            "January 12",
                            "January 13"
                        ],
                        axisBorder: {
                            show: false,
                            color: '#e0e0e0'
                        },
                        axisTicks: {
                            show: false,
                            color: '#e0e0e0'
                        },
                        labels: {
                            show: false,
                            style: {
                                colors: "#919aa3",
                                fontSize: "14px"
                            }
                        }
                    },
                    yaxis: {
                        tickAmount: 5,
                        labels: {
                            show: true,
                            style: {
                                colors: "#919aa3",
                                fontSize: "14px"
                            }
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#help_desk_tickets_solved_and_created_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}