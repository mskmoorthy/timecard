package controller

import (
    "net/http"
    "html/template"
    "time"

    "github.com/julienschmidt/httprouter"
)

type Page struct {
    Title string
    Days []int
    Timestamps []string
}

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    starthour := 8
    endhour := 23
    //intervals := 30

    slots := make([]string, 0)
    thetime := time.Date(2016,12,8,starthour,0,0,0,time.UTC)

    mins := 0
    for hr := starthour; hr < endhour; {
        slots = append(slots, thetime.Format("1504"))
        thetime = thetime.Add(30 * time.Minute)
        mins += 30
        if mins == 60 {
            mins = 0
            hr++
        }
    }

    p := Page{Title: "home", Days: []int{1,2,3,4,5,6,7}, Timestamps: slots}
    thetemplate := template.Must(template.ParseFiles("templates/days.html", "templates/layout.html"))
    err := thetemplate.ExecuteTemplate(w, "layout", &p)

    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

