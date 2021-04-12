import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Filter } from '../toolbar/filter/filter.component';

const PageSize = 5;
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() loadPage: any;

  @Input() filter: Filter;

  page = {
    start: 0,
    end: PageSize
  }

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
   this.loadCurrentPage();
  }

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
    this.loadPage({ start: this.page.start, end: this.page.end }, this.filter, {})
  }

}
