import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditAddressComponent } from './modal-edit-address.component';

describe('ModalEditAddressComponent', () => {
  let component: ModalEditAddressComponent;
  let fixture: ComponentFixture<ModalEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
