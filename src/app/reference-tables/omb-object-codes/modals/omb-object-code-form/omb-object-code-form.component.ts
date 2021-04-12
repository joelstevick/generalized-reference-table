import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-omb-object-code-form',
  templateUrl: './omb-object-code-form.component.html',
  styleUrls: ['./omb-object-code-form.component.css']
})
export class OmbObjectCodeFormComponent implements OnInit {
  ombForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OmbObjectCodeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { recordData }
  ) { }

  ngOnInit(): void {
    this.ombForm = this.buildForm()
    if (this.data?.recordData) {
      this.populateForm(this.data.recordData.code)
    }
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({code: ['']});
  }

  populateForm(ombCode): void {
    this.ombForm.patchValue({code: ombCode});
  }

  get code() {
    return this.ombForm.get('code');
  }

  getCode() {
    return this.ombForm.get('code').value
  }
}
