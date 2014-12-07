Template.VideoPlaybackButtons.helpers({
  playPauseIcon: function () {
    if (Session.get("ytPlayerState") === "PLAYING") {
      return "fa-pause";
    } else {
      return "fa-play";
    }
  }
});