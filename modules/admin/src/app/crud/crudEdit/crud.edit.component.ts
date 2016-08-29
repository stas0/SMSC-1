import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { MultipleSelect } from "../directives/multipleSelect/multipleSelect.component";
import { MdCheckbox } from "@angular2-material/checkbox/checkbox";
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { SELECT_DIRECTIVES } from "ng2-select";
import { CrudView } from "../crudView/crud.view.component";
import { Location } from "@angular/common";
import { LoadingGrid } from "../../common/loadingGrid";

@Component({
    selector: 'crud-edit',
    template: require('../common/form.html'),
    styles: [
        require('../common/form.scss'),
        require('../common/style.scss')
    ],
    providers: [Location],
    directives: [
        MultipleSelect,
        CrudView,
        MdCheckbox,
        SELECT_DIRECTIVES,
        BUTTON_DIRECTIVES,
        LoadingGrid
    ],
    pipes: [TranslatePipe]
})

export class CrudEdit {
    public resolveData: any;
    public btnName: string = 'UPDATE';

    constructor(public translate: TranslateService,
                public crudService: CrudService,
                public router: Router,
                public route: ActivatedRoute,
                public location: Location) {
    }

    ngOnInit() {
        this.resolveData = this.route.snapshot.data[0];

        if (this.resolveData.model) {
            this.crudService.setModel(this.resolveData.model);
        }

        this.crudService.gridOptions.columnDefs = this.resolveData.initGridData.columnDefs;
        this.crudService.gridOptions.rowData = this.resolveData.initGridData.rowData;
    }

    back() {
        this.location.back();
    }

    ngOnDestroy() {
        this.crudService.addingFormValid = false;
        this.crudService.isEditForm = false;
        this.crudService.setModel({});
    }

    onSubmit() {
        this.crudService.updateRecord(this.crudService.model);
    }

}
