import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() loadPage: any;
  start: number = 0;
  end: number = 10;

  constructor() { }

  ngOnInit(): void {
    this.loadCurrentPage()
  }

  nextPage() {
    this.start += 10;
    this.end += 10
    this.loadCurrentPage()
  }

  previousPage() {
    this.start -= 10;
    this.end -= 10
    this.loadCurrentPage()
  }

  loadCurrentPage() {
    this.loadPage({start: this.start, end: this.end}, {}, {})
  }

}
