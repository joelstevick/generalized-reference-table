import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination.service';
import { FilterComponent } from '../toolbar/filter/filter.component';

const PageSize = 5;
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnDestroy, OnChanges {
  @Input() loadPage: any;
  @Input() filter: FilterComponent;
  @Input() visible = true;

  recordSubscription: Subscription;

  page = {
    start: 0,
    end: PageSize
  }

  constructor(
    public service: PaginationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
   this.loadCurrentPage();
  }

  ngOnInit(): void {
    this.loadCurrentPage()
    this.recordSubscription = this.service.recordsUpdated.subscribe(() => {
      this.loadCurrentPage()
    })
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

  ngOnDestroy() {
    this.recordSubscription.unsubscribe()
  }

}
