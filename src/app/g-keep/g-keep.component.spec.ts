import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GKeepComponent } from './g-keep.component';

describe('GKeepComponent', () => {
  let component: GKeepComponent;
  let fixture: ComponentFixture<GKeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GKeepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GKeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
