<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7 onHoverAdmin"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8 onHoverAdmin"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9 onHoverAdmin"><![endif]-->
<!--[if IE 9]><html class="ie9 onHoverAdmin"><![endif]-->
<html class="onHoverAdmin">

<head>
    <!-- headers start -->
    <!-- <script type="text/javascript">
    var console = {
        error: function () {
            var a = [];
            // For V8 optimization
            for (var i = 0, n = arguments.length; i < n; i++) {
                a.push(arguments[i]);
            }
            alert(a.toString());
        },
        warn: function () {
            var a = [];
            // For V8 optimization
            for (var i = 0, n = arguments.length; i < n; i++) {
                a.push(arguments[i]);
            }
            alert(a.toString());
        },
        log: function () {
            var a = [];
            // For V8 optimization
            for (var i = 0, n = arguments.length; i < n; i++) {
                a.push(arguments[i]);
            }
            alert(a.toString());
        },
    };
    window.onerror = (function (e) {
        console.error(e);
    })
</script> -->
<!-- Google Tag Manager -->

<!-- End Google Tag Manager -->

    {headers}
    <!--[if lt IE 9]> <script src="{THEME}js/vendor/html5-3.6-respond-1.4.2.min.js"></script> <![endif]-->
    </head>
    <style type="text/css">
        .c-preloader {
            -moz-box-align: center;
            -moz-box-pack: center;
            -ms-flex-align: center;
            -ms-flex-pack: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            align-items: center;
            background: #000;
            bottom: 0;
            color: #fff;
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            justify-content: center;
            left: 0;
            position: fixed;
            right: 0;
            top: 0;
            z-index: 10000
        }

        .c-preloader__text {
            text-align: center
        }

        .c-preloader__line {
            background-color: hsla(0,0%,100%,.1);
            height: 3px;
            margin: .9375rem 0;
            position: relative;
            width: 11.25rem
        }

        .c-preloader__fill {
            -moz-transform: scaleX(0);
            -moz-transform-origin: left;
            -ms-transform: scaleX(0);
            -ms-transform-origin: left;
            -o-transform: scaleX(0);
            -o-transform-origin: left;
            -webkit-transform: scaleX(0);
            -webkit-transform-origin: left;
            background-color: #fff;
            height: 100%;
            position: absolute;
            transform: scaleX(0);
            transform-origin: left;
            width: 100%
        }
        .c-preloader__text {
            font-size: 2.3125em
        }
    </style>
    <div class="c-preloader js-preloader" >
        <div class="c-preloader__content js-preloader-content" >
            <div class="c-preloader__text">
                <span class="js-preloader-val">0</span>%</div>
            <div class="c-preloader__line">
                <div class="c-preloader__fill js-preloader-fill">
                </div>
            </div>
        </div>
    </div>
    <body id="body">
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKRPTDJ"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <header>
            <div class="contact">
                <div class="block">
                    <div class="left">
                        <span class="text">Связаться с нами</span>
                        <div class="phones">
                            <a href="tel:{C_phone1}">{C_phone1}</a>
                            <!-- <a href="tel:{C_phone2}">{C_phone2}</a> -->
                        </div>
                        <div class="time">
                          ПН-ВС 9.00 - 22.00
                        </div>
                    </div>
                    <div class="right">
                        <div class="search">
                            <span>Поиск...</span>
                        </div>
                        <div class="open_wishlist">
                          <div class="icon"></div>
                          <span>(<span class="count">0</span>)</span>
                        </div>
                        <div class="cart">
                            <span class="text">Товаров в корзине</span>
                            <span class="count-cart">(0)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu-block">
                <a href="/" class="logo"></a>
                <ul>
                    <li>
                        <a class="active collection" href="/">Каталог товаров</a>
                    </li>
                    <li>
                        <a href="{C_default_http_host}about-us">О нас</a>
                    </li>
                    <li>
                        <a href="{C_default_http_host}delivery">Доставка и оплата</a>
                    </li>
                    <li>
                        <a class="not_link callback_link" href="{C_default_http_host}#callback" data-anchor="callback">Оставить заявку</a>
                    </li>
                    <li>
                        <a href="{C_default_http_host}contacts">Контакты</a>
                    </li>
                </ul>
            </div>
        </header>
        [if {M_[mobile]}==true]
        <button class="c-burger c-burger--float js-burger" aria-label="Mobile menu">
          <div class="c-burger__content"><span class="c-burger__line">
              <div class="c-burger__line-inner"></div>
            </span><span class="c-burger__line">
              <div class="c-burger__line-inner"></div>
            </span><span class="c-burger__line">
              <div class="c-burger__line-inner"></div>
            </span></div>
        </button>
        [/if {M_[mobile]}==true]
        <div class="arrow_top">
        </div>
        <div class="header">
            <div class="head">
                <div class="container">
                  <a href="/" class="logo"></a>
                  <span class="cart">
                      <span class="count-cart mobiles"></span>
                  </span>
                  <a href="" class="search"></a>
                </div>
            </div>
            [if {show}!=false]
            <div class="categories">
              <div class="content">
                [foreach block=menuCategories]
                  <div class="category" data-cat="{menuCategories.kId}">
                    <span>{menuCategories.kKategoriya}</span>
                  </div>
                [/foreach]
              </div>
            </div>
            [/if {show}!=false]
        </div>
        <article>
            {content}
            <section class="footer" id="contacts" data-section="contacts">
                <span class="logo" style="background-image: url({THEME}/svg/logo2.svg)"></span>
                <ul>
                    <li>
                        <a href="tel:{C_phone1}">{C_phone1}</a>
                    </li>
                    <!-- <li>
                        <a href="tel:{C_phone2}">{C_phone2}</a>
                    </li> -->
                </ul>
                <div class="socials">
                  <a href="{C_fb}" target="_blank" class="fb" data-aos="fade-up" data-aos-duration="400" data-aos-delay="50" data-aos-offset="120"></a>
                  <a href="{C_inst}" class="inst" data-aos="fade-up" data-aos-duration="400" data-aos-delay="100" data-aos-offset="120"></a>
                  <a href="{C_yt}" target="_blank" class="yt" data-aos="fade-up" data-aos-duration="400" data-aos-delay="150" data-aos-offset="120"></a>
                  <a href="mailto:{C_mail}" class="mail" data-aos="fade-up" data-aos-duration="400" data-aos-delay="200" data-aos-offset="120"></a>
                </div>
                [if {M_[mobile]}==true]
                <p class="work_time">
                  ПН-ВС 9.00 - 22.00
                </p>
                [/if {M_[mobile]}==true]
            </section>
            <section class="descr-blocks">                
                <span class="close"></span> 
            </section>
        </article>
        <footer>
            <span>{L_"Copyright © 2021 All rights reserved"}</span>
        </footer>
        <div class="c-modal c-modal--search js-modal js-modal-search js-swipe-ignore">
            <button class="c-modal__close js-modal-close"><span></span></button>
            <div class="c-modal__inner">
                <form class="c-search js-search" action="" novalidate autocomplete="off">
                    <input autocomplete="false" hidden type="text" style="display:none;">
                    <div class="c-search__input-wrapper">
                        <input class="c-search__input js-search-input" type="text" name="query" placeholder="Поиск">
                    </div>
                    <div class="c-search__results js-search-results"></div>
                </form>
            </div>
        </div>

        <div id="rec56115736" class="r t-rec" style="{video}" data-animationappear="off " data-record-type="706">
            
            <div class="t706" data-project-currency="грн. " data-project-currency-side="r " data-project-currency-sep=", " data-cart-sendevent-onadd="y">
               <div class="t706__carticon " style="">
                  <div class="t706__carticon-text t-name t-name_xs">Click to order</div>
                  <div class="t706__carticon-wrapper">
                     <div class="t706__carticon-imgwrap">
                        <svg class="t706__carticon-img " xmlns="http://www.w3.org/2000/svg " viewBox="0 0 64 64">
                           <descr style="color:#bebebe;">Cart</descr>
                           <path fill="none " stroke-width="2 " stroke-miterlimit="10 " d="M44 18h10v45H10V18h10z " />
                           <path fill="none " stroke-width="2 " stroke-miterlimit="10 " d="M22 24V11c0-5.523 4.477-10 10-10s10 4.477 10 10v13 " />
                        </svg>
                     </div>
                     <div class="t706__carticon-counter"></div>
                  </div>
               </div>
               <div class="t706__cartwin">
                  <div class="t706__cartwin-close">
                     <div class="t706__cartwin-close-wrapper">
                        <svg class="t706__cartwin-close-icon " width="23px " height="23px " viewBox="0 0 23 23 " version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                           <g stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
                              <rect transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) " x="10.3137085 " y="-3.6862915 " width="2 " height="30"></rect>
                              <rect transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) " x="10.3137085 " y="-3.6862915 " width="2 " height="30"></rect>
                           </g>
                        </svg>
                     </div>
                  </div>
                  <div class="t706__cartwin-content">
                     <div class="t706__cartwin-top">
                        <div class="t706__cartwin-heading t-name t-name_xl">{L_"Ваш заказ"}</div>
                     </div>
                     <div class="t706__cartwin-products"></div>
                     <div class="t706__cartwin-bottom">
                        <div class="t706__cartwin-prodamount-wrap t-descr t-descr_sm"><span class="t706__cartwin-prodamount-label">Total:&nbsp;</span><span class="t706__cartwin-prodamount"></span></div>
                     </div>
                     <div class="t706__orderform">
                        <form id="form56115736" name='form56115736' role="form" action='' method='POST' data-formactiontype="2" data-inputbox=".t-input-group" data-success-url="" class="t-form js-form-proccess t-form_inputs-total_4" data-formsended-callback="t706_onSuccessCallback">
                           <!-- <input type="hidden" name="formservices[]" value="5baa7d5605c17ea1be5c0f6841977981" class="js-formaction-services"><input type="hidden" name="formservices[]" value="271ef093174daef88c7901274808d904" class="js-formaction-services"><input type="hidden" name="tildaspec-formname" tabindex="-1 " value="Cart"> -->
                           <div class="js-successbox t-form__successbox t-text t-text_md " style="display:none;">{L_"Спасибо! Мы получили ваш заказ"}</div>
                           <div class="t-form__inputsbox">
                              <div class="t-input-group t-input-group_nm required" data-input-lid="1496239431201">
                                 <div class="t-input-title t-descr t-descr_md " data-redactor-toolbar="no" field="li_title__1496239431201" style="">{L_"Имя"}</div>
                                 <div class="t-input-block">
                                    <input type="text " name="name" class="t-input js-tilda-rule " value="" required data-tilda-rule="name" data-tilda-req="1" style="color:#000000; border:1px solid #000000;">
                                    <div class="t-input-error"></div>
                                 </div>
                              </div>
                              <div class="t-input-group t-input-group_nm " data-input-lid="1496239431201">
                                 <div class="t-input-title t-descr t-descr_md " data-redactor-toolbar="no" field="li_title__1496239431201" style="">{L_"Фамилия"}</div>
                                 <div class="t-input-block">
                                    <input type="text " name="surname" class="t-input js-tilda-rule " value="" data-tilda-rule="surname" data-tilda-req="1" style="color:#000000; border:1px solid #000000;">
                                    <div class="t-input-error"></div>
                                 </div>
                              </div>
                              <div class="t-input-group t-input-group_ph required" data-input-lid="1496239478607">
                                 <div class="t-input-title t-descr t-descr_md " data-redactor-toolbar="no" field="li_title__1496239478607" style="">{L_"Телефон"}</div>
                                 <div class="t-input-block">
                                    <input type="text " name="phone" class="t-input js-tilda-rule " required value="" data-tilda-req="1" data-tilda-rule="phone" style="color:#000000; border:1px solid #000000;">
                                    <div class="t-input-error"></div>
                                 </div>
                              </div>
                              <div class="t-input-group t-input-group_ph " data-input-lid="1496239478607">
                                 <div class="t-input-title t-descr t-descr_md " data-redactor-toolbar="no" field="li_title__1496239478607" style="">{L_"Сообщение"}</div>
                                 <div class="t-input-block">
                                    <input type="text " name="message" class="t-input js-tilda-rule " value="" data-tilda-req="1" data-tilda-rule="message" placeholder="Введите сообщение" style="color:#000000; border:1px solid #000000;">
                                    <div class="t-input-error"></div>
                                 </div>
                              </div>
                              <!-- <div class="t-input-group t-input-group_ph " data-input-lid="1496239478607">
                                 <div class="t-input-title t-descr t-descr_md " data-redactor-toolbar="no" field="li_title__1496239478607" style="">Почта</div>
                                 <div class="t-input-block">
                                    <input type="text " name="mail" class="t-input js-tilda-rule " value="" data-tilda-req="1" data-tilda-rule="mail" style="color:#000000; border:1px solid #000000;">
                                    <div class="t-input-error"></div>
                                 </div>
                              </div> -->
                              <div class="t-form__errorbox-middle">
                                 <div class="js-errorbox-all t-form__errorbox-wrapper " style="display:none;">
                                    <div class="t-form__errorbox-text t-text t-text_md">
                                       <p class="t-form__errorbox-item js-rule-error js-rule-error-all"></p>
                                       <p class="t-form__errorbox-item js-rule-error js-rule-error-req">{L_"Это обязательное поле"}</p>
                                       <p class="t-form__errorbox-item js-rule-error js-rule-error-email"></p>
                                       <p class="t-form__errorbox-item js-rule-error js-rule-error-name"></p>
                                       <p class="t-form__errorbox-item js-rule-error js-rule-error-phone">Пожалуйста, введите корректный телефон</p>
                                       <p class="t-form__errorbox-item js-rule-error js-rule-error-string"></p>
                                    </div>
                                 </div>
                              </div>
                              <div class="t-form__submit"><button type="submit" class="t-submit" style="color:#ffffff;background-color:#000000;">{L_"Оформить заказ"}</button></div>
                           </div>
                           <div class="t-form__errorbox-bottom">
                              <div class="js-errorbox-all t-form__errorbox-wrapper " style="display:none;">
                                 <div class="t-form__errorbox-text t-text t-text_md">
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-all"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-req">Это обязательное поле</p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-email"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-name"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-phone">Пожалуйста, введите корректный телефон</p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-string"></p>
                                 </div>
                              </div>
                           </div>
                        </form>
                        <style> #rec56115736 input::-webkit-input-placeholder { color: #000000; opacity: 0.5; } #rec56115736 input::-moz-placeholder { color: #000000; opacity: 0.5; } #rec56115736 input:-moz-placeholder { color: #000000; opacity: 0.5; } #rec56115736 input:-ms-input-placeholder { color: #000000; opacity: 0.5; } #rec56115736 textarea::-webkit-input-placeholder { color: #000000; opacity: 0.5; } #rec56115736 textarea::-moz-placeholder { color: #000000; opacity: 0.5; } #rec56115736 textarea:-moz-placeholder { color: #000000; opacity: 0.5; } #rec56115736 textarea:-ms-input-placeholder { color: #000000; opacity: 0.5; } </style>
                     </div>
                  </div>
               </div>
               <div class="t706__cartdata"></div>
            </div>
        </div>        
        <div class="form">
            <div class="succsess">
                <span>
                    <svg viewBox="0 0 20 20">
                      <circle cx="50%" cy="50%" r="calc(50% - .5px)" fill="none"></circle>
                      <polyline points="6 10.5 9 13 15 7"></polyline>
                    </svg>
                </span>
                <span class="text-1">{L_"Заявка принята!"}</span>
                <span class="text-2">{L_"Ваш заказ в обработке, менеджер свяжется с вами."}</span>
            </div>
        </div>        
        <div class="checkout">
            <div class="block">
                <form method="post" action="">
                    <span>{L_"Заявка"}</span>
                    <div class="name">
                        <span>Имя</span>
                        <input required="required" type="text" name="name">
                    </div>
                    <div class="phn">
                        <span>{L_"Телефон"}</span>
                        <input required="required" type="text" name="phone">
                    </div>
                    <button type="submit">{L_"Оформить заказ"}</button>
                </form>
            </div>
            <span class="close"></span>
        </div>
        <div class="modal_wish">
          <div class="wishlist">
            <div class="title">
              <div class="close"></div>
              <p>
                <span>Избранное</span>
                <span class="red">Добавлено в корзину</span>
              </p>
            </div>
            <div class="products">
            </div>
          </div>
        </div>
        [if {M_[mobile]}==true]
        <div class="open_wishlist">
          <p>
            <span class="text">Избранное (<span class="count"></span>)</span>
          </p>
        </div>
        [/if {M_[mobile]}==true]
        <script type="text/template" class="wish-tpl">            
          <div class="prod_container" data-product-lid="{tId}">
            <div class="prod r js-product" id="rec5611528{tId}" data-id="{tId}" data-prodid="{tId}" data-product-lid="{tId}" onclick="void(0)">
              <a class="buy" href="#order"></a>
              <div class="remove_prod_wish" data-prodid="{tId}"></div>
              <div class="image">
                  <div class="js-product-img"  style="background-image: url({tIzobrazhenie})"></div>                         
              </div>
              <div class="text">
                  {price}
              </div>
            </div>
          </div>
        </script>
        <script type="text/template" class="json">{json}</script>
        <script type="text/template" class="product-tpl">            
            <div id="rec5611528{tId}" class="prod r js-product {class}" data-prodid="{tId}" data-product-lid="{tId}" onclick="void(0)">
                {sale}
                {tag}
                <div class="add_to_wish"></div>
                <div class="image">
                    <div class="js-product-img"  style="background-image: url({tIzobrazhenie})"></div>
                    <a class="descr" data-id="{tId}" href="/product-{tId}"></a>
                    <!-- <span class="buy"></span> -->
                    <a class="buy" href="#order"></a>                            
                </div>
                <div class="text">
                    <span class="name js-product-name" field="li_title__2">{tNazvanie}</span>
                    {price}
                    <!-- <span class="price js-product-price" field="li_price__2">{tCena} грн</span> -->
                </div>
            </div>
        </script>
        <script type="text/template" class="infotpl">
                <div class="block">
                    <div class="tslider">
                        <ul id="imageGallery">
                            {images}
                        </ul>
                    </div>
                    <div id="rec56115726" class="info r js-product" data-product-lid="{id}">
                        <div class="sku art">
                            <span class="name">{L_"Art"}:</span>
                            <span class="id">#00{id}</span>
                        </div>
                        <div class="js-product-img"  style="background-image: url({imagebg}); display: none;"></div>
                        <span class="name js-product-name" field="li_title__1">{name}</span>
                        <div class="sku color">
                            <span class="name">{L_"Цвет"}:</span>
                            <span class="id">{art}</span>
                        </div>
                        <!-- <span class="price js-product-price" field="li_price__1">{price} грн.</span> -->
                        {price}
                        <div class="buttons">
                            <button class="order">{L_"Купить"}</button>
                            <button class="cart">{L_"В корзину"}</button>
                            <a style="display: none" href="#order">{L_"Добавить"}</a>
                        </div>
                        <div class="descriptions">
                            <!-- <div class="info active">
                                <span class="title">Описание</span>
                                <div class="desc">                          
                                    {descr1}
                                </div>
                            </div> -->
                            <div class="deilv active">
                                <span class="title">Описание</span>
                                <div class="desc">
                                    {char}
                                </div>
                            </div>
                            <div class="deilv">
                                <span class="title">{L_"Бесплатная доставка"}</span>
                                <div class="desc">
                                    {descr2}
                                </div>
                            </div>
                        </div>
                        [if {M_[mobile]}==true]
                        <!-- <div style="width: 100%; height: 70px; background-color: red"></div> -->
                        [/if {M_[mobile]}==true]
                    </div>
                </div>
        </script>
        <script type="text/template" class="search-tpl">
            <article class="c-search__card" data-pid="{pid}">
              <a class="c-search__card-link js-ripple-button" data-bg="rgb(0, 196, 215)" onclick="return false">
                <div class="l-grid-row">
                  <div class="c-search__card-side">
                    <div class="c-search__card-pic">
                      <div class="c-search__card-pic-bg" style="background-image: url({img})"></div>
                    </div>
                  </div>
                  <div class="c-search__card-content">
                    <h3 class="c-search__card-title">{name}</h3>
                    <p class="c-search__card-cats"><span>Art:</span> #00{art}</p>
                    <p class="c-search__card-cats"><span>Цена:</span> {price} грн</p>
                  </div>
                </div>
              </a>
            </article>
        </script>        
        [if {M_[mobile]}==true]
        <script type="text/template" id="tpl-modal-menu"><div class="c-modal c-modal--menu js-modal"><div class="c-modal__viewport js-modal__viewport"><div class="c-modal__content js-modal__content"><div class="c-modal__inner">{contents}</div></div></div></div></script>
        <script type="text/template" id="tpl-menu">
          <nav class="c-menu js-menu"><i class="icon icon-logo c-menu__icon js-menu__logo"></i>
              <ul class="c-menu__list">
                <li class="c-menu__list-item js-menu__item">
                    <a class="c-link c-menu__list-link prod-block not_link" href="{C_default_http_host}" data-anchor-disabled="data-anchor-disabled">Каталог товаров</a>
                </li>
                <li class="c-menu__list-item js-menu__item">
                    <a class="c-link c-menu__list-link not_link" href="{C_default_http_host}about-us" data-anchor-disabled="data-anchor-disabled">О нас</a>
                </li>
                <li class="c-menu__list-item js-menu__item">
                    <a class="c-link c-menu__list-link not_link" href="{C_default_http_host}delivery" data-anchor-disabled="data-anchor-disabled">Доставка</a>
                </li>
                <li class="c-menu__list-item js-menu__item">
                    <a class="c-link c-menu__list-link not_link" href="{C_default_http_host}#callback" data-anchor="callback" data-anchor-disabled="data-anchor-disabled">Оставить заявку</a>
                </li>
                <li class="c-menu__list-item js-menu__item">
                    <a class="c-link c-menu__list-link not_link" href="{C_default_http_host}contacts" data-anchor-disabled="data-anchor-disabled">Контакты</a>
                </li>
                <li class="c-menu__list-item last">
                    <div>
                        <a class="c-link c-menu__list-link item mail" href="tel:{C_phone1}" data-anchor-disabled="data-anchor-disabled"></a>
                        <a class="c-link c-menu__list-link item phone" href="mailto:{C_mail}" data-anchor-disabled="data-anchor-disabled"></a>
                    </div>
                </li>
              </ul>
          </nav>
        </script>
        [/if {M_[mobile]}==true]

        <script type="text/template" class="gallery">
            <li data-thumb="{images}" class="{video}" data-fancybox="gallery" data-src="{image}"><img  src="{images}" /></li>
        </script>        
        <link rel="stylesheet" href="https://killserver.github.io/Fonts/main.min.css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700" rel="stylesheet">
        <link rel="stylesheet" href="{THEME}/css/support.css">
        <link rel="stylesheet" href="{THEME}/font/stylesheet.css">
        <link rel="stylesheet" href="{THEME}/css/blocks-2.12.css?1">
        <link rel="stylesheet" href="{THEME}/css/cart.css?3">
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />


        [if {M_[mobile]}==true]
        <link rel="stylesheet" href="{THEME}/css/burger.css?4">
        <link rel="stylesheet" href="{THEME}/css/menu.css?6">
        <link rel="stylesheet" href="{THEME}/css/modal.css?3">
        [/if {M_[mobile]}==true]

        <link rel="stylesheet" href="{THEME}/css/animate.css?{S_time}">
        <link rel="stylesheet" href="{THEME}/css/lightslider.min.css?6">
        <link rel="stylesheet" href="{THEME}/css/simplebar.min.css">
        <link rel="stylesheet" href="{THEME}/css/main.css?{S_time}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css" />
        <link rel="stylesheet" type="text/css" href="{THEME}/css/animation.css?1">
        <script type="text/javascript">var callb = "{R_[callback]}";</script>
        <script type="text/javascript">var callb2 = "{R_[callback2]}";</script>
        <script type="text/javascript">var callb3 = "{R_[callback3]}";</script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-3.2.1.min.js"><\/script>');</script>
        <script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.2/dist/jquery.fancybox.min.js"></script>

        [if {M_[mobile]}==true]
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenLite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TimelineLite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/easing/EasePack.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/CSSPlugin.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/plugins/AttrPlugin.min.js"></script> 
        <!-- <script src="{THEME}/js/bodyScrollLock.min.js"></script> -->
        <script src="{THEME}/js/menu.js?5"></script>
        [/if {M_[mobile]}==true]

        <script src="{THEME}/js/intersection-observer.js"></script>
        <script src="{THEME}/js/plugins.js"></script>
        <script src="{THEME}/js/ultrallax-legacy.js"></script>
        <!-- <script src="{THEME}/js/parallax.min.js"></script> -->
        <script src="{THEME}/js/parallax.min1.js"></script>
        <script src="{THEME}/js/smoothScroll.js"></script>
        <script src="{THEME}/js/wow.min.js"></script>
        <script src="{THEME}/js/lazyload.js"></script>
        <script src="{THEME}/js/jquery.scrollme.min.js"></script>
        <script src="{THEME}/js/anime.min.js"></script>
        <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
        <script type="text/javascript">scrollme.init()</script>

        <script src="{THEME}/js/blocks-2.7.js"></script>
        <script src="{THEME}/js/cart.js?{S_time}"></script>
        <!-- <script src="{THEME}/js/php-unserialize.js"></script> -->

        <!-- Simple Panel -->
        <script src="{THEME}/js/jquery.scrolly.min.js"></script>
        <script src="{THEME}/js/skel.min.js"></script>
        <script src="{THEME}/js/simplebar.js"></script>
        <script src="{THEME}/js/util.js"></script>

        <!-- /Simple Panel -->

        <script src="{THEME}/js/jquery.waypoints.min.js"></script>
        <script src="{THEME}/js/lightslider.min.js"></script>
        <script src="{THEME}/js/jquery-ui.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
        <script src="{THEME}/js/main.js?{S_time}"></script>
        <script type="text/javascript">
           $(document).ready(function() {
           tcart__init('56115736');
           });
        </script>
        <script>
            AOS.init({
              // Global settings:
              disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
              startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
              initClassName: 'aos-init', // class applied after initialization
              animatedClassName: 'aos-animate', // class applied on animation
              useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
              disableMutationObserver: false, // disables automatic mutations' detections (advanced)
              debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
              throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
              

              // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
              offset: 150, // offset (in px) from the original trigger point
              delay: 100, // values from 0 to 3000, with step 50ms
              duration: 400, // values from 0 to 3000, with step 50ms
              easing: 'ease', // default easing for AOS animations
              once: false, // whether animation should happen only once - while scrolling down
              mirror: false, // whether elements should animate out while scrolling past them
              anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

            });
        </script>
    </body>
</html>