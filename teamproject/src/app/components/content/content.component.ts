import { Component, OnInit, Input, Output } from '@angular/core';
import { IncidentsService } from 'src/app/services/api-incidents.service';
import { Incident } from 'src/app/model/Incident';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  incidents: Incident[] = []

  constructor(private incidentsService: IncidentsService) { }

  ngOnInit(): void {
    this.apiGetIncident()
  }

  apiGetIncident(){
    this.incidentsService.getIncidents().subscribe((incidents) =>{
      this.incidents = incidents
      console.log(`API call to /api/get-incidents returned ${this.incidents}`)
    }, (error) => {
      console.log(`Error: ${error}`);
      
    })
  }

  // deleteIncident(incident: Incident){
    
  //   this.incidentsService.deleteIncident(incident).subscribe(() =>{
  //     this.incidents = this.incidents.filter((i) => i.caseNo !== incident.caseNo)
  //     console.log(`API call to /api/delete returned ${ this.incidents }`)
  //   }, (error) => {
  //     console.log(`Error: ${ error }`)
  //   })
  // }

}
