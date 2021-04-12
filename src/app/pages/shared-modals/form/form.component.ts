import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  record;
  keyName: string;
  updateDb;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { updateDb, recordData }
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm()
    this.updateDb = this.data.updateDb
    if (this.data.recordData) {
      this.record = this.data.recordData
      this.keyName = Object.keys(this.data.recordData)[0]
      this.populateForm()
    }
  }

  buildForm(): FormGroup {
    const formField = {}
    formField[this.keyName] = ['']
    return this.formBuilder.group(formField);
  }

  populateForm(): void {
    this.form.patchValue(this.record);
  }

  handleSubmit() {
    if (this.record) {
      this.updateRecord()
    } else {
      this.createRecord()
    }
  }

  updateRecord() {
    const updatedRecord = this.form.value
    console.log(updatedRecord)
    // this.updateDb(id, updatedRecord)
  }

  createRecord() {
    const newRecord = this.form.getRawValue()
    this.updateDb(newRecord)
  }

  get formField() {
    return this.form.get(this.keyName);
  }

}
