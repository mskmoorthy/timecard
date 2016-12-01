// When a cell is clicked, set it and all cells dragged over to its inverse
// Only affect cells in day of start cell
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
        td.className = "timecard-cell-selected"
    } else {
        td.className = "timecard-cell"
    }
}

function tdMouseDown(td) {
    down = true;
    toggleTo = !tdSelected(td);
    tdMouseOver(td);
}