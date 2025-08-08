import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TicketsByTypeService {

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
                    series: [40, 30, 20, 10],
                    chart: {
                        height: 367,
                        type: "donut"
                    },
                    labels: [
                        "Technical Issue", "Product Support", "General Inquiry", "Billing Inquiry"
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
                        "#00cae3", "#0e7aee", "#796df6", "#ee6666"
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
                const chart = new ApexCharts(document.querySelector('#help_desk_tickets_by_type_chart'), options);
                chart.render();
            } catch (error) {
                console.error('Error loading ApexCharts:', error);
            }
        }
    }

}