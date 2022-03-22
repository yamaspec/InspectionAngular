import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {

  @Input() inspection:any;
  inspectionList$!:Observable<any[]>;
  inspectionTypeList$!:Observable<any[]>;
  statusList$!:Observable<any[]>;

  id:number=0;
  status:string="";
  comments:string="";
  inspectionTypeId!:number;
  // inspectionName!:string;

  constructor(private service:InspectionApiService) { }


  ngOnInit(): void {
    this.id               = this.inspection.id;
    this.status           = this.inspection.status;
    this.comments         = this.inspection.comments;
    this.inspectionTypeId = this.inspection.inspectionTypeId;
    // this.inspectionName   = this.inspectionName;

    this.inspectionList$      = this.service.getInspectionList();
    this.inspectionTypeList$  = this.service.getInspectionTypeList();
    this.statusList$          = this.service.getStatusList();
  }

  addInspection() {
    var inspection = {
      status:this.status,
      comments:this.comments,
      inspectionTypeId:this.inspectionTypeId
    }
      // Close component if save all changes successfully.
    this.service.addInspection(inspection).subscribe(success => {
        var closeMOdalButton = document.getElementById('add-edit-modal-close');
      if(closeMOdalButton) {
        closeMOdalButton.click();
      }
      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      }, 4000);
    });
  }

  updateInspection() {
    var inspection = {
      id:this.id,
      status:this.status,
      comments:this.comments,
      inspectionTypeId:this.inspectionTypeId
    }
    var id:number = this.id;
    this.service.updateInspection(id, inspection).subscribe(success => {
      // Close component if save all changes successfully.
      var closeMOdalButton = document.getElementById('update-edit-modal-close');
      if(closeMOdalButton) {
        closeMOdalButton.click();
      }
      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 4000);
    });
  }



}
