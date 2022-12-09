import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncidentsService } from 'src/app/services/api-incidents.service';
import { Incident } from 'src/app/model/Incident';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() incident!:Incident
  @Output() onAddIncident: EventEmitter<Incident> = new EventEmitter()

  caseNo: number = 0
  category: string = ''
  created: string = ''
  updated: string = ''
  status: string = ''

  incidents: Incident[] = []
  incidentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: IncidentsService) { }

  ngOnInit(): void {
    this.incidentForm = this.formBuilder.group({
      caseNo: ['', Validators.required],
      category: ['', Validators.required],
      created: ['', Validators.required],
      updated: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  onSubmit(){
    const newIncident = {
      caseNo: this.caseNo,
      category: this.category,
      created: this.created,
      updated: this.updated,
      status: this.status
    }

    this.onAddIncident.emit(newIncident)

    this.caseNo = 0
    this.category = ''
    this.created = ''
    this.updated = ''
    this.status = ''  
  }

  addIncident(incident: Incident) {
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

    this.api.addIncident(incident).subscribe((incident) => {
      this.incidents.push(incident)
      //this.api.postIncident(this.incidentForm.value)
      console.log(`API call to /api/add returned `)
    }, (error) => {
      console.log(`Error: ${ error }`)
    })

    // this.api.postIncident(this.incidentForm.value)
    // alert("Incident record added successfully!")

    }
  }


