import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TodoCardComponent } from "./components/todo-list/todo-card/todo-card.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'habtrack';
}
