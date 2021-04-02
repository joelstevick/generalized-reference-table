import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Config } from 'src/app/config/config.interface';
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
      async (config: Config) => {
        this.rowData = this.dataService.readall(config.readAll);
        this.columnDefs = typeof config.columnDefs === 'function' ? await config.columnDefs() : config.columnDefs;
      }
    )
  }

}
