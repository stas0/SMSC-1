import { WaitUntil } from '../pages/common/waitUntilReady';
import { CrudMetaDataPage } from '../pages/crudMetaData.page';

describe('CrudMetaData', () => {
    let ptor = protractor.wrapDriver(browser.driver);
    let crudMetaDataPage: CrudMetaDataPage = new CrudMetaDataPage();

    beforeEach(() => {
        ptor = protractor.wrapDriver(browser.driver);
        crudMetaDataPage.ptor = ptor;
    });

    it('log in smsc.io', () => {
        crudMetaDataPage.get();
        crudMetaDataPage.login.login()
            .then(() => {
                expect(crudMetaDataPage.isPresentLogo()).toBeTruthy();
            });
    });

    it('should navigate to the customer', () => {
        crudMetaDataPage.clickOnCustomers()
            .then(() => {
                expect(crudMetaDataPage.isPresentCustomers()).toBeTruthy();
            });
    });

    it('should navigate to the create', () => {
        let width = 1980,
            height = 1020;
        ptor.manage().window().setSize(width, height)
            .then(() => {
                crudMetaDataPage.clickOnBtnAddRecord()
                    .then(() => {
                        expect(crudMetaDataPage.isPresentCrudCreateTag()).toBeTruthy();
                    });
            });
    });

    it('readonly should be false', () => {
        crudMetaDataPage.customerIdField.getAttribute('readonly')
            .then(readonly => {
                expect(readonly).toBeNull();
            });
    });

    it('city field should be displayed', () => {
        expect(crudMetaDataPage.isPresentCityField(false)).toBeTruthy();
    });

    it('order should be descending', () => {
        crudMetaDataPage.firstFieldInForm.getAttribute('class')
            .then(classes => {
                expect(crudMetaDataPage.isExistClass(classes, 'customerId')).toBeTruthy();
            });
    });

    it('should navigate to the formMetaData', () => {
        crudMetaDataPage.clickOnMetaData()
            .then(() => {
                crudMetaDataPage.clickOnFormMetaData()
                    .then(() => {
                        expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
                    });
            });
    });

    it('should navigate to the formMetaData', () => {
        crudMetaDataPage.clickOnFormMetaData()
            .then(() => {
                expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
            });
    });

    it('should be change visible property', () => {
        crudMetaDataPage.hideProperty()
            .then(() => {
                expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
            });
    });

    it('should be change editable and order properties', () => {
        crudMetaDataPage.orderReadonlyProperty('3')
            .then(() => {
                expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
            });
    });

    it('should navigate to the customer', () => {
        crudMetaDataPage.clickOnCustomers()
            .then(() => {
                expect(crudMetaDataPage.isPresentCustomers()).toBeTruthy();
            });
    });

    it('should navigate to the create', () => {
        crudMetaDataPage.clickOnBtnAddRecord()
            .then(() => {
                expect(crudMetaDataPage.isPresentCrudCreateTag()).toBeTruthy();
            });
    });

    it('readonly should be true', () => {
        crudMetaDataPage.customerIdField.getAttribute('readonly')
            .then(readonly => {
                expect(readonly).toBeTruthy();
            });
    });

    it('city field should be hidden', () => {
        crudMetaDataPage.cityField.isDisplayed()
            .then(isDisplayed => {
                expect(isDisplayed).toBeFalsy();
            });
    });

    it('order should be ascending', () => {
        crudMetaDataPage.firstFieldInForm.getAttribute('class')
            .then(classes => {
                expect(crudMetaDataPage.isExistClass(classes, 'companyName')).toBeTruthy();
            });
    });

    it('should navigate to the formMetaData', () => {
        crudMetaDataPage.clickOnFormMetaData()
            .then(() => {
                expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
            });
    });

    it('should be change visible property', () => {
        crudMetaDataPage.hideProperty()
            .then(() => {
                expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
            });
    });

    it('should be change editable and order properties', () => {
        crudMetaDataPage.orderReadonlyProperty('1')
            .then(() => {
                expect(crudMetaDataPage.isPresentFormMetaData()).toBeTruthy();
            });
    });

    it('should logout', () => {
        WaitUntil.logout(ptor);
        expect(WaitUntil.isPresentLogin(ptor)).toBeTruthy();
    });

});
