function getAllUrlParams(url) {
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

	var obj = {};

	if (queryString) {

		queryString = queryString.split('#')[0];

		var arr = queryString.split('&');

		for (var i=0; i<arr.length; i++) {
			var a = arr[i].split('=');

			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function(v) {
			paramNum = v.slice(1,-1);
			return '';
		});

		var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      //paramName = paramName.toLowerCase();
      //paramValue = paramValue.toLowerCase();

		if (obj[paramName]) {
			if (typeof obj[paramName] === 'string') {
				obj[paramName] = [obj[paramName]];
			}
			if (typeof paramNum === 'undefined') {
				obj[paramName].push(paramValue);
			}
			else {
				obj[paramName][paramNum] = paramValue;
			}
		}
		else {
			obj[paramName] = paramValue;
		}
	}
}
	return obj;
}



if (jQuery('.parallax-component_image').length > 0 && jQuery(window).width() > 991) {
    jQuery(".parallax-component_image").parallaxCardinal({
        position: "50%",
        persentPlus: "40vh",
        speed: 0.5,
        detectMobile: true,
        disableMobile: true,
    });
}

var saleBlock = false;
// if (jQuery('.parallax-component_image1').length > 0) {
//   $('.parallax-component_image1').parallax({imageSrc: '/skins/marc/img/back2.jpg'});
// }

if (jQuery('.main_parallax').length > 0) {
  jQuery(".main_parallax").parallaxCardinal({
    position: "50%",
    persentPlus: "40vh",
    speed: 0.5,
    detectMobile: true,
    disableMobile: true,
});
}

if ($(window).width() > 991 && $(".ultrallax.ultrallax1").lexngth > 0) {
  ultrallax(document.getElementsByClassName('ultrallax1')[0], {
    speed: .4
  })
}

jQuery(".header ul li > a").on("click", function() {

})

// $(".header ul li > a.not_link").on("click", function (event) {
//     jQuery("body").removeClass("mactive")
//     event.preventDefault();
//     var id  = $(this).attr('href'),
//         top = $(id).offset().top;
//     $('body,html').animate({scrollTop: top}, 1000);
// });

$("body>header > .menu-block > ul > li > a.not_link,  .c-modal ul li > a.not_link").on("click", function (event) {
  if (!jQuery(this).hasClass("sale")) {
    var id  = $(this).attr('data-anchor');
        var top = $("#"+id).offset().top - jQuery("body>header").height();
        if (id == "#product" && saleBlock == true) {
          jQuery("body>article>section.production>.prod-block").show();
          jQuery("body>article>section.production .product_container button").show();
          jQuery("body>article>section.production>.prod-block.sale-block").hide();
          saleBlock = false;
          jQuery(this).addClass("active");
          jQuery("body>header > .menu-block > ul > li > a.sale").removeClass("active");
          history.pushState("", "", "/");
          AOS.refresh()
          // return false;
        }
        // jQuery(this).addClass("active")
    $('body,html').animate({scrollTop: top}, 1200);    
  }
  event.preventDefault();
});

jQuery("body>header > .menu-block > ul > li > a.sale").on("click", function() {
  jQuery(this).addClass("active");
  jQuery("body>header > .menu-block > ul > li > a.collection").removeClass("active")
  jQuery("body>article>section.production>.prod-block").hide();
  jQuery("body>article>section.production .product_container button").hide();
  jQuery("body>article>section.production>.prod-block.sale-block").show();
  $('body,html').animate({scrollTop: jQuery("body>article>section.production").offset().top - jQuery("body>header").height()}, 1000);
  saleBlock = true;
  history.pushState("", "", "sale");
  AOS.refresh()
  return false;
});


$(".c-menu__list-link:not(.item):not(.not_link)").on("click", function (event) {
    event.preventDefault();
    $burger.click()
    var id  = $(this).attr('href'),
        top = $(id).offset().top - jQuery(".header").height();
    $('body,html').animate({scrollTop: top}, 1200);
});

SmoothScroll({
    stepSize: 80,
    animationTime: 900,
    frameRate: 120,
    touchpadSupport: true,
    fixedBackground: false
})


var played = false

if ($(window).width() > 900) {
	var vsize = jQuery("body > article > section.video").height() * 0.7
    jQuery(document).on("scroll", function() {
    if ($("body, html").scrollTop() > vsize) {
           jQuery("body > header").addClass("active");
        } else {
            jQuery("body > header").removeClass("active");
        }
    if($("body, html").scrollTop() > 200) {
      $("header .logo").addClass("hide")
    } else {
      $("header .logo").removeClass("hide")
    }

    })    
    if ($("body, html").scrollTop() > vsize) {
           jQuery("body > header").addClass("active");
        } else {
            jQuery("body > header").removeClass("active");
        }
}

$(document).on("scroll", function() {
  if($("#callback").length > 0) {
    if($("body, html").scrollTop() > $("#callback").offset().top - 200) {
      $(".callback_link").addClass('active');
    } else {
      $(".callback_link").removeClass('active');
    }
  }
  if($("body, html").scrollTop() > $("body, html").height() / 2) {
    $(".arrow_top").addClass('show');
  } else {
    $(".arrow_top").removeClass('show');
  }
  // if($("body, html").scrollTop() > $(".production .filter_button").offset().top + 100) {
  //   $(".header .categories").addClass('hide');
  // } else {
  //   $(".header .categories").removeClass('hide');
  // }
})

// jQuery(document).on("scroll", function() {
//   if ($("body, html").scrollTop() < 300) {
//     if (played === false) {
//       setTimeout(function() {
//         // customBezier1.play();
//       },2000);
//     }
//   } 
// })

// if ($("body, html").scrollTop() < 300) {
//     if (played === false) {
//      setTimeout(function() {
//         // customBezier1.play();
//       },2000);
//     }  
// }

let wishArr = [];
let wishTpl = $(".wish-tpl").html();
if(localStorage.getItem('wishlist') != null && localStorage.getItem('wishlist') != "") {
	wishArr = localStorage.getItem('wishlist');
	wishArr = wishArr.split(",");
}

function closeWishlist() {
	$(".modal_wish").removeClass('active');
	setTimeout(function() {
    	$(".modal_wish").css("display", "none");
	},400)
}

function openWishlist() {
    $(".modal_wish").css("display", "block");
    setTimeout(function() {
      $(".modal_wish").addClass('active');
    },60)
}

function showWishlistButton() {
    $(".open_wishlist").addClass('show');
}

function hideWishlistButton() {
    $(".open_wishlist").removeClass('show');
}

var json
var infotpl
var galtpl
var minPrice
var maxPrice
var defaultMaxPrice
var defaultMinPrice
var defaultPrice
var productsFiltered

$.get("ajax.php").done(function(data) {
    json = data;
    infotpl = jQuery(".infotpl").html();
    galtpl = jQuery(".gallery").html();
    infotpl = $(".infotpl").html();
    //galtpl = $(".gallery").html();
    minPrice = json[0]['tSprice'];
    maxPrice = minPrice;
    defaultPrice = false;
    minMaxPrice(json);
    slider();
    if(wishArr.length > 0) {
        showWishlistButton();
        $(".open_wishlist .count").text(wishArr.length);
        createWishProducts();
    }
})

function createDescr(pid) {
  $("header .logo").addClass("hide")
  var pid = pid;
  history.pushState("", "", "product-"+pid);
  pinfo = jQuery.grep(json, function(a) {
      return a.tId == pid
  });
  var infotpln = infotpl;
  infotpln = infotpln.replace(/\{name\}/g, pinfo[0].tNazvanie);
  infotpln = infotpln.replace(/\{art\}/g, pinfo[0].tCvet);
  infotpln = infotpln.replace(/\{id\}/g, pinfo[0].tId);
  infotpln = infotpln.replace(/\{char\}/g, pinfo[0].tHarakteristiki);
  // infotpln = infotpln.replace(/\{price\}/g, pinfo[0].tCena);
  infotpln = infotpln.replace(/\{descr1\}/g, pinfo[0].tOpisanie_tovara);
  infotpln = infotpln.replace(/\{descr2\}/g, pinfo[0].tSposoby_oplaty);
  infotpln = infotpln.replace(/\{imagebg\}/g, pinfo[0].tIzobrazhenie);
  var gal = JSON.parse(pinfo[0].tGallereya);
  var block = ""
  for (var i = 0; i < gal.length; i++) {
      var galtpln = galtpl;
      galtpln = galtpln.replace(/\{image\}/g, gal[i]);
      galtpln = galtpln.replace(/\{images\}/g, gal[i]);
      galtpln = galtpln.replace(/\{video\}/g, "");
      block += galtpln;
  }
  if (pinfo[0].tSkidka > 0) {
    var priceBlock = '<div class="prc"><span class="price js-product-price_old" field="li_price__2">'+pinfo[0].tCena+' грн</span><span class="price js-product-price" field="li_price__2">'+pinfo[0].tSprice+' грн</span></div>'
  } else {
    var priceBlock = '<div class="prc"><span class="price js-product-price" field="li_price__2">'+pinfo[0].tCena+'грн</span></div>'
  }
  infotpln = infotpln.replace(/\{price\}/g, priceBlock);
  infotpln = infotpln.replace(/\{images\}/g, block);
  // if ($(window).width() < 991) {
    jQuery("body > article > .descr-blocks").append(infotpln);
  // }
}

var gal = ""

function gallery(){
  var gals = true
  if ($(window).width() < 990) {
    var slh = window.innerHeight * .6
    gals = false
  } else {
    var slh = 750
  }
  gal = $('#imageGallery').lightSlider({
        gallery:gals,        
        vertical:gals,
        item:1,
        loop:true,
        thumbItem:6,
        verticalHeight: slh,
        slideMargin:0,
        controls: false,
        enableDrag: false,
        currentPagerPosition:'left',
        // onSliderLoad: function(el) {
        //     el.lightGallery({
        //         selector: '#imageGallery .lslide'
        //     });
        // }   
    });    
  jQuery(".header").removeClass("sbottom")  
  jQuery(".lSSlideWrapper ").append('<span class="fancy"></span>')
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}


function disable_scroll_mobile(){
  document.addEventListener('touchmove',preventDefault, false);
}
function enable_scroll_mobile(){
  document.removeEventListener('touchmove',preventDefault, false);
}

jQuery("body").on("click", ".descr-blocks > .block > .info > .descriptions > div > .title", function() {
  jQuery(this).parent().parent().children().removeClass("active");
  jQuery(this).parent().addClass("active"); 
})

jQuery("body").on("click", ".descr-blocks > .close", function() {
  history.pushState("", "", "/");
  jQuery("body > header").removeClass("fixed");
  jQuery(this).parent().removeClass("active")
  jQuery(this).parent().children(".block").removeClass("shown");
  gal.destroy();
  jQuery(this).parent().children(".block").removeClass("active");
  jQuery(this).parent().children(".block").remove();
  $(".header .categories").removeClass('hide');
  jQuery("body, html").removeClass("locked")
  jQuery("body, html").removeClass("t-body_scroll-locked")
  // enable_scroll_mobile();
})

jQuery("body").on("click", ".prod-block > .prod > .image > span.descr", function() {  
  createDescr(jQuery(this).attr("data-id"));
  jQuery(".descr-blocks > .block").addClass("shown");
  jQuery(".descr-blocks").addClass("active");
  jQuery(".descr-blocks > .block").addClass("active");
  $(".header .categories").addClass('hide');
  gallery();
  closeWishlist();
  // disable_scroll_mobile()
  // setTimeout(function() {
    jQuery("body, html").addClass("locked")
    jQuery("body").addClass("t-body_scroll-locked")
  // }, 1000)
});


wow = new WOW(
  {
    boxClass:     'wow',
    animateClass: 'animated', 
    offset:       50,
    mobile:       true,  
    callback:     function(box) {
    },
    resetAnimation: true,
  }
);


var vid = document.getElementById("video2"); 

function playVid() { 
    vid.play(); 
} 

function pauseVid() { 
    vid.pause(); 
}

$( "body > article > section.info > .rigth > .block-1 > .video" )
.mouseenter(function() {
  playVid();
})
.mouseleave(function() {
 pauseVid()
});

jQuery("body>article>section.info>.left>.text>a").on("click", function() {
  jQuery("body > article > section.production > .prod-block > .prod[data-prodid='1']").find("span.descr").click();
  return false;
})

jQuery("body > article > section.info > .rigth > .block-2").on("click", function() {
  jQuery("body > article > section.production > .prod-block > .prod[data-prodid='1']").find("span.descr").click();
})

jQuery("body").on("click", ".text-block>.text>a", function() {
    var  tops = $("#about.about").offset().top;
    $('body,html').animate({scrollTop: tops*.95}, 1000);
    return false;
})

jQuery("body > header > .menu-block > ul > li > a.not_link").on("click", function() {
  if (gal != "") {
      jQuery(".descr-blocks > .close").click();
    }
    return false;  
})

if ($(window).width() < 991) {
    $('[data-prodid]').each(function() {
        var $element = $(this);
        // console.log($element)
        // $element.waypoint(function() {
        //     $('[data-prodid]').removeClass("active")
        //     $element.addClass("active")
        // }, {
        //     offset: "40%"
        // });
    });
    // var lastScrollTop = 0;
    // window.onscroll = onScroll;

    // function onScroll (e) {
    //   var top = window.pageYOffset;
    //   // console.log(lastScrollTop > top, lastScrollTop < top)
    //   if (lastScrollTop > top) {
    //     jQuery(".header").removeClass("sbottom")
    //   } else if (lastScrollTop < top) {
    //     jQuery(".header").addClass("sbottom")
    //   }
    //   lastScrollTop = top;
    // }
    
   
    jQuery("body").on("touchstart", ".tslider .fancy", function() {
        $.fancybox.open( $(".lslide.active"), {thumbs : {
          autoStart : false
        }});
       // alert("test");
       // jQuery(".lslide.active").click();
    })

    jQuery("body>article>section.info>.rigth>.block-1").on("touchstart", function() {
      jQuery(this).parent().find("a").click();
    })
}

$(".arrow_top").on("click", function() {
  $('body,html').animate({scrollTop: 0}, 1000);
})

jQuery("body").on("click", ".descr-blocks > .block > .info > .buttons > .order", function() {
  jQuery(this).parent().find("a").click()
})

jQuery("body > article > .footer > .form > button").on("click", function() {
  var text = jQuery(this).parent().find("input").val();
  if (text != "") {
    $.post(callb, text).done(function(data) {
      jQuery(this).parent().find("input").trigger('reset');
        jQuery("body > .form").addClass("active");
        setTimeout(function() {
          jQuery("body > .form").removeClass("active");
        }, 3000)
    }).fail(function() {
        alert("Произошла ошибка при отправке запроса!");
    });
      return false; 
    }
  
})

jQuery("body > article > section.callback > div > .block > .input > button").on("click", function() {
  var text = jQuery(this).parent().find("input").val();
  if (text != "") {
    $.post(callb, text).done(function(data) {
      jQuery(this).parent().find("input").trigger('reset');
        jQuery("body > .form").addClass("active");
        setTimeout(function() {
          jQuery("body > .form").removeClass("active");
          jQuery
        }, 3000)
    }).fail(function() {
        alert("Произошла ошибка при отправке запроса!");
    });
      return false; 
    }
  
})

var formSubmited = false

jQuery("#form56115736").on("submit", function() {
    if(formSubmited){
      return false
    }
    var pdata = JSON.parse(localStorage.getItem("tcart"));
    pdata = pdata.products;
    var prids = ""
    for (var i =0;i<pdata.length; i++) {
        if (i+1 !=pdata.length) {
            prids += pdata[i].pid+","       
        } else {
            prids += pdata[i].pid   
        }
    }
    var ts = $("#form56115736").serialize()+"&ids="+prids
    formSubmited = true
  $.post(callb2, ts).done(function(data) {
    jQuery(".t706__cartwin").removeClass("t706__cartwin_showed")
    $("#form56115736").trigger('reset');    
    jQuery("body").removeClass("t706__body_cartwinshowed");
      jQuery("body > .form").addClass("active");
      setTimeout(function() {
        window.localStorage.clear()
        tcart__init('56115736');
        jQuery("body > .form").removeClass("active");
        jQuery("body").removeClass("t-body_scroll-locked");
        setTimeout(function(){
          window.location = "success"
        }, 500)
      }, 3000)
  }).fail(function() {
      alert("Произошла ошибка при отправке запроса!");
  });
    return false; 
})


jQuery("body > .checkout > .close").on("click", function() {
  jQuery(this).parent().removeClass("active")
})


jQuery("body > .checkout > .block > form").on("submit", function() {
  $.post(callb3, $("body > .checkout > .block > form").serialize()).done(function(data) {
    jQuery("body").removeClass("t706__body_cartwinshowed");
    jQuery("body > .checkout").removeClass("active")
    $("body > .checkout > .block > form").trigger('reset');
      jQuery("body > .form").addClass("active");
      setTimeout(function() {
        jQuery("body > .form").removeClass("active");
      }, 3000)
  }).fail(function() {
      alert("Произошла ошибка при отправке запроса!");
  });
    return false; 
})

jQuery("body>header > .contact > .block > .right > .cart, .header .container .cart").on("click", function(){
  tcart__openCart() 
})

const preload_evt = new Event('preloaded')
setTimeout(function () {
	anime.timeline({
    complete: function () {      
		pageProd();
		if(typeof(getAllUrlParams(window.location.href).filter) != "undefined") {
			setTimeout(function() {
				let catId = getAllUrlParams(window.location.href).filter;
				$(".filter .categories .attr_filter[data-cat='"+catId+"']").click();
				$(".header .categories .category[data-cat='"+catId+"']").addClass('active');
				$('body,html').animate({scrollTop: $(".production .product_container").offset().top - 200}, 1000);
			},400)
		}
		window.dispatchEvent(preload_evt);

    }
	})
    .add({
		targets: '.js-preloader-val',
		textContent: [0, 100],
		round: 1,
		duration: 1000,
		easing: 'easeInOutSine'
    })
    .add({
		targets: '.js-preloader-fill',
		scaleX: [0, 1],
		duration: 1000,
		easing: 'easeInOutSine',
		offset: '-=800'
    })
}, 500)

window.addEventListener('preloaded', function () {
	anime.timeline({
		complete: function () {
			document.getElementsByClassName('js-preloader')[0].style.display = 'none'      
		}
	})
    .add({
		targets: '.js-preloader-content',
		translateY: 50,
		opacity: 0,
		duration: 600,
		easing: 'easeOutSine'
    })
    .add({
		targets: '.js-preloader',
		opacity: 0,
		duration: 800,
		easing: 'easeOutSine',
		offset: '-=200',
		complete: function () {
        	wow.init();    
		}
    })
})

/*ADD PRODUCTS*/

var pageproduct = 0;
var startproducts = 20;
var ptpl = jQuery(".product-tpl").html();
var start;
var end;
jQuery("body>article>section.production .product_container button").on("click", function() {
  var elem = jQuery(this)
  pageproduct++
  start = startproducts*pageproduct
  end = start + 20
  if(productsFiltered != undefined && productsFiltered.length > 0) {
    products = productsFiltered;
  } else {
    products = json;
  }
  for (var i = start; i < end; i++) {
    if (products[i] != undefined) {
      var infotpln = ptpl;
      infotpln = infotpln.replace(/\{tId\}/g, products[i].tId);
      infotpln = infotpln.replace(/\{tIzobrazhenie\}/g, products[i].tIzobrazhenie);
      infotpln = infotpln.replace(/\{tNazvanie\}/g, products[i].tNazvanie);
      infotpln = infotpln.replace(/\{tCena\}/g, products[i].tCena);
      infotpln = infotpln.replace(/\{imagebg\}/g, products[i].tIzobrazhenie);
      infotpln = infotpln.replace(/\{class\}/g, products[i].class);
      if (products[i].tSkidka > 0) {
        var sale = '<span class="sale">-'+products[i].tSkidka+'%</span>'
        var priceBlock = '<div class="prc"><span class="price js-product-price_old" field="li_price__2">'+products[i].tCena+' грн</span><span class="price js-product-price" field="li_price__2">'+products[i].tSprice+' грн</span></div>'
      } else {
        var sale = ""
        var priceBlock = '<div class="prc"><span class="price js-product-price" field="li_price__2">'+products[i].tCena+'грн</span></div>'
      }
      if (products[i].Teg != null) {
        var tag = '<span class="tag" data-tag="'+products[i].Teg+'">'+products[i].Teg+'</span>';
      } else {
        var tag = '';
      }
      infotpln = infotpln.replace(/\{price\}/g, priceBlock);
      infotpln = infotpln.replace(/\{sale\}/g, sale);
      infotpln = infotpln.replace(/\{tag\}/g, tag);
      jQuery("body>article>section.production .product_container .prod-block:not(.sale-block)").append(infotpln);
      // console.log(jQuery("body>article>section.production>.prod-block>div")[i])
    } else {
      jQuery(elem).hide()
    }
  }  
  // for (var i = start; i < end+1; i++) {
  //   if (json[i] != undefined && jQuery(window).width() < 991) {
  //     var $element = jQuery("body>article>section.production>.prod-block>div[data-prodid='"+[i]+"']");
  //     jQuery("body>article>section.production>.prod-block>div[data-prodid='"+[i]+"']").waypoint(function() {
  //         console.log()
  //         $('[data-prodid]').removeClass("active")
  //         jQuery(this.element).addClass("active")
  //     }, {
  //         offset: "40%"
  //     });
  //   }
  // }
})

// jQuery('[data-section]').each(function(n, i) {
//     var $element = jQuery(this);
//     $element.waypoint(function() {
//         var atrb = $element.attr("data-section");
//         jQuery(".c-menu__list-link").removeClass('active');
//         jQuery("body>header > .menu-block > ul > li > a").removeClass('active');
//         // console.log("body>header > .menu-block > ul > li > a[href='#" + atrb + "']")
//         jQuery("body>header > .menu-block > ul > li > a[href='#" + atrb + "']").addClass('active');
//     jQuery(".c-menu__list-link[href='#" + atrb + "']").addClass('active');
//     }, {
//         offset: "50%"
//     });
// });

// var $element = jQuery(".prod-block");
// $element.waypoint(function() {
//     jQuery(".c-menu__list-link").removeClass('active');

//     jQuery("body>header > .menu-block > ul > li > a").removeClass('active');
//     // console.log("body>header > .menu-block > ul > li > a[href='#" + atrb + "']")
//     jQuery("body>header > .menu-block > ul > li > a[href='#product']").addClass('active');
//     jQuery(".c-menu__list-link[href='#product']").addClass('active');
// }, {
//     offset: "bottom-in-view"
// });

// var $element = jQuery("body>article>section.video");
// $element.waypoint(function() {
//     jQuery("body>header > .menu-block > ul > li > a").removeClass('active');
//     // console.log("body>header > .menu-block > ul > li > a[href='#" + atrb + "']")
//     // jQuery("body>header > .menu-block > ul > li > a[href='#product']").addClass('active');
// }, {
//     offset: "bottom-in-view"
// });

function pageProd () {
	if (loadedParam.method == "product") {
		var pids = loadedParam.id;
		createDescr(pids);
		jQuery(".descr-blocks > .block").addClass("shown");
		jQuery(".descr-blocks").addClass("active");
		jQuery(".descr-blocks > .block").addClass("active");
		gallery();
		jQuery("body").addClass("t-body_scroll-locked")
		jQuery("body, html").addClass("locked")
		$(".header .categories").addClass('hide');
	}
}



/*SEARCH*/


jQuery("body>header > .contact > .block > .right > .search, .header .container .search").on("click", function() {
  jQuery(".c-modal--search").addClass("is-active")
  setTimeout(function() {
    jQuery(".c-search__input-wrapper").addClass("is-shown");
    setTimeout(function() {
      jQuery(".js-modal-close").addClass("is-shown"); 
    }, 400)
  }, 400)
  return false;
})

jQuery(".c-modal__close").on("click", function() {
  jQuery(".c-modal--search").removeClass("is-active")
  jQuery(".c-search__input-wrapper").removeClass("is-shown");
  jQuery(".js-modal-close").removeClass("is-shown"); 
  jQuery(".c-search__results").html("");
  jQuery(".js-search-input").trigger('reset');
})

var serchTpl = jQuery(".search-tpl").html()

jQuery("body").on("input", ".js-search-input", function() {
  var blocks = "";
  var infoAll = json;
  var v = $(this).val();
  if(v.length==0) {
    asrch = 0;
    jQuery(".c-search__results").html("");
  } else {
    asrch = 1;
    // jQuery("body > .container > article > .events > .right.ajax").hide();
    // jQuery("body > .container > article > .events > .right.tpl").show();
    var ds = [];
    for(var i=0;i<infoAll.length;i++) {
      if(new RegExp(v, "ig").test(infoAll[i].tNazvanie)) {
        ds[ds.length] = infoAll[i];
      } else if(typeof(infoAll[i].tNart)!=="undefined" && new RegExp(v, "ig").test(infoAll[i].tNart)) {
        ds[ds.length] = infoAll[i];
      }
    }
    for(var i=0;i<ds.length;i++) {
      var tpln = serchTpl;
      tpln = tpln.replace(/\{pid\}/g, ds[i].tId);
      tpln = tpln.replace(/\{img\}/g, ds[i].tIzobrazhenie);
      tpln = tpln.replace(/\{name\}/g, ds[i].tNazvanie); 
      tpln = tpln.replace(/\{art\}/g, ds[i].tId);
      if (ds[i].tSkidka > 0) {
        tpln = tpln.replace(/\{price\}/g, ds[i].tSprice);
      } else {
        tpln = tpln.replace(/\{price\}/g, ds[i].tCena);
      }
      blocks += tpln
    }
    // jQuery("body > .container > article > .events > .right.tpl").html("");
    jQuery(".c-search__results").html(blocks);
    for(var i = 0; i < ds.length; i++){
      (function(i) {
            setTimeout(function(){
              jQuery($(".c-search__card")[i]).addClass('is-active')
            }, 60);
      })(i);
    }
    new SimpleBar($('.js-search-results')[0]);  
  }
});

jQuery("body").on("click", ".c-search__card", function() {
  var pids = jQuery(this).attr("data-pid");
  createDescr(pids);
  jQuery(".c-modal__close").click();
  setTimeout(function() {
    jQuery(".descr-blocks > .block").addClass("shown");
    jQuery(".descr-blocks").addClass("active");
    jQuery(".descr-blocks > .block").addClass("active");
    gallery();
    jQuery("body").addClass("t-body_scroll-locked")
    jQuery("body, html").addClass("locked")    
  }, 500)

})

if (loadedParam.prod == "sale") {
  jQuery("body>header > .menu-block > ul > li > a.sale").addClass("active")
  jQuery("body>header > .menu-block > ul > li > a.collection").removeClass("active")
  jQuery("body>article>section.production>.prod-block").hide();
  jQuery("body>article>section.production .product_container button").hide();
  jQuery("body>article>section.production>.prod-block.sale-block").show();
  $('body,html').animate({scrollTop: jQuery("body>article>section.production").offset().top - jQuery("body>header").height()}, 1000);
  saleBlock = true;
}


jQuery(".c-menu__list-link.prod-block").on("click", function() {
  jQuery("body>article>section.production>.prod-block").show();
  jQuery("body>article>section.production .product_container button").show();
  jQuery("body>article>section.production>.prod-block.sale-block").hide();
  saleBlock = false;
  // jQuery(this).addClass("active");
  jQuery("body>header > .menu-block > ul > li > a.sale").removeClass("active");
  history.pushState("", "", "/");
  AOS.refresh()
})

jQuery(".c-menu__list-link.sale-block").on("click", function() {
  jQuery("body>header > .menu-block > ul > li > a.collection").removeClass("active")
  jQuery("body>article>section.production>.prod-block").hide();
  jQuery("body>article>section.production .product_container button").hide();
  jQuery("body>article>section.production>.prod-block.sale-block").show();
  // $('body,html').animate({scrollTop: jQuery("body>article>section.production").offset().top - jQuery("body>header").height()}, 1000);
  history.pushState("", "", "sale");
  saleBlock = true;
  AOS.refresh()
})

$(".sliding").not(".attributes .sliding").each(function(index, el) {
    //$(this).slideUp(10);
});

$(".filter .categories.container .attr_header").on("click", function() {
  $(this).toggleClass('active');
  $(this).parent().find(".sliding").slideToggle(400);
});

function minMaxPrice(jsonFiltered) {
    if(jsonFiltered.length > 0) {
        minPrice = jsonFiltered[0]['tSprice'];
        maxPrice = minPrice;
        for(let i = 0; i < jsonFiltered.length; i++){
            if(jsonFiltered[i] == undefined) {
            }else if(jsonFiltered[i]['tSprice'] > maxPrice) {
                maxPrice = jsonFiltered[i]['tSprice'];
            }else if(jsonFiltered[i]['tSprice'] < minPrice) {
                minPrice = jsonFiltered[i]['tSprice'];
            }
        }
        if(!defaultPrice){
            defaultMaxPrice = maxPrice;
            defaultMinPrice = minPrice;
            defaultPrice = true;
        }
        $( "#slider-range" ).slider( "option", "values", [minPrice, maxPrice] );
        $( "#amount" ).val( "₴" + $( "#slider-range" ).slider( "values", 0 ) +
        " - ₴" + $( "#slider-range" ).slider( "values", 1 ) );
    }
}

function slider() {
    var $uislider = $( "#slider-range" ).slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [ minPrice, maxPrice ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "₴" + ui.values[ 0 ] + " - ₴" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val( "₴" + $( "#slider-range" ).slider( "values", 0 ) +" - ₴" + $( "#slider-range" ).slider( "values", 1 ) );
}

let sliderMoved = false;

$( "#slider-range" ).slider({
    stop: function(event, ui) {
    	minPrice = ui.values[0];
    	maxPrice = ui.values[1];
        sliderMoved = true;
        if(ui.values[0] == defaultMinPrice && ui.values[1] == defaultMaxPrice) {
            sliderMoved = false;
        }
    	filterProducts();
    }
});
let categoryArr = [];
$("body").on("click", ".filter .categories .category .attr_filter", function(){
  minMaxPrice(json);
  $(".filter .categories .category .attr_filter").removeClass('active');
	$(this).addClass('active');
  $(".header .categories .category").removeClass('active');
  if(categoryArr.indexOf($(this).attr('data-cat')) != -1) {
    for(let i = 0; i < categoryArr.length; i++) {
      if(categoryArr[i] == $(this).attr('data-cat')) {
        categoryArr = [];
        $(this).removeClass('active');
		history.pushState("", "", ""+default_link+"");
      }
    }
  } else {
    categoryArr = [$(this).attr('data-cat')];
	history.pushState("", "", "?filter="+$(this).attr('data-cat')+"");
  }
  filterProducts();
});

let attrArr = [];
$("body").on("click", ".filter .attributes .category .attr_filter", function(){
  minMaxPrice(json);
  $(".filter .attributes .category .attr_filter").removeClass('active');
  $(this).addClass('active');
  if(attrArr.indexOf($(this).attr('data-attr')) != -1) {
  	for(let i = 0; i < attrArr.length; i++) {
      if(attrArr[i] == $(this).attr('data-attr')) {
        attrArr = [];
        $(this).removeClass('active');
      }
    }
  } else {
  	attrArr = [$(this).attr('data-attr')];
  }
  filterProducts();
})

$("body").on("click", ".filter .attr_filter", function(){
  if($(".filter .attr_filter.active").length > 0) {
    $('.filter-buttons .filter-apply').addClass('active');
    $(".filter_buttons .filter-clear").removeClass('hidden');
  } else {
    $('.filter-buttons .filter-apply').removeClass('active');
    $(".filter_buttons .filter-clear").addClass('hidden');
  }
})

function filterProducts() {
    pageproduct = 0;
    startproducts = 20;
    start = 0;
    end = 0;
    if(categoryArr.length < 1 && attrArr.length < 1 && !sliderMoved) {
      filteredProducts(json);
      return;
    }
    filteredProducts(json.filter(n => (
      (!categoryArr.length || categoryArr.includes(n.tKategoriya)) &&
      (!attrArr.length || attrArr.findIndex(itemAttr => {
      	return n.tAtribut.length > 0 && in_array(itemAttr, n.tAtribut.split(","))
      })>-1) &&
      (!minPrice || minPrice <= n.tSprice) &&
      (!maxPrice || maxPrice >= n.tSprice)
    )));
}

function in_array(needle, haystack, strict) {

	var found = false, key, strict = !!strict;

	for (key in haystack) {
		if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
			found = true;
			break;
		}
	}

	return found;
}

function clearFilter() {
  filteredProducts(json);
  $('.filter-buttons .filter-apply').removeClass('active');
  $(".filter_buttons .filter-clear").addClass('hidden');
    minMaxPrice(json);
    attrArr = [];
    categoryArr = [];
    $( "#slider-range" ).slider( "option", "values", [minPrice, maxPrice] );
    $(".header .categories .category").removeClass('active');
    $(".filter .attr_filter").removeClass('active');
    $( "#amount" ).val( "₴" + $( "#slider-range" ).slider( "values", 0 ) +
    " - ₴" + $( "#slider-range" ).slider( "values", 1 ) );
      $(".attr_filter input").each(function(index, el) {
        $(this).parents(".attr_filter").show();
      })
}

$(".filter-clear").on("click", function() {
    clearFilter();
})

$(".production .content .filter_button").on("click", function() {
  $(".production .content .filter_container").css("display", "block");
  setTimeout(function() {
    $(".production .content .filter_container").addClass('show');
  },60)
})

$(".filter_container .filter-buttons div").on("click", function() {
  $(".production .content .filter_container").removeClass('show');
  setTimeout(function() {
    $(".production .content .filter_container").css("display", "block");
  },400)
})

$(".header .categories .category").on("click", function() {
	let catId = $(this).attr("data-cat");
	$(".filter .categories .attr_filter").removeClass('active');
	$(".filter .categories .attr_filter[data-cat='"+catId+"']").click();
	$('body,html').animate({scrollTop: $(".production .product_container").offset().top - 200}, 1000);
	$(this).addClass('active');
	if(categoryArr.length < 1) {
		$(this).removeClass('active')
	}
})

function filteredProducts(filteredProducts){
    if(!sliderMoved) {
    	minMaxPrice(filteredProducts);
    }
    let delay = 0;
    $("body>article>section.production>.content .prod-block:not(.sale-block)").html("");
    if(filteredProducts.length < 20) {
      $("body>article>section.production .product_container button").hide();
    } else {
      $("body>article>section.production .product_container button").show();
      productsFiltered = filteredProducts;
    }
    if(filteredProducts.length < 1) {
      $("body>article>section.production>.content .prod-block:not(.sale-block)").html("<div class='no_products'><span>Нет товаров</span></div>");
    }
    for (var i = 0; i < 20; i++) {
        if (filteredProducts[i] != undefined) {

        	// let filteredCats = [];
        	// filteredCats.push(filteredProducts[i].tKategoriya)

        	// let filteredAttrs = [];
        	// let attrs = filteredProducts[i].tAtribut.split(",");
        	
        	// for(let a = 0; a < attrs.length; a++) {
        	// 	filteredAttrs.push(attrs[a]);
        	// }

        	// console.log(filteredCats, filteredAttrs);

            var infotpln = ptpl;
            infotpln = infotpln.replace(/\{tId\}/g, filteredProducts[i].tId);
            if(i%3 == 0) {
                delay = 0;
            }
            delay = delay + 50;
            if($(window).width() > 700) {
                infotpln = infotpln.replace(/\{tDelay\}/g, delay);
            }
            infotpln = infotpln.replace(/\{tIzobrazhenie\}/g, filteredProducts[i].tIzobrazhenie);
            infotpln = infotpln.replace(/\{tNazvanie\}/g, filteredProducts[i].tNazvanie);
            infotpln = infotpln.replace(/\{imagebg\}/g, filteredProducts[i].tIzobrazhenie);
            infotpln = infotpln.replace(/\{class\}/g, filteredProducts[i].class);
            if (filteredProducts[i].tSkidka > 0) {
                var sale = '<span class="sale">-'+filteredProducts[i].tSkidka+'%</span>'
                var priceBlock = '<div class="prc"><span class="price js-product-price_old" field="li_price__2">'+filteredProducts[i].tCena+' грн</span><span class="price price-new js-product-price" field="li_price__2">'+filteredProducts[i].tSprice+' грн</span></div>'
            } else {
                var sale = ""
                var priceBlock = '<div class="prc"><span class="price js-product-price" field="li_price__2">'+filteredProducts[i].tCena+'грн</span></div>'
            }
            if (filteredProducts[i].Teg != null) {
                var tag = '<span class="tag" data-tag="'+filteredProducts[i].Teg+'">'+filteredProducts[i].Teg+'</span>';
            } else {
                var tag = '';
            }
            infotpln = infotpln.replace(/\{price\}/g, priceBlock);
            infotpln = infotpln.replace(/\{sale\}/g, sale);
            infotpln = infotpln.replace(/\{tag\}/g, tag);
            $("body>article>section.production>.content .prod-block:not(.sale-block)").append(infotpln);
        }
    }
    AOS.refresh();
}

$(".contacts form").on("submit", function(e) {
    $.ajax({
        type: "POST",
        url: "/contactsForm",
        data: $(this).serialize(),
        success: function() {
          $(".contacts form")[0].reset();
        }
    })
    $("body > .form").addClass("active");
    setTimeout(function() {
      $("body > .form").removeClass("active");
    }, 3000);
    e.preventDefault();
})

$(".delivery .block .item").on("click", function() {
  let tab = $(this).attr("data-title-tab");
  $(".delivery .block .item").removeClass('active');
  $(this).addClass('active');
  $(".about_description .description .tab").css("display", "none");
  $(".about_description .description .tab").removeClass("active");
  $(".about_description .description .tab[data-tab='"+tab+"']").css("display", "block");
  setTimeout(function() {
      $(".about_description .description .tab[data-tab='"+tab+"']").addClass("active");
  },50)
  if($(window).width() < 768) {
    $('body,html').animate({scrollTop: $(".delivery .about_description").offset().top -100}, 1000);
  }
})

for(let l = 0; l < $("header .menu-block ul li a").length; l++) {
  if(window.location.href == $("header .menu-block ul li a").eq(l).attr("href")) {
    $("header .menu-block ul li a").removeClass('active');
    $("header .menu-block ul li a").eq(l).addClass('active');
  }
}

for(let l = 0; l < $(".c-modal .c-menu__list li a").length; l++) {
  if(window.location.href == $(".c-modal .c-menu__list li a").eq(l).attr("href")) {
    $(".c-modal .c-menu__list li a").removeClass('active');
    $(".c-modal .c-menu__list li a").eq(l).addClass('active');
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getKeyByValue(object, value) {
    return object.findIndex(key => key.tId === value);
}

$("body").on("click, touchend", ".prod .add_to_wish", function() {
  console.log('ttt');
  showWishlistButton();
  let id = $(this).parents(".prod").attr("data-prodid");
  wishArr.push(id);
  wishArr = wishArr.filter(onlyUnique);
  localStorage.setItem('wishlist', wishArr);
  $(".open_wishlist .count").text(wishArr.length);
  if(wishArr.length > 0) {
    $(".open_wishlist").addClass('animate');
  }
  setTimeout(function() {
    $(".open_wishlist").removeClass('animate');
  },1500);
  createWishProducts();
});

function createWishProducts() {
  $(".wishlist .products").html("");
  let wishProducts = localStorage.getItem('wishlist');
  wishProducts = wishProducts.split(",");
  let products = json;
  for (var i = 0; i < wishProducts.length; i++) {
      let infotpln = wishTpl;
      let prodId = getKeyByValue(products,wishProducts[i]);
      if(typeof(prodId) !== "undefined") {
        infotpln = infotpln.replace(/\{tId\}/g, products[prodId].tId);
        infotpln = infotpln.replace(/\{tIzobrazhenie\}/g, products[prodId].tIzobrazhenie);
        infotpln = infotpln.replace(/\{tCena\}/g, products[prodId].tCena);
        let priceBlock;
        if (products[prodId].tSkidka > 0) {
          priceBlock = '<div class="prc"><span class="price js-product-price_old" field="li_price__2">'+products[prodId].tCena+' грн</span><span class="price js-product-price" field="li_price__2">'+products[prodId].tSprice+' грн</span></div>'
        } else {
          priceBlock = '<div class="prc prc_def"><span class="price js-product-price" field="li_price__2">'+products[prodId].tCena+'грн</span></div>'
        }
        infotpln = infotpln.replace(/\{price\}/g, priceBlock);
        $(".wishlist .products").append(infotpln);
      }
    }
}

$("body").on("click", ".prod_container .remove_prod_wish", function(event) {
  event.stopImmediatePropagation();
  $(this).parents(".prod_container").addClass('deleted');
  let id = $(this).attr("data-prodid");
  var index = wishArr.indexOf(id);
  if (index > -1) {
    wishArr.splice(index, 1);
  }
  localStorage.setItem('wishlist', wishArr);
  if(wishArr.length < 1) {
    closeWishlist();
    hideWishlistButton();
  }
  $(".open_wishlist .count").text(wishArr.length);
  //setTimeout(function(e) {
    //$(e).parents(".prod_container").remove();
  //},600, this)
})

$(".modal_wish .close").on("click", function() {
  closeWishlist();
})

$("body").on("click", ".modal_wish .buy", function() {
  $(".modal_wish .title").addClass('cart');
  setTimeout(function() {
    $(".modal_wish .title").removeClass('cart');
  },4000)
})

$(".open_wishlist").on("click", function() {
    openWishlist();
})