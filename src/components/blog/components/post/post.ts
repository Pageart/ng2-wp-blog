import {Component, ElementRef, ViewEncapsulation} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';

import {WpService, PostModel} from '../../services/services';
import {BLOG_DIRECTIVES} from '../../directives/directives';

@Component({
  selector: 'post',
  viewProviders: [],
  templateUrl: './components/blog/components/post/post.html',
  styleUrls: ['./components/blog/components/post/post.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, BLOG_DIRECTIVES]
})
export class PostCmp {
  post: PostModel;
  constructor(public routeParams: RouteParams,
              public wp: WpService,
              private _el: ElementRef) {
    let id = parseInt(this.routeParams.params['id']);
    this.wp.posts.getOneById(id).subscribe(post => this.post = post);
  }
  ngAfterViewChecked() {
    (<any>window).Prism.highlightAll();
  }
}
