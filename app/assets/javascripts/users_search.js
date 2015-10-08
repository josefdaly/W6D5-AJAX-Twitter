  $.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = $('.search-bar');
  this.$users = $('.users');
  this.$input.on('keyup', this.handleInput.bind(this) );
};

$.UsersSearch.prototype.handleInput = function (event) {
  $.ajax({
    type: 'get',
    url: "/users/search",
    data: {query: this.$input.val()},
    dataType: "json",
    success: this.renderResults.bind(this)
  });
};

$.UsersSearch.prototype.renderResults = function (response) {
  this.$users.empty();
  var that = this;
  response.forEach( function(user) {
    console.log(user);
    that.$users.append('<li class="' + user.username + '">' + user.username + '</li>');
    that.$users.append('<button ' + 'class="' + user.username + '"' + "</button>");
    var $button = $('button.' + user.username);
    if (user.followed) {
      var state = "followed";
    } else {
      var state = "unfollowed";
    }

    $button.followToggle({userId: user.id, followState: state});
  });
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
