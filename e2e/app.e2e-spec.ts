import { CreatorsSearchPage } from './app.po';

describe('creators-search App', () => {
  let page: CreatorsSearchPage;

  beforeEach(() => {
    page = new CreatorsSearchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
