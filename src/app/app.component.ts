import { Component } from '@angular/core';
import { Todo } from './Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  todos : Todo[]=JSON.parse(localStorage['myTodo']);
  newTodo:string;
  updateTodoName:string;
  myTodo:any;
  checkEdit:boolean=false;
  incompletedTodo = this.todos.filter(s => s.isCompleted === false);

  saveTodo(){
    if(this.newTodo){
      let todo = new Todo();
      todo.name = this.newTodo;
      todo.isCompleted = false;
      todo.isEditing = false;
      this.todos.push(todo);
      window.localStorage.setItem('myTodo',JSON.stringify(this.todos) );
      this.todos = JSON.parse(localStorage['myTodo']);
      console.log(this.todos);
      this.newTodo='';
    }else {
      alert('Please Enter Todo')
    }
  }

  done(id:number){
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
    this.incompletedTodo = this.todos.filter(s => s.isCompleted === false);
    window.localStorage.setItem('myTodo',JSON.stringify(this.todos) ); 
  }

  remove(id:number){
    this.todos = this.todos.filter((v,i)=> i !== id);
    window.localStorage.setItem('myTodo',JSON.stringify(this.todos) ); 
  }
  edit(id:number){
    if(this.checkEdit === false){
      this.checkEdit = true;
      this.todos[id].isEditing = true;
      this.updateTodoName = this.todos[id].name;
      window.localStorage.setItem('myTodo',JSON.stringify(this.todos) );
    }
     else {
      alert('Please finish edit');
     }
  }
  updateTodo(id:number){
    if(this.updateTodoName) {
      this.todos[id].name = this.updateTodoName;
      this.todos[id].isEditing = false;
      window.localStorage.setItem('myTodo',JSON.stringify(this.todos) );
      this.todos = JSON.parse(localStorage['myTodo']);
      this.checkEdit = false;
    }
     else {
      alert('Edit can not be NULL')
     }
    }
    cancelEdit(id:number){
      this.todos[id].isEditing = false;
      window.localStorage.setItem('myTodo',JSON.stringify(this.todos) ); 
      this.checkEdit = false;
    }
}
