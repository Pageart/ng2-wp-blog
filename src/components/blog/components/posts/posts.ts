import {Component, ViewEncapsulation} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

import {WpService, PostModel} from '../../services/services';
import {PaginationCmp} from '../pagination/pagination';

@Component({
  selector: 'posts',
  viewProviders: [],
  templateUrl: './components/blog/components/posts/posts.html',
  styleUrls: ['./components/blog/components/posts/posts.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, PaginationCmp]
})
export class PostsCmp {
  posts: PostModel[];
  activePage: number;
  constructor(public wp: WpService, routeParams: RouteParams) {
    let id = routeParams.get('id');
    this.activePage = (id ? parseInt(id) : 0) || 1;
    this.loadPage(this.activePage);
  }
  loadPage(id: number): void {
    this.activePage = id;
    this.wp.posts
      .getPage(id)
      .subscribe(posts => this.posts = posts);
  }
}
