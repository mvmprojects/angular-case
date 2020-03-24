import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('case-app app is running!');
  // });

  it('should have access to input field of app-search-bar', () => {
    page.navigateTo();
    expect(element(by.css('app-search-bar input')).isPresent());
  });  

  it('should enter the letter \'e\' and choose first option', () => {
    page.selectArtistInDropdown();
  } );

  it('should be able to click first album in the list', () => {
    page.selectAlbum();
  } );  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
