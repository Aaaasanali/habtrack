import { Component, inject, ViewChild } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../interfaces/todo';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';
import { TodoCardDetailComponent } from '../../todo-card-detail/todo-card-detail.component';
import { TodoEditCardComponent } from '../../todo-edit-card/todo-edit-card.component';
@Component({
  selector: 'app-todo-card',
  imports: [
    CommonModule, 
    MatCalendar,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule, 
    MatTabsModule, 
    MatDatepickerModule, 
    CommonModule,
    MatNativeDateModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})
export class TodoCardComponent {
  storageServie = inject(StorageService);
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;
  todosList:Todo[] = [];
  constructor(private storageService: StorageService, 
    private cdr: ChangeDetectorRef, 
    private dialog: MatDialog) {
    this.storageServie.todosList$.subscribe((todos) => {
      this.todosList = todos;
      this.refreshCalendar();
    });
  }
  refreshCalendar() {
    if (this.calendar) {
      this.calendar.updateTodaysDate(); 
    }
  }
  deleteToDo(todo: Todo) {
    console.log('Deleting todo:', todo);
    this.storageService.deleteToDo(todo);
  }
  completeToDo(todo: Todo) {
    this.storageService.completeToDo(todo);
  }
  uncompleteToDo(todo: Todo) {
    this.storageService.uncompleteToDo(todo);
  }
  isDateClose(completionDate: Date): boolean {
    const today = new Date();
    const targetDate = new Date(completionDate);
    const diffInDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 0 && diffInDays >= -7; 
  }

  isSameDate(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if( d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) {
      return true;
    }
    return false; 
  }

  dateClass = (d: Date): string => {
    for (let todo of this.todosList) {
      if (this.isSameDate(d, todo.expectedCompletionDate) && !todo.completed) {
        return 'special-date'; 
      } else if (this.isSameDate(d, todo.completionDate) && todo.completed) {
        return 'completed-date'; 
      }
    }
    return '';
  };
  isSpecialDate(d: Date): Todo[] {
    const todos: Todo[] = [];
    for (let todo of this.todosList) {
      if (this.isSameDate(d, todo.expectedCompletionDate) && !todo.completed) {
        todos.push(todo);
      } else if (this.isSameDate(d, todo.completionDate) && todo.completed) {
        todos.push(todo);
      }
    }
    return todos;
  }
  openDialog(selectedDate?: Date): void {

    const todos:Todo[] = this.isSpecialDate(selectedDate!);
    if(todos.length > 0) {
      this.dialog.open(TodoCardDetailComponent, {
        width: '1000px',
        maxWidth: '100%',
        maxHeight: 'none',
        data: { date: selectedDate, todos: todos}
      });
    }
  }

  openDialogEdit(todo: Todo): void {
    if(!todo.completed) {
      this.dialog.open(TodoEditCardComponent, {
            width: '50vw',
            maxHeight: '80vh',
            data: { todo: todo }
      })
    }
  }

}
