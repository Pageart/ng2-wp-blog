import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
  beforeEachProviders
} from 'angular2/testing';
import {Component, View} from 'angular2/core';

import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {PaginationComponent} from './pagination';

export function main() {

  describe('PaginationComponent Component', () => {

    beforeEachProviders(() => []);

    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><pagination></pagination></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();
            let cmpDOMEl = rootTC.debugElement.children[0].nativeElement;
            expect(DOM.querySelectorAll(cmpDOMEl, 'pagination')[0]).toBeDefined();
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [PaginationComponent]})
class TestComponent {}
