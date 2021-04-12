import { Component, Input, OnInit } from '@angular/core';

const PageSize = 5;
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() loadPage: any;
  start: number = 0;
  end: number = PageSize;

  constructor() { }

  ngOnInit(): void {
    this.loadCurrentPage()
  }

  nextPage() {
    this.start += PageSize;
    this.end += PageSize
    this.loadCurrentPage()
  }

  previousPage() {
    this.start -= PageSize;
    this.end -= PageSize
    this.loadCurrentPage()
  }

  loadCurrentPage() {
    this.loadPage({start: this.start, end: this.end}, {}, {})
  }

}
