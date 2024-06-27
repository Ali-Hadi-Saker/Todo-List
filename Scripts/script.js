const todo_card = document.getElementsByClassName('todo task-actions')[0]
const finished_card = document.getElementsByClassName('finished task-actions')[0]
const add_task_btn = document.querySelector('button')
const new_task_input = document.getElementsByClassName('task_input_field')[0]
const user_task = document.getElementsByClassName('task_responsable_name')[0]
const toda_date = document.getElementsByClassName('date')[0]
const task_time = document.getElementsByClassName('task_input_time')[0]
let tasks_list = JSON.parse(localStorage.getItem('task')) || []
let users_list = JSON.parse(localStorage.getItem('user')) || []
let finished_tasks = []
let finished_task_users = []
let task_time_list = []
add_task_btn.addEventListener('click', function(){
    if(new_task_input.value === ''){
        alert("Enter your task")
    }else{
        addTask(new_task_input, user_task, task_time)
    showTask()    
    new_task_input.value = ''
    user_task.value = ''
    console.log(tasks_list)
    }
    
})
function addTask(new_task_input, user_task, task_time){

    tasks_list.push(new_task_input.value)
    users_list.push(user_task.value)
    task_time_list.push(task_time.value)
    //adding new task into my tasks list
    localStorage.setItem('task', JSON.stringify(tasks_list))
    localStorage.setItem('user', JSON.stringify(users_list))
    localStorage.setItem('time', JSON.stringify(task_time_list))
    //saving new task local storage
}
function showTask(){
    //iterating thru tasks lists and adding it to the pening window
    let new_task = ''
    for(let i = 0 ; i < tasks_list.length ; i++){
        new_task += `<div class="item">
                        <div class="input_controller ">
                            <textarea class="new_task ">${tasks_list[i]} \nuser: ${users_list[i]} \ntime: ${task_time_list[i]}</textarea>                       
                        <div class="edit_controller">
                            <i class="fa-solid fa-check done_btn"></i>
                            <i class="fa-solid fa-pen edit_btn"></i>
                            <i class="fa-solid fa-xmark delete_btn"></i>
                        </div>
                    </div>                    
                    </div>`
    }
    todo_card.innerHTML = new_task
    let new_done_task = ''
    for(let i = 0 ; i < finished_tasks.length ; i++){
        new_done_task += `<div class="item">
                        <div class="input_controller ">
                            <textarea class="new_task">${finished_tasks[i]} \nuser: ${finished_task_users[i]}</textarea>                       
                            <i class="fa-solid fa-xmark delete_btn"></i>
                    </div>                    
                    </div>`
    }
    finished_card.innerHTML = new_done_task
    deleteTask()
    finishedTask()
}
function finishedTask(){
    let done_btn = document.querySelectorAll('.done_btn')
    done_btn.forEach((db, i) =>{
        db.addEventListener('click', () =>{moveTask(i)})
    })
}
function moveTask(i){
    finished_tasks.push(tasks_list[i])
    finished_task_users.push(users_list[i])
    tasks_list.splice(i, 1)
    //removing task and user name for lists
    users_list.splice(i, 1)
    
    localStorage.setItem('task', JSON.stringify(tasks_list));
    localStorage.setItem('user', JSON.stringify(users_list));
    localStorage.setItem('finished_task', JSON.stringify(finished_tasks));
    localStorage.setItem('finished_user', JSON.stringify(finished_task_users));
    showTask()
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
    finished_tasks.splice(i, 1)
    finished_task_users.splice(i,1)
    task_time_list.splice(i,1)
    localStorage.setItem('task', JSON.stringify(tasks_list))
    //updating local storage    
    localStorage.setItem('user', JSON.stringify(users_list))
    localStorage.setItem('finished_task', JSON.stringify(finished_tasks));
    localStorage.setItem('finished_user', JSON.stringify(finished_task_users));
    localStorage.setItem('time', JSON.stringify(task_time_list))
    showTask()
}
function displayDate(){
    //get the date  
    let date = new Date()
    date = date.toString().split(" ")
    toda_date.innerText = `${date[0]} ${date[1]} ${date[2]}` 
    console.log(date)
}
window.onload = function(){
    //display date function called when loading window
    displayDate()
}
