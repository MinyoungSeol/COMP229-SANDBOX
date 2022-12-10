import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IncidentsService } from 'src/app/services/api-incidents.service';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-incident-table',
  templateUrl: './incident-table.component.html',
  styleUrls: ['./incident-table.component.css']
})
export class IncidentTableComponent implements OnInit {

  displayedColumns: string[] = ['caseNo', 'category', 'created', 'updated', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api: IncidentsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllIncidents()
  }

  getAllIncidents(){
    this.api.getIncidents()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while fetching the Records")
      }
    })
  }

  editIncident(row: any){
    this.dialog.open(DialogComponent,{
      width: '40%', minWidth: '500px',
      data: row
    })
  }

  deleteIncident(caseNo: number){
    this.api.deleteIncident(caseNo)
    .subscribe({
      next:(res)=>{
        alert("Record Deleted Successfully!")
        this.getAllIncidents();
      },
      error:()=>{
        alert("Error while deleting")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


