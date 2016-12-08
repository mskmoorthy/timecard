package model

import (
    "time"

    "github.com/VCC-Helpdesk/timecard/app/database"
)

type Card struct {
    ID uint32
    Username string
    StartTime time.Time
    EndTime time.Time
}

/*
func SaveCard() {
    stmt, err = database.db.Prepare("INSERT card SET id=?,user
}
*/
