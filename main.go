package main

import (
	"log"

	"github.com/cjtim/go-pwa/internal/pages"
	"github.com/maxence-charriere/go-app/v9/pkg/app"
)

func main() {
	app.Route("/", &pages.Home{})
	app.Route("/home", &pages.Home{})
	app.RunWhenOnBrowser()

	err := app.GenerateStaticWebsite(".", &app.Handler{
		Name:        "Go Progressive web app static!",
		Description: "An Hello World! example",
		Resources:   app.CustomProvider("go-pwa", "go-pwa"),
	})

	if err != nil {
		log.Fatal(err)
	}
}
