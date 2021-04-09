import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
  deleteComponent;

  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      async (config: Config) => {
        // Passed to paginator
        this.loadPage = config.loadPage.bind(config)

        // Set up callbacks/components, depending on implementation
        this.setUpSharedCrud(config)
        this.setUpIndividualCrud(config)

        // Set column definitions
        this.columnDefs = config.columnDefs;
        this.addButtonFields()

        // Set row data
        this.subscriptions.add(config.pageRecords$().subscribe(records => {
          let rows = records.map(record => {return {...record, edit: "EDIT", delete: "DELETE"}})
          this.rowData = rows; // copy data in order for change detection to work properly
        }));

        // For ref areas that don't have pagination
        if (config?.pagination === false) {
          config.loadPage({ start: 0, end: 10 }, {}, {});
          this.pagination = false;
        }
      }
    )
  }

  setUpSharedCrud(config) {
    this.createConfig = config.ui.buttons.create
    this.updateConfig = config.ui.buttons.update
    this.deleteConfig = config.ui.buttons.delete
    this.downloadConfig = config.ui.buttons.download
  }

  setUpIndividualCrud(config) {
    this.deleteComponent = config.ui.modals.delete
  }

  addButtonFields() {
    this.columnDefs.push({headerName: "Delete", field: 'delete'})
    this.columnDefs.push({headerName: "Edit", field: "edit"})
  }

  openSharedForm() {
    const formData = prompt('Enter data')
    this.createConfig.handler(formData);
  }

  openSharedModal(event) {
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

  openIndividualModal(event) {
    const recordData = event.data[this.updateConfig.key]
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      recordData,
    };

    if (event.colDef.field === "delete") {
      this.dialog.open(this.deleteComponent, dialogConfig)
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
