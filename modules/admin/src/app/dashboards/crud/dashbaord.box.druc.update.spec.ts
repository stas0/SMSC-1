import { inject, TestBed } from '@angular/core/testing';
import { Location } from "@angular/common";
import { HttpModule } from "@angular/http";
import { DropdownDirective } from "ng2-bootstrap/ng2-bootstrap";
import { TranslateService, TranslateLoader } from "ng2-translate/ng2-translate";
import { DragulaService } from "ng2-dragula/ng2-dragula";
import { Router } from "@angular/router";
import { CrudService } from "../../crud/crud.service";
import { GridService } from "../../services/grid.service";
import { CRUD_PROVIDERS } from "../../crud/common/crudProviders";
import { DashboardService } from "../dashboardService";
import { DashboardCrudUpdate } from "./dashboard.box.update";

class MockLocation {};

describe('Dashboard crud update', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardCrudUpdate,
                TranslateService,
                DragulaService,
                DashboardService,
                TranslateLoader,
                ...CRUD_PROVIDERS,
                GridService,
                { provide: Router, useClass: MockLocation },
                { provide: Location, useClass: MockLocation },
                CrudService
            ],
            directives: [
                DropdownDirective
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should be defined resolveData', inject([ DashboardCrudUpdate ], (box) => {
        expect(box.resolveData).toBeDefined();
    }));

    it('should be defined btnName', inject([ DashboardCrudUpdate ], (box) => {
        expect(box.btnName).toBeDefined();
    }));
});
