$(function() {

  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  function renderSite(data) {
    data = $.xml2json(data);
    var posts = data.channel.item;
    renderLatestArticles(posts);
  }

  function renderLatestArticles(posts) {
    var $parent = $('.sidebox.latest-articles .sidebox-content');
    if(!$parent) {return};

    for(var i = 0; i < Math.min(posts.length, 5); i++) {
      var p = posts[i];
      var date = new Date(p.pubDate);
      var dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      var imgThumbnail = p.content ? '<img src="' + p.content.url + '" class="thumb" />' : '';
      var $a = $('<a href="' + p.link + '"><div class="date">' + dateStr + '</div><div>' + imgThumbnail + '<span class="thumbSpan">' + p.title + '</span> ' + '</div></a>');
      
      if(i == 4) {
        $a.addClass('last');
      }
      $parent.append($a);
    }
    
    $parent.removeClass('loading');
  }

  $.ajax({
    dataType: 'xml',
    url: '/rss',
    type: 'GET',
    success: renderSite
  });

});
