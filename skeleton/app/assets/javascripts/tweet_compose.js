$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$el.on('submit', this.submit.bind(this));
};

$.TweetCompose.prototype.submit = function (event) {
  event.preventDefault();
  var formJSON = $(event.currentTarget).serializeJSON();
  $.ajax({
    type: "post",
    url: "/tweets",
    dataType: "json",
    data: formJSON,
    success: this.clearInput.bind(this)
  });
};

$.TweetCompose.prototype.clearInput = function (event) {
  console.log("clear input was called");
  $("form.tweet-compose").children().filter(":input");
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});
