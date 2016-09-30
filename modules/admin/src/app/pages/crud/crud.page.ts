import { LoginPage } from '../login.page';
import { WaitUntil } from '../common/waitUntilReady';
import { CreatePage } from './crud.create.page';
import { DeletePage } from './crud.delete.page';

export class CrudPage {
    public login: LoginPage = new LoginPage();
    public crudCreate: CreatePage = new CreatePage();
    public crudDelete: DeletePage = new DeletePage();

    public logo = element(by.id('logo'));
    public customersItem = by.className('customers');
    public customersTag = element(by.tagName('customers'));
    public metaDataItem = by.className('crudmetadata');
    public gridMetaDataItem = by.className('crudmetagriddata');
    public gridMetaDataTag = element(by.tagName('crudMetaGridData'));
    public btnAddRecord = by.id('addRow');
    public crudCreateTag = element(by.tagName('crud-create'));
    public crudViewTag = element(by.tagName('crud-view'));
    public btnDeleteRow = by.id('deleteRow');
    public deleteIcon = by.css('.ag-body-container > div:first-of-type .deleteIcon');
    public backBtn = by.id('back');

    private _ptor;

    constructor() {
    }

    get() {
        browser.get('/admin');
    }

    getCrudView() {
        browser.get('/admin/customers');
    }

    deleteRecordsOnSecondLevel() {
        return this.clickOnBtnAddRecord()
            .then(() => {
                return this.crudCreate.clickOnContactsLinksetBtn()
                    .then(() => {
                        return this.crudCreate.clickOnSelectAll()
                            .then(() => {
                                return this.clickOnDeleteButton()
                                    .then(() => {
                                        this.crudDelete.clickOnOkBtn();
                                    });
                            });
                    });
            });
    }

    isEnabledDeleteButton() {
        WaitUntil.waitUntil(this.btnDeleteRow, this.ptor);
        return element(this.btnDeleteRow).isEnabled();
    }

    clickOnDeleteButton() {
        return this._ptor.wait(protractor.until.elementLocated(this.btnDeleteRow), 5000)
            .then((el: webdriver.IWebElement) => {
                return Promise.resolve(el.click());
            });
    }

    clickOnDeleteIcon() {
        return this._ptor.wait(protractor.until.elementLocated(this.deleteIcon), 5000)
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

    clickOnGridMetaData() {
        return this._ptor.wait(protractor.until.elementLocated(this.gridMetaDataItem), 5000)
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

    isPresentGridMetaData() {
        WaitUntil.waitUntil(this.gridMetaDataTag, this.ptor);
        return this.gridMetaDataTag.isPresent();
    }

    isPresentLogo() {
        WaitUntil.waitUntil(this.logo, this.ptor);
        return this.logo.isPresent();
    }

    isPresentCrudCreateTag() {
        WaitUntil.waitUntil(this.crudCreateTag, this.ptor);
        return this.crudCreateTag.isPresent();
    }

    isPresentCrudViewTag() {
        WaitUntil.waitUntil(this.crudViewTag, this.ptor);
        return this.crudViewTag.isPresent();
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
