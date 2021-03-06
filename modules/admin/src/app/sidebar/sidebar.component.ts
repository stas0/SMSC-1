import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router } from '@angular/router';
import { SidebarModel } from './model/Sidebar';

@Component({
    selector: 'sidebar',
    template: require('./sidebar.html'),
    providers: [],
    styleUrls: [
        require('./sidebar.scss')
    ]
})

export class Sidebar {
    public dataNavItems: Array<SidebarModel> = [];

    constructor(public translate: TranslateService,
                public router: Router) {
        this.initDataNavItems(this.router);
    }

    ngOnInit() {
    }

    initDataNavItems(router) {
        let result: Array<SidebarModel> = [];
        let decoratorValue;

        let routeConfig = router.config;

        for (let l in routeConfig) {
            if (routeConfig.hasOwnProperty(l)) {
                let route = routeConfig[l];

                if (route.hasOwnProperty('children')) {
                    for (let i in route.children) {
                        if (route.children.hasOwnProperty(i)) {
                            let item = route.children[i];

                            if (
                                item.hasOwnProperty('data') &&
                                item.data.hasOwnProperty('showInSubNavigation') &&
                                item.data.showInSubNavigation
                            ) {
                                if (item.hasOwnProperty('children')) {
                                    decoratorValue = item.children;

                                    for (let k in decoratorValue) {
                                        if (decoratorValue.hasOwnProperty(k)) {
                                            let subItem = decoratorValue[k];

                                            if (
                                                subItem.hasOwnProperty('data') &&
                                                subItem.data.hasOwnProperty('showInSubNavigation')
                                                && subItem.data.showInSubNavigation
                                            ) {
                                                let submenu: SidebarModel = {
                                                    name: subItem.component.name.toLowerCase(),
                                                    path: subItem.path,
                                                    icon: subItem.data.icon
                                                };

                                                result.push(submenu);
                                            }
                                        }
                                    }
                                }

                                if (result.length === 0) {
                                    result = undefined;
                                }

                                let sidebarItem: SidebarModel = {
                                    name: item.component.name.toLowerCase(),
                                    path: item.path ? '/' + item.path : '/',
                                    icon: item.data.icon,
                                    toggle: item.data.toggle,
                                    submenu: result,
                                    showInSubNavigation: item.data.showInSubNavigation
                                };

                                this.dataNavItems.push(sidebarItem);
                                result = [];
                            }
                        }
                    }
                }
            }
        }
    }
}
