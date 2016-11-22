package main

import (
  "log"
  "html/template"
  "net/http"

  "github.com/julienschmidt/httprouter"
)

type Page struct {
  Title string
  Days []int
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

func main() {
  router := httprouter.New()
  router.GET("/", Index)

  http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
  http.Handle("/", router)

  log.Println("Listening...")
  log.Fatal(http.ListenAndServe(":3000", nil))
}
