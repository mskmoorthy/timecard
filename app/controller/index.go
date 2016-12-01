package controller

import (
    "net/http"
    "html/template"
    "github.com/julienschmidt/httprouter"
)


type Page struct {
    Title string
    Days []int
    Hours []int
}

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    p := Page{Title: "home", Days: []int{1,2,3,4,5,6,7}, Hours: []int{8,9,10,11,12,1,2,3,4,5,6,7,8,9,10}}
    thetemplate := template.Must(template.ParseFiles("templates/days.html", "templates/layout.html"))
    err := thetemplate.ExecuteTemplate(w, "layout", &p)

    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}
