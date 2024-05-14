const timerSlots = document.querySelectorAll("input");

// const slot1 = document.querySelector("#time-slot-1");
const slot1 = document.getElementById('time-slot-1');
const slot2 = document.querySelector("#time-slot-2");
const slot3 = document.querySelector("#time-slot-3");
console.log(slot1);
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
        }
    }else if (slot3.value.length > 2){
        slot3.value = slot3.value.substring(0,2);  
    }
});





function leadingZeros(input) {
    if(!isNaN(input.value) && input.value.length === 1) {
      input.value = '0' + input.value;
    }
  }
// input.addEventListener("keypress", logKey);

// function logKey(e) {
//   log.textContent += ` ${e.code}`;
// }

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter, errMsg) {
    [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
      textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
          // Accepted value.
          if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
            this.classList.remove("input-error");
            this.setCustomValidity("");
          }
  
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        }
        else if (this.hasOwnProperty("oldValue")) {
          // Rejected value: restore the previous one.
          this.classList.add("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
        else {
          // Rejected value: nothing to restore.
          this.value = "";
        }
      });
    });
  }