package main

import (
    "log"
    "net/http"

    "github.com/VCC-Helpdesk/timecard/app/route"
)

/*
type Page struct {
  Title string
  Days []int
  Times []string
}

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  //http.ServeFile(w, r, "templates/index.html")

  p := Page{Title: "home", Days: []int{1,2,3}}
  thetemplate := template.Must(template.ParseFiles("templates/days.html", "templates/layout.html"))
  err := thetemplate.ExecuteTemplate(w, "layout", &p)

  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
}
*/

func main() {
/*
  router := httprouter.New()
  router.GET("/", Index)

  http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
  http.Handle("/", router)
*/

    h := route.Route()
    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":3000", h))
}
