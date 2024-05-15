// const slot1 = document.querySelector("#time-slot-1");
const slot1 = document.getElementById('time-slot-1');
const slot2 = document.querySelector("#time-slot-2");
const slot3 = document.querySelector("#time-slot-3");

//Clicking textbox selects value
[slot1, slot2, slot3].forEach(slot =>{
    slot.addEventListener('click', ()=>{
        slot.select();
    });
});

//keyboard input flows between all 3 input elements
slot1.addEventListener('input', () =>{
    slot1.value = slot1.value.replace(/[^0-9]/g, '');
    if (slot1.value.length > 2){
        slot1.value = slot1.value.substring(0,2);  
        slot2.focus();
        slot2.select();
    }
});
slot2.addEventListener('input', (event) =>{
    slot2.value = slot2.value.replace(/[^0-9]/g, '');
    if (slot2.value.length == 0){
        if (event.inputType == 'deleteContentBackward'){
            slot1.focus();
            slot2.value = "00";
        }
    }else if (slot2.value.length > 2){
        slot2.value = slot2.value.substring(0,2);  
        slot3.focus();
        slot3.select();
    }
});
slot3.addEventListener('input', (event) =>{
    slot3.value = slot3.value.replace(/[^0-9]/g, '');
    if (slot3.value.length == 0){
        if (event.inputType == 'deleteContentBackward'){
            slot2.focus();
            slot3.value = "00";
        }
    }else if (slot3.value.length > 2){
        slot3.value = slot3.value.substring(0,2);  
    }
});

const addTimerBtn = document.querySelector(".add-timer-button");
addTimerBtn.addEventListener('click', ()=>{
    createNewTimer(slot1.value, slot2.value, slot3.value);
});


var clocks = [];
function createNewTimer(time1,time2,time3){
    const newDiv = document.createElement('div');
    if (time2>=60){time2=59};
    if (time3>=60){time3=59};
    newDiv.innerHTML = `
        <div class="timer-clock">
            <div class="timer-clock-1">${time1}</div>
            <div>:</div>
            <div class="timer-clock-2">${time2}</div>
            <div>:</div>
            <div class="timer-clock-3">${time3}</div>
        </div>
    `;  
    const timerList = document.querySelector(".timer-list");
    timerList.appendChild(newDiv);

    let seconds = parseInt(time3)+ 60*parseInt(time2)+3600*parseInt(time1);
    clocks.push({'seconds':seconds, clock:newDiv.children[0]});
};

function updateTime(clock){
    if (clock['seconds'] == 0){
        return;
    }
    clock['seconds'] -= 1;
    const sec = new Date(clock['seconds'] * 1000).toISOString()
    const timer = clock['clock'].children;
    timer[0].textContent = sec.slice(11,13);
    timer[2].textContent = sec.slice(14,16);
    timer[4].textContent = sec.slice(17,19);
};

var interval = 1000; // ms
var expected = Date.now() + interval;
setTimeout(step, interval);
function step() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)
    if (dt > interval) {
        // alert('timers are out of sync')
    }
    clocks.forEach(clock =>{    
        updateTime(clock);
    });


    // new Date(SECONDS * 1000).toISOString().slice(11, 19);
    expected += interval;
    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
};

