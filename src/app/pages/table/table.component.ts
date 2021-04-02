import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/config/config.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  columnDefs;
  rowData;
  pagination: boolean = true;
  load;

  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      async (config: Config) => {
        this.load = config.load.bind(config)
        this.columnDefs = typeof config.columnDefs === 'function' ? await config.columnDefs() : config.columnDefs;

        this.subscriptions.add(config.dataRecords$().subscribe(records => {
          this.rowData = records;
          this.changeDetectorRef.detectChanges()
        }));

        if (config?.pagination === false) {
          config.load({}, {}, {});
          this.pagination = false;
         }
      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
