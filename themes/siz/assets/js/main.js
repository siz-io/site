/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
;(function ($, sr) {
  'use strict'

  var $document = $(document)

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout

    return function debounced () {
      var obj = this
      var args = arguments

      var delayed = function () {
        if (!execAsap) {
          func.apply(obj, args)
        }
        timeout = null
      }

      if (timeout) {
        clearTimeout(timeout)
      } else if (execAsap) {
        func.apply(obj, args)
      }

      timeout = setTimeout(delayed, threshold || 100)
    }
  }

  $document.ready(function () {
    $('ins#aswift_0_expand').css('border', '1px solid #000')
    $('iframe#google_ads_frame1').css('border', '1px solid #000')
    $('.ad-banner-middle-sidebar .adsbygoogle').css({'width': '302px', 'height': '252px'})
    $('.ad-criteo-above-video .adsbygoogle').css({'width': '302px', 'height': '252px'})
    $('.ad-criteo-bellow-video .adsbygoogle').css({'width': '302px', 'height': '252px'})
    $('.ad-banner-top .adsbygoogle').css({'width': '730', 'height': '92px'})
    $('.ad-banner-post .adsbygoogle').css({'width': '730', 'height': '92px'})
    $('.ad-banner-bottom .adsbygoogle').css({'width': '730', 'height': '92px'})
    $('.ad-banner-post-bottom .adsbygoogle').css({'width': '730', 'height': '92px'})
    $('.ad-criteo-desktop-above-video .adsbygoogle').css({'width': '730', 'height': '92px'})
    $('.ad-criteo-desktop-bellow-video .adsbygoogle').css({'width': '730', 'height': '92px'})
    if ($('.post-content p').text().match(/"([^""]+)"/)) {
      $('.post-content p').css('text-align', 'inherit')
    }

    if ((/Android/i.test(navigator.userAgent))) {
      $('.ad-criteo-above-video').css('margin-left', '-10px')
      $('.ad-criteo-bellow-video').css('margin-left', '-10px')
    }

    if (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
      $('iframe#instagram-embed-0').css({'width': '660px', 'margin': 'auto'})
      var sidebarTop = $('.ad.ad-banner-middle-sidebar').offset().top - 170

      if ($('.post-content').length) { // Check whether we are on a post page
        if ($('#article').height() > $('#sidebar').height()) {
          $('#article').css('margin-bottom', '450px')
        }
        $('.sidebar-container').sticky({topSpacing: -sidebarTop})
        $('.sidebox-content').css('height', 'auto')
      }
    }

    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    var renderSite = function (data) {
      data = $.xml2json(data)
      var posts = data.channel.item
      renderLatestArticles(posts)
    }

    var renderLatestArticles = function (posts) {
      var $parent = $('.sidebox.latest-articles .sidebox-content')
      if (!$parent) {
        return
      }

      var min = Math.min(posts.length, 5)
      for (var i = 0; i < min; i++) {
        var p = posts[i]
        var date = new Date(p.pubDate)
        var dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
        var imgThumbnail = p.content ? '<div class="thumb-container"><img src="' + p.content.url + '" class="thumb" /></div>' : ''
        var $a = $('<a class="latest-articles-link" href="' + p.link + '"><div class="date">' + dateStr + '</div><div>' + imgThumbnail + '<span class="thumb-span">' + p.title + '</span> ' + '</div></a>')

        // Do this if you have an ad on the sidebar

        if (i === 0) {
          $parent.prepend($a)
        } else {
          $parent.append($a)
        }

        if (i === 4) {
          $a.addClass('last')
        }
      }
      $parent.removeClass('loading')
    }

    $.ajax({
      dataType: 'xml',
      url: '/rss',
      type: 'GET',
      success: renderSite
    })

    var $postContent = $('.post-content')
    $('.post-content img').addClass('post-img')
    $('.post-content a').addClass('post-link')
    var $postImg = $('.post-img')
    $postContent.fitVids()

    // var ghostAsset = function (path) {
    //   return $('meta[property="ghost-asset:' + path + '"]').attr('content') || 'Asset not exposed'
    // }

    if (/iPad/i.test(navigator.userAgent)) { $('#taglist li:nth-child(6)').nextAll().remove() }
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $('#taglist li:nth-child(4)').nextAll().remove()
      $('#taglist li').css('display', 'block')
    }

    var updateImageWidth = function () {
      var $this = $(this)
      var contentWidth = $postContent.outerWidth() // Width of the content
      var imageWidth = this.naturalWidth // Original image resolution

      if (imageWidth >= contentWidth) {
        $this.addClass('full-img')
      } else {
        $this.removeClass('full-img')
      }

      if ($postImg.length !== 0) {
        if ($postContent.outerWidth() > 570) {
          if ($postImg[0].clientWidth < $postImg[0].clientHeight) {
            switch ($postImg.length) {
              case 1:
                break
              case 2:
                if (!$postImg.prev('p')) {
                  $postImg.css({
                    'width': '327px',
                    'display': 'inline-block'
                  })
                } else {
                  $postImg.css({
                    'width': '660px',
                    'margin': 'auto'
                  })
                }
                break
              case 3:
                if (!$postImg.prev('p')) {
                  $postImg.css({
                    'width': '214px',
                    'display': 'inline-block'
                  })
                } else {
                  $postImg.css({
                    'width': '660px',
                    'margin': 'auto'
                  })
                }
                break
              case 4:
                $postImg.css({
                  'width': '327px',
                  'display': 'inline-block'
                })
                break
              case 6:
                $postImg.css({
                  'width': '327px',
                  'display': 'inline-block'
                })
                break
              case 8:
                $postImg.css({
                  'width': '327px',
                  'display': 'inline-block'
                })
                break
              default:
                break
            }
          } else {
            $postImg.css({
              'width': '660px',
              'display': 'inline-block'
            })
          }
        } else {
          $postImg.css({
            'width': '660px',
            'display': 'block'
          })
        }
      }
    }

    var $img = $('img').on('load', updateImageWidth)

    var casperFullImg = function () {
      $img.each(updateImageWidth)
    }

    casperFullImg()
    $(window).smartresize(casperFullImg)

    $('.scroll-down').arctic_scroll()
  })
  // smartresize
  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr)
  }

  // Arctic Scroll by Paul Adam Davis
  // https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = function (options) {
    var defaults = {
      elem: $(this),
      speed: 500
    }

    var allOptions = $.extend(defaults, options)

    allOptions.elem.click(function (event) {
      event.preventDefault()
      var $this = $(this)
      var $htmlBody = $('html, body')
      var offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false
      var position = ($this.attr('data-position')) ? $this.attr('data-position') : false
      var toMove

      if (offset) {
        toMove = parseInt(offset, 10)
        $htmlBody.stop(true, false).animate({
          scrollTop: ($(this.hash).offset().top + toMove)
        }, allOptions.speed)
      } else if (position) {
        toMove = parseInt(position, 10)
        $htmlBody.stop(true, false).animate({
          scrollTop: toMove
        }, allOptions.speed)
      } else {
        $htmlBody.stop(true, false).animate({
          scrollTop: ($(this.hash).offset().top)
        }, allOptions.speed)
      }
    })
  }
})(jQuery, 'smartresize')
