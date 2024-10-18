import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { addToReadingList,clearSearch,getAllBooks,ReadingListBook, searchBooks } from '@tmo/books/data-access';
import { of } from 'rxjs';
import { Book } from '@tmo/shared/models';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = {
      select: jasmine.createSpy('select').and.returnValue(of([])),
      dispatch: jasmine.createSpy('dispatch'),
    };
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should dispatch searchBooks on term change', fakeAsync(async () => {
    component.ngOnInit();
    spyOn(component, 'searchBooks').and.callThrough();
    component.searchForm.controls.term.setValue('javascript');
    tick(500); 
    expect(component.searchBooks).toHaveBeenCalled();
  }));

  it('should clear the search term', () => {
    component.searchForm.controls.term.setValue('some term');
    component.searchClose();
    expect(component.searchForm.controls.term.value).toBe('');
  });
 
});
