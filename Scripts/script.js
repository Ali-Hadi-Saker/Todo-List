const todo_card = document.getElementsByClassName('todo task-actions')[0]
const add_task_btn = document.querySelector('button')
const new_task_input = document.getElementsByClassName('task_input_field')[0]
const user_task = document.getElementsByClassName('task_responsable_name')[0]
const toda_date = document.getElementsByClassName('date')[0]
let tasks_list = JSON.parse(localStorage.getItem('task')) || [];
let users_list = JSON.parse(localStorage.getItem('user')) || [];
add_task_btn.addEventListener('click', function(){
    addTask(new_task_input, user_task)
    showTask()
    
    new_task_input.value = ''
    user_task.value = ''
    console.log(tasks_list)
})
function addTask(new_task_input, user_task){
    tasks_list.push(new_task_input.value)
    users_list.push(user_task.value)
    //adding new task into my tasks list
    localStorage.setItem('task', JSON.stringify(tasks_list))
    localStorage.setItem('user', JSON.stringify(users_list))
    //saving new task local storage
}
function showTask(){
    //iterating thru tasks lists and adding it to the pening window
    let new_task = ''
    for(let i = 0 ; i < tasks_list.length ; i++){
        new_task += `<div class="item">
                        <div class="input_controller">
                            <textarea class="new_task">${tasks_list[i]} \nuser: ${tasks_list[i]}</textarea>                       
                        <div class="edit_controller">
                            <i class="fa-solid fa-check done_btn"></i>
                            <i class="fa-solid fa-pen edit_btn"></i>
                            <i class="fa-solid fa-xmark delete_btn"></i>
                        </div>
                    </div>                    
                    </div>`
    }
    todo_card.innerHTML = new_task
    deleteTask()
}
function deleteTask(){
    //access all delete btn 
    let delete_btn = document.querySelectorAll('.delete_btn')
    delete_btn.forEach((db, i) =>{
        db.addEventListener('click', ()=>{deleteItem(i)})
        //call delete item function for the corresponding task
    });
}
function deleteItem(i){
    tasks_list.splice(i, 1)
    //removing task and user name for lists
    users_list.splice(i, 1)
    localStorage.setItem('task', JSON.stringify(tasks_list))
    //updating local storage    
    localStorage.setItem('user', JSON.stringify(users_list))
    location.reload()
}
function displayDate(){
    //get the date  
    let date = new Date()
    date = date.toString().split(" ")
    toda_date.innerText = `${date[0]} ${date[1]} ${date[2]}` 
}
window.onload = function(){
    //display date function called when loading window
    displayDate()
}
