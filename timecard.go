package main

import (
    "log"
    "net/http"

    "github.com/VCC-Helpdesk/timecard/app/route"
    "github.com/VCC-Helpdesk/timecard/app/database"
)

func main() {
    h := route.Route()
    log.Println("Listening...")
    database.Connect()

    log.Fatal(http.ListenAndServe(":3000", h))
}
