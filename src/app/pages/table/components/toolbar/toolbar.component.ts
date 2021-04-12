import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() buttons: any;
  @Input() columnDefs: Record<string, any>[];

  @Output() downloadClicked = new EventEmitter()

  constructor(
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }

  openFilterModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {columnDefs: this.columnDefs};

    this.dialog.open(FilterComponent, dialogConfig).afterClosed().subscribe((filter) => {
      console.log(filter)
      if (filter) {
        
      }
    })
  }

  openSortModal() {

  }
}
