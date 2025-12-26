import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar-inventory',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: false
})
export class SearchBarComponent  implements OnInit {

  @Output() searchTerm = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.searchTerm.emit(value);
      });
  };

  onSearchChange(event: any) {
    const value = event.target.value || '';
    this.searchSubject.next(value);
  }

}
