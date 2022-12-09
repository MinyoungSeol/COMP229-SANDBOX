import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incident } from 'src/app/model/Incident';
import { INCIDENTS } from 'mock.incidents';
import { IncidentsService } from 'src/app/services/api-incidents.service';

import { DatePipe } from '@angular/common';

@Component({

  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  @Input() incident!: Incident
  @Output() onDeleteIncident: EventEmitter<Incident> = new EventEmitter()


  incidents: Incident[] = [] //INCIDENTS
  

  constructor(private incidentsService: IncidentsService) { }

  ngOnInit(): void {
    this.incidentsService.getIncidents().subscribe((incidents) => this.incidents = incidents)
  }

  onDelete(incident: Incident){
    this.onDeleteIncident.emit(incident)
  }

  deleteIncident(incident: Incident){
    this.incidentsService.deleteIncident(incident).subscribe(() =>{
      this.incidents = this.incidents.filter((i) => i.caseNo !== incident.caseNo)
      console.log(`API call to /api/delete returned ${ this.incident }`)
    }, (error) => {
      console.log(`Error: ${ error }`)
    })
  }



}
