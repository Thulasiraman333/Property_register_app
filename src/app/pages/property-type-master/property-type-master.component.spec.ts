import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeMasterComponent } from './property-type-master.component';

describe('PropertyTypeMasterComponent', () => {
  let component: PropertyTypeMasterComponent;
  let fixture: ComponentFixture<PropertyTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyTypeMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
