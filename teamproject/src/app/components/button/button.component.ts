import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick() {
    this.btnClick.emit()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    });
  }

}