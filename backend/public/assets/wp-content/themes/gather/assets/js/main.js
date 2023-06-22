/*
 * @package Gather - Event Landing Page Wordpress Theme
 * @author Cththemes - http://themeforest.net/user/cththemes
 * @date: 06-03-2020
 *
 * @copyright  Copyright ( C ) 2014 - 2015 cththemes.com . All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE
*/

jQuery(function($) {

    "use strict";

    /* ================================================
       On Scroll Menu
       ================================================ */

    $(window).scroll(function() {
        if ($(window).scrollTop() > 600) {
            $('.js-reveal-menu').removeClass('reveal-menu-hidden').addClass('reveal-menu-visible');
        } else {
            $('.js-reveal-menu').removeClass('reveal-menu-visible').addClass('reveal-menu-hidden');
        }
    });

    /* ================================================
       Parallax Header
       ================================================ */

    if ($('.parallax-bg').length) {
        $('.parallax-bg').parallax({
            speed: 0.20
        });
    }

    /* ================================================
       FLEX SLIDER
       ================================================ */

    if ($('.blogslider').length) {
        $('.blogslider').flexslider({
            animation: "slide",
            useCSS: Modernizr.touch,
        });
    }
    var cf = jQuery(".cth-flexslider");
    var optionsData = cf.data('options') ? JSON.parse(decodeURIComponent(cf.data('options'))) : {slideshow:true,animation:'fade',direction:'horizontal',smoothHeight:false,slideshowSpeed:7000,controlNav:true,directionNav:true};
    cf.flexslider({
        slideshow: optionsData.slideshow,
        animation: optionsData.animation,
        direction: optionsData.direction,
        smoothHeight: optionsData.smoothHeight,
        slideshowSpeed: optionsData.slideshowSpeed,

        directionNav: optionsData.directionNav,
        controlNav: optionsData.controlNav,
        
    });
    if ($('.blogsingleslider').length) {
        $('.blogsingleslider').flexslider({
            //animation: "slide",
        });
    }

    jQuery('.bg-slideshow-slider').flexslider({
        animation: "fade",
        controlNav: false,  
        directionNav: false, 
    });

    /* ================================================
       Initialize Countdown
       ================================================ */

    /*Fetch Event Date From HTML. For Not tech Savvy Users */
    if($('.countdown').length > 0){
        $('.countdown').each(function(index){
            var $this = $(this);
            var get_date = $this.data('event-date');

            if (get_date) {
                $this.countdown({
                    date: get_date,
                    /*Change date and time in HTML data-event-date attribute */
                    format: "on"
                },function(){
                    //console.log('event ended')
                });
            }
        });
    }

    /* ================================================
       Initialize Tabs
       ================================================ */

    $('#schedule-tabs a').on("click",function(e) {
        e.preventDefault()
        $(this).tab('show')
    });

    /* ================================================
       Stat Counter
       ================================================ */

    $('#stats-counter').appear(function() {
        $('.count').countTo({
            refreshInterval: 50
        });
    });

    /* ================================================
       Initialize Slick Slider 
       ================================================ */

    /* 
       SLICK SLIDER
       ------------ */

    if ($('.slick-slider').length) {
        $('.slick-slider').slick({
            pauseOnHover:false,
        });
    }

    /* 
    SPONSORS
    -------- */

    if ($('.sponsor-slider').length) {
        $('.sponsor-slider').slick({
            centerPadding: '30px',
            pauseOnHover:false,
        });
    }
    /* 
       SPEAKERS
       -------- */

    if ($('.speaker-slider').length) {
        $('.speaker-slider').slick({
            pauseOnHover:false,
        });
    }

    /* ================================================
       Scroll Functions
       ================================================ */

    $(window).scroll(function() {
        if ($(window).scrollTop() > 1000) {
            $('.back_to_top').fadeIn('slow');
        } else {
            $('.back_to_top').fadeOut('slow');
        }
    });

    $('nav a[href^="#"]:not([href="#"]), .back_to_top, .custom-scroll-link').on('click', function(event) {
        var $anchor = $(this);
        $('.collapse').collapse('hide');
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500);
        event.preventDefault();
    });

});

    /* ================================================
      Video Gallery
      ================================================ */

    jQuery(".play-video").on("click",function(e) {
        e.preventDefault();
        var videourl = jQuery(this).data("video-url");
        jQuery(this).append('<i class="video-loader fa fa-spinner fa-spin"></i>')
        jQuery('.media-video iframe').attr('src', videourl);
        setTimeout(function() {
            jQuery('.video-loader').remove();
        }, 1000);
    });

    /* ================================================
       Magnific Popup
       ================================================ */
    // if(jQuery('.speaker_link').length){
    
    //     jQuery(".speaker_link").magnificPopup({
    //         type: "inline"
    //     });
    // }
    if(jQuery('.speaker_link').length){
        jQuery(".speaker_link").each(function(){
            $that = jQuery(this);
            $that.magnificPopup({
                disableOn: 100,
                items: {
                    src: $that.attr('data-mfp-src'),
                    type: 'inline'
                }
            });
        });
    }
    if (jQuery('.popup-video').length) {
        jQuery(".popup-video").magnificPopup({
            disableOn: 700,
            type: "iframe",
            removalDelay: 600,
            mainClass: "my-mfp-slide-bottom"
        });
    }
    if (jQuery('.popup-gallery').length) {
        jQuery('.popup-gallery').magnificPopup({
            delegate: 'a:not(.popup-video)',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
    }

    /* ================================================
       jQuery Validate - Reset Defaults
       ================================================ */

    jQuery.validator.setDefaults({
        highlight: function(element) {
            jQuery(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            jQuery(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'small',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            }
            if (element.parent('label').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    /* ================================================
       Add to Calendar
       ================================================ */

    (function() {
        if (window.addtocalendar)
            if (typeof window.addtocalendar.start == "function") return;
        if (window.ifaddtocalendar == undefined) {
            window.ifaddtocalendar = 1;
            var d = document,
                s = d.createElement('script'),
                g = 'getElementsByTagName';
            s.type = 'text/javascript';
            s.charset = 'UTF-8';
            s.async = true;
            s.src = ('https:' == window.location.protocol ? 'https' : 'http') + '://addtocalendar.com/atc/1.5/atc.min.js';
            var h = d[g]('body')[0];
            h.appendChild(s);
        }
    })();

    /* ================================================
       Twitter Widget
       ================================================ */

    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));

    jQuery(function($) {

        /* ================================================
           Initialize WOW JS
           ================================================ */

        if ($('body').hasClass('animate-page')) {
            wow = new WOW({
                animateClass: 'animated',
                offset: 100,
                mobile: false
            });
            wow.init();
        }
    });

    jQuery(function($){
        $(".player").YTPlayer();
    });

    jQuery(function($){
        $('#toggle-html5-video').on('click', function(e){
            e.preventDefault();
            var vid = $('#html5-video');
            if(vid.hasClass('is-playing')){
                vid.removeClass('is-playing');
                document.getElementById('html5-video').pause();
                vid.addClass('is-pause');
            }else{
                vid.removeClass('is-pause');
                document.getElementById('html5-video').play();
                vid.addClass('is-playing');
            }
        });
    });

    /*
     * End $ Function
     * -------------- */

    jQuery(function($){
        $( document.body ).bind( 'added_to_cart', function( event, fragments, cart_hash ) {
            if( fragments && fragments['div.widget_shopping_cart_content'] ){
                var cart_content = fragments['div.widget_shopping_cart_content'];

                if($(cart_content).find('.mini_cart_item')){
                    var cart_quantity_total = 0;
                    $(cart_content).find('.mini_cart_item').each(function(){
                        cart_quantity_total += parseInt($('span.quantity', this).text());
                    });

                    $('.quantity-badge').text(cart_quantity_total);
                }
            }
        });

        function e() {

            if ($(".gallery-items").length) {
                $(".gallery-items").each(function(){
                    var $that = $(this),
                        active_filter = $('.gallery-filters .gallery-filter:first-child').attr("data-filter");
                    $that.isotope({
                        itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
                        percentPosition: true,
                        masonry: {
                            // use outer width of grid-sizer for columnWidth
                            columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                        },
                        transformsEnabled: true,
                        transitionDuration: "700ms",
                        filter : active_filter
                    });
                    $that.imagesLoaded(function() {
                        $that.isotope("layout");
                    });
                    $(".gallery-filters").on("click", "a.gallery-filter", function(b) {
                        b.preventDefault();
                        var c = $(this).attr("data-filter"), d = $(this).text();
                        $that.isotope({
                            filter: c
                        });
                        $(".gallery-filters a.gallery-filter").removeClass("active");
                        $(this).addClass("active");
                        
                    });
                    $that.isotope("on", "layoutComplete", function(a, b) {
    
                        initGalPopup();

                    });

                    $that.on( 'arrangeComplete', function( event, filteredItems ) {
                        initGalPopup();
                    } );

                    /*infinite scroll*/

                    var win = jQuery(window);

                    var in_scroll_progress = false;

                    var scroll_offset = 0;

                    // Each time the user scrolls
                    win.scroll(function() {
                        // End of the document reached?
                        /*check for gallery */
                        if(jQuery('.gallery-load-more').length){

                            if(jQuery('.gallery-load-more').scrollTop()){
                                var compare_pos = jQuery('.gallery-load-more').scrollTop();
                            }else{
                                var lm_anchor_pos = jQuery('.gallery-load-more').offset() ;
                                var compare_pos = lm_anchor_pos.top;
                            }

                            if (win.scrollTop() >= compare_pos - win.height() + scroll_offset ) {
                                if(!in_scroll_progress){
                                    
                                    in_scroll_progress = true;

                                    var lm_btn = jQuery('.gallery-load-more');
                                    var click_num = lm_btn.attr('data-click')? lm_btn.attr('data-click') : 1;
                                    var remain = lm_btn.attr('data-remain')? lm_btn.attr('data-remain') : 'no';
                                    if(remain == 'yes'){
                                        var grid_hoder = lm_btn.closest('.gather_images_gallery_wrap').children('.gallery-items');
                                        var ajaxurl = grid_hoder.data('lm-request');
                                        var lm_settings = grid_hoder.data('lm-settings')? grid_hoder.data('lm-settings'): {action:'gather_lm_gal',lmore_items:3,images:'',loaded:10};
                                        
                                        lm_btn.closest('.gallery-lmore-holder').css('visibility','visible');

                                        var ajaxdata = {
                                            action: lm_settings['action'],
                                            _lmnonce: grid_hoder.data('lm-nonce'),
                                            wp_query : lm_settings,
                                            click_num: click_num
                                        };
                                        

                                        jQuery.ajax({
                                            type: "POST",
                                            data: ajaxdata,
                                            url: ajaxurl,
                                            success: function(d) {
                                                
                                                lm_btn.closest('.gallery-lmore-holder').css('visibility','hidden');
                                                if(d.status == 'fail'){
                                                    lm_btn.attr('data-remain','no');
                                                    lm_btn.closest('.gallery-lmore-holder').remove();

                                                }else if(d.status == 'success'){
                                                    $that.isotope();
                                                   
                                                    $that.isotope( 'insert', jQuery(d.content) );
                                                    
                                                    $that.imagesLoaded(function() {
                                                        $that.isotope("layout");
                                                    });

                                                    if(d.is_remaining == 'no'){
                                                        lm_btn.attr('data-remain','no');
                                                        lm_btn.closest('.gallery-lmore-holder').remove();
                                                        
                                                    }
                                                }

                                                lm_btn.attr('data-click',++click_num);

                                                in_scroll_progress = false;
                                                
                                            }
                                        });//end ajax


                                    }//end remain
                                        
                                }//end in_scroll_progress
                            }//end compare position
                        }//end gallery load more
                        

                        
                    });
                    /*infinite scroll - end */

                });
            }
        }
        
        e();

        function initGalPopup(){
            jQuery('.gallery-gal').magnificPopup({
                delegate: ".gallery-item:not([style*='display: none']) a.popup-image",
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function(element) {
                        return element.closest('.box-item').children('img');
                    }
                }
            });
        }

    });
