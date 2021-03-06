const timer = document.getElementById('timer');
const resume = document.getElementById('start');
// starting time length will be default at 25
var countLength = 25; //time can be changed
var startTime;
var endTime;

var pause = false;
var timeInterval;
var timeLeft;
var menu;
var rest = 5;

function remainingTime(end) {
  var time = Date.parse(end) - Date.parse(new Date());
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 1000 / 60) % 60);
  return { totalTime: time, minutes: minutes, seconds: seconds };
}

function menuLength(length, id) {
  //create list of number from 1-25 for sessions
  // 1-5 for breaks
  var itemId;
  if (id == 'dropdownUno') {
    countLength = length;
    sessionTime = length; //holds the choosen session length
  } else {
    rest = length;
  }
  menu = document.getElementById(`${id}`);
  for (let i = 0; i < length; i++) {
    var item = document.createElement('option');
    item.setAttribute('value', `${i + 1}`);
    if (id == 'dropdownUno') {
      itemId = 'number';
    } else {
      itemId = 'number-menu';
    }
    item.setAttribute('id', itemId);

    var option = document.createTextNode(`${i + 1}`);
    item.appendChild(option);
    menu.appendChild(item);
  }
  document.getElementById(`${id}`).classList.toggle('show');
}

//closes out of options if clicked anywhere besides options
window.onclick = function(event) {
  if (event.target.matches('#number-menu')) {
    var numOfBreaks = document.getElementById('dropdownDos');
    this.rest = numOfBreaks[numOfBreaks.selectedIndex].value;
    var restNum = this.document.getElementById('breakAmt');
    restNum.innerHTML = `${this.rest}`;
  }
  if (event.target.matches('#number')) {
    //choosing new minutes
    var selectUno = document.getElementById('dropdownUno');
    this.countLength = selectUno[selectUno.selectedIndex].value;
    this.console.log(selectUno);
    this.countLength =
      this.countLength < 10 ? '0' + this.countLength : this.countLength;
    timer.innerHTML = `${this.countLength}:00`;
    var minutes = this.document.getElementById('minutes');
    minutes.innerHTML = `${this.countLength}`;
  }
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('drop-content');
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        menu.innerHTML = ''; //deletes menu
      }
    }
  }
};

function startTimer() {
  if (pause) {
    pause = false;
    resume.innerHTML = 'Start';
    endTime = new Date(Date.parse(new Date()) + timeLeft);
  } else {
    //have count length here and maybe function for user to choose length
    startTime = Date.parse(new Date());
    endTime = new Date(startTime + countLength * 60 * 1000);
    console.log('Starting timer ...');
  }
  runTimer();
  timeInterval = setInterval(runTimer, 1000);
}

function stopTimer() {
  if (!pause && timeLeft > 0) {
    resume.innerHTML = 'Resume';
    pause = true;
  }
  clearInterval(timeInterval);
  timeLeft = remainingTime(endTime).totalTime;
  console.log('Timer stopped ...');
}

function runTimer() {
  var time = remainingTime(endTime);
  let minutes = time.minutes;
  let seconds = time.seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timer.innerHTML = `${minutes}:${seconds}`;
  if (time.totalTime <= 0) {
    clearInterval(timeInterval);
    stopTimer();
    breakTime();
  }
}

function reset() {
  pause = false;
  timeLeft = 0;
  clearInterval(timeInterval);
  timer.innerHTML = `${countLength}:00`;
  resume.innerHTML = 'Start';
  console.log('Timer reset ...');
}

function breakTime() {
  var status = document.getElementById('status');
  if (status.innerHTML == 'Working') {
    breakNum = rest; //amount of breaks
    breakNum -= 1;
    pause = false;
    timeLeft = 0;
    console.log(breakNum);
    clearInterval(timeInterval);
    if (breakNum > 1) {
      alert('Time for a quick break');
      countLength = 5;
    } else if (breakNum == 1) {
      alert(
        "You have completed four sessions so far! \n You've earned a 30 minute break!"
      );
      countLength = 30;
    }
    if (breakNum == 0) {
      //default rest amount
      breakNum = 5;
    }
    status.innerHTML = 'Break Time';
  } else {
    status.innerHTML = 'Working';
    countLength = sessionTime;
  }
  timer.innerHTML = `${countLength}:00`;
}
