let todoList =  JSON.parse(localStorage.getItem('todoList')) || [];
let doneList =  JSON.parse(localStorage.getItem('doneList')) || [];
let dbDone = document.getElementById('done-h1');
let dbLeft = document.getElementById('left-h1');

window.onload = () => {
  populate_pending();
  populate_done();
  updateDashboard();
}

function populate_pending(){
  let todoListHTML = '';
  let indexCounter = 0;
  todoList.forEach((todoObject, index) => {
    let { todoType, titleValue, placeValue, time, notificationValue } = todoObject;
    const html = `
     <div class="todo-thing">
       <span class="material-icons status-box display-center" data-index="${indexCounter}">
         check_box_outline_blank
       </span>
       <div class="todo-thing-info">
         <div class="titles">${titleValue}</div>
         <div class="places">${placeValue}</div>
         <div class="times">${time}</div>
       </div>
       <span class="material-icons edit-box display-center" data-index="${indexCounter}">
         edit
       </span>
       <span class="material-icons delete-box display-center" data-index="${indexCounter}">
         remove_circle
       </span>
     </div>
   `;
   todoListHTML += html;
   indexCounter++;
 });
 document.getElementById('p-list').innerHTML = todoListHTML;
}
function populate_done(){
  let doneListHTML = '';
  let indexsCounter = 0;
  doneList.forEach((todoObject, index) => {
    let { todoType, titleValue, placeValue, time, notificationValue } = todoObject;
    const html = `
     <div class="todo-thing">
       <span class="material-icons done-box display-center" style="color: #fbd80c;" data-index="${indexsCounter}">
        <span class="status-selected" data-index="${indexsCounter}">check_box</span>
        <div class="black-back"></div>
       </span>
       <div class="todo-thing-info">
         <div class="titles cancel-line">${titleValue}</div>
         <div class="places cancel-line">${placeValue}</div>
         <div class="times">${time}</div>
       </div>
     </div>
   `;
   doneListHTML += html;
   indexsCounter++;
 });
 document.getElementById('c-list').innerHTML = doneListHTML;
}

function updateDashboard(){
  dbLeft.innerHTML = todoList.length;
  dbDone.innerHTML = doneList.length;
  const percentageWorkDone = Math.round((doneList.length / (todoList.length + doneList.length)) * 100);
  const strokeDashOffset = Math.round(219 - (percentageWorkDone / 100) * 219);
  const dynamicCircle = document.getElementById('dynamic-circle');
  dynamicCircle.style.strokeDashoffset = strokeDashOffset;
  let db_progress_amount = document.getElementById("progress-amount");
  db_progress_amount.innerHTML = percentageWorkDone + '%';
  if(doneList.length === 0 & todoList.length === 0){
    db_progress_amount.innerHTML ='0%';
  }
}
document.getElementById('p-list').addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-box')) {
    const index = event.target.getAttribute('data-index');    
    const indexNumber = parseInt(index, 10);
    if(JSON.parse(localStorage.getItem('indexVal'))) {
      localStorage.removeItem('indexVal');
    }
    localStorage.setItem('indexVal', JSON.stringify(indexNumber));
    window.location.href = "edit-to-do-page.html";
  }
});

document.getElementById('p-list').addEventListener('click', function(event) {
  if (event.target.classList.contains('status-box')) {
    const indexs = parseInt(event.target.getAttribute('data-index'));
      doneList.push({
        todoType: todoList[indexs].todoType,
        titleValue: todoList[indexs].titleValue,
        placeValue: todoList[indexs].placeValue,
        time: todoList[indexs].time,
        notificationValue: todoList[indexs].notificationValue
      })
      localStorage.setItem('doneList', JSON.stringify(doneList));
      populate_done();
      todoList.splice(indexs, 1);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      populate_pending();
      updateDashboard();
  }
});
document.getElementById('c-list').addEventListener('click', function(event) {
  if (event.target.classList.contains('done-box') || event.target.classList.contains('status-selected')) {
    console.log(event.target.getAttribute('data-index'));
    const index = parseInt(event.target.getAttribute('data-index'));
    todoList.push({
      todoType: doneList[index].todoType,
      titleValue: doneList[index].titleValue,
      placeValue: doneList[index].placeValue,
      time: doneList[index].time,
      notificationValue: doneList[index].notificationValue
    })
    localStorage.setItem('todoList', JSON.stringify(todoList));
    populate_pending();
    doneList.splice(index, 1);
    localStorage.setItem('doneList', JSON.stringify(doneList));
    populate_done();
    updateDashboard();
  }
});
document.getElementById('p-list').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-box')) {
    const index = parseInt(event.target.getAttribute('data-index'));
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    populate_pending();
    updateDashboard();
  }
});
