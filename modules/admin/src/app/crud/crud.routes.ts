import { CrudView } from './crudView/crud.view.component';
import { CrudDelete } from './crudDelete/crud.delete.component';
import { CrudCreate } from './crudCreate/crud.create.component';
import { CrudEdit } from './crudEdit/crud.edit.component';
import { CrudViewResolve } from './crudView/crud.view.resolve';
import { CrudLinkset } from './crudLinkset/crud.linkset.component';
import { CrudLinksetResolve } from './crudLinkset/crud.linkset.resolve';
import { CrudCreateResolve } from './crudCreate/crud.create.resolve';
import { CrudEditResolve } from './crudEdit/crud.edit.resolve';

export const CRUD_ROUTE_PROVIDER = [
    { path: '', component: CrudView, resolve: { view: CrudViewResolve } },
    { path: 'delete/:id', component: CrudDelete },
    { path: 'edit/:id', component: CrudEdit, resolve: { edit: CrudEditResolve } },
    { path: 'create/:className', component: CrudCreate, resolve: { create: CrudCreateResolve } },
    { path: 'linkset', component: CrudLinkset, resolve: { linkset: CrudLinksetResolve } },
];
