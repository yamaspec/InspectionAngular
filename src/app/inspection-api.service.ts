import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionAPIUrl = "https://localhost:44339/api";

  constructor(private http:HttpClient) { }

  //Inspections

  getInspectionList():Observable<any[]> {
    return this.http.get<any>(this.inspectionAPIUrl + '/inspections');
  }

  getInspection(id:number|string) {
    return this.http.get(this.inspectionAPIUrl + `/inspections/${id}`);
  }

  addInspection(data:any) {
    return this.http.post(this.inspectionAPIUrl + '/inspections', data);
  }

  updateInspection(id:number|string, data:any) {
    return this.http.put(this.inspectionAPIUrl + `/inspections/${id}`, data);
  }

  deleteInspection(id:number|string) {
    return this.http.delete(this.inspectionAPIUrl + `/inspections/${id}`);
  }

  // Inspection Types

  getInspectionTypeList():Observable<any[]> {
    return this.http.get<any>(this.inspectionAPIUrl + '/inspectionTypes');
  }

  getInspectionType(id:number|string) {
    return this.http.get(this.inspectionAPIUrl + `/inspectionTypes/${id}`);
  }

  addInspectionType(data:any) {
    return this.http.post(this.inspectionAPIUrl + '/inspectionTypes', data);
  }

  updateInspectionType(id:number|string, data:any) {
    return this.http.put(this.inspectionAPIUrl + `/inspectionTypes/${id}`, data);
  }

  deleteInspectionType(id:number|string) {
    return this.http.delete(this.inspectionAPIUrl + `/inspectionTypes/${id}`);
  }

  // Statuses

  getStatusList():Observable<any[]> {
    return this.http.get<any>(this.inspectionAPIUrl + '/Status');
  }

  getStatus(id:number|string) {
    return this.http.get(this.inspectionAPIUrl + `/Status/${id}`);
  }

  addStatus(data:any) {
    return this.http.post(this.inspectionAPIUrl + '/Status', data);
  }

  updateStatus(id:number|string, data:any) {
    return this.http.put(this.inspectionAPIUrl + `/Status/${id}`, data);
  }

  deleteStatus(id:number|string) {
    return this.http.delete(this.inspectionAPIUrl + `/Status/${id}`);
  }



}
