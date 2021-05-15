// selections 
var hour = document.querySelector('.hour');
var minute = document.querySelector('.minute');
var second = document.querySelector('.seconds');

// calculations 
function calculate(){
    let date = new Date();
    hour.innerText = date.getHours();
    minute.innerText = date.getMinutes();
    second.innerText = date.getSeconds();
}

setInterval(calculate, 1000);