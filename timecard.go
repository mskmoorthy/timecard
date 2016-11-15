package main

import (
  "log"
  "net/http"

  "github.com/julienschmidt/httprouter"
)

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  http.ServeFile(w, r, "templates/index.html")
}

func main() {
  router := httprouter.New()
  router.GET("/", Index)

  http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
  http.Handle("/", router)

  log.Println("Listening...")
  http.ListenAndServe(":3000", nil)
}
