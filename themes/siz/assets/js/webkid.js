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

    var min = Math.min(posts.length, 5);

    for(var i = 0; i < min; i++) {
      var p = posts[i],
      date = new Date(p.pubDate),
      dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear(),
      imgThumbnail = p.content ? '<div id="thumb-container"><img src="' + p.content.url + '" class="thumb" /></div>' : '',
      $a = $('<a class="latest-articles-link" href="' + p.link + '"><div class="date">' + dateStr + '</div><div>' + imgThumbnail + '<span class="thumb-span">' + p.title + '</span> ' + '</div></a>');
      
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
