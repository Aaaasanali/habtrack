import { Component, inject } from '@angular/core';
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
import { StorageService } from '../../../services/storage.service';
import { HeaderComponent } from '../../header/header.component';
import { Todo } from '../../../interfaces/todo';
@Component({
  selector: 'app-todo-create',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.css'
})
export class TodoCreateComponent {
  todo?:Todo;
  private storageService = inject(StorageService)
  todoForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    expectedCompletionDate: new FormControl(),
    creationDate: new FormControl(),
  })
  private dialogRefService = inject(MatDialogRef<HeaderComponent>);

  submitForm() {
    this.todo = this.todoForm.value as Todo;
    this.todo.completed = false;
    if (this.todoForm.valid && this.todo.expectedCompletionDate && this.todo.expectedCompletionDate >= new Date()) {
      const todoData = this.todoForm.value;
      console.log('Todo Data:', todoData);
      this.todo.creationDate = new Date(); 
      this.storageService.addToDo(this.todo);
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
