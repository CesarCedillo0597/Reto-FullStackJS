import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HisorialComponent } from './hisorial.component';

describe('HisorialComponent', () => {
  let component: HisorialComponent;
  let fixture: ComponentFixture<HisorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HisorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HisorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
