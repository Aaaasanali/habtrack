import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StorageService } from '../../services/storage.service';
import { Todo } from '../../interfaces/todo';
import { TodoCardComponent } from '../todo-list/todo-card/todo-card.component';
@Component({
  selector: 'app-todo-edit-card',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule],
  templateUrl: './todo-edit-card.component.html',
  styleUrl: './todo-edit-card.component.css'
})
export class TodoEditCardComponent {
  todo:Todo = {} as Todo;
  newToDo?:Todo;
  private storageService = inject(StorageService)
  todoForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    expectedCompletionDate: new FormControl(),
    creationDate: new FormControl(),
  })
  private dialogRefService = inject(MatDialogRef<TodoCardComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { date: Date, todo: Todo }) {
    this.todo = data.todo;
    this.todoForm.setValue({
      title: this.todo.title,
      description: this.todo.description,
      expectedCompletionDate: this.todo.expectedCompletionDate,
      creationDate: this.todo.creationDate,
    });
  }
  
  submitForm() {
    this.newToDo = this.todoForm.value as Todo;
    this.newToDo.completed = false;
    if (this.todoForm.valid && this.newToDo.expectedCompletionDate && this.todo.expectedCompletionDate >= new Date()) {      
      this.storageService.updateToDo(this.todo, this.newToDo);
      this.todoForm.reset();
      this.dialogRefService.close();
    } else {
      console.log('Form is invalid');
    }
  }
  closeDialog() {
    this.dialogRefService.close();
  }
}
