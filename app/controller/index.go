package controller

import (
    "net/http"
    "html/template"
    "github.com/julienschmidt/httprouter"
)

type Page struct {
    Title string
    Days []int
}

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    p := Page{Title: "home", Days: []int{1,2,3}}
    thetemplate := template.Must(template.ParseFiles("templates/days.html", "templates/layout.html"))
    err := thetemplate.ExecuteTemplate(w, "layout", &p)

    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}
