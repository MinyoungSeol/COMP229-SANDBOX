import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Incident } from 'src/app/model/Incident';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
}

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  private url = 'http://localhost:3201/api/get-incidents'

  constructor(private http: HttpClient) { }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.url);
  }
  
  // postIncident(data : Observable<Incident[]>) {
  //   return this.http.post<Incident[]>(`${this.url}/add`, data, httpOptions);
  // }

  postIncident(data : Incident){
    return this.http.post<Incident>(`${ this.url }/add`, data, httpOptions);
  }

  addIncident(incident: Incident): Observable<Incident> {
    let addIncidentUrl = this.http.post<Incident>(`${ this.url }/add`, incident, httpOptions)
    return addIncidentUrl
  }

  // addIncident(incident: Observable<Incident[]>) {
  //   let addIncidentUrl = this.http.post<Incident[]>(`${ this.url }/add`, incident, httpOptions)
  //   return addIncidentUrl
  // }

  deleteIncident(caseNo: number){
    return this.http.delete<any>(`${this.url}/delete/`+caseNo)
  }

  updateIncident(data:any, caseNo:number){
    return this.http.put<any>(`${this.url}/`+caseNo, data)
  }
}
