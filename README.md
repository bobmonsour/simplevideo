simplevideo
===========
Simple meteor app to play a video using the [YouTube iFrame API](https://developers.google.com/youtube/iframe_api_reference)

This is a clonable/runable single page Meteor app that has embeds a YouTube video using the [YouTube iFrame API](https://developers.google.com/youtube/iframe_api_reference).

It has a single route using iron:router, a simple bootstrap-based stylesheet, and a couple of templates. This is the
core video functionality of the http://OneHanders.com website.

Several player controls (pause/play, 5 speed selections) are exported outside of the video player frame for usability. These are handy
for sites like http://OneHanders.com where the viewer wants to see specific tennis strokes in slow motion.