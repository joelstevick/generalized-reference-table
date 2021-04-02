import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  columnDefs;
  rowData;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataServiceService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        if (data['table'] === "omb-object-codes") {
          this.rowData = this.dataService.ombObjectCodes()
          this.columnDefs = Object.keys(this.dataService.ombObjectCodes()[0]).map(field => {
            return {headerName: field, field: field}
          })
        } else {
          this.rowData = this.dataService.bocServiceProviders()
          this.columnDefs = Object.keys(this.dataService.bocServiceProviders()[0]).map(field => {
            return {headerName: field, field: field}
          })
        }
      }
    )
  }

}
