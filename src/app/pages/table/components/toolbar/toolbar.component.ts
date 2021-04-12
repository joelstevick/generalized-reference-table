import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Filter, FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() buttons: any;
  @Input() columnDefs: Record<string, any>[];
  @Input() filterEnabled = true;

  @Output() downloadClicked = new EventEmitter();
  @Output() filterChanged = new EventEmitter<Filter>();

  filter: Filter | null = null;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openFilterModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      columnDefs: this.columnDefs,
      filter: this.filter,
    };
    dialogConfig.disableClose = true;
    this.dialog.open(FilterComponent, dialogConfig).afterClosed().subscribe((filter) => {
      if (filter !== undefined) {
        this.filter = filter;

        this.filterChanged.emit(this.filter);
      }
    })
  }

  openSortModal() {

  }
}
