const todo_card = document.getElementsByClassName('todo task-actions')[0]
const add_task_btn = document.querySelector('button')
const new_task_input = document.getElementsByClassName('task_input_field')[0]
const user_task = document.getElementsByClassName('task_responsable_name')[0]
const toda_date = document.getElementsByClassName('date')[0]
const tasks_list = []
add_task_btn.addEventListener('click', function(){
    addTask(new_task_input)
    let new_task_todo = document.createElement('li')
    let new_user_task = document.createElement('p')
    new_task_todo.innerText = new_task_input.value
    new_user_task.innerText = `user: ${user_task.value}`
    todo_card.appendChild(new_task_todo)
    todo_card.appendChild(new_user_task)
    new_task_input.value = ''
    user_task.value = ''
    console.log(tasks_list)
})
function addTask(new_task_input){
    tasks_list.push(new_task_input.value)
    localStorage.setItem('task', JSON.stringify(tasks_list))
}
function displayDate(){
    let date = new Date()
    date = date.toString().split(" ")
    toda_date.innerText = `${date[0]} ${date[1]} ${date[2]}` 
    console.log(date)
}
window.onload = function(){
    displayDate()
}
