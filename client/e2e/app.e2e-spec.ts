import { MovieHunterPage } from './app.po';

describe('MovieHunterPage App', function() {
  let page: MovieHunterPage;

  beforeEach(() => {
    page = new MovieHunterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
