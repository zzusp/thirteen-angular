import { LayoutModule } from './@layout.module';

describe('@layoutModule', () => {
  let layoutModule: LayoutModule;

  beforeEach(() => {
    layoutModule = new LayoutModule();
  });

  it('should create an instance', () => {
    expect(LayoutModule).toBeTruthy();
  });
});
