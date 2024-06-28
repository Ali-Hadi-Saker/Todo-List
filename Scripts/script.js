const todo_card = document.getElementsByClassName('todo task-actions')[0]
const finished_card = document.getElementsByClassName('finished task-actions')[0]
const missed_card = document.getElementsByClassName('missed task-actions')[0]
const add_task_btn = document.querySelector('button')
const new_task_input = document.getElementsByClassName('task_input_field')[0]
const user_task = document.getElementsByClassName('task_responsable_name')[0]
const today_date = document.getElementsByClassName('date')[0]
const task_time = document.getElementsByClassName('task_input_time')[0]
let tasks_list = JSON.parse(localStorage.getItem('task')) || []
let users_list = JSON.parse(localStorage.getItem('user')) || []
let task_time_list = []
let finished_tasks = []
let finished_task_users = []
let finished_task_time_list = []
let post_due_task = []
let post_due_task_time = []
let post_due_task_user = []
add_task_btn.addEventListener('click', function(){
    if(new_task_input.value === ''){
        alert("Enter your task")
    }else{
        addTask(new_task_input, user_task, task_time)
    showTask()    
    new_task_input.value = ''
    user_task.value = ''
    task_time.value = ''
    console.log(tasks_list)
    }
    
})
function addTask(new_task_input, user_task, task_time){

    tasks_list.push(new_task_input.value.trim())
    users_list.push(user_task.value.trim())
    task_time_list.push(task_time.value)
    //adding new task into my tasks list
    localStorage.setItem('task', JSON.stringify(tasks_list))
    localStorage.setItem('user', JSON.stringify(users_list))
    localStorage.setItem('time', JSON.stringify(task_time_list))
    //saving new task local storage
}
function showTask(){
    //iterating thru tasks lists if now time > task due time add it to missed tasks else to pending
    let new_task = ''
    let missed_task = ''
    let now = new Date()
    for(let i = 0 ; i < tasks_list.length ; i++){
        let task_time = new Date(task_time_list[i])
        if( now > task_time){
            missed_task +=  `<div class="item">
            <div class="input_controller ">
                <textarea class="new_task ">${tasks_list[i]} \nuser: ${users_list[i]} \ntime: ${task_time_list[i]}</textarea>                       
            <div class="edit_controller">
                <i class="fa-solid fa-xmark delete_btn"></i>
            </div>
        </div>                    
        </div>`
        moveToPostDue(i)
        }else{
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
    }
    todo_card.innerHTML = new_task
    missed_card.innerHTML = missed_task
    let completed_task = '' 
    for(let i = 0 ; i < finished_tasks.length ; i++){
        completed_task += `<div class="item">
                        <div class="input_controller ">
                            <textarea class="new_task">${finished_tasks[i]} \nuser: ${finished_task_users[i]}</textarea>                       
                            <i class="fa-solid fa-xmark delete_btn"></i>
                    </div>                    
                    </div>`
    }
    finished_card.innerHTML = completed_task
    deleteTask()
    finishedTask()
}
function moveToPostDue(i){
    post_due_task.push(tasks_list[i])
    post_due_task_user.push(users_list[i])
    post_due_task_time.push(task_time_list[i])
    tasks_list.splice(i, 1)
    users_list.splice(i, 1)
    task_time_list.splice(i, 1)
    localStorage.setItem('task', JSON.stringify(tasks_list))
    localStorage.setItem('user', JSON.stringify(users_list))
    localStorage.setItem('time', JSON.stringify(task_time_list))
    localStorage.setItem('post_due_task', JSON.stringify(post_due_task))
    localStorage.setItem('post_due_user', JSON.stringify(post_due_task_user))
    localStorage.setItem('post_due_time', JSON.stringify(post_due_task_time))
    

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
    localStorage.setItem('task', JSON.stringify(tasks_list))
    localStorage.setItem('user', JSON.stringify(users_list))
    localStorage.setItem('finished_task', JSON.stringify(finished_tasks))
    localStorage.setItem('finished_user', JSON.stringify(finished_task_users))
    showTask()
}
function deleteTask(){
    //access all delete btn 
    let delete_btn = document.querySelectorAll('.delete_btn')
    delete_btn.forEach((db, i) =>{
        db.addEventListener('click', ()=>{
            let status = db.closest('.item')
            console.log(status)
            deleteItem(i)})
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
    post_due_task.splice(i, 1)
    post_due_task_time.splice(i, 1)
    localStorage.setItem('task', JSON.stringify(tasks_list))
    //updating local storage    
    localStorage.setItem('user', JSON.stringify(users_list))
    localStorage.setItem('finished_task', JSON.stringify(finished_tasks));
    localStorage.setItem('finished_user', JSON.stringify(finished_task_users));
    localStorage.setItem('time', JSON.stringify(task_time_list))
    localStorage.setItem('post_due_task', JSON.stringify(post_due_task));
    localStorage.setItem('post_due_time', JSON.stringify(post_due_task_time))

    showTask()
}
function displayDate(){
    //get the date  
    let date = new Date()
    date = date.toString().split(" ")
    today_date.innerText = `${date[0]} ${date[1]} ${date[2]}` 
    console.log(date)
}
window.onload = function(){
    //display date function called when loading window
    displayDate()
    showTask()
}
