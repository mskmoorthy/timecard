package controller

import (
    "net/http"
    "strings"
    "github.com/julienschmidt/httprouter"
)

func Static(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    if strings.HasSuffix(r.URL.Path, "/") {
        http.NotFound(w, r)
        return
    }
    http.ServeFile(w, r, r.URL.Path[1:])
}
