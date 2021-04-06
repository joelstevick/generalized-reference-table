import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.css']
})
export class TableToolbarComponent implements OnInit {
  @Input() buttons: any;
  @Output() downloadClicked = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
