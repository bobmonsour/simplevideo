/*****************************************************************************/
/* youtubeAPI.js - support youtube video playback
/*****************************************************************************/
//
// On client startup, set session vars that dictate the conditions
// for setting up the embedded IFrame YouTube player.
//
//  - ytAPIReady - indicates the readiness of the IFrame Player API
//  - videDetailRendered - indicates the readiness of the video template
//  - ytPlayerState - used to display proper state of play/pause button
//
Meteor.startup(function () {
  Session.set("videoDetailRendered", false);
  Session.set("ytPlayerState", "NOT_PLAYING");
  var ohVideoPlayer;
//
// If the IFrame Player API is not already loaded, load it using
// the method that YouTube describes; see:
//  - https://developers.google.com/youtube/iframe_api_reference#Getting_Started
//
// Check for the existence of the "player" object to determine whether or not
// the IFrame API is loaded since the "player" object only exists when the
// player has been created (see the Tracker.autorun below).
//
  if (typeof ohVideoPlayer === "undefined") {
    Session.set("ytAPIReady", false);
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  // This Tracker.autorun examines the state of two session vars which
  // determine the time to create the IFrame embedded YouTube player. Once
  // created, the IFrame is embedded into a div with the id of 
  // video-player that is located in the appropriate video detail template.
  //
  // Session vars:
  //
  //  ytAPIReady - set when the onYouTubeIframeAPIReady function is called
  //
  //  videDetailRendered - set by Template.<video detail template>.rendered,
  //    indicating that the template housing the player, and thus, the div housing
  //    the IFrame has been rendered into the DOM.
  //
  Tracker.autorun(function () {
    if (Session.equals("ytAPIReady", true) && Session.equals("videoDetailRendered", true)) {
      var settings = Meteor.settings;
      var ytOrigin = settings && settings.public.ytOrigin;
      ohVideoPlayer = new YT.Player("video-player", {
        videoId: Session.get("videoId"), // a known videoId: e-4ssvjz1Sg
        playerVars: {
          "autohide": 1,
          "autoplay": 0,
          "controls": 2,
          "enablejsapi": 1,
          "origin": ytOrigin,
          "fs": 1,
          "iv_load_policy": 3,
          "modestbranding": 1,
          "playsinline": 0,
          "rel": 0,
          "showinfo": 0,
          "html5": 1
        },
        height: "480",
        width: "853",
        events: {
          "onReady": onPlayerReady,
          "onStateChange": onPlayerStateChange,
          "onError": onYouTubeError
        }
      });
    }
  });
});

// Once the YouTube IFrame API loads, this function is called by the API
//  - set session var to indicate API readiness

onYouTubeIframeAPIReady = function () {
  Session.set("ytAPIReady", true);
};

// Once the player object is initialized and "ready"
//  - bind the play/pause click event to the player

var onPlayerReady = function (event) {
  $(".play-pause-button").on("click", function () {
    //  (event.target.getPlayerState === 1) => playing
    if (event.target.getPlayerState() === 1) {
      event.target.pauseVideo();
    } else {
      event.target.playVideo();
    }
  });

  // Bind the SPEED button events: normal, quarter, half, one-and-a-half, and double

  $("#normal-speed-button").on("click", function () {
    speedButton(1);
  });
  $("#quarter-speed-button").on("click", function () {
    speedButton(0.25);
  });
  $("#half-speed-button").on("click", function () {
    speedButton(0.5);
  });
  $("#oneandahalf-speed-button").on("click", function () {
    speedButton(1.5);
  });
  $("#double-speed-button").on("click", function () {
    speedButton(2);
  });

  // On click of one of the speedButtons, set the player"s playback rate to
  // the selected rate. 
  //
  // if the player is PAUSED
  //  - start playing the video at the selected rate
  //  - record the selected rate as the current rate
  // else 
  //   if the player is PLAYING and the selected rate is the same as the
  //      current rate
  //      - pause the video
  //   else (the new rate is different than the currently playing rate)
  //     - continue playing the video
  //     - record the selected rate as the current rate

  var speedButton = function (selectedRate) {
    var playbackRate;
    event.target.setPlaybackRate(selectedRate);
    if (event.target.getPlayerState() === YT.PlayerState.PAUSED) {
      event.target.playVideo();
      playbackRate = selectedRate;
    } else if ((event.target.getPlayerState() === YT.PlayerState.PLAYING) &&
              (selectedRate === playbackRate)) {
      event.target.pauseVideo();
    } else {
      playbackRate = selectedRate;
    }
  };
};

// Handle player state changes

var onPlayerStateChange = function (event) {
  Session.set("ytPlayerState", "NOT_PLAYING");
  switch (event.data) {

  case YT.PlayerState.UNSTARTED:
    break;

  case YT.PlayerState.ENDED:
    break;

  case YT.PlayerState.PLAYING:
    // Set ytPlayerState to drive display of play/pause button
    // Show video speed buttons if available and hidden
    Session.set("ytPlayerState", "PLAYING");

    if ($(".play-pause-button").is(":hidden")) {
      $(".play-pause-button").slideToggle(500);
    }
    if (event.target.getAvailablePlaybackRates().length > 1 && $(".speed-buttons").is(":hidden")) {
      $(".speed-buttons").slideToggle(500);
    }
    break;

  case YT.PlayerState.PAUSED:
    break;

  case YT.PlayerState.BUFFERING:
    break;

  case YT.PlayerState.CUED:
    break;
  }
};

// Handle errors returned by YouTube
//
// See the YouTube docs for more detailed explanations:
// - https://developers.google.com/youtube/iframe_api_reference#Events

var onYouTubeError = function (event) {
  switch (event.data) {
  case 2:
    console.log("YouTube ERROR: invalid parameter value");
    break;
  case 5:
    console.log("YouTube ERROR: HTML5-related player error");
    break;
  case 100:
    console.log("YouTube ERROR:the requested was not found");
    break;
  case 101:
    console.log("YouTube ERROR: not allowed to be play this video in embedded player");
    break;
  case 150:
    console.log("YouTube ERROR: not allowed to be play this video in embedded player");
    break;
  }
};
