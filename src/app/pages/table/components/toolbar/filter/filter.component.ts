import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  columnDefs: Record<string, any>[] = [];
  selected = '_';

  constructor(public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { columnDefs: Record<string, any>[], selected: string | null }) { }

  ngOnInit(): void {
    console.log(this.data);
    this.columnDefs = this.data.columnDefs;
    if (this.data.selected) {
      this.selected = this.data.selected;
    }
  }

}
