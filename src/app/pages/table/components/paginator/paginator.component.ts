import { Component, Input, OnInit } from '@angular/core';

const PageSize = 5;
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() loadPage: any;

  page = {
    start: 0,
    end: PageSize
  }

  constructor() { }

  ngOnInit(): void {
    this.loadCurrentPage()
  }

  nextPage() {
    this.page.start += PageSize;
    this.page.end += PageSize
    this.loadCurrentPage()
  }

  previousPage() {
    this.page.start -= PageSize;
    this.page.end -= PageSize
    this.loadCurrentPage()
  }

  loadCurrentPage() {
    this.loadPage({ start: this.page.start, end: this.page.end }, {}, {})
  }

}
