var down = false;
var toggleTo = true;

function tdSelected(td) {
    if (td.className == "timecard-cell-selected") {
        return true;
    } else {
        return false;
    }
}

function tdMouseOver(td) {
    if (!down) {
        return;
    }
    if (toggleTo) {
        td.className = "timecard-cell-selected";
    } else {
        td.className = "timecard-cell";
    }
    // Hours changed, no longer template
}

function tdMouseDown(td) {
    down = true;
    toggleTo = !tdSelected(td);
    tdMouseOver(td);
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

    // Disable save button unless name is unique
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
}