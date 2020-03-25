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
}
