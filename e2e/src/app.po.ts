import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  selectArtistInDropdown() {
    element(by.css('app-search-bar input')).sendKeys('e');
    browser.sleep(1000);
    browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();    
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }  

  selectAlbum() {
    element(by.css('app-album-list mat-list-item')).click();
  }

  useAddButton() {
    element(by.css('app-track-list .addbutton')).click();
    element(by.css('app-add-track .testNameinput')).sendKeys('t');
    element(by.css('app-add-track .testMinutesinput')).sendKeys('1');
    element(by.css('app-add-track .testSecondsinput')).sendKeys('1');
    element(by.css('app-add-track .testConfirm')).click();
  }  

  useEditButton() {
    element(by.css('app-track-list .editbutton')).click();
    element(by.css('app-edit-track .testNameinput')).sendKeys('t');
    element(by.css('app-edit-track .testMinutesinput')).clear();    
    element(by.css('app-edit-track .testMinutesinput')).sendKeys('1');
    element(by.css('app-edit-track .testSecondsinput')).clear();    
    element(by.css('app-edit-track .testSecondsinput')).sendKeys('1');
    element(by.css('app-edit-track .testConfirm')).click();
  }    

  useDeleteButton() {
    element(by.css('app-track-list .deletebutton')).click();
  }      
}
