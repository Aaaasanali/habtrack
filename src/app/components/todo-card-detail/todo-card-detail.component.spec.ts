import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardDetailComponent } from './todo-card-detail.component';

describe('TodoCardDetailComponent', () => {
  let component: TodoCardDetailComponent;
  let fixture: ComponentFixture<TodoCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCardDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
