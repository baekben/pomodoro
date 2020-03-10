const timer = document.getElementById('timer');
const resume = document.getElementById('start');
// starting time length will be 25 minutes
var countLength = 25;
var startTime;
var endTime;

var pause = false;
var timeInterval;
var timeLeft;

function remainingTime(end) {
  var time = Date.parse(end) - Date.parse(new Date());
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 1000 / 60) % 60);
  return { totalTime: time, minutes: minutes, seconds: seconds };
}

function menuLength(length, id) {
  //create list of number from 1-25 for sessions
  // 1-5 for breaks
  var menu = document.getElementById(`${id}`);
  for (let i = 0; i < length; i++) {
    var item = document.createElement('option');
    item.setAttribute('value', `${i + 1}`);
    var option = document.createTextNode(`${i + 1}`);
    item.appendChild(option);
    menu.appendChild(item);
  }
  document.getElementById(`${id}`).classList.toggle('show');

  //hide the list
  //show list if clicked
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('drop-content');
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        this.menu.innerHTML = '';
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
  if (!pause) {
    resume.innerHTML = 'Resume';
    pause = true;
    clearInterval(timeInterval);
    timeLeft = remainingTime(endTime).totalTime;
    console.log('Timer stopped ...');
  }
}
function runTimer() {
  var time = remainingTime(endTime);
  let minutes = time.minutes;
  let seconds = time.seconds;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timer.innerHTML = `${minutes}:${seconds}`;
  if (time.totalTime <= 0) {
    clearInterval(timeInterval);
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
