import {Component, EventEmitter, Input, Output, ViewEncapsulation} from 'angular2/core';
import {RouterLink} from 'angular2/router';


@Component({
  selector: 'pagination',
  moduleId: module.id,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [RouterLink]
})
export class PaginationComponent {
  pages: number[];
  @Input() activePage: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter();
  @Input() set totalPages(val: number) {
    this.pages = this.makeArray(val);
  }
  showPage(pageNumber: number) {
    if (this.activePage === pageNumber) return false;
    this.changePage.next(pageNumber);
    return false;
  }
  nextPage() {
    if (this.activePage === this.pages.length) return false;
    this.changePage.next(this.activePage + 1);
    return false;
  }
  previousPage() {
    if (this.activePage === 1) return false;
    this.changePage.next(this.activePage - 1);
    return false;
  }
  private makeArray(numberOfPages: number): number[] {
    let pagesSequence = [];

    // TODO: support very long list of pages

    for (let i = 1; i <= numberOfPages; i++) {
      pagesSequence.push(i);
    }
    return pagesSequence;
  }
}
