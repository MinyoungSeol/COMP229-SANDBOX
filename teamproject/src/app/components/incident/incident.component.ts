import { Component, OnInit } from '@angular/core';
import { Incident } from 'Incident';
import { INCIDENTS } from 'mock.incidents';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  incidents: Incident[] = INCIDENTS

  constructor() { }

  ngOnInit(): void {
  }

}
