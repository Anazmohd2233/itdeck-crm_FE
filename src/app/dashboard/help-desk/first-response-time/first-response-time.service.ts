import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class FirstResponseTimeService {

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
                            name: "Response Time",
                            data: [
                                51,
                                65,
                                54,
                                56,
                                37,
                                53,
                                62,
                                24,
                                35,
                                46,
                                39,
                                27,
                                38,
                                61,
                                45,
                                27,
                                54,
                                93,
                                41,
                                31
                            ]
                        }
                    ],
                    chart: {
                        type: "area",
                        height: 200,
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "straight",
                        width: 2
                    },
                    colors: [
                        "#ffb264"
                    ],
                    labels: [
                        "13 Nov 2024",
                        "14 Nov 2024",
                        "15 Nov 2024",
                        "16 Nov 2024",
                        "17 Nov 2024",
                        "20 Nov 2024",
                        "21 Nov 2024",
                        "22 Nov 2024",
                        "23 Nov 2024",
                        "24 Nov 2024",
                        "27 Nov 2024",
                        "28 Nov 2024",
                        "29 Nov 2024",
                        "30 Nov 2024",
                        "01 Dec 2024",
                        "04 Dec 2024",
                        "05 Dec 2024",
                        "06 Dec 2024",
                        "07 Dec 2024",
                        "08 Dec 2024"
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
                    grid: {
                        show: false,
                        strokeDashArray: 5,
                        borderColor: "#e0e0e0",
                        row: {
                            colors: ["#f4f6fc", "transparent"], // takes an array which will be repeated on columns
                            opacity: 0
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: function(val:any) {
                                return val + "mins";
                            }
                        }
                    }
                };

                // Initialize and render the chart
                const chart = new ApexCharts(document.querySelector('#help_desk_first_response_time_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}