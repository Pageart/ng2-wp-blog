import {Component, OnDestroy, ViewEncapsulation} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Subscription} from 'rxjs';

import {WpService, PostsCollection, PostModel} from '../services/wp.service';
import {ExcerptComponent} from '../excerpt/excerpt.component';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'posts',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, ExcerptComponent, PaginationComponent]
})
export class PostsComponent implements OnDestroy {
  posts: PostModel[];
  activePage: number;
  subscription: Subscription<PostsCollection>;
  constructor(public wp: WpService,
              public router: Router,
              routeParams: RouteParams) {
    let id = routeParams.get('id');
    this.activePage = (id ? parseInt(id) : 0) || 1;
    this.loadPage(this.activePage);
  }
  loadPage(id: number): void {
    this.activePage = id;
    this.posts = [];
    this.subscription = this.wp.posts
      .getPage(id)
      .subscribe(res => {
        this.posts = res.data;
      });
  }
  navigatePage(id) {
    let instruction = this.router.generate(['../PostsPage', { id: id }]);
    this.router.navigateByInstruction(instruction);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
