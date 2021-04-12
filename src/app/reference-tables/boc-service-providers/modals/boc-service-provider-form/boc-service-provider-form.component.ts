import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-boc-service-provider-form',
  templateUrl: './boc-service-provider-form.component.html',
  styleUrls: ['./boc-service-provider-form.component.css']
})
export class BocServiceProviderFormComponent implements OnInit {
  bocForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BocServiceProviderFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { recordData }
  ) { }

  ngOnInit(): void {
    this.bocForm = this.buildForm()
    if (this.data?.recordData) {
      this.populateForm(this.data.recordData.suffix)
    }
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({suffix: ['']});
  }

  populateForm(bocSuffix): void {
    this.bocForm.patchValue({suffix: bocSuffix});
  }

  get suffix() {
    return this.bocForm.get('suffix');
  }

  getSuffix() {
    return this.bocForm.get('suffix').value
  }
}
