import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/config/config.interface';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  columnDefs;
  rowData;

  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataServiceService
  ) { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ngOnInit() {
    this.route.data.subscribe(
      async (config: Config) => {
        this.subscriptions.add(config.dataRecords$().subscribe(records => {
          this.rowData = records;
        }));

        this.columnDefs = typeof config.columnDefs === 'function' ? await config.columnDefs() : config.columnDefs;

        config.load({}, {}, {});
      }
    )
  }

}
