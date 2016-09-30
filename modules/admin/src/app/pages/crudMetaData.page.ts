import { LoginPage } from './login.page';
import { WaitUntil } from './common/waitUntilReady';

export class CrudMetaDataPage {
    public login: LoginPage = new LoginPage();

    public logo = element(by.id('logo'));
    public customersItem = by.className('customers');
    public customersTag = element(by.tagName('customers'));
    public formBtn = by.id('modify');
    public metaDataItem = by.className('crudmetadata');
    public formMetaDataItem = by.className('crudmetaformdata');
    public formMetaDataTag = element(by.tagName('crudMetaFormData'));
    public btnAddRecord = by.id('addRow');
    public crudCreateTag = element(by.tagName('crud-create'));
    public backBtn = by.id('back');

    public customerIdField = element(by.css('.customerId input'));
    public cityField = element(by.css('.city input'));

    // check order property
    public firstFieldInForm = element(by.css('#dynamicForm > div:nth-of-type(1) md-input'));

    public cityEdit = element.all(by.xpath('.//*[.="city"]/preceding-sibling::div')).get(2);
    public customerIdEdit = element.all(by.xpath(
        './/*[.="customerId"]/preceding-sibling::div')).get(2);

    public visibleInput = by.css('.visible');
    public editableInput = by.css('.editable');
    public orderInput = by.css('.order input');

    private _ptor;

    constructor() {
    }

    get() {
        browser.get('/admin');
    }

    getCrudView() {
        browser.get('/admin/customers');
    }

    hideProperty() {
        return this.clickOnCityEdit()
            .then(() => {
                return this.changeVisibleProperty()
                    .then(() => {
                        return this.clickOnFormBtn()
                            .then(() => {
                                return this.clickOnBackBtn();
                            });
                    });
            });
    }

    orderReadonlyProperty(value: string) {
        return this.clickOnCustomerIdEdit()
            .then(() => {
                return this.clearOrderInput()
                    .then(() => {
                        return this.sendKeysToOrderInput(value)
                            .then(() => {
                                return this.changeEditableProperty()
                                    .then(() => {
                                        return this.clickOnFormBtn()
                                            .then(() => {
                                                return this.clickOnBackBtn();
                                            });
                                    });

                            });

                    });
            });
    }

    sendKeysToOrderInput(data) {
        return this._ptor.wait(protractor.until.elementLocated(this.orderInput), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.sendKeys(data));
            });
    }

    clearOrderInput() {
        return this._ptor.wait(protractor.until.elementLocated(this.orderInput), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.clear());
            });
    }

    isPresentCityField(ready: boolean) {
        WaitUntil.waitUntil(this.cityField, this._ptor, ready);
        return this.cityField.isPresent();
    }

    isExistClass(str: string, className: string) {
        return str.indexOf(className) !== -1 ? true : false;
    }

    clickOnFormBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.formBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnCityEdit() {
        WaitUntil.waitUntil(this.cityEdit, this._ptor);
        return this.cityEdit.click();
    }

    clickOnCustomerIdEdit() {
        WaitUntil.waitUntil(this.customerIdEdit, this._ptor);
        return this.customerIdEdit.click();
    }

    changeVisibleProperty() {
        return this._ptor.wait(protractor.until.elementLocated(this.visibleInput), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    changeEditableProperty() {
        return this._ptor.wait(protractor.until.elementLocated(this.editableInput), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnBackBtn() {
        return this._ptor.wait(protractor.until.elementLocated(this.backBtn), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnFormMetaData() {
        return this._ptor.wait(protractor.until.elementLocated(this.formMetaDataItem), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }


    clickOnMetaData() {
        return this._ptor.wait(protractor.until.elementLocated(this.metaDataItem), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnCustomers() {
        return this._ptor.wait(protractor.until.elementLocated(this.customersItem), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnBtnAddRecord() {
        return this._ptor.wait(protractor.until.elementLocated(this.btnAddRecord), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    isPresentFormMetaData() {
        WaitUntil.waitUntil(this.formMetaDataTag, this.ptor);
        return this.formMetaDataTag.isPresent();
    }

    isPresentLogo() {
        WaitUntil.waitUntil(this.logo, this.ptor);
        return this.logo.isPresent();
    }

    isPresentCrudCreateTag() {
        WaitUntil.waitUntil(this.crudCreateTag, this.ptor);
        return this.crudCreateTag.isPresent();
    }

    isPresentCustomers() {
        WaitUntil.waitUntil(this.customersTag, this.ptor);
        return this.customersTag.isPresent();
    }

    get ptor() {
        return this._ptor;
    }

    set ptor(value) {
        this._ptor = value;
    }
}
