import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: ''
  });
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books.sort((a, b) => (a.title < b.title ? -1 : 1));;
    });
    this.searchForm.get('term')
    .valueChanges.pipe(debounceTime(500),
    distinctUntilChanged())
    .subscribe(() => {
      this.searchBooks();
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }
  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    const undo = this._snackBar.open('Added to reading list', 'Undo', {"duration": 2000});
    undo.onAction().subscribe(() => {
      const item = {
        bookId: book.id,
        title: book.title,
        authors: book.authors,
        description: book.description,
      };
      this.store.dispatch(removeFromReadingList({ item }));
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
  trackById(index: number, book: Book) {
    return book.id; 
  }
  searchClose() {
    this.searchForm.controls.term.setValue('');
  }
}
