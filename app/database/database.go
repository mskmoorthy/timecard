package database

import (
    "log"

    _ "github.com/go-sql-driver/mysql"
    "github.com/jmoiron/sqlx"
)

var (
    SQL *sqlx.DB
)

func Connect() {
    SQL, err := sqlx.Connect("mysql",
    "root:timecard@tcp(localhost:3306)/timecard")
	    if err != nil {
	        log.Fatal(err)
        }

    // Check if it's actually alive
    err = SQL.Ping()
    if err != nil {
        log.Println("Database error!")
    }
}
