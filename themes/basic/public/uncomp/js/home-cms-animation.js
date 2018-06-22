
  $(".form-title").css({
      'border-left': '2px solid rgb(37, 194, 163)', 
      'background-color':'rgb(244, 249, 253)'     
  });
  $(".title-input").css({
      'border': '1px solid #e6eced',      
  });


  $(window).scroll(function() {
    var top_of_element = $(".title-input").offset().top;
    var bottom_of_element = $(".title-input").offset().top + $(".title-input").outerHeight();
    var bottom_of_screen = $(window).scrollTop() + $(window).height();
    var top_of_screen = $(window).scrollTop();

    if((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
        // The element is visible, do something
          var tI = $('.title-input').val();
          $('.title-input').focus().val('').val(tI);
    }
    else {
        // The element is not visible, do something else
    }
});
  // var tI = $('.navbar-brand').val();
  // $('.navbar-brand').focus();

$(document).ready(function(){
    var cond = false;
	 d3plus.textwrap()
	.container(d3.select("#rectWrap-1"))
	.draw();
	d3plus.textwrap()
	.container(d3.select("#rectWrap-2"))
	.draw();
    d3plus.textwrap()
    .container(d3.select("#rectWrap-3"))
    .draw();
    d3plus.textwrap()
    .container(d3.select("#rectWrap-4"))
    .draw();
    d3plus.textwrap()
	.container(d3.select("#rectWrap-5"))
	.draw();
	d3plus.textwrap()
	.container(d3.select("#rectWrap-6"))
	.draw();
	d3plus.textwrap()
	.container(d3.select("#rectWrap-7"))
	.draw();
	d3plus.textwrap()
	.container(d3.select("#rectWrap-8"))
	.draw();

    $('.close-icon').on('click', function(event) {
        $("#preview").attr('src',' ');
        $('.alert-info').hide()
        $('.browseFile').show()
    });

     $('.close-icon1').on('click', function(event) {
        cond = true;
        $('.alert-info-2').hide()
        $('.browseFile').show()
    });
    $(".playground").on("submit", function(event){
        
        dotsAnimation(1)
        event.preventDefault();
        var data = $('.playground').serializeArray();
        var src = $("#preview").attr('src');
        setTimeout(function() {            
            $('.publish-heading').hide()
            $('.publish-description').hide()
            $('.publish-image').hide()
            var heading = (data[0].value.substring(0, 12)) ? data[0].value.substring(0, 12) : false;
            var desc = (data[1].value.substring(0,105)) ? data[1].value.substring(0, 105) : false;
            var str = desc;
            var firstStr = str!="" ? str.split(" ") : '';
            var finalStr=[];
            var resultStr;
            if(firstStr.length){
                firstStr.forEach(function(e){
                    var innerdata=e.split("");
                    var condit=false;
                    var counter=1;
                    innerdata.forEach(function(d,i){
                            if(innerdata[i]==innerdata[i+1]){
                                    counter+=1;
                            }
                            if(counter>6){
                                condit=true;
                            }
                    })
                    if(e.length>6 && condit){
                        finalStr=finalStr.concat(e.match(/.{1,7}/g))
                    }else{
                        finalStr.push(e)
                    }
                })
            }
            if(finalStr.length){
                // resultStr=finalStr.split(",")
                resultStr=finalStr.join(" ")
            }else{
                resultStr=firstStr;
            }
            if(resultStr.length>104){
                resultStr+= '...';
            }
            // var newStr = str!="" ? str.match(/.{1,15}/g) : '';
            // var newStr = newStr!="" ? newStr.join(' ') : ''; 
            // var newStr = str!="" ? str.replace(/^(.{15})(.{15})(.{15})((.{15}).*)$/, "$1 $2 $3") : '';
            if(heading==false){               
            }else{
                 $('.publish-heading').fadeToggle('slow')
                 $('.publish-heading').text(heading)
            }
            if(desc==false){
            }else{
                $('.publish-description').fadeToggle('slow')
                $('.publish-description').text(resultStr)
            }         
            if(src!="" || cond){
            // $('.publish-image').removeAttr('xlink:href');
            // $('.publish-image').attr('xlink:href', src);
            document.querySelector('.x').setAttributeNS('http://www.w3.org/1999/xlink', 'href', src)
            document.querySelector('.y').setAttributeNS('http://www.w3.org/1999/xlink', 'href', src)
            document.querySelector('.z').setAttributeNS('http://www.w3.org/1999/xlink', 'href', src)
            // $('.publish-image').attr('href', src)
            }
            $('.publish-image').fadeToggle('slow')                 
            $('.st21').css({
                'stroke': 'rgb(244, 182, 59)',
                'transition': 'stroke 4s ease-in-out'
            });
            setTimeout(function() {
                $('.st21').css({
                    'stroke': 'white',
                    'transition': 'stroke 4s ease-in-out'
                }, 2000);           
            }, 2400)
            d3plus.textwrap()
                .container(d3.select("#rectWrap-1"))
                .draw();
            d3plus.textwrap()
                .container(d3.select("#rectWrap-2"))
                .draw();
            d3plus.textwrap()
                .container(d3.select("#rectWrap-3"))
                .draw();

            d3plus.textwrap()
                .container(d3.select("#rectWrap-4"))
                .draw();
            d3plus.textwrap()
                .container(d3.select("#rectWrap-5"))
                .draw();

            d3plus.textwrap()
                .container(d3.select("#rectWrap-6"))
                .draw();
            d3plus.textwrap()
                .container(d3.select("#rectWrap-7"))
                .draw();
            d3plus.textwrap()
                .container(d3.select("#rectWrap-8"))
                .draw();
    }, 2400);
        setTimeout(function(){
          $('.yellow-circle').addClass('animate')
          setTimeout(function(){
            $('.yellow-circle').removeClass('animate')
          },800)
        },300)
        $('.publish-btn').addClass('btn disabled');            
        $('.publish-btn').attr('disabled', true);            
        setTimeout(function(){
        $('.publish-btn').removeClass('btn disabled');
        $('.publish-btn').attr('disabled',false);
        },2400)
});
$('#tooltip').tooltip({
     container: '.form-title'
}).eq(0).tooltip('show');
     // $("#tooltip[title|='PUBLISH']").css("color", "red");
                    //     $('#tooltip').tooltip().eq(0).tooltip('show').tooltip('disable').one('mouseout', function() {
                            // $(this).tooltip('enable');
                    //     $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
                    //     $('#tooltip').addClass('moveUp1');
                    // }); 
                    // }); 

    $(".title-input").on('click', function(event) {
        $(".tooltip-inner").css({
            'display': 'none'
            
        });
        $(".tooltip-arrow").css({
            'display': 'none'
            
        });
            
        
        $(".form-description").css({
            'border-left': '2px solid #fff'
        });
        $(".form-title").css({
            'border-left': '2px solid #25C2A3'
        });
        $(".form-title").css({
            'background-color': '#F4F9FD'
        });
        $(".form-description").css({
            'background-color': '#FFFFFF'
        });
        $(".title-input").css({
            'border-color': '#42CAAF'
        });
        $(".description-input").css({
            'border-color': '#e6eced'
        });
        
    });

    $(".description-input").on('click', function(event) {
        $(".tooltip-inner").css({
            'display': 'none'
            
        });
        $(".form-title").css({
            'border-left': '2px solid #fff'
        });
        $(".form-description").css({
            'border-left': '2px solid #25C2A3'
        });
        $(".form-description").css({
            'background-color': '#F4F9FD'
        });
        $(".form-title").css({
            'background-color': '#FFFFFF'
        });
        $(".description-input").css({
            'border-color': '#42CAAF'
        });
        $(".title-input").css({
            'border-color': '#e6eced'
        });
    });

    $(".browseFile").on('click', function(event) {
        event.preventDefault();
        $('#fileToUpload').trigger('click')
    });
     $(".browseFile").hide();
    function dotsAnimation(dotIndex) {
        var klass = '.' + dotIndex
        if ($(klass).length > 0) {
            $(klass).show(200, function() {               
                $(klass).hide(2410)
                dotsAnimation(dotIndex + 1)
            })
        }
    }
    $(function() {
        $("#fileToUpload").bind('click change', function() {        
            
            if(this.files[0]!=undefined){
              readURL(this, "preview");
              $(".browseFile").hide();
              $(".alert-info").show();
            }
        });

        function readURL(input, tar) {
            if (input.files && input.files[0]) { 
                
                $("#" + tar).removeAttr('src');

                $.each(input.files, function(index, ff)  
                    {
                        $(".pre-size").text(Number(ff.size / 1024).toFixed(2) + " kb")
                        $(".pre-name").text(ff.name)
                        var reader = new FileReader();

                        // Put image in created image tags
                        reader.onload = function(e) {
                            $('#' + tar).attr('src', e.target.result);
                        }

                        reader.readAsDataURL(ff);

                    });
            }
        }
    });
})