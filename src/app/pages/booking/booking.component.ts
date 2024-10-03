import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponseModel, IModalSiteProperty, Site } from '../../model/master';
import { MasterService } from '../../Services/master.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  sites$: Observable<Site[]> = new Observable<Site[]>
  siteId: number = 0;
  masterSrv = inject(MasterService);
  propertyList: IModalSiteProperty[] = [];
  bookingList: any[] = [];
  bookingDetailForm: FormGroup = new FormGroup({});
  currentPropertyId: number = 0;
  constructor() {
    this.initializeForm();
    this.getAllSites();
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.bookingDetailForm = new FormGroup({
      "bookingId": new FormControl(0),
      "propertyId": new FormControl(this.currentPropertyId),
      "bookindDate": new FormControl(''),
      "bookingRate": new FormControl(0),
      "totalAmont": new FormControl(0),
      "custId": new FormControl(0),
      "name": new FormControl(''),
      "mobile": new FormControl(''),
      "emailid": new FormControl(''),
      "address": new FormControl('')
    })
  }

  getAllSites() {
    this.getBookingBySiteId();
    this.sites$ = this.masterSrv.getAllSites().pipe(map((res: IAPIResponseModel) => {
      return res.data
    })
    )
  }

  onSiteIdChange(event: any) {
    if (event) {
      const id = event.target?.['value'];
      this.siteId = id;
      this.masterSrv.getAllPropertyBySiteId(id).subscribe((res: IAPIResponseModel) => {
        if (res.result) {
          this.propertyList = res.data;
        } else {
          alert(res.message);
        }
      })
    }
  }
  getBookingBySiteId() {
    this.masterSrv.getAllPropertyBookingBySiteId((this.siteId)).subscribe((res: IAPIResponseModel) => {
      this.bookingList = res.data;
    })
  }
  openModal(data: IModalSiteProperty) {
    this.currentPropertyId = data.propertyId;
    const modal = document.getElementById('bookingModal');
    this.initializeForm();
    if (modal) {
      modal.style.display = 'block';
    }
  }

  onCloseModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onModalBookingPropertySave() {
    this.masterSrv.onSaveBooking(this.bookingDetailForm.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("Property Booking Details Saved Successfully");
        this, this.getBookingBySiteId();
      } else {
        alert(res.message);
      }
    })
  }

  checkIfPropertyAvailable(propertyId: number) {
    const record = this.bookingList.find(m => m.propertyId == propertyId);
    if (record != undefined) {
      return record
    } else {
      return null;
    }
  }
}
