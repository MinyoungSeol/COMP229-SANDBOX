import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Incident } from 'src/app/model/Incident';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() buttonName: string = 'ADD NEW RECORD'
  @Input() color: string = ''
  @Input() radius: string = ''
  @Input() padding: string = ''
  @Input() margin: string = ''
  @Output() btnClick = new EventEmitter()
  @Output() onAddIncident: EventEmitter<Incident> = new EventEmitter()
  @Input() incident!:Incident
  // @Output() onAddIncident: EventEmitter<Incident> = new EventEmitter()

  caseNo: number = 0
  category: string = ''
  created: string = ''
  updated: string = ''
  status: string = ''

  incidents: Incident[] = []
  

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick(){
    this.btnClick.emit()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    });
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

  // onSubmit(){
  //   const newIncident = {
  //     caseNo: this.caseNo,
  //     category: this.category,
  //     created: this.created,
  //     updated: this.updated,
  //     status: this.status
  //   }

  //   this.onAddIncident.emit(newIncident)

  //   this.caseNo = 0
  //   this.category = ''
  //   this.created = ''
  //   this.updated = ''
  //   this.status = ''  
  // }

}
