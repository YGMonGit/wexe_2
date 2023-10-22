window.onload = () => {
  document.querySelectorAll('.clear-btn')
    .forEach((element) => {
      element.style.display = 'none';
    });
};


let place = document.getElementById('place');
let title = document.getElementById('title');
let notification = document.getElementById('notification');
let clear_btn_p = document.getElementById('clear-btn-p');
let clear_btn_t = document.getElementById('clear-btn-t');
let clear_btn_n = document.getElementById('clear-btn-n');
let save_btn = document.getElementById('save-btn');
let todoList = [];
if(JSON.parse(localStorage.getItem('todoList'))) todoList = JSON.parse(localStorage.getItem('todoList'));

function checkInputField(element, change){
  if (element.value.trim() !== '') {
    change.style.display = 'inline';
  } else {
      change.style.display = 'none';
  }
}

clear_btn_t.addEventListener('click', () => {
  title.value = '';
  checkInputField(title, clear_btn_t);
})
clear_btn_p.addEventListener('click', () => {
  place.value = '';
  checkInputField(place, clear_btn_p);
})
clear_btn_n.addEventListener('click', () => {
  notification.value = '';
  checkInputField(notification, clear_btn_n);
})

title.addEventListener('keyup', () => {
  checkInputField(title, clear_btn_t);
});
place.addEventListener('keyup', () => {
  checkInputField(place, clear_btn_p);
});

notification.addEventListener('keyup', () => {
  checkInputField(notification, clear_btn_n);
});

save_btn.addEventListener('click', () => {
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

  todoList.push({
    todoType: document.getElementById('todo-type').value,
  titleValue: title.value,
  placeValue: place.value,
  time: timeValue,
  notificationValue: notification.value
  })

  localStorage.setItem('todoList', JSON.stringify(todoList));
});