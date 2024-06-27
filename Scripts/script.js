let todo_card = document.getElementsByClassName('todo task-actions')
let add_task_btn = document.querySelector('button')
add_task_btn.addEventListener('click', function(){
    let new_task_todo = document.createElement('input')
    new_task_todo.type = 'text'
    new_task_todo.placeholder = 'Enter new task'
    new_task_todo.className = 'new_task_todo'
    todo_card[0].appendChild(new_task_todo)
    console.log("hello world")
})