import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  incidentForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.incidentForm = this.formBuilder.group({
      caseNo: ['', Validators.required],
      category: ['', Validators.required],
      created: ['', Validators.required],
      updated: ['', Validators.required],
      status: ['', Validators.required]
    })
  }
  addIncident() {
    console.log(this.incidentForm.value);
  }

}
