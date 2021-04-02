import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() load: any;
  start: number = 0;
  end: number = 10;

  constructor() { }

  ngOnInit(): void {
    this.loadData()
  }

  nextPage() {
    this.start += 10;
    this.end += 10
    this.loadData()
  }

  previousPage() {
    this.start -= 10;
    this.end -= 10
    this.loadData()
  }

  loadData() {
    this.load({start: this.start, end: this.end}, {}, {})
  }

}
