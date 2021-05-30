'use strict';

// controller Todolist
class todoListController {
  constructor() {
    this.todos = [
      { todoText: 'Study Async', completed: false },
      { todoText: 'Study Git', completed: false },
      { todoText: 'Study OOP', completed: false },
    ];
  }

  //  It should have a function to display todos
  displayTodos() {
    console.log('My tasks are:');
    this.todos.forEach(todo => {
      if (todo.todoText) {
        if (todo.completed === false) {
          console.log(` - ${todo.todoText}, []`);
        } else {
          console.log(` - ${todo.todoText}, [X]`);
        }
      }
    });
  }

  //  It should have a function to add todos
  addTodos(todoText) {
    let todo = {
      todoText,
      completed: false,
    };
    this.todos.push(todo);
    this.displayTodos();
  }

  // It should have a function to toggle todos
  toggleTodo(position) {
    this.todos[position].completed = !this.todos[position].completed;

    this.displayTodos();
  }

  // It should have a toggle ALL feature
  toggleAll() {
    let completedTodos = 0;
    this.todos.forEach(todo => {
      if (todo.completed) {
        completedTodos++;
      }
    });
    // MAKE EVERYTHING TOGGLED
    if (this.todos.length === completedTodos) {
      this.todos.forEach(todo => {
        if (todo.completed) {
          todo.completed = false;
        } else {
          todo.completed = true;
        }
      });
    } else {
      // If one is toggled make everything true
      this.todos.forEach(todo => {
        todo.completed = true;
      });
    }

    this.displayTodos();
  }

  // It should have a function to edit todos
  editTodo(position, todo) {
    this.todos[position].todoText = todo;
    this.displayTodos();
  }

  // It should have a function to delete todos
  deleteTodo(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  }
}
// control class instantiation
const controlTodoList = new todoListController();

//UI TODOS class
class todoListUI {
  static UIdisplayTodos() {
    const output = document.querySelector('#output');
    let html = '';
    controlTodoList.todos.forEach(todo => {
      html += `
      <li>
        <div div class="todo-text">
          <input type="checkbox"/>
          <span class="todo-text">${todo.todoText} </span>
          <input type="text" class="edit-todo hide"/>
        
        </div>
        <div class="buttons">
          <button class="sm-btn edit">Edit</button>
          <button class="sm-btn delete">Delete</button>
        </div>
      </li>
        `;
    });

    output.innerHTML = html;
  }

  static UIaddTodos(e) {
    e.preventDefault();
    const addForm = document.querySelector('#add-form');
    const todoInput = addForm.add.value.trim();
    if (todoInput) {
      let html = `
    <li>
      <div class="todo-text">
      <input type="checkbox" />
      <span class="todo-text">${todoInput}</span>
      <input type="text" class="edit-todo hide"/>
      </div>

      <div class="buttons">
        <button class=" sm-btn edit">Edit</button>
        <button class=" sm-btn delete">Delete</button>
      </div>
    </li>
    `;
      output.innerHTML += html;
    }

    //! WORD WRAP
    if (todoInput.length > 30) {
      document
        .querySelectorAll('li span')
        .forEach(li => li.classList.add('wrap'));
    }

    controlTodoList.addTodos(todoInput);
    addForm.reset();
    todoListUI.UItoggletodo(e);
  }

  static UIeditTodos(e) {
    if (e.target.classList.contains('edit')) {
      const editInput =
        e.target.parentElement.previousElementSibling.children[2];
      const todoSpan =
        e.target.parentElement.previousElementSibling.children[1];

      editInput.value = todoSpan.textContent;
      todoSpan.classList.add('hide');
      editInput.classList.remove('hide');
      editInput.focus();
      editInput.setSelectionRange(0, editInput.value.length);

      editInput.addEventListener('keypress', function (e) {
        if (e.target.classList.contains('edit-todo') && e.keyCode === 13) {
          e.target.previousElementSibling.classList.remove('hide');
          e.target.previousElementSibling.textContent = e.target.value;
          e.target.classList.add('hide');
        }

        // controlTodoList.todos.forEach((todo, i) => {
        //   if (todo.textContent === todo.todoText) {
        //     controlTodoList.editTodo(i, editInput.value);
        //   }
        // });
      });

      editInput.addEventListener('blur', function (e) {
        if (e.target.classList.contains('edit-todo')) {
          e.target.previousElementSibling.classList.remove('hide');
          e.target.previousElementSibling.textContent = e.target.value;
          e.target.classList.add('hide');
        }
      });
    }
  }

  static UIdeleteTodos(e) {
    // Deleting todos from UI
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.parentElement.remove();

      //  Delete Todos form controller
      controlTodoList.todos.forEach((todo, i) => {
        if (
          e.target.parentElement.previousElementSibling.textContent.trim() ===
          todo.todoText
        ) {
          controlTodoList.deleteTodo(i);
        }
      });
    }
  }

  static UItoggletodo(e) {
    if (e.target.type === 'checkbox') {
      if (e.target.checked) {
        e.target.parentElement.style.textDecoration = 'line-through';
        e.target.parentElement.style.color = '#999';

        controlTodoList.todos.forEach((todo, i) => {
          if (e.target.parentElement.textContent.trim() === todo.todoText) {
            controlTodoList.toggleTodo(i);
            todo.completed = true;
          }
        });
      } else {
        e.target.parentElement.style.textDecoration = 'none';
        e.target.parentElement.style.color = 'inherit';

        // Uncheck the todolist array items
        controlTodoList.todos.forEach((todo, i) => {
          if (e.target.parentElement.textContent.trim() === todo.todoText) {
            controlTodoList.toggleTodo(i);
            todo.completed = false;
          }
        });
      }
    }
  }

  static UItoggleALL() {
    controlTodoList.toggleAll();
  }
  static UIclearALL() {
    output.innerHTML = '';
  }
}

// UI class instantiation
// const UItodoList = new todoListUI();

// Event Handlers
// document
//   .getElementById('display-btn')
//   .addEventListener('click', todoListUI.UIdisplayTodos);

// Adding todos Event
document
  .querySelector('#add-form')
  .addEventListener('submit', todoListUI.UIaddTodos);

// editing todos Event
output.addEventListener('click', todoListUI.UIeditTodos);

// deleting todos Event
output.addEventListener('click', todoListUI.UIdeleteTodos);

// toggle todo Event
output.addEventListener('change', todoListUI.UItoggletodo);

// toggleAll todos Event
document
  .querySelector('#toggleAll-btn')
  .addEventListener('click', todoListUI.UItoggleALL);

// Clear All todos Event
document
  .querySelector('#clearAll-btn')
  .addEventListener('click', todoListUI.UIclearALL);

// Display all Todos in the UI
todoListUI.UIdisplayTodos();
