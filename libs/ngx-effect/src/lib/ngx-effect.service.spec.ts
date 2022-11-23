import { TestBed } from '@angular/core/testing';
import { NgxEffect } from './ngx-effect.service';

describe(NgxEffect.name, () => {
  let service: NgxEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxEffect]
    });
    service = TestBed.inject(NgxEffect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
