package database

import (
    "log"

    _ "github.com/go-sql-driver/mysql"
    "github.com/jmoiron/sqlx"
)

var (
    SQL *sqlx.DB
)

func Initiate() {
    SQL, err := sqlx.Connect("mysql",
        "user:password@tcp(127.0.0.1:3306)/hello")
	    if err != nil {
	        log.Fatal(err)
        }

    // Check if it's actually alive
    err = SQL.Ping()
    if err != nil {
        log.Println("Database error!")
    }
}
