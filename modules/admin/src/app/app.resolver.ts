import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { CrudResolve } from './crud/common/crudResolve';
import { CrudViewResolve } from './crud/crudView/crud.view.resolve';
import { CrudLinksetResolve } from './crud/crudLinkset/crud.linkset.resolve';
import { CrudCreateResolve } from './crud/crudCreate/crud.create.resolve';
import { CrudEditResolve } from './crud/crudEdit/crud.edit.resolve';

@Injectable()
export class DataResolver implements Resolve<any> {
    constructor() {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.of({ res: 'I am data'});
    }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
    DataResolver,
    CrudEditResolve,
    CrudCreateResolve,
    CrudLinksetResolve,
    CrudResolve,
    CrudViewResolve
];
