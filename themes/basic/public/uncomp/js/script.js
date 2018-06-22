$(document).ready(function() {
    //cookie flag
    if (window.localStorage.getItem("showCookieBar") == null)
        window.localStorage.setItem("showCookieBar", 'show');
    if (window.localStorage.getItem("showCookieBar") == "show")
        $('.cookie-disclaimer').show();
    else $('.cookie-disclaimer').hide();
    
    $('.cookie-disclaimer .disclaimer-close, .cookie-disclaimer .close-link').on('click', function() {
        window.localStorage.setItem("showCookieBar", 'hide');
        $('.cookie-disclaimer').hide();
    });

    //result card equal height in columns
    var maxHeight = 0;
    $(".result-wrap .card-wrap").each(function(){
       if ($(this).find('.result-cards').height() > maxHeight) { maxHeight = $(this).find('.result-cards').height(); }
    });
    $(".result-wrap .card-wrap .result-cards").height(maxHeight);

    //blog related post equal height in columns
    var maxHeight = 0;

    $(".pp-tile").each(function(){
       if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });

    $(".pp-tile").height(maxHeight);

    //To capture utm value in marketo 
    window.extractAnalyticsData = function (){
      var data = {};
      var ga_source = '';
      var ga_campaign = '';
      var ga_medium = '';
      var ga_term = '';
      var ga_content = '';
      var gc = '';
      var c_name = "__utmz";
      if (document.cookie.length>0){
          c_start=document.cookie.indexOf(c_name + "=");
          if (c_start!=-1){
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            gc = unescape(document.cookie.substring(c_start,c_end));
          }
      }
      data.gc = gc;
      if(gc != ""){
          var y = gc.split('|'); 
        for(i=0; i<y.length; i++){
          if(y[i].indexOf('utmcsr=') >= 0) data.ga_source = y[i].substring(y[i].indexOf('=')+1);
          if(y[i].indexOf('utmccn=') >= 0) data.ga_campaign = y[i].substring(y[i].indexOf('=')+1);
          if(y[i].indexOf('utmcmd=') >= 0) data.ga_medium = y[i].substring(y[i].indexOf('=')+1);
              if(y[i].indexOf('utmcct=') >= 0) data.ga_content = y[i].substring(y[i].indexOf('=')+1);
          if(y[i].indexOf('utmctr=') >= 0) data.ga_term = y[i].substring(y[i].indexOf('=')+1);
        }
      }
      return data;
    };
    //To capture utm value in marketo 
    window.getCookie= function(c_name) {
            var c_value = document.cookie;
            var c_start = c_value.indexOf(" " + c_name + "=");
            if (c_start == -1)
              {
              c_start = c_value.indexOf(c_name + "=");
              }
            if (c_start == -1)
              {
              c_value = null;
              }
            else
              {
              c_start = c_value.indexOf("=", c_start) + 1;
              var c_end = c_value.indexOf(";", c_start);
              if (c_end == -1)
              {
                c_end = c_value.length;
              }
              c_value = unescape(c_value.substring(c_start,c_end));
              }
              return c_value;
    }
    window.visitorIDtrack = function(){    
        var source = window.extractAnalyticsData().ga_source;
        var medium = window.extractAnalyticsData().ga_medium;
        var campaign = window.extractAnalyticsData().ga_campaign;
        var term = window.extractAnalyticsData().ga_term;
        var content = window.extractAnalyticsData().ga_content;
        var utma = window.getCookie("_utma");
        var utmb = window.getCookie("_utmb");
        var utmc = window.getCookie("_utmc");
        var session = get_session_count(utma);
        var pageview = get_pageview_count(utmb,utmc);
        var visitorID=utma.split(".");
        $('input[name=Visitor_ID__c').val(visitorID[1]); 
        $('input[name=Source__c').val(source);
        $('input[name=Medium__c').val(medium);
        $('input[name=Campaign__c').val(campaign);
        $('input[name=Term__c').val(term);
        $('input[name=Content__c').val(content);
        $('input[name=Count_of_Sessions__c').val(session);
        $('input[name=Count_of_Pageviews__c').val(pageview);
        //To capture Medium_c value in marketo 
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event' : 'VisitorID',
            'VisitorID' : visitorID[1] 
        });
    }
    //webinar flag ribbon
    $('.close-icon').on('click', function() {
    $('.webinar-flag-wrap, .cookie-disclaimer').hide();
        // $.cookie("Webinarevent", { path: '/', expires: 1 });
    });

    //header menu hover
    if($(window).width() >= 768){
        $('.header ul.nav li.dropdown').hover(function() {
          $(this).find('.dropdown-menu').stop(true, true).delay(150).fadeIn(100);
        }, function() {
          $(this).find('.dropdown-menu').stop(true, true).delay(150).fadeOut(100);
        });
    }
    else {
    }

    //Safari browser version 9 code
    navigator.browserSpecs = (function() {
        var ua = navigator.userAgent,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return { name: M[0], version: M[1] };
    })();
    //Object { name: "Safari", version: "9.1.3(11601.7.8)" }
    if (navigator.browserSpecs.name == 'Safari') {
        if (navigator.browserSpecs.version = 9) {
            $('.main-wrapper').addClass('safari-9')
        }
    } else {        
        // Do something for all other browsers.
    }

    //header menu active link code
    if (window.location.pathname == "/blog/category/product-updates" ||
        window.location.pathname == "/blog/category/all-about-headless" ||
        window.location.pathname == "/blog/category/announcements" ||
        location.pathname.lastIndexOf('/company/press/search') == 0 ||
        location.pathname.lastIndexOf('/blog/search') == 0 ||
        location.pathname.lastIndexOf('/company/news/search') == 0
        ) {
            $(".main .main-menu a").removeClass("active");
            $(".main-menu-link a").addClass("active");
    }
    if(location.pathname.lastIndexOf('/faqs/search') == 0){
        $(".main .main-menu a").removeClass("active");
    } 
    $(window).load(function() {
        $(".main .main-menu a").each(function(){
            if ($(this).attr("href") == window.location.href){
                $(this).addClass("active");
            }
            if (window.location.pathname == "/blog" || 
                window.location.pathname == "/about" || 
                window.location.pathname == "/company/news" ||
                window.location.pathname == "/company/press" ||                
                window.location.pathname == "/company/contact-us" || location.pathname.lastIndexOf('/company/press/') > -1){
                        $(".main-menu-link-Company a").addClass("active");
            }                  
            if (window.location.pathname == "/features" ||
                window.location.pathname == "/technology" || 
                window.location.pathname == "/pricing" ){
                    $(".main-menu-link-Product a").addClass("active");
            } 
            if (window.location.pathname == "/resources" || 
                window.location.pathname == "/roi-calculator"){
                    $(".main-menu-link-Resources a").addClass("active");
            }                    
        });              
    });
       
    //home page banner slider
    $('.business-hero-banner .hero-content').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        autoplaySpeed: 3000,
        pauseOnHover: true
    });
    $('.business-hero-banner .hero-content').css('display','block');

    //home page customer slider
    $('.logo-row').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $('.logo-row').css('display','block');

    //developer pg testimonial slider
    $('.testimonials .slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });

    //feature page Smart and Effortless Collaboration slider
    $('.testimonials .slider-nav').slick({
        centerPadding: '50',
        slidesToShow: 3,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '30',
                    centerMode: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0',
                    centerMode: true
                }
            }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
    });
    // $('.testimonials .slider-nav').css('display','block');

    //submenu option hightlight
    // subNavActiveMenu();

    //resources page search filter
    var searchedText;
    $('#searchfilter').keyup(function() {
        setTimeout(function() {
            var isMatchFound = false,
                $prevEle = null;
            searchedText = $('#searchfilter').val();
            $(".search").each(function(e, f) {
                searchedText = searchedText.replace("$", "");
                var SearchReg = new RegExp(searchedText, 'gi')
                if ($(f).text().match(SearchReg)) {
                    $(f).removeClass("hidden")
                    isMatchFound = true;
                    $prevEle = $(f).parent().siblings('h2');
                    $prevEle.show();
                } else {
                    $(f).addClass("hidden");
                    if (!$(f).parent().siblings('h2').is($prevEle)) {
                        $(f).parent().siblings('h2').hide();
                    }
                }
            })
            if (searchedText && !isMatchFound) {
                $("#nmf").removeClass("hidden")
            } else {
                $("#nmf").addClass("hidden")
            }
        }, 500);
    });

    if (searchedText && !isMatchFound) {
        $("#nmf").removeClass("hidden")
    } else {
        $("#nmf").addClass("hidden")
    }

    //search form code for news and Press
    $(".search-form").on("submit", function(event) {
        var searchString = $(this).find('input').val().trim();
        var url = '/search?q='
        if (searchString) {
            // window.open(window.location.host + '/search/' +encodeURIComponent(searchString),'_self')
            location.href = location.href + url + encodeURIComponent(searchString).toLowerCase()
        }
    });
    $(".search-form-press").on("submit", function(event) {
        var searchString = $(this).find('input').val().trim();
         // searchString = searchString.replace(/[-/\\^$*+?.()|[\]{}<>]/g, '');
        var url = '/search?q='
        if (searchString) {
            location.href = location.pathname.substr(0, location.pathname.lastIndexOf('/')) + url + encodeURIComponent(searchString).toLowerCase()
        }
    });

    //search form code for faq
    $(".search-form-newsearch").on("submit", function(event) {
        var searchString = $(this).find('input').val().trim();
        var url = '/search?q='
        if (searchString) {
            location.href = location.pathname.substr(0, location.pathname.lastIndexOf('/')) + url + encodeURIComponent(searchString).toLowerCase()
        }
    });
    $(".search-form-faq").on("submit", function(event) {
        var searchString = $(this).find('input').val().trim();
        var url = '/search?q='
        if (searchString) {
            location.href = location.pathname.substr(0, location.pathname.lastIndexOf('/')) + url + encodeURIComponent(searchString).toLowerCase()
        }
    });

    //search form code for blog
    $(".search-form-blog").on("submit", function(event) {
        var searchString = $(this).find('input').val().trim();
        var url = '/blog/search?q='
        if (searchString) {
            // window.open(window.location.host + '/search/' +encodeURIComponent(searchString),'_self')
            location.href = url + encodeURIComponent(searchString).toLowerCase()
        }
    });

    //blog breadcrum
    if (location.pathname.indexOf('/blog/') > -1 && 
        location.pathname.indexOf('/blog/search') == -1 && 
        location.pathname.indexOf('/blog/category') == -1 && 
        location.pathname.indexOf('/blog/author') == -1) {
        // var url = location.pathname;
        var a = location.pathname.split('/')[location.pathname.split('/').length - 1]
        var b = a.replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        var c = b.replace(/[-]/g, " ")
         if( c.length > 10){  
        var d = c.substring(0, 10) + "...";
        $(".sub-nav-wrapper .breadcrum").append("/" + " " + d)
         }
        else{
             $(".breadcrum").append("/" + " " + c)  
        }
    };
    if (location.pathname.indexOf('/our-partners') > -1){
        var a = location.pathname.split('/')[location.pathname.split('/').length - 1]
        var b = a.replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        var c = b.replace(/[-]/g, " ")
        if( c.length > 10){  
            // var d = c.substring(0, 10) + "...";
            $(".sub-nav-wrapper .breadcrum").append( "/" + " " + c)
        }
        else{
            $(".breadcrum").append("/" + " " + c)  
        }
    }

    //press breadcrum
    if (location.pathname.indexOf('/company/press/') > -1 && location.pathname.indexOf('/company/press/search') == -1) {
        // var url = location.pathname;
        var a = location.pathname.split('/')[location.pathname.split('/').length - 1]
        var b = a.replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        var c = b.replace(/[-]/g, " ")
        if( c.length > 10){            
            var d = c.substring(0, 10) + "...";
            $(".breadcrum").append("/" + " " + d)
        }
        else{
            $(".breadcrum").append("/" + " " + c)  
        }
    };

    //resources case study breadcrum
    if (location.pathname.indexOf('/customers') > -1 || location.pathname.indexOf('/re') > -1 || location.pathname.indexOf('/cs') > -1) {
        // var url = location.pathname;
        var a = $('.partner-info h1,.orphan-page-info h1').text();
        if(a.length > 10) {            
            var b = a.substring(0, 10) + "...";
            $(".breadcrum").append("/" + " " + b)
        }
        else {
            $(".breadcrum").append("/" + " " + a)
        }
    };

    //Blog 
    var catskip = 0
    $('.category-loadmore').click(function() {
        var that = $(this)
        that.hide()
        $('.spinner').show()
        catskip += 10
        var catname = location.pathname.split('/')[location.pathname.split('/').length - 1]
        var url = window.env == 'development' ?
            '/loadmore/' + catskip + '/' + catname :
            '/blog/loadmore/' + catskip + '/' + catname
        $.ajax({
                url: url
            })
            .done(function(data) {
                var post = $($.parseHTML(data)).filter('.row')
                if (post.length > 0) {
                    that.show();
                    $('.spinner').hide()
                    $('.article-wrap .container').append(data)
                    $('.category-loadmore').blur()
                }
                if (post.length < 5 || post.length === 0) {
                    $('.category-loadmore').hide()
                    $('.spinner').hide()
                }
            })
    })

    //Start Author Loadmore    
    var askip = 0
    $('.author-loadmore').click(function() {
        var that = $(this)
        that.hide()
        $('.spinner').show()
        askip += 10
        var aname = location.pathname.split('/')[location.pathname.split('/').length - 1]
        var url = window.env == 'development' ?
            '/authorloadmore/' + askip + '/' + aname :
            '/blog/authorloadmore/' + askip + '/' + aname
        $.ajax({
                url: url
            })
            .done(function(data) {
                var post = $($.parseHTML(data)).filter('.post')
                if (post.length > 0) {
                    that.show();
                    $('.spinner').hide()
                    $('.author').append(data)
                    $('.author-loadmore').blur()
                }
                if (post.length < 10 || post.length === 0) {
                    $('.author-loadmore').hide()
                    $('.spinner').hide()
                }
            })
    })
  
    //Latest  Loadmore  
    var skip = 0
    $('.latest-loadmore').click(function() {
        var that = $(this)
        that.hide()
        $('.spinner').show()
        skip += 10
        var url = '/blog/loadmore/' + skip
        $.ajax({
                url: url
            })
            .done(function(data) {
                var post = $($.parseHTML(data)).filter('.row')
                if (post.length > 0) {
                    that.show();
                    $('.spinner').hide()
                    $('.article-wrap .container').append(data)
                    $('.latest-loadmore').blur()
                    //$(".ellipsis").dotdotdot();
                }
                if (post.length < 5 || post.length === 0) {
                    $('.latest-loadmore').hide()
                    $('.spinner').hide()
                }
            })
    })
    ///end latest loadmore

    //search loadmore
    var searchskip = 0;
    $('.search-loadmore').click(function() {
        searchskip += 10
        // var searchname = location.pathname.split('/')[location.pathname.split('/').length - 1]
        var searchname = location.href.split('/search?q=')[location.href.split('/search?q=').length - 1]
        var that = $(this)
        that.hide()
        $('.spinner').show()
        skip += 10
        var url = '/blog/searchloadmore/' + searchskip + '/' + searchname
        $.ajax({
                url: url
            })
            .done(function(data) {
                var post = $($.parseHTML(data)).filter('.post')
                if (post.length > 0) {
                    that.show();
                    $('.spinner').hide()
                    $('.post-wrap').append(data)
                    $('.search-loadmore').blur()
                    //$(".ellipsis").dotdotdot();
                }
                if (post.length < 10 || post.length === 0) {
                    $('.spinner').hide()
                    that.hide()
                }
            })
    })
    //search loadmore end 

    ///Add current class to Blog Category 
    $(function() {
        var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
        $(".category-tabs li").each(function() {
            if ($(this).attr("data-tab") == pgurl) {
                $(".category-tabs li").removeClass('current')
                $(this).addClass("current");
            }
        })
    });

    ///Add current class to Blog Category 
    if (location.pathname == "/blog") {
        $(".category-tabs li").each(function(key, el) {
            if ($(el).attr("data-tab") == 'latest') {
                // $(".category-tabs li").removeClass('current')
                $(el).addClass("current");
            }
        })
    }
    //endblog 
    // $('.one-pager-anchor a').click(function() {
    //     $('.one-pager-anchor li').removeClass('active');
    //     $(this).parent('li').addClass('active');
    //     $('html, body').animate({
    //         scrollTop: $($(this).attr('href')).offset().top -120
    //     }, 800);
    //     return false;
    // });

    //modal apply only first load code
    if ($.cookie('pop') == null) {
        $('#contentstack-landing-modal').modal('show');
        $.cookie('pop', '1');
    }

    //modal apply only first load code 
    // $('.headless-cta').click(function() {
    //     $('.toggle-option').removeClass('active');
    //     $(this).addClass('active');
    //     $('.toggle-content').removeClass('show').addClass('hide');
    //     $('#headless').removeClass('hide').addClass('show');
    // })

    // $('.traditional-cta').click(function() {
    //     $('.toggle-option').removeClass('active');
    //     $(this).addClass('active');
    //     $('.toggle-content').removeClass('show').addClass('hide');
    //     $('#traditional').removeClass('hide').addClass('show');
    // })

    // $('.hero-banner').slick({
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     fade: true,
    //     cssEase: 'fade',
    //     arrows: false,
    //     autoplay: true,
    //     autoplaySpeed: 8000,
    //     pauseOnHover: false
    // });
    //testimonial section 
    // $('.testimonial-section .flexslider').flexslider({
    //     // animation: "slide",
    //     controlNav: "thumbnails",
    //     animationLoop: true,
    //     slideshowSpeed: 8000,
    //     animationSpeed: 300,
    //     pauseOnHover: false,
    //     infinite: true,
    //     fade: true,
    //     cssEase: 'linear',
    //     start: function() {
    //         //-- Add flexslider active class to li of nav control instead of just on the image
    //         if ($('.testimonial-section .flexslider ol.flex-control-nav').length > 0) {
    //             // initial check and addition
    //             $('.testimonial-section .flexslider ol.flex-control-nav li').each(function() {
    //                 if ($(this).children('img').hasClass('flex-active')) {
    //                     $(this).children('img').removeClass('flex-active');
    //                     $(this).addClass('flex-active');
    //                 } else {
    //                     $(this).removeClass('flex-active');
    //                 }
    //             });
    //             // bind into flexslider callback and run dynamically
    //             $('.testimonial-section .flexslider').bind('start', function(event, slider) {
    //                 $('.testimonial-section .flexslider ol.flex-control-nav li').each(function() {
    //                     if ($(this).children('img').hasClass('flex-active')) {
    //                         $(this).children('img').removeClass('flex-active');
    //                         $(this).addClass('flex-active');
    //                     } else {
    //                         $(this).removeClass('flex-active');
    //                     }
    //                 });
    //             });
    //         }
    //         var windowSize = $(window).width();
    //         if (windowSize < 640) {
    //             $('.testimonial-section .flexslider  ol.flex-control-nav li').each(function() {
    //                 if ($(this).hasClass('flex-active')) {
    //                     $(this).show();
    //                 } else {
    //                     $(this).hide();
    //                 }
    //             });
    //         }
    //     },
    //     after: function() {
    //         //-- Add flexslider active class to li of nav control instead of just on the image
    //         if ($('.testimonial-section .flexslider ol.flex-control-nav').length > 0) {
    //             // initial check and addition
    //             $('.testimonial-section .flexslider ol.flex-control-nav li').each(function() {
    //                 if ($(this).children('img').hasClass('flex-active')) {
    //                     $(this).children('img').removeClass('flex-active');
    //                     $(this).addClass('flex-active');
    //                 } else {
    //                     $(this).removeClass('flex-active');
    //                 }
    //             });
    //             // bind into flexslider callback and run dynamically
    //             $('.testimonial-section .flexslider').bind('after', function(event, slider) {
    //                 $('.testimonial-section .flexslider ol.flex-control-nav li').each(function() {
    //                     if ($(this).children('img').hasClass('flex-active')) {
    //                         $(this).children('img').removeClass('flex-active');
    //                         $(this).addClass('flex-active');
    //                     } else {
    //                         $(this).removeClass('flex-active');
    //                     }
    //                 });
    //             });
    //         }
    //         var windowSize = $(window).width();
    //         if (windowSize < 640) {
    //             $('.testimonial-section .flexslider  ol.flex-control-nav li').each(function() {
    //                 if ($(this).hasClass('flex-active')) {
    //                     $(this).show();
    //                 } else {
    //                     $(this).hide();
    //                 }
    //             });
    //         }
    //     }
    // });

    $(".features-section .flex-parent:odd .flex-child.graphic").addClass("col-md-push-5 col-sm-12 col-xs-12");
    $(".features-section .flex-parent:odd .flex-child.content").addClass("col-md-pull-7 col-sm-12 col-xs-12");
    $(".specs-section .flex-parent:odd .flex-child.graphic").addClass("col-md-push-5 col-sm-12 col-xs-12");
    $(".specs-section .flex-parent:odd .flex-child.content").addClass("col-md-pull-7 col-sm-12 col-xs-12");

    //Thank you page 
    var setFirstName = function() {
        localStorage.setItem("name", $('form').find('input[name=firstname]').val() + "!");
    };
    if (location.pathname.indexOf("thank-you") !== -1) {
        //getResources();
        $('#thank').find('span.uname').text(localStorage.getItem("name") || "");
        localStorage.removeItem("name");
    }
    //Thank you message home

    //home page
    var setFirstNameHome = function() {
        localStorage.setItem("hname", $('#contact_new').find('input[name=firstname]').val());
    };
    var setFirstNamedev = function() {
        localStorage.setItem("dname", $('#contact_developer_new').find('input[name=firstname]').val());
    };
    //     if (location.pathname.indexOf("/") !== -1) {
    //     //getResources();
    //     $('#home-thank').find('span.uname').text(localStorage.getItem("hname") || "");
    //     localStorage.removeItem("hname");
    // }

    //Home page
    $('#signup').on('click', function() {
        $('#signup').hide();
        $('.head-text,.cta-text').hide();
        $('#contact-global').slideDown("slow");
        $('#subject').val("Get a demo")
    });
    $('#contact_new').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {} else {
            $('.contact_new').button('loading')
            // success handler    
            $('#iframe_contactus_new').on('load', function() {
                setFirstNameHome();
                $('#contact_new')[0].reset();
                $('#contact-global').addClass('hidden');
                $('.head-text,.cta-text').hide();
                $('.thank-you-new').removeClass('hidden')
                $('#home-thank').find('span.uname').text(localStorage.getItem("hname") || "");
                // var page = $('.contact_bus').attr('href')
                // window.open(page, '_self')
            });
        }
         localStorage.removeItem("hname");
    });

    //Thank you message developer
    $('#get_dev').on('click', function() {
        $('#get_dev').hide();
        $('.head-text,.cta-text').hide();
        $('#getdemo_dev').slideDown("slow");
        $('#subject').val("Get a demo")
    });
    $('#contact_developer_new').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {} else {
            $('.contact_dev_new').button('loading')
            // success handler    
            $('#iframe_contact_developer_new').on('load', function() {
                 setFirstNamedev();
                $('#contact_developer_new')[0].reset();
                $('#getdemo_dev').addClass('hidden');
                $('.head-text,.cta-text').hide();
                $('.thank-you-dev').removeClass('hidden');
                 $('#dev-thank').find('span.duname').text(localStorage.getItem("dname") || "");
                // var page = $('.contact_bus').attr('href')
                // window.open(page, '_self')
            });
        }
        localStorage.removeItem("dname");
    });

    //contact us page business
    $('#contact_business').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {} else {
            $('.contact_bus').button('loading')
            // success handler    
            $('#iframe_contactus_business').on('load', function() {
                setFirstName();
                $('#contact_business')[0].reset();
                var page = $('.contact_bus').attr('href')
                window.open(page, '_self')
            });
        }
        return true;      
    });
    //end contact us page business

    //contact us page developer
    $('#contact_developer').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {} else {
            $('.contact_dev').button('loading')
            // success handler    
            $('#iframe_contact_developer').on('load', function() {
                setFirstName();
                $('#contact_developer')[0].reset();
                var page = $('.contact_dev').attr('href')
                window.open(page, '_self')
            });
        }
    });
    //end contact us page developer
    
    //contact us page partner
    $('#get_form_partner').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {} else {
            $('.partner-thank').button('loading')
            // success handler    
            $('#getiframepartner').on('load', function() {
                $('#get_form_partner')[0].reset();
                var page = $('.partner-thank').attr('href')
                window.open(page, '_self')
            });
        }
    });
    //end contact us page partner

    // if ($('#contact_business, #contact_developer').length > -1) {      
    //     // Set Subject
    //     $('#Contact_Us_Subject__c').val(paramsKeyValue.subject)     
    //     $('input.subject').val(paramsKeyValue.subject)
    //     $('input.tags').val(paramsKeyValue.subject)
    //     $('#Contact_Us_Subject__c').on('change', function() {
    //         $('input #Contact_Us_Subject__c').val($(this).val())
    //         $('input.tags').val($(this).val())
    //     })
    // }
    //contact us subject value select

    //code for home page mobile view image
    var windowSize = $(window).width();
    if (windowSize < 768) {
        var newImage = $(".stack").attr("data-image");
        $('.stack').attr('src', newImage);
    }

    //Case study page  
    $('#get_form_ayla').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {} else {
            //ayla form pdf download
            var pdf = $('#get_form_ayla #ayla').attr('href');
            $('.ayla-thank').button('loading')
            // success handler
            $('#getformiframe').on('load', function() {
                $('#get_form_ayla')[0].reset();
                window.open(pdf, '_blank')
                var page = $('.ayla-thank').attr('data-href')
                window.open(page, '_self')
            });
        }
    });
    //end casestudy page 

    //Reports page  
    $('#get_form_reports').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {} else {
            //ayla form pdf download
            var pdf = $('#get_form_reports #reports').attr('href');
            $('.reports-thank').button('loading')
            // success handler
            $('#reportsiframe').on('load', function() {
                $('#get_form_reports')[0].reset();
                window.open(pdf, '_blank')
                var page = $('.reports-thank').attr('data-href')
                window.open(page, '_self')
            });
        }
    });
    //end Reports page

    //Datasheets page  
    $('#get_form_datasheet').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {} else {
            //ayla form pdf download
            var pdf = $('#get_form_datasheet #datasheet').attr('href');
            $('.datasheet-thank').button('loading')
            // success handler
            $('#datasheetiframe').on('load', function() {
                $('#get_form_datasheet')[0].reset();
                window.open(pdf, '_blank')
                var page = $('.datasheet-thank').attr('data-href')
                window.open(page, '_self')
            });
        }
    });
    //end Datasheets page

    // if ($(window).width() < 1030) {
    //     //inner pg sub navigation
    //     $(".sub-nav-wrapper .navbar-toggle").click(function(){
    //         $(".tab-sub-nav").slideToggle();
    //     });    
    //     $(".sub-nav-wrapper .tab-sub-nav li a").click(function(){
    //         console.log('hi')
    //         $(".tab-sub-nav").hide();
    //     });
    // }
    subnavResize();  
    $('.nav-tabs.nav-tabs-hover > li > a').hover( function(){
      $(this).tab('show');
    });
});
//end of document.ready
setTimeout(function() {
    var distance = $('.mktoFormRow').offset().top,
    $window = $(window);
    $window.scroll(function() {
        // console.log('active in');
        var distance = $('.mktoFormRow').offset().top;
        // console.log($('.mktoFormRow').offset().top)
        $(".mktoFormRow").each(function() {
            if ( $window.scrollTop() >= $(this).offset().top - $('.mktoFormRow').height() + 40) {
                // $('.mktoFormRow').removeClass('active');
                $(this).addClass('active');
            }
            if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                $(".mktoFormRow").addClass('active');
            }
        });
    });
}, 3000);

$(window).resize(function() {
    var windowSize = $(window).width();
    var newImage = $(".stack").attr("data-image");
    if (windowSize < 767) {
        $('.stack').attr('src', newImage);
    }
    // if (windowSize > 1030) {  
    //     console.log('hi')
    //     $(".sub-nav-wrapper .tab-sub-nav").show();
    // }
    // if(windowSize <= 1030) {
    //     $(".tab-sub-nav").hide();
    //     $(".sub-nav-wrapper .navbar-toggle").click(function(){
    //         $(".tab-sub-nav").slideToggle();
    //     });    
    //     $(".sub-nav-wrapper .tab-sub-nav li a").click(function(){
    //         console.log('hi')
    //         $(".tab-sub-nav").hide();
    //     });
    // }
    subnavResize();
});
//end of window.resize
var subnavResize = function() {
    var windowSize = $(window).width();
    $(".sub-nav-wrapper .navbar-toggle").off('click');
    if(windowSize <= 1030) {
        $(".tab-sub-nav").addClass('hide-nav');
        $(".sub-nav-wrapper .navbar-toggle").click(function(){
            if ($(".tab-sub-nav").hasClass('show-nav')) {
                $(".tab-sub-nav").removeClass('show-nav').addClass('hide-nav');
            } else {
                $(".tab-sub-nav").addClass('show-nav').removeClass('hide-nav');
            }
        });    
        $(".sub-nav-wrapper .tab-sub-nav li a").click(function(){
            $(".tab-sub-nav").removeClass('show-nav').addClass('hide-nav');
        });
    } else {
        $(".tab-sub-nav").removeClass('hide-nav');
    }
}
window.addEventListener("orientationchange", function() {
    var windowSize = $(window).width();

    // if (windowSize > 1030) {  
    //     console.log('> 1030')
    //     $(".sub-nav-wrapper .tab-sub-nav").show();
    // }
    //  if(windowSize <= 1030) {
    //     $(".tab-sub-nav").addClass('hide-nav');
    //     $(".sub-nav-wrapper .navbar-toggle").click(function(){
    //         if ($(".tab-sub-nav").hasClass('show-nav')) {
    //             $(".tab-sub-nav").removeClass('show-nav').addClass('hide-nav');
    //         } else {
    //             $(".tab-sub-nav").addClass('show-nav').removeClass('hide-nav');
    //         }
    //     });    
    //     $(".sub-nav-wrapper .tab-sub-nav li a").click(function(){
    //         console.log('hi')
    //         $(".tab-sub-nav").removeClass('show-nav').addClass('hide-nav');
    //     });
    // } else {
    //     $(".tab-sub-nav").removeClass('hide-nav');
    // }
}, false);