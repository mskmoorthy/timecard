package model

import (
  "github.com/VCC-Helpdesk/timecard/app/database"
)

type User struct {
  ID uint32
  Username string
  FirstName string
  LastName string
}

func CreateUser(username, firstname, lastname) {
    database.SQL.Exec("INSERT INTO users (username, firstname, lastname) VALUES (?,?,?)", username, firstname, lastname)
}

func GetUserByUsername(username string) (User) {
    result := User{}

    database.SQL.Get(&result, "SELECT firstname, lastname FROM users WHERE username = ? LIMIT 1", username)
    return result
}
