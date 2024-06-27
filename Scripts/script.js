const todo_card = document.getElementsByClassName('todo task-actions')[0]
const add_task_btn = document.querySelector('button')
const new_task_input = document.getElementsByClassName('task_input_field')[0]
add_task_btn.addEventListener('click', function(){
    let new_task_todo = document.createElement('p')
    new_task_todo.innerText = new_task_input.value
    todo_card.appendChild(new_task_todo)
    console.log(new_task_todo)
})