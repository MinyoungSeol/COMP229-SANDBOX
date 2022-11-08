import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() buttonName: string = 'ADD NEW RECORD'
  @Input() color: string = ''
  @Input() radius: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
