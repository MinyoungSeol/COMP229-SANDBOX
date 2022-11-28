import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Incident } from 'Incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  private url = 'http://localhost:3201/api/get-incidents'

  constructor(private http: HttpClient) { }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.url);
  }
}
