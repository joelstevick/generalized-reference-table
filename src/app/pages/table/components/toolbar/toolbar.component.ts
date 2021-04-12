import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() buttons: any;
  @Output() downloadClicked = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  openFilterModal() {
    
  }

  openSortModal() {
    
  }
}
