import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, finishedFromReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';


@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,private _snackBar:MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const undo = this._snackBar.open('Removed from reading list', 'Undo', {"duration": 2000});
    undo.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({ book: item }));
    });

  }
  formatDate(date: any) {
    const d = new Date(date);
    return d ? d.toDateString() : undefined;
  }

  finishFromReadingList(item) {
    item = {
      ...item,
      finished: true,
      finishedDate: new Date().toISOString(),
    }
    this.store.dispatch(finishedFromReadingList({ item }));
  }

}
