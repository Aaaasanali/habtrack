import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditCardComponent } from './todo-edit-card.component';

describe('TodoEditCardComponent', () => {
  let component: TodoEditCardComponent;
  let fixture: ComponentFixture<TodoEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEditCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
