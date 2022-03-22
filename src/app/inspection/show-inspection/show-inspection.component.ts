import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';


@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypeList$!:Observable<any[]>;
  inspectionTypeList:any = [];
  modalTitle:string = '';
  activateAddEditInspectionComponent:boolean = false;
  inspection:any;

  // Map to display data associated with FKs
  inspectionTypesMap:Map<number, string> = new Map();

  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$     = this.service.getInspectionList();
    this.inspectionTypeList$ = this.service.getInspectionTypeList();
    this.refreshInspectionTypesMap();
  }

  refreshInspectionTypesMap() {
    this.service.getInspectionTypeList().subscribe(data => {
      this.inspectionTypeList = data;

      for(let i = 0; this.inspectionTypeList.length; i++)
      {
        this.inspectionTypesMap.set(this.inspectionTypeList[i].id, this.inspectionTypeList[i].inspectionName);
      }
    });
  }

  modalAdd() {
    this.inspection = {
      id:0,
      status:null,
      comments:null,
      inspectionTypeId:null
    }
    this.modalTitle = "Add a new Inspection";
    this.activateAddEditInspectionComponent = true;
  }

  modalUpdate(updateInspection:any) {
    this.inspection = updateInspection;
    this.modalTitle = "Update an Inspection";
    this.activateAddEditInspectionComponent = true;
  }

  deleteInspection(deleteInspection:any) {
    if(confirm(`Please confirm to delete inspection: ${this.inspectionTypesMap.get(deleteInspection.inspectionTypeId)} - ${deleteInspection.status}`)) {
      this.service.deleteInspection(deleteInspection.id).subscribe(success => {
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.inspectionList$ = this.service.getInspectionList();
      })
    }
  }

  modalClose() {
    this.activateAddEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionList();
  }

}
