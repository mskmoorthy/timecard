// TODO: cache frequently used elements up here, assigned in onLoad()
// TODO: Break into multiple JS files?

// database save button should be grayed out if no changes are made
var databaseSaveButton;

// Date we are focused on, starts are current date
//var initDate = moment();
var currentDate = moment();

var down = false;
var cellToggleTo = true;

var cellMinutes = 30;
var selectedCells = 0; // total selected cells in current view

// TOOD: Modify to use durations rather than start timestamps?
var selectedTimestamps = new Set();

function onLoad() {
    databaseSaveButton = document.getElementById("database-save-button");

    databaseSaveButton.disabled = false; //true;
    //databaseSaveButton.textContent = "Saved"; // Should be "save" when enabled

    // Send get request for start and end times of filled durations, with days that information is needed for
    // Will get back filled cells in epoch

    getDatabaseSelected();
    updateHours();
    hideEditTemplate();
}

function clearCells() {
    var day;
    for (var i = 1; i < 8; i++) {
        day = document.getElementById("timecard-day-" + i);

        var dayCells = day.getElementsByClassName("timecard-cell-selected");
        // elements are removed as their classes are changed, must iterate backwards
        for (var j = dayCells.length - 1; j >= 0; j--) {
            dayCells[j].className = "timecard-cell";
        }
    }

    selectedCells = 0;
    updateHours();
}

function saveDatabaseSelected() {
    var selected = JSON.stringify({
        Dates: Array.from(selectedTimestamps)
    });
    xhr = new XMLHttpRequest();
    xhr.open("POST", "/update", true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.send(selected);
    console.log(selected);
    //selectedTimestamps.clear();
}

function getDatabaseSelected() {
    // select cells from database and those in the selected set
    //console.log(selectedTimestamps);
    for (var i = 1; i < 8; i++) {
        day = document.getElementById("timecard-day-" + i);

        var dayCells = day.getElementsByClassName("timecard-cell");
        for (var j = dayCells.length - 1; j >= 0; j--) {
            // reselect cells in the selected set
            if (selectedTimestamps.has(dayCells[j].dataset.timestamp)) {
                tdSelect(dayCells[j]);
            }
        }
    }

}

// move focused date back one week
function prevWeek() {
    currentDate.subtract(1, "week");
    updateDates();
    clearCells();
    getDatabaseSelected();
    for (var i = 1; i < 8; i++) {
        dayUpdateHours(i);
    }
}

// move focused date forward one week
function nextWeek() {
    currentDate.add(1, "week");
    updateDates();
    clearCells();
    getDatabaseSelected();
    for (var i = 1; i < 8; i++) {
        dayUpdateHours(i);
    }
}

// update total hours displayed at top
function updateHours() {
    var totalHours = document.getElementById("total-hours");
    totalHours.textContent = "Total Hours: " + (selectedCells * cellMinutes / 60);
}

function updateDates() {
    for (var i = 1; i < 8; i++) {
        dayInitialize(i);
    }
}

function dayUpdateHours(weekday) {
    // Called on mouse up and leave in day. Modify to happen live in updateHours()

    var day = document.getElementById("timecard-day-" + weekday);

    down = false;
    updateHours();

    var dayHours = 0;

    // Get all selected cells, we can use length to find hours
    var dayCells = day.getElementsByClassName("timecard-cell-selected");

    var headerHours = day.children[2];
    headerHours.textContent = "Hours: " + (dayCells.length * cellMinutes / 60);
}

// initialize day and all its cells
function dayInitialize(weekday) {
    var day = document.getElementById("timecard-day-" + weekday);

    // increment to proper day of week
    var dayDate = moment(currentDate).startOf("week").add(weekday - 1, "day");
    day.dataset.date = dayDate.unix();

    var headerDate = day.children[0];
    var headerWeekday = day.children[1];

    headerDate.textContent = dayDate.format("MM[/]DD[/]YY");
    headerWeekday.textContent = dayDate.format("dddd");

    var dayCells = day.getElementsByClassName("timecard-cell");
    for (let c of dayCells) {
        tdInitialize(c);
    }

    var dayCellsSelected = day.getElementsByClassName("timecard-cell-selected");
    for (let c of dayCellsSelected) {
        tdInitialize(c);
    }
}

// initialize time cell and parse stamp
function tdInitialize(td) {
    //alert("init");
    // tdHourMin will be in 24-hour format 0830 to mean 8:30
    var tdHourMin = td.dataset.hourmin;
    var tdDay = td.closest(".timecard-day");
    var tdTime = moment.unix(tdDay.dataset.date);
    tdTime.set("hour", tdHourMin.substr(0, 2));
    tdTime.set("minute", tdHourMin.substr(2, 4));
    tdTime.set("second", 0);
    tdTime.set("millisecond", 0);
    td.dataset.timestamp = tdTime.unix();
    td.innerHTML = tdTime.format("h:mm a"); // + " - " + tdTime.add(30, "minute").format("h:mm a");
}

// returns true if td is selected, else false
function tdSelected(td) {
    return (td.className == "timecard-cell-selected");
}

function tdSelect(td) {
    if (!tdSelected(td)) {
        td.className = "timecard-cell-selected";
        selectedCells += 1;

        selectedTimestamps.add(td.dataset.timestamp);

        updateHours();
    }
}

function tdUnselect(td) {
    if (tdSelected(td)) {
        td.className = "timecard-cell";
        selectedCells -= 1;

        selectedTimestamps.delete(td.dataset.timestamp);

        updateHours();
    }
}

function tdMouseOver(td) {
    if (!down) {
        return;
    }
    if (cellToggleTo) {
        // changing cells to selected
        tdSelect(td);
    } else {
        // changing cells to unselected
        tdUnselect(td);
    }
    // Hours changed, no longer template-valid
}

function tdMouseDown(td) {
    down = true;
    cellToggleTo = !tdSelected(td);
    tdMouseOver(td);
}

function tdMouseUp(td) {
    down = false;
    updateHours();
}

function showEditTemplate() {
    var select = document.getElementById("templates-select");
    var templatesButton = document.getElementById("templates-button");
    var textInput = document.getElementById("templates-textinput");
    var templatesSaveButton = document.getElementById("templates-save-button");
    var templatesDeleteButton = document.getElementById("templates-delete-button");

    select.style.display = "none";
    templatesButton.style.display = "none";
    textInput.style.display = "inline";
    templatesSaveButton.style.display = "inline";
    templatesDeleteButton.style.display = "inline";

    if (select.selectedIndex == 0) {
        // Making new template
        textInput.value = "New Template";
    } else {
        // Renaming existing template
        textInput.value = select.options[select.selectedIndex].text;
    }

    templateNameInput(textInput);
    textInput.focus();
}

function hideEditTemplate() {
    var select = document.getElementById("templates-select");
    var templatesButton = document.getElementById("templates-button");
    var textInput = document.getElementById("templates-textinput");
    var templatesSaveButton = document.getElementById("templates-save-button");
    var templatesDeleteButton = document.getElementById("templates-delete-button");

    select.style.display = "inline";
    templatesButton.style.display = "inline";
    textInput.style.display = "none";
    templatesSaveButton.style.display = "none";
    templatesDeleteButton.style.display = "none";

    textInput.value = "";
}

// When enter is pressed in text box
function templateNameInput(e) {
    /* if (event.keyCode == 13) {
        saveNewTemplate();
    }*/
    var select = document.getElementById("templates-select");
    var templatesSaveButton = document.getElementById("templates-save-button");
    // Disable save button unless template name is unique
    templatesSaveButton.disabled = false;
    for (var i = 0; i < select.length; i++) {
        if (e.value.trim() == select.options[i].text) {
            // Save button disabled unless template (update) or name changed (new)
            templatesSaveButton.disabled = true;
            break;
        }
    }
}

function saveNewTemplate() {
    var textInput = document.getElementById("templates-textinput");
    var select = document.getElementById("templates-select");
    select.options[select.options.length] = new Option(textInput.value.trim(), "new-template-value");
    hideEditTemplate();
}

function templateSelectChanged(select) {
    if (select.selectedIndex == 0) {
        document.getElementById("templates-button").textContent = "New Template";
    } else {
        document.getElementById("templates-button").textContent = "Edit Template";
    }

    // Apply template to hours
    // set all cells to unselected, select those in the template
}