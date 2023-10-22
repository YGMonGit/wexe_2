let todoList2 =  JSON.parse(localStorage.getItem('todoList')) || [];
let indexValue = JSON.parse(localStorage.getItem('indexVal'))
console.log(todoList2);
console.log(indexValue);
let e_todo_type = document.getElementById('todo-type');
let e_title = document.getElementById('title');
let e_place = document.getElementById('place');
let e_time = document.getElementById('time');

let e_notification = document.getElementById('notification');

let e_clear_btn_p = document.getElementById('clear-btn-p');
let e_clear_btn_t = document.getElementById('clear-btn-t');
let e_clear_btn_n = document.getElementById('clear-btn-n');

window.onload = () => {
  e_todo_type.value = todoList2[indexValue].todoType;
  e_title.value = todoList2[indexValue].titleValue;
  e_place.value = todoList2[indexValue].placeValue;

  const timeE = todoList2[indexValue].time;
  let [hour, minute_pa] = timeE.split(':');
  let [minute, pmAm] = minute_pa.split(' ');
  let hour12 = parseInt(hour);
  if(pmAm === "pm"){
    hour12 += 12;
    hour = hour12;
  }
  if(hour12 < 10){
    hour = '0' + hour;
  }
  const timeValues = `${hour}:${minute}`
  e_time.value = timeValues;
  console.log(timeValues);
  
  e_notification.value = todoList2[indexValue].notificationValue;
}

function checkInputField(element, change){
  if (element.value.trim() !== '') {
    change.style.display = 'inline';
  } else {
      change.style.display = 'none';
  }
}

e_clear_btn_t.addEventListener('click', () => {
  e_title.value = '';
  checkInputField(e_title, e_clear_btn_t);
})
e_clear_btn_p.addEventListener('click', () => {
  e_place.value = '';
  checkInputField(e_place, e_clear_btn_p);
})
e_clear_btn_n.addEventListener('click', () => {
  e_notification.value = '';
  checkInputField(e_notification, e_clear_btn_n);
})

e_title.addEventListener('keyup', () => {
  checkInputField(e_title, e_clear_btn_t);
});
e_place.addEventListener('keyup', () => {
  checkInputField(e_place, e_clear_btn_p);
});

e_notification.addEventListener('keyup', () => {
  checkInputField(e_notification, e_clear_btn_n);
});

document.getElementById('save-edit-btn').addEventListener('click', () => {
  const selectedTime = document.getElementById('time').value;
  const [hours, minutes] = selectedTime.split(':');

  let period = 'am';
  let hours12 = parseInt(hours);
  if (hours12 >= 12) {
    period = 'pm';
    if (hours12 > 12) {
      hours12 -= 12;
    }
  }
  const timeValue = `${hours12}:${minutes} ${period}`;

  todoList2[indexValue].todoType = e_todo_type.value;
  todoList2[indexValue].titleValue = e_title.value;
  todoList2[indexValue].placeValue = e_place.value;
  todoList2[indexValue].time = timeValue;
  todoList2[indexValue].notificationValue = e_notification.value;

  localStorage.setItem('todoList', JSON.stringify(todoList2));
});