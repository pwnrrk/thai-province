import Router from "../app/libs/router";

Router.get("/", "home@index", false);
Router.get("/search", "home@search", false);
Router.get("/provinces", "province@all", false);
Router.get("/provinces/:id", "province@get", false);
Router.get("/districts", "district@all", false);
Router.get("/sub_districts", "sub_district@all", false);
