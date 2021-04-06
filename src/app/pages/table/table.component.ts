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
  createConfig;
  updateConfig;
  deleteConfig;
  downloadConfig;

  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      async (config: Config) => {
        this.loadPage = config.loadPage.bind(config)
        this.createConfig = config.ui.buttons.create
        this.updateConfig = config.ui.buttons.update
        this.deleteConfig = config.ui.buttons.delete
        this.downloadConfig = config.ui.buttons.download
        this.columnDefs = typeof config.columnDefs === 'function' ? await config.columnDefs() : config.columnDefs;
        this.columnDefs.push({headerName: "Delete", field: 'delete'})
        this.columnDefs.push({headerName: "Edit", field: "edit"})

        this.subscriptions.add(config.pageRecords$().subscribe(records => {
          let rows = records.map(record => {return {...record, edit: "EDIT", delete: "DELETE"}})
          this.rowData = rows; // copy data in order for change detection to work properly
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
    this.createConfig.handler(formData);
  }

  openModal(event) {
    const id = event.data.id
    if (event.colDef.field === "delete") {
      if (confirm(this.deleteConfig.label)) {
        this.deleteConfig.handler(id)
      }
    } else if (event.colDef.field === "edit") {
      const formData = prompt('Update', event.data[this.updateConfig.key])
      this.updateConfig.handler(id, formData);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
