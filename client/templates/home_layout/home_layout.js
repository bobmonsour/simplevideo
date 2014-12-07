/*****************************************************************************/
/* HomeLayout: Event Handlers and Helpers
/*****************************************************************************/
// Template.HomeLayout.events({
// });

Template.HomeLayout.helpers({
  randomCoverImage: function () {
    var homeImageIndex = Math.floor(Math.random() * (14 - 1)) + 1;
    Session.set("whichHomeImage", homeImageIndex);
    var imageRef = "home-wide-image-" + homeImageIndex + ".jpg";
    // console.log("image reference: " + imageRef);
    return imageRef;
  }
});

/*****************************************************************************/
/* HomeLayout: Lifecycle Hooks
/*****************************************************************************/
// Template.HomeLayout.created = function () {
// };

// Template.HomeLayout.rendered = function () {
//   // console.log("master layout rendered");
// };

// Template.HomeLayout.destroyed = function () {
// };
