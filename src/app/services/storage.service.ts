import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { BehaviorSubject } from 'rxjs';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private todosList = new BehaviorSubject<Todo[]>(this.getToDos());
  todosList$ = this.todosList.asObservable();

  constructor() {}



  getToDos(): Todo[] {
    return localStorage.getItem('todosList') 
      ? JSON.parse(localStorage.getItem('todosList')!) 
      : [];
  }
  setToDos(todos: Todo[]): void {
    localStorage.setItem('todosList', JSON.stringify(todos));
    this.todosList.next(todos);
  }
  addToDo(todo: Todo): void {
    const todos = this.getToDos();
    todos.push(todo);
    this.setToDos(todos); 
  }
  getCompletedTodos(): Todo[] {
    return this.getToDos().filter((todo: Todo) => todo.completed === true);
  }
  getUncompletedTodos(): Todo[] {
    return this.getToDos().filter((todo: Todo) => todo.completed === false);
  }
  deleteToDo(todo: Todo): void {
    const todos = this.getToDos();
    const index = todos.findIndex(
      (t) =>
        t.title === todo.title &&
        t.description === todo.description
    );

    if (index > -1) {
      todos.splice(index, 1);
      this.setToDos(todos);
    } else {
      console.error('Todo not found in the list:', todo);
    }
  }
  updateToDo(todo: Todo, newToDo: Todo): void {
    const todos = this.getToDos();
    const index = todos.findIndex(
      (t) =>
        t.title === todo.title &&
        t.description === todo.description
    );

    if (index > -1) {
      todos[index] = newToDo;
      this.setToDos(todos);
    } else {
      console.error('Todo not found in the list:', todo);
    }
  }

  completeToDo(todo: Todo) {
    todo.completed = true;
    todo.completionDate = new Date(); 
    this.updateToDo(todo, todo); 
  }
  uncompleteToDo(todo: Todo){
    todo.completed = false;
    this.updateToDo(todo, todo);
  }
}
