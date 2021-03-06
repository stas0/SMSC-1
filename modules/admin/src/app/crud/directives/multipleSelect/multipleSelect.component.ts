import { Component, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/common/src/facade/async';
import { Location } from '@angular/common';
import { CrudService } from '../../crud.service';
import { LinksetProperty } from '../../model/linksetProperty';

@Component({
    selector: 'multiple-select',
    template: require('./multipleSelect.html'),
    styleUrls: [
        require('./multipleSelect.scss')
    ],
    providers: [],
    outputs: ['isRequired']
})

export class MultipleSelect {
    @Input('property') public property: any;
    @Input('rowSelectionLinkset') rowSelectionLinkset: string;

    public isRequired = new EventEmitter();
    public requiredSymb = ' ';
    public ridItems = [];

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public location: Location,
                public crudService: CrudService) {
    }

    ngOnInit() {
        if (this.property.mandatory) {
            this.requiredSymb += '*';
        }

        this.crudService.initGridData.then(() => {
            this.crudService.rowSelectionLinkset = this.rowSelectionLinkset;
            let linkset = [];

            if (this.crudService.model[this.property.property]) {
                linkset = (Array.isArray(this.crudService.model[this.property.property]) ?
                    this.crudService.model[this.property.property] :
                    this.crudService.model[this.property.property].split(','));
            }

            if (linkset) {
                linkset.forEach((item) => {
                    if (item) {
                        this.ridItems.push({
                            name: item, visible: true
                        });
                    }
                });

                if (this.property.mandatory) {
                    if (linkset.length) {
                        this.isRequired.emit(false);
                    } else {
                        this.isRequired.emit(true);
                    }
                } else {
                    this.isRequired.emit(false);
                }
            } else if (this.property.mandatory) {
                this.isRequired.emit(true);
            } else {
                this.isRequired.emit(false);
            }
        });
    }

    removeItem(): void {
        this.crudService.multipleSelectValid = false;
        let linkset = Array.isArray(this.crudService.model[this.property.property]) ?
            this.crudService.model[this.property.property] :
            this.crudService.model[this.property.property].split(',');
        let model = [];
        model['type'] = this.property.type;

        for (let i in this.ridItems) {
            if (this.ridItems[i].visible) {
                model['_' + model.length] = linkset['_' + model.length];
                model.push(linkset[i]);
            }
        }

        if (this.property.mandatory) {
            if (model.length) {
                this.isRequired.emit(false);
            } else {
                this.isRequired.emit(true);
            }
        } else {
            this.isRequired.emit(false);
        }

        this.crudService.model[this.property.property] = model;
    }

    clearAll(): void {
        this.resetParams();

        this.crudService.multipleSelectValid = true;
    }

    addLinkset(): void {
        this.resetParams();
        this.crudService.multipleSelectValid = false;

        let linsetProperty: LinksetProperty = {
            name: this.property.property,
            type: this.property.type,
            data: this.crudService.model,
            bingingProperties: this.property.bingingProperties
        };

        this.crudService.navigateToLinkset(linsetProperty);
        this.crudService.setLinkedClass(this.property.linkedClass);
    }

    resetParams(): void {
        this.crudService.titleColumns[this.property.property] = [];
        this.crudService.model[this.property.property] = [];
        this.crudService.titleColumns = [];
        this.ridItems = [];
    }
}
