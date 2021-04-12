import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Filter {
  field: string;
  value: string
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  filter = '_';
 
  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { columnDefs: Record<string, any>[], filter: Filter | null }) { }

  ngOnInit(): void {
    if (this.data.filter) {
      this.filter = this.data.filter.field;
    }
  }

}
