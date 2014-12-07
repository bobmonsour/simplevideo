/*****************************************************************************/
/* Client and Server Routes
/*****************************************************************************/
Router.configure({
  loadingTemplate: "Loading",
  notFoundTemplate: "NotFound",
  templateNameConverter: "upperCamelCase",
  routeControllerNameConverter: "upperCamelCase"
});

/*****************************************************************************/
//
//  HOME 
//
Router.route("/", {
  name: "home",
  path: "/",
  template: "Home",
  layoutTemplate: "HomeLayout",

  data: function () {
    Session.set("videoId", "e-4ssvjz1Sg")
    }
});
