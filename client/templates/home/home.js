/*****************************************************************************/
/* Home: Event Handlers and Helpers
/*****************************************************************************/
Template.Home.events({
});

/*****************************************************************************/
/* Home: Lifecycle Hooks
/*****************************************************************************/
Template.Home.rendered = function () {
  // videoDetailRendered session var used in youtubeAPI to determine
  // readiness to play the video; in conjunction with ytAPIReady (also a session var)
  Session.set("videoDetailRendered", true);
};

Template.Home.destroyed = function () {
  Session.set("videoDetailRendered", null);
  Session.set("videoId", null);
};
