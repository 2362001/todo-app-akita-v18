import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SharedModule } from '../../common/common.module';
import { SortingInterface, UserInterface, UsersServiceService } from './users-service.service';
import { log } from 'console';

@Component({
  selector: 'app-test-paging-table',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './test-paging-table.component.html',
  styleUrl: './test-paging-table.component.scss'
})
export class TestPagingTableComponent {
  columns: Array<keyof UserInterface> = ['id', 'name', 'age'];
  sorting: SortingInterface = {
    column: 'id',
    order: 'asc',
  };
  users: UserInterface[] = [];
  searchValue: string = '';
  searchForm ;

  constructor(private usersService: UsersServiceService, private fb: FormBuilder) {
    this.searchForm =  this.fb.nonNullable.group({
      searchValue: '',
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.usersService.getUsers(this.sorting, this.searchValue).subscribe((users) => {
      this.users = users;
    });
  }

  capitalize(str: string): string {
    
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  isDescSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'desc';
  }

  isAscSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'asc';
  }

  sortTable(column: string): void {
    const futureSortingOrder = this.isDescSorting(column) ? 'asc' : 'desc';
    this.sorting = {
      column,
      order: futureSortingOrder,
    };
    this.fetchData();
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }
}
