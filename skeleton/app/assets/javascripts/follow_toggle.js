$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data('user-id') || options.userId;
  this.followState = this.$el.data('initial-follow-state')
                                                        || options.followState;
  this.render();
  var that = this;
  this.$el.on( 'click', this.handleClick.bind(that) );
};

$.FollowToggle.prototype.render = function () {
  if ( this.followState === "unfollowed" ) {
    //jquery button and insert value as follow
    this.$el.text("Follow!");
  } else if ( this.followState === 'followed') {
    this.$el.text("Unfollow!");
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

      that.$el.empty();
      that.$el.text(newButtonText);
    }
  });

};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
