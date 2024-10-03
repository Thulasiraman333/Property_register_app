import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAPIResponseModel, IModalSiteProperty, IPropertType, Site } from '../../model/master';
import { MasterService } from '../../Services/master.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent {

  isFormView = signal<boolean>(false);
  masterService = inject(MasterService);
  propertyData$: Observable<IPropertType[]> = new Observable<IPropertType[]>;
  siteDetailsForm: Site = new Site();
  SiteGridData: Site[] = [];
  currentSiteId: any;
  modalPropertyForm: FormGroup = new FormGroup({});
  modalPropertyGridData: IModalSiteProperty[] = [];
  @ViewChild('PropertyModal') modal: ElementRef | undefined;

  constructor() {
    this.propertyData$ = this.masterService.getAllPropertyType().pipe(map((item: IAPIResponseModel) => {
      return item.data;
    })
    )
  }

  ngOnInit() {
    this.getAllSites();
    this.initializeForm();
  }

  initializeForm(item?: IModalSiteProperty) {
    this.modalPropertyForm = new FormGroup({
      propertyId: new FormControl<number>(item ? item.propertyId : 0),
      propertyNo: new FormControl<number>(item ? item.propertyNo : 0),
      facing: new FormControl<string>(item ? item.facing : ''),
      totalArea: new FormControl<string>(item ? item.totalArea : ''),
      rate: new FormControl<number>(item ? item.rate : 0),
      siteId: new FormControl<number>(this.currentSiteId)
    })
  }

  toggleView() {
    this.isFormView.set(!this.isFormView());
  }

  getAllSites() {
    this.masterService.getAllSites().subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        this.SiteGridData = res.data;
      } else {
        alert(res.message);
      }
    })
  }

  onSiteSave() {
    this.masterService.AddSites(this.siteDetailsForm).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert('Site Created Successfully');
        this.getAllSites();
        this.toggleView();
      } else {
        alert(res.message);
      }
    })
  }

  onSiteEdit(item: Site) {
    this.siteDetailsForm = item;
    this.toggleView();
  }

  onSiteUpdate() {
    this.masterService.UpdateSite(this.siteDetailsForm).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert('Site Updated Succesfully');
        this.getAllSites();
        this.toggleView();
      } else {
        alert(res.message);
      }
    })
  }

  onSiteDelete(item: Site) {
    const isDelete = confirm("Are you sure want to Delete?");
    if (isDelete) {
      this.masterService.DeleteSite(item.siteId).subscribe((res: IAPIResponseModel) => {
        if (res.result) {
          alert("Site Deleted Successfully");
          this.getAllSites();
        } else {
          alert(res.message);
        }
      })
    }
  }

  openModal(item: Site) {
    this.currentSiteId = item.siteId;
    this.initializeForm();
    this.getAllPropertiesBySiteId(this.currentSiteId);
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block';
    }
  }

  onCloseModal() {
    if (this.modal)
      this.modal.nativeElement.style.display = 'none';
  }

  onModalPropertyEdit(item: IModalSiteProperty) {
    this.initializeForm(item);
  }

  onModalPropertyDelete(item: IModalSiteProperty) {
    const isDelete = confirm("Are you sure want to Delete?");
    if (isDelete) {
      this.masterService.DeletePropertyMasters(item.propertyId).subscribe((res: IAPIResponseModel) => {
        if (res.result) {
          alert("Property Master Deleted Successfully");
          this.getAllPropertiesBySiteId(this.currentSiteId);
        } else {
          alert(res.message);
        }
      })
    }
  }

  onModalPropertyUpdate() {
    this.masterService.UpdatePropertyMasters(this.modalPropertyForm.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert('Property Masters Updated Succesfully');
        this.getAllPropertiesBySiteId(this.currentSiteId);
        this.modalPropertyForm.reset();
        this.initializeForm();
      } else {
        alert(res.message);
      }
    })
  }

  onModalPropertySave() {
    this.masterService.addPropertyMasters(this.modalPropertyForm.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert('Property Details Saved Successfully');
        this.getAllPropertiesBySiteId(this.currentSiteId);
        this.modalPropertyForm.reset();
      } else {
        alert(res.message);
      }
    })
  }

  getAllPropertiesBySiteId(id: number) {
    this.masterService.getAllPropertyBySiteId(id).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        this.modalPropertyGridData = res.data.filter((m: any) => m.siteId == this.currentSiteId);
      } else {
        alert(res.message);
      }
    })
  }

}