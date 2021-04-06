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
  loadPage;
  addUpdateConfig;

  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      async (config: Config) => {
        this.loadPage = config.loadPage.bind(config)
        this.addUpdateConfig = config.ui.buttons.createUpdate
        this.columnDefs = typeof config.columnDefs === 'function' ? await config.columnDefs() : config.columnDefs;

        this.subscriptions.add(config.pageRecords$().subscribe(records => {
          this.rowData = [...records]; // copy data in order for change detection to work properly
        }));

        if (config?.pagination === false) {
          config.loadPage({ start: 0, end: 10 }, {}, {});
          this.pagination = false;
        }
      }
    )
  }

  handleAddClick() {
    const formData = prompt('Enter data')
    this.addUpdateConfig.handler(formData);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
