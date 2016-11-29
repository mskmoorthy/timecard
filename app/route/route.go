package route

import (
    "log"
    "net/http"
    "github.com/julienschmidt/httprouter"

    "github.com/VCC-Helpdesk/timecard/app/controller"
)

func Route() *httprouter.Router {
    r := httprouter.New()

    r.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Println("NOT FOUND")
    })

    // Static Files
    r.GET("/static/*filepath", controller.Static)

    // Index
    r.GET("/", controller.Index)

    return r
}
