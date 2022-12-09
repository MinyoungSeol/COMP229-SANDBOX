import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/model/Incident';
import { INCIDENTS } from 'mock.incidents';
import { IncidentsService } from 'src/app/services/api-incidents.service';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  incidents: Incident[] = [] //INCIDENTS

  constructor(private incidentsService: IncidentsService) { }

  ngOnInit(): void {
    this.incidentsService.getIncidents().subscribe((incidents) => this.incidents = incidents)
  }

}
