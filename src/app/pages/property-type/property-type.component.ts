import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { IAPIResponseModel, IPropertType } from '../../model/master';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.scss'
})
export class PropertyTypeComponent implements OnInit {

  propertyTypeForm: FormGroup = new FormGroup({});
  GridData: IPropertType[] = [];
  masterService = inject(MasterService);
  isEditClicked: boolean = false;
  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getGridData();
  }

  getGridData() {
    this.masterService.getAllPropertyType().subscribe((res: IAPIResponseModel) => {
      this.GridData = res.data;
    })
  }
  initializeForm(item?: IPropertType) {
    this.propertyTypeForm = new FormGroup({
      propertTypeId: new FormControl<number>(item ? item.propertTypeId : 0),
      propertyType: new FormControl<string>(item ? item.propertyType : '', [Validators.required, Validators.minLength(3)]),
    })
  }

  onPropertySave() {
    let model = this.propertyTypeForm.value;
    this.masterService.AddPropertyType(model).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert('Property Added Successfully');
        this.getGridData();
        this.propertyTypeForm.reset();
      } else {
        alert(res.message);
      }
    })
  }

  onUpdatePropertySave() {
    this.masterService.UpdatePropertyType(this.propertyTypeForm.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        this.propertyTypeForm.reset();
        alert('Property Type Updated Succesfully');
        this.getGridData();
      } else {
        alert(res.message);
      }
    })
  }
  onEdit(item: IPropertType) {
    this.initializeForm(item);
  }
  onDelete(id: number) {
    const isDelete = confirm("Are you sure want to Delete?");
    if (isDelete) {
      this.masterService.DeletePropertyType(id).subscribe((res: IAPIResponseModel) => {
        if (res.result) {
          alert("Property Deleted Successfully");
          this.getGridData();
        } else {
          alert(res.message);
        }
      })
    }
  }
}
