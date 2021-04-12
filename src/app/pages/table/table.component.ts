import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/config/config.interface';
import { DeleteComponent } from '../shared-modals/delete/delete.component'
import { FormComponent } from '../shared-modals/form/form.component';
import { Filter } from './components/toolbar/filter/filter.component';

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
  filter: Filter;
  deleteComponent;
  formComponent;

  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      async (config: Config) => {
        // Passed to paginator
        this.loadPage = config.loadPage.bind(config)

        // Set up callbacks/components, depending on implementation
        this.setUpHandlers(config)
        this.setUpSharedCrud(config)
        // this.setUpIndividualCrud(config)

        // Set column definitions
        this.columnDefs = config.columnDefs;
        this.addButtonFields()

        // Set row data
        this.subscriptions.add(config.pageRecords$().subscribe(records => {
          let rows = records.map(record => {return {...record, edit: "EDIT", delete: "DELETE"}})
          this.rowData = rows; // copy data in order for change detection to work properly
          this.changeDetectorRef.detectChanges()
        }));

        // For ref areas that don't have pagination
        if (config?.pagination === false) {
          config.loadPage({ start: 0, end: 10 }, {}, {});
          this.pagination = false;
        }
      }
    )
  }

  setUpHandlers(config) {
    this.createConfig = config.ui.buttons.create
    this.updateConfig = config.ui.buttons.update
    this.deleteConfig = config.ui.buttons.delete
    this.downloadConfig = config.ui.buttons.download
  }

  setUpSharedCrud(config) {
    this.deleteComponent = DeleteComponent
    this.formComponent = FormComponent
  }

  setUpIndividualCrud(config) {
    this.deleteComponent = config.ui.modals.delete
  }

  addButtonFields() {
    this.columnDefs.push({headerName: "Delete", field: 'delete'})
    this.columnDefs.push({headerName: "Edit", field: "edit"})
  }

  openForm() {
    // const formData = prompt('Enter data')
    // this.createConfig.handler(formData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      addRecord: this.createConfig.handler
    };

    this.dialog.open(this.formComponent, dialogConfig)
  }

  // openSharedModal(event) {
  //   const id = event.data.id
  //   if (event.colDef.field === "delete") {
  //     if (confirm(this.deleteConfig.label)) {
  //       this.deleteConfig.handler(id)
  //     }
  //   } else if (event.colDef.field === "edit") {
  //     const formData = prompt('Update', event.data[this.updateConfig.key])
  //     this.updateConfig.handler(id, formData);
  //   }
  // }

  openModal(event) {
    const recordData = {}
    recordData[this.updateConfig.key] = event.data[this.updateConfig.key]
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      recordData,
    };

    if (event.colDef.field === "delete") {
      this.dialog.open(this.deleteComponent, dialogConfig).afterClosed().subscribe((data) => {
        console.log(data)
        if (data) {
          this.deleteConfig.handler(event.data.id)
        }
      })
    } else if (event.colDef.field === "edit") {
      this.dialog.open(this.formComponent, dialogConfig)
    }
  }

  onFilterChanged(filter: Filter) {

    this.filter = filter;

  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
