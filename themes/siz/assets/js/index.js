/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, sr, undefined) {
    "use strict";

    var $document = $(document),

        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

    $document.ready(function () {

        var $postContent = $(".post-content");
        $(".post-content img").addClass('post-img');
        $(".post-content a").addClass('post-link');
        var $postImg = $(".post-img");
        $postContent.fitVids();

        if (window.location.search == "?src=tum") {
            window.scrollTo(0, 480);
        } else {
            window.scrollTo(0, 0);
        }

        if( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $(".post-content .fluid-width-video-wrapper").after("<div id='MarketGidScriptRootC32245'></div>");
            $(".post-content .fb-video").after("<div id='MarketGidScriptRootC32245'></div>");
            $('#MarketGidScriptRootC32245').html('<iframe class="mgid" src="/assets/html/ad-mgid-1-3.html"></iframe>');
        } else {
            $(".post-content .fluid-width-video-wrapper").after("<div id='MarketGidScriptRootC32243'></div>");
            $(".post-content .fb-video").after("<div id='MarketGidScriptRootC32243'></div>");
            $('#MarketGidScriptRootC32243').html('<iframe class="mgid" src="/assets/html/ad-mgid-4-2.html"></iframe>');

            $(".content.clearfix").before("<div class='ad ad-banner-top'></div>");
            $(".content.clearfix").after("<div class='ad ad-banner-bottom'></div>");

            if ($postContent.length != 0) {
                $("#sidebar").css('margin-top', '-132px');
            }

            $('.ad.ad-banner-top').html('<iframe src="/assets/html/ad-criteo-728-90.html"></iframe>');
            $('.ad.ad-banner-bottom').html('<iframe src="/assets/html/ad-criteo-728-90.html"></iframe>');
        }
        function updateImageWidth() {
            var $this = $(this);
            var contentWidth = $postContent.outerWidth(); // Width of the content
            var imageWidth = this.naturalWidth; // Original image resolution

            if (imageWidth >= contentWidth) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }

            if ($postImg.length != 0) {
                if ($postContent.outerWidth() > 570) {
                    if ($postImg[0].clientWidth < $postImg[0].clientHeight) {
                        switch ($postImg.length) {
                            case 1:
                                break;
                            case 2:
                                $postImg.css({
                                    "width": "327px",
                                    "display": "inline-block"
                                });
                                break;
                            case 3:
                                $postImg.css({
                                    "width": "214px",
                                    "display": "inline-block"
                                });
                                break;
                            case 4:
                                $postImg.css({
                                    "width": "327px",
                                    "display": "inline-block"
                                });
                                break;
                            case 6:
                                $postImg.css({
                                    "width": "327px",
                                    "display": "inline-block"
                                });
                                break;
                            case 8:
                                $postImg.css({
                                    "width": "327px",
                                    "display": "inline-block"
                                });
                            default:
                                break;
                        }

                    } else {
                         $postImg.css({
                            "width": "660px",
                            "display": "inline-block"
                        });
                    }
                } else {
                    $postImg.css({
                        "width": "660px",
                        "display": "block"
                    });
                }
            }
        }

        var $img = $("img").on('load', updateImageWidth);
        function casperFullImg() {
            $img.each(updateImageWidth);
        }

        casperFullImg();
        $(window).smartresize(casperFullImg);

        $(".scroll-down").arctic_scroll();

    });

    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this);
            var $htmlBody = $('html, body');
            var offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false;
            var position = ($this.attr('data-position')) ? $this.attr('data-position') : false;
            var toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });
    };
})(jQuery, 'smartresize');
