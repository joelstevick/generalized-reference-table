import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-omb-object-code-delete',
  templateUrl: './omb-object-code-delete.component.html',
  styleUrls: ['./omb-object-code-delete.component.css']
})
export class OmbObjectCodeDeleteComponent implements OnInit {
  code: string;

  constructor(
    public dialogRef: MatDialogRef<OmbObjectCodeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { recordData: string }
  ) { }

  ngOnInit(): void {
    this.code = this.data.recordData;
  }

}
