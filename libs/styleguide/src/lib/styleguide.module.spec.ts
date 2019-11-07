import { async, TestBed } from '@angular/core/testing';
import { StyleguideModule } from './styleguide.module';

describe('StyleguideModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StyleguideModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StyleguideModule).toBeDefined();
  });
});
