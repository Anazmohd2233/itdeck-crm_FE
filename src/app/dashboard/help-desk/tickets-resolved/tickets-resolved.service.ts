import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TicketsResolvedService {

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
                            name: "Tickets Open",
                            data: [
                                25, 66, 41, 59, 25, 44, 12, 36, 9, 21
                            ]
                        }
                    ],
                    chart: {
                        type: "area",
                        height: 115,
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    colors: [
                        "#0f79f3"
                    ],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "straight",
                        width: 3
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            opacityFrom: 0,
                            opacityTo: 0.5
                        }
                    },
                    labels: [
                        "10 Mar 2024",
                        "11 Mar 2024",
                        "12 Mar 2024",
                        "13 Mar 2024",
                        "14 Mar 2024",
                        "15 Mar 2024",
                        "16 Mar 2024",
                        "17 Mar 2024",
                        "18 Mar 2024",
                        "19 Mar 2024"
                    ],
                    xaxis: {
                        type: "datetime",
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
                        },
                        tooltip: {
                            enabled: false
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false,
                            style: {
                                colors: "#919aa3",
                                fontSize: "14px"
                            }
                        }
                    },
                    legend: {
                        show: false
                    },
                    grid: {
                        show: false,
                        strokeDashArray: 5,
                        borderColor: "#e0e0e0"
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#help_desk_tickets_resolved_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}