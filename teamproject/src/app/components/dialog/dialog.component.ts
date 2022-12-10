import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncidentsService } from 'src/app/services/api-incidents.service';
import { Incident } from 'src/app/model/Incident';
import { outputAst } from '@angular/compiler';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DatePipe } from '@angular/common'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() incident!:Incident
  @Output() onAddIncident: EventEmitter<Incident> = new EventEmitter()

  // caseNo: number = 0
  // category: string = ''
  // created: string = ''
  // updated: string = ''
  // status: string = ''

  incidents: Incident[] = []
  incidentForm!: FormGroup;
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder, 
              private api: IncidentsService, 
              private datePipe: DatePipe,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    var medium = this.datePipe.transform(new Date(),"MMM d, y");
    console.log(medium); //output - Feb 14, 2019, 3:45:06 PM

    this.incidentForm = this.formBuilder.group({
      caseNo: ['', Validators.required],
      category: ['', Validators.required],
      created: ['', Validators.required],
      updated: ['', Validators.requiredTrue],
      status: ['', Validators.required]
    });

    // console.log(this.editData);

    if(this.editData){
      this.actionBtn = "Update"
      this.incidentForm.controls['caseNo'].setValue(this.editData.caseNo);
      this.incidentForm.controls['category'].setValue(this.editData.category);
      this.incidentForm.controls['created'].setValue(this.editData.created);
      this.incidentForm.controls['updated'].setValue(this.editData.updated);
      this.incidentForm.controls['status'].setValue(this.editData.status);
    }
    
  }

  

  addIncident2(){

      if(!this.editData){
        this.api.postIncident(this.incidentForm.value)
      .subscribe({
        next:(res) =>{
          alert("Incident record added successfully!")
          this.incidentForm.reset();
          this.dialogRef.close('save');
          window.location.reload();
        }
      })
      } else{
        this.updateIncident()
      }
  }
  updateIncident(){
    this.api.updateIncident(this.incidentForm.value, this.editData.caseNo)
    .subscribe({
      next:(res)=>{
        alert("Record Updated Successfully!");
        this.incidentForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
  }

  onSubmit(){
    

    // this.onAddIncident.emit(newIncident)

    // this.caseNo = 0
    // this.category = ''
    // this.created = ''
    // this.updated = ''
    // this.status = ''  
  }

  // makeId(length: number): string {
  //   var result=''
  //   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   var charsLength = chars.length;
  //   for (var i = 0; i < length; i++) {
  //     result += chars.charAt(Math.floor(Math.random() * charsLength));
  //   }
  //   return result;
  // }

  addIncident(incident: Incident) {

    //   incident = {
    //   caseNo: this.caseNo,
    //   category: this.category,
    //   created: this.created,
    //   updated: this.updated,
    //   status: this.status
    // }

    incident = this.incidentForm.value;
    

    //this.datePipe.transform(this.incident.created,"dd-MM-yyyy");


    this.api.addIncident(incident).subscribe((incident) => {
      this.incidents.push(incident)
      //this.api.postIncident(this.incidentForm.value)
      console.log(`API call to /api/add returned `)
      alert("New Record Created!")
      this.incidentForm.reset();
      this.dialogRef.close();
      window.location.reload();
    }, (error) => {
      console.log(`Error: ${ error }`)
    })

//console.log(this.incidentForm.value);

    // if(this.incidentForm.valid){
    //   this.api.postIncident(this.incidentForm.value)
    //   .subscribe({
    //     next:(res) =>{
    //       alert("Incident record added successfully!")
    //     },
    //     error:()=>{
    //       alert("Error while adding the record")
    //       console.error();
    //     }
    //   })
    // }
    // this.api.postIncident(this.incidentForm.value)
    // alert("Incident record added successfully!")

    }
  }


