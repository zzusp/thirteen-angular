import { RentalModule } from './rental.module';

describe('RentalModule', () => {
  let rentalModule: RentalModule;

  beforeEach(() => {
    rentalModule = new RentalModule();
  });

  it('should create an instance', () => {
    expect(rentalModule).toBeTruthy();
  });
});
