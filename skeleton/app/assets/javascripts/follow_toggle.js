$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = $('.follow-toggle').data('user-id');
  this.followState = $('.follow-toggle').data('initial-follow-state');
  this.render();
  var that = this;
  $('.follow-toggle').on( 'click', this.handleClick.bind(that) );
};

$.FollowToggle.prototype.render = function () {
  if ( this.followState === "unfollowed" ) {
    //jquery button and insert value as follow
    $(".follow-toggle").text("Follow!");
  } else if ( this.followState === 'followed') {
    $(".follow-toggle").text("Unfollow!");
  }
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  if ( this.followState === 'unfollowed') {
    var requestType = 'post';
  } else if ( this.followState === 'followed') {
    var requestType = 'delete';
  }

  var that = this;
  $.ajax({
    type: requestType,
    url: '/users/' + this.userId +'/follow',
    dataType: "json",
    success: function () {
      if ( that.followState === 'followed') {
        that.followState = "unfollowed";
        var newButtonText = 'Follow!';
      } else if ( that.followState === 'unfollowed') {
        that.followState = "followed";
        var newButtonText = 'Unfollow!';
      }

      $('button.follow-toggle').empty();
      $('.follow-toggle').text(newButtonText);
    }
  });

};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
