import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Todo } from '../../interfaces/todo';
@Component({
  selector: 'app-todo-card-detail',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule, 
    MatTabsModule, 
    MatDatepickerModule, 
    CommonModule,
    MatNativeDateModule,
  ],
  templateUrl: './todo-card-detail.component.html',
  styleUrl: './todo-card-detail.component.css'
})
export class TodoCardDetailComponent {
  todos:Todo[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { date: Date, todos: Todo[] }) {
    this.todos = data.todos;
    console.log('Todos:', this.todos);
  }

  
}
