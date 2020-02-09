import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {FiltersService} from '../../services/filters.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public imagePath;

    constructor(private filterService: FiltersService) {
        this.filterService.showFilter(false);
        this.imagePath = 'assets/images/jardin.jpg';
        // this.sliders.push(
        //     {
        //         imagePath: 'assets/images/jardin.jpg',
        //         label: 'First slide label',
        //         text:
        //             'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            // },
            // {
            //     imagePath: 'assets/images/cuarto grande.jpg',
            //     label: 'Second slide label',
            //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            // },
            // {
            //     imagePath: 'assets/images/pileta.jpg',
            //     label: 'Third slide label',
            //     text:
            //         'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    //         }
    //     );
    //
    //     this.alerts.push(
    //         {
    //             id: 1,
    //             type: 'success',
    //             message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    //             Voluptates est animi quibusdam praesentium quam, et perspiciatis,
    //             consectetur velit culpa molestias dignissimos
    //             voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
    //         },
    //         {
    //             id: 2,
    //             type: 'warning',
    //             message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    //             Voluptates est animi quibusdam praesentium quam, et perspiciatis,
    //             consectetur velit culpa molestias dignissimos
    //             voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
    //         }
    //     );
     }

    ngOnInit() {}

    // public closeAlert(alert: any) {
    //     const index: number = this.alerts.indexOf(alert);
    //     this.alerts.splice(index, 1);
    // }
}
