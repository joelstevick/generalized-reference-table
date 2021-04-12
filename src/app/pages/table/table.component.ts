import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/config/config.interface';
import { PaginationService } from 'src/app/services/pagination.service';
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
  filterEnabled = true;

  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private paginationService: PaginationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      async (config: Config) => {
        // Passed to paginator
        this.loadPage = config.loadPage.bind(config)

        // filter enabled?
        if (typeof config.ui.filterEnabled !== 'undefined') {
          this.filterEnabled = config.ui.filterEnabled;
        }

        // Set up callbacks/components, depending on implementation
        this.setUpHandlers(config)
        // this.setUpSharedCrud(config)
        this.setUpIndividualCrud(config)

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
    this.formComponent = config.ui.modals.form
  }

  addButtonFields() {
    this.columnDefs.push({headerName: "Delete", field: 'delete'})
    this.columnDefs.push({headerName: "Edit", field: "edit"})
  }

  openForm() {
    this.dialog.open(this.formComponent).afterClosed().subscribe((data) => {
      this.createConfig.handler(data)
      this.paginationService.recordsUpdated.next()
    })
  }

  openModal(event) {
    const recordData = {}
    recordData[this.updateConfig.key] = event.data[this.updateConfig.key]
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      recordData,
    };

    if (event.colDef.field === "delete") {
      this.dialog.open(this.deleteComponent, dialogConfig).afterClosed().subscribe((data) => {
        if (data) {
          this.deleteConfig.handler(event.data.id)
          this.paginationService.recordsUpdated.next()
        }
      })
    } else if (event.colDef.field === "edit") {
      this.dialog.open(this.formComponent, dialogConfig).afterClosed().subscribe((data) => {
        if (data) {
          this.updateConfig.handler(event.data.id, data)
          this.paginationService.recordsUpdated.next()
        }
      })
    }
  }

  onFilterChanged(filter: Filter) {
    console.log(filter)
    this.filter = filter;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
