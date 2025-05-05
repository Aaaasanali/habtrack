import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoCreateComponent } from '../todo-list/todo-create/todo-create.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StorageService } from '../../services/storage.service';
import { Todo } from '../../interfaces/todo';
@Component({
  selector: 'app-header',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatProgressBarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  todos: Todo[] = [];
  completionPercentage:number = 0;
  constructor(private dialogService: MatDialog, private storageService: StorageService) {
    this.storageService.todosList$.subscribe((todos) => {
      this.todos = todos;
      this.completionPercentage = Math.round(this.getPercentage());
    });
  }
  newCardDialog(){
    this.dialogService.open(TodoCreateComponent, {
      width: '50vw',
      maxHeight: '80vh',
    })
  }
  getPercentage(): number {
    return this.todos.length === 0
      ? 0
      : (this.todos.filter(todo => todo.completed === true).length / this.todos.length) * 100;
  }
}
