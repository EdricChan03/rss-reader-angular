import { AppPage } from './app.po';

describe('RSS Reader app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show RSS Reader in the toolbar', async () => {
    page.navigateTo();
    expect(await page.getToolbarText()).toEqual('RSS Reader');
  });
});
