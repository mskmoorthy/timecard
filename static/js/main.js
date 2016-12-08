// TODO: cache frequently used elements up here, assigned in onLoad()
// TODO: Break into multiple JS files?

// database save button should be grayed out if no changes are made
var databaseSaveButton;

// Date we are focused on, starts are current date
var currentDate = moment();

var down = false;
var cellToggleTo = true;

var cellMinutes = 60;
var selectedCells = 0;
// TOOD: Modify to use durations rather than start timestamps?
var selectedTimestamps = [];

function onLoad() {
    databaseSaveButton = document.getElementById("database-save-button");

    databaseSaveButton.disabled = true;

    updateDates();
    updateHours();
    hideEditTemplate();
}

function updateDates() {
    // iterate days and increment date
    var dayDate = moment(currentDate);
    dayDate.startOf("week");
    for (var i = 1; i < 8; i++) {
        var day = document.getElementById("timecard-day-" + (i));
        var dayHeader = day.getElementsByClassName("timecard-day-header")[0];
        var headerDate = dayHeader.getElementsByClassName("day-header-date")[0];
        var headerWeekday = dayHeader.getElementsByClassName("day-header-weekday")[0];
        headerDate.textContent = dayDate.format("MM[/]DD[/]YY")
        headerWeekday.textContent = dayDate.format("dddd");
        dayDate.add(1, 'd');
    }
}

function prevWeek() {
    // move focused date back one week
    currentDate.subtract(1, "week");
    updateDates();
}

function nextWeek() {
    // move focused date forward one week
    currentDate.add(1, "week");
    updateDates();
}

function updateHours() {
    var totalHours = document.getElementById("total-hours");
    totalHours.textContent = "Total Hours: " + (selectedCells * cellMinutes / 60);
}

function updateDayHours(day) {
    // Called on mouse up and leave in day. Modify to happen live in updateHours()
    down = false;
    updateHours();

    var dayHours = 0;

    // Get all selected cells, we can use length to find hours
    var dayCells = day.getElementsByClassName("timecard-cell-selected");

    // Get header hours field and fill it in
    var dayHeader = day.getElementsByClassName("timecard-day-header")[0];
    var headerHours = dayHeader.getElementsByClassName("day-header-hours")[0];
    headerHours.textContent = "Hours: " + (dayCells.length * cellMinutes / 60);
}

function tdSelected(td) {
    return (td.className == "timecard-cell-selected");
}

function tdMouseOver(td) {
    if (!down) {
        return;
    }
    if (cellToggleTo) {
        // changing cells to selected
        if (!tdSelected(td)) {
            td.className = "timecard-cell-selected";
            selectedCells += 1;
            updateHours();
        }
    } else {
        // changing cells to unselected
        if (tdSelected(td)) {
            td.className = "timecard-cell";
            selectedCells -= 1;
            updateHours();
        }
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