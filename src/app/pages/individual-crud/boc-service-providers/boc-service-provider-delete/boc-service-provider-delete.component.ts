import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-boc-service-provider-delete',
  templateUrl: './boc-service-provider-delete.component.html',
  styleUrls: ['./boc-service-provider-delete.component.css']
})
export class BocServiceProviderDeleteComponent implements OnInit {
  suffix: string;

  constructor(
    public dialogRef: MatDialogRef<BocServiceProviderDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { recordData: string }
  ) { }

  ngOnInit(): void {
    this.suffix = this.data.recordData;
  }

}
