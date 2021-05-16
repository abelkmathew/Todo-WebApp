var form=document.querySelector('form');
var todosection=document.querySelector('.todo-items');

//Array
var todos=[]; 


// selections 
var hour = document.querySelector('.hour');
var minute = document.querySelector('.minute');
var second = document.querySelector('.seconds');
var day = document.querySelector('.day');
var month = document.querySelector('.month');
var year = document.querySelector('.year');

// calculations 
function calculate(){
    let date = new Date();
    hour.innerText = date.getHours();
    minute.innerText = date.getMinutes();
    second.innerText = date.getSeconds();
    day.innerText = date.getDate();
    month.innerText = date.getMonth();
    year.innerText = date.getFullYear();
    
}

setInterval(calculate, 1000);


//Sample date object
// {
//     item: 'sample' ,isCompleted:false
// }

form.addEventListener('submit',function(e){
    e.preventDefault();
    let todo_value = form.todo_text.value;
    // console.log(todo_value);
    form.todo_text.value = '';
    let obj={
        item:todo_value, isCompleted:false
    };
    todos.push(obj);
    // console.log(todos);
    addNewTodo(obj)
})
 
function addNewTodo(val){
    let item = document.createElement('div');
    let paragraph = document.createElement('p');
    let deleteBtn = document.createElement('btn1');

    paragraph.innerText=val.item;
    deleteBtn.innerHTML='<i class="bi bi-x-square-fill btn1"></i>';

    item.classList.add('item')

    if(val.isCompleted == true){
        item.classList.add('completed');
    }

    deleteBtn.classList.add('btn1')

    item.appendChild(paragraph);
    item.appendChild(deleteBtn);

    todosection.appendChild(item);


    //events
    deleteBtn.addEventListener('click',function(e){
        let confirmvalue=confirm('Are you sure to delete?');
        if(confirmvalue){
            item.remove();
            for(let i = 0 ; i < todos.length ; i++){
                if(todos[i].item == val.item){
                    todos.splice(i,1);
                    updateLocalStorage();
                    break;
                }
            }
        }
    })
    paragraph.addEventListener('click',function(e){
        if(item.classList.contains('completed')){
            item.classList.remove('completed');
            for(let i = 0 ;i < todos.length ; i++){
                if(todos[i].item == val.item){
                    todos[i].isCompleted = false;
                    updateLocalStorage();
                    break;
                }
            }
        }
        else{
            item.classList.add('completed');
            for(let i = 0 ; i < todos.length ; i++){
                if(todos[i].item == val.item){
                    todos[i].isCompleted = true;
                    updateLocalStorage();
                    break;
                }
            }
        }
    })

    updateLocalStorage();
  
}

//Storing array to Local Storage
function updateLocalStorage(){
    localStorage.setItem('todo',JSON.stringify(todos))
}


// Taking values from local storage
function autoload(){
    let values=localStorage.getItem('todo');
    if(values){                                         //Checking if values are present or not
        let parseValues=JSON.parse(values);             //Sring converted back from string 
        todos=parseValues;
        // console.log(todos);
        for(let i = 0 ;i < todos.length ; i++){               //Displaying to user
            addNewTodo(todos[i]);
        }
    }
}

autoload();
