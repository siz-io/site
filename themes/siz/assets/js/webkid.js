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
    var sidebarAd = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? '<iframe class="ad ad-banner-sidebar" src="/assets/html/ad-criteo-sidebar-mobile-300-250-top.html"></iframe>' : '<iframe class="ad ad-banner-sidebar" src="/assets/html/ad-criteo-sidebar-pc-300-250-top.html"></iframe>';
    
    for(var i = 0; i < min; i++) {
      var p = posts[i];
      var date = new Date(p.pubDate);
      var dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
      var imgThumbnail = p.content ? '<div class="thumb-container"><img src="' + p.content.url + '" class="thumb" /></div>' : '';
      var $a = $('<a class="latest-articles-link" href="' + p.link + '"><div class="date">' + dateStr + '</div><div>' + imgThumbnail + '<span class="thumb-span">' + p.title + '</span> ' + '</div></a>');
      
      if(i == 1) {
        $parent.append(sidebarAd);
      }

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
