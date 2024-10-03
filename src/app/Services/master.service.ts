import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponseModel, IModalSiteProperty, IPropertType, ISite, Site } from '../model/master';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getAllPropertyType(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyType');
  }

  AddPropertyType(propertyObj: IPropertType): Observable<IAPIResponseModel> {
    let propObj = [propertyObj];
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyType', propObj);
  }

  UpdatePropertyType(propertyObj: IPropertType): Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdatePropertyType', propertyObj);
  }

  DeletePropertyType(propertyId: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(`${environment.API_URL}DeletePropertyTypeById?id=${propertyId}`);
  }

  AddSites(siteData: ISite): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddSites', siteData);
  }

  getAllSites(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllSites');
  }

  UpdateSite(siteObj: Site): Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdateSites', siteObj);
  }

  DeleteSite(siteId: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(`${environment.API_URL}DeleteSitesById?id=${siteId}`);
  }

  addPropertyMasters(obj: Site): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyMasters', obj);
  }

  getAllPropertyBySiteId(siteId: number): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(`${environment.API_URL}GetAllPropertyBySiteId?siteid=${siteId}`);
  }

  UpdatePropertyMasters(propertyMasterObj: IModalSiteProperty): Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdatePropertyMasters', propertyMasterObj);
  }

  DeletePropertyMasters(propertyMasterId: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(`${environment.API_URL}DeletePropertyMasterById?propertyId=${propertyMasterId}`);
  }

  onSaveBooking(obj: Site): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyBooking', obj);
  }

  getAllPropertyBookingBySiteId(siteId: number): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(`${environment.API_URL}GetAllPropertyBookingBySiteId?siteid=${siteId}`);
  }
}
