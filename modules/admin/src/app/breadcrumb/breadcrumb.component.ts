import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    selector: 'breadcrumb',
    template: require('./breadcrumb.html'),
    inputs: [
        'title',
        'description',
        'parents'
    ],
    providers: [],
    styleUrls: [
        require('./breadcrumb.scss')
    ]
})

export class Breadcrumb {
    public breadcrumb: BreadcrumbService;

    constructor(public translate: TranslateService,
                public router: Router,
                public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.breadcrumb = new BreadcrumbService(this.router, this.route);
    }
}
