function tcart__init(t) {
    var r = $(".t706");
    if (void 0 !== window.tcart_initted && "yes" == window.tcart_initted && 1 < r.length)
        $(".t706__previewmode-infobox center").append('<div style="color:red;">Error: Two cart widgets on the page</div>');
    else {
        window.tcart_initted = "yes",
        tcart__drawBottomTotalAmount(),
        tcart__loadLocalObj(),
        tcart__reDrawCartIcon(),
        tcart__addEvent__links(),
        setInterval(function() {
            tcart__addEvent__links()
        }, 5e3),
        tcart__addEvents(),
        tcart__addEvent__selectpayment(),
        $("#rec" + t).attr("data-animationappear", "off"),
        $("#rec" + t).css("opacity", "1"),
        window.tildaBrowserLang = window.navigator.userLanguage || window.navigator.language,
        window.tildaBrowserLang = window.tildaBrowserLang.toUpperCase(),
        -1 != window.tildaBrowserLang.indexOf("RU") ? window.tildaBrowserLang = "RU" : window.tildaBrowserLang = "EN",
        r.find(".t-input-group_dl").length ? ($(".t706__cartwin-prodamount-label").html(tcart__dict(2, "Subtotal") + ":&nbsp;"),
        $(".t706__cartwin-totalamount-label").html(tcart__dict(3, "Total") + ":&nbsp;")) : ($(".t706__cartwin-prodamount-label").html(tcart__dict(1, "Total") + ":&nbsp;"),
        $(".t706__cartwin-totalamount-label").html(tcart__dict(1, "Total") + ":&nbsp;")),
        "" == $(".t706__cartwin-heading").html() && $(".t706__cartwin-heading").html(tcart__dict(4, "Your order") + ":"),
        "Submit" == $(".t706 .t-form__submit .t-submit").html() && $(".t706 .t-form__submit .t-submit").html(tcart__dict(5, "Submit order")),
        r.find(".t-input-group_pm").length && r.find(".t-input-group_pm").find(".t-input-title").html(tcart__dict(6, "Payment method"));
        var o, a = r.attr("data-cart-dontstore");
        void 0 !== a && "y" == a && (window.tcart_dontstore = "y"),
        void 0 !== (o = r.attr("data-cart-oneproduct")) && "y" == o && (window.tcart_oneproduct = "y"),
        void 0 !== (o = r.attr("data-cart-sendevent-onadd")) && "y" == o && (window.tcart_sendevent_onadd = "y")
    }
}
function tcart__dict(t) {
    var r = []
      , o = {
        EN: "Total",
        RU: "??????????"
    };
    r[1] = o,
    o = {
        EN: "Subtotal",
        RU: "??????????"
    },
    r[2] = o,
    o = {
        EN: "Total",
        RU: "????????????????????????????????? ????????????????????"
    },
    r[3] = o,
    o = {
        EN: "Your order",
        RU: "?????????????? ????????????????????"
    },
    r[4] = o,
    o = {
        EN: "Submit order",
        RU: "?????????????????????????????????? ????????????????????"
    },
    r[5] = o,
    o = {
        EN: "Payment method",
        RU: "???????????????????????? ??????????????????????????"
    },
    r[6] = o,
    o = {
        EN: "Click to order\t",
        RU: "?????????????????????????????????? ?????????????????????????????????"
    },
    r[7] = o,
    o = {
        EN: "Subtotal with discount",
        RU: "?????????? ???????? ?????????????????????????????"
    },
    r[8] = o,
    o = {
        EN: "Promo code",
        RU: "????????????????????????????????"
    },
    r[9] = o,
    o = {
        EN: "Discount",
        RU: "????????????????????????"
    },
    r[10] = o,
    o = {
        EN: "Minimal order",
        RU: "?????????????????????????????????????????????? ????????????????????"
    },
    r[11] = o,
    o = {
        EN: "Minimal order quantity",
        RU: "???????????????????????????????????????????? ?????????????????????????????????????????? ???? ????????????????????????"
    },
    r[12] = o;
    var a = window.tildaBrowserLang;
    if (null != typeof r[t])
        return void 0 !== r[t][a] && "" != typeof r[t][a] ? r[t][a] : r[t].EN
}
function tcart__nullObj() {
    var t = new Object;
    return t.products = [],
    t.prodamount = 0,
    t.amount = 0,
    t.system = "",
    t
}
function tcart__loadLocalObj() {
    var t = null;
    if ("object" == typeof localStorage)
        try {
            t = localStorage.getItem("tcart")
        } catch (t) {
            console.log("Your web browser does not support storing a Cart data locally.1")
        }
    window.tcart = null === t ? tcart__nullObj() : JSON.parse(t);
    var r, o = $(".t706").attr("data-cart-maxstoredays");
    void 0 !== o && "" != o ? 0 < o ? void 0 !== window.tcart.updated && 0 < window.tcart.updated && 86400 * o < 1 * Math.floor(Date.now() / 1e3) - 1 * window.tcart.updated && (window.tcart = tcart__nullObj()) : "0" == o && (window.tcart = tcart__nullObj()) : void 0 !== window.tcart.updated && 0 < window.tcart.updated && 2592e3 < 1 * Math.floor(Date.now() / 1e3) - 1 * window.tcart.updated && (window.tcart = tcart__nullObj()),
    delete window.tcart.currency,
    delete window.tcart.currency_txt,
    delete window.tcart.currency_txt_l,
    delete window.tcart.currency_txt_r,
    delete window.tcart.currency_side,
    delete window.tcart.currency_sep,
    window.tcart.currency = "$",
    window.tcart.currency_side = "l",
    window.tcart.currency_sep = ".",
    void 0 !== window.tcart.delivery && delete window.tcart.delivery,
    void 0 !== window.tcart.promocode && delete window.tcart.promocode,
    void 0 !== (r = $(".t706").attr("data-project-currency")) && "" != r && (window.tcart.currency = r),
    window.tcart.currency_txt = window.tcart.currency,
    void 0 !== (r = $(".t706").attr("data-project-currency-side")) && "r" == r && (window.tcart.currency_side = "r"),
    "l" == window.tcart.currency_side ? (window.tcart.currency_txt_l = window.tcart.currency_txt + "",
    window.tcart.currency_txt_r = "") : (window.tcart.currency_txt_r = "&nbsp;" + window.tcart.currency_txt,
    window.tcart.currency_txt_l = ""),
    void 0 === (r = $(".t706").attr("data-project-currency-sep")) || "." != r && "," != r ? "$" == window.tcart.currency || "???????" == window.tcart.currency || "USD" == window.tcart.currency || "EUR" == window.tcart.currency ? window.tcart.currency_sep = "." : window.tcart.currency_sep = "," : window.tcart.currency_sep = r,
    delete window.tcart.system;
    var a = $(".t706").attr("data-payment-system");
    window.tcart.system = void 0 !== a && "" != a ? a : "none";
    var c = $(".t706").attr("data-cart-minorder");
    void 0 !== c && "" != c && 0 < c && void 0 === window.tcart_minorder && (c *= 1,
    window.tcart_minorder = c,
    $(".t706__cartwin-prodamount-wrap").prepend('<div class="t706__cartwin-prodamount-minorder" style="opacity:0.5; font-size:14px; font-weight:400;">' + tcart__dict(11, "Minimal order") + ": " + tcart__showPrice(c) + "</div>"));
    var i = $(".t706").attr("data-cart-mincntorder");
    void 0 !== i && "" != i && 0 < i && void 0 === window.tcart_mincntorder && (i *= 1,
    window.tcart_mincntorder = i,
    $(".t706__cartwin-prodamount-wrap").prepend('<div class="t706__cartwin-prodamount-mincntorder" style="opacity:0.5; font-size:14px; font-weight:400;">' + tcart__dict(12, "Minimal quantity") + ": " + i + "</div>")),
    tcart__addDelivery(),
    tcart__updateTotalProductsinCartObj()
}
function tcart__saveLocalObj() {
    if ("object" == typeof window.tcart) {
        window.tcart.updated = Math.floor(Date.now() / 1e3);
        var t = JSON.stringify(window.tcart);
        if (t = t.replace(default_link, ""),
        console.log(t),
        "object" == typeof localStorage) {
            try {
                window.localStorage.clear()
            } catch (t) {}
            try {
                window.localStorage.setItem("tcart", t)
            } catch (t) {
                console.log("Your web browser does not support storing a Cart data locally.2")
            }
        }
    }
}
function tcart__addEvents() {
    $(".t706__carticon").click(function(t) {
        tcart__openCart()
    }),
    $(".t706__cartwin-close").click(function(t) {
        tcart__closeCart()
    }),
    $(".t706__cartwin-closebtn").click(function(t) {
        tcart__closeCart()
    }),
    $(".t706").find(".js-form-proccess").attr("data-formcart", "y"),
    $(".t706__cartwin").click(function(t) {
        t.target == this && tcart__closeCart()
    })
}
function tcart__addEvent__links() {
    $('[href^="#order"]').not("[data-link-event-setted]").click(function(t) {
        t.preventDefault();
        var r = $(this);
        if (r.attr("data-link-event-setted", "yes"),
        void 0 === r.attr("data-dbclk-prevent") || "yes" != r.attr("data-dbclk-prevent")) {
            r.attr("data-dbclk-prevent", "yes"),
            setTimeout(function() {
                r.removeAttr("data-dbclk-prevent")
            }, 1e3),
            $("body").hasClass("t-body_popupshowed") && ($("body").removeClass("t-body_popupshowed"),
            $(".t-popup").removeClass("t-popup_show"),
            setTimeout(function() {
                $(".t-popup").not(".t-popup_show").css("display", "none")
            }, 300));
            var o = r.attr("href")
              , a = "0"
              , c = ""
              , i = ""
              , n = ""
              , d = ""
              , e = "";
            if ("#order:" == o.substring(0, 7)) {
                var _ = o.substring(7);
                if (void 0 !== _ && "" != _) {
                    if (0 < _.indexOf(":::")) {
                        var s = _.indexOf(":::");
                        if (0 < _.indexOf("=") && _.indexOf("=") < _.indexOf(":::")) {
                            var w = _.substring(s + 3);
                            _ = _.substring(0, s)
                        }
                    }
                    var u;
                    0 < _.indexOf("=") ? (void 0 !== (u = _.split("="))[0] && (c = u[0]),
                    void 0 !== u[1] && (a = u[1]),
                    a = tcart__cleanPrice(a)) : c = _,
                    void 0 !== w && "" != w && 0 < w.indexOf("=") && void 0 !== (u = w.split("="))[0] && void 0 !== u[1] && "" != u[0] && "" != u[1] && "image" == u[0] && 0 < u[1].indexOf("tildacdn.com") && (i = u[1]),
                    "" == e && void 0 === (e = r.closest(".r").attr("id").replace("rec", "")) && (e = "")
                }
            }
            var l = $(this).closest(".js-product")
              , p = l.attr("data-product-lid");
            if (void 0 !== l) {
                if ("" == c && void 0 === (c = l.find(".js-product-name").text()) && (c = ""),
                "" != a && 0 != a || (a = tcart__cleanPrice(a = l.find(".js-product-price").text())),
                "" == i) {
                    var m = l.find(".js-product-img");
                    if (void 0 !== m && (m.is("img") && (i = m.attr("src")),
                    m.is("div"))) {
                        i = "";
                        var v = m.css("background-image");
                        void 0 !== v && "" != v && (i = v.replace("url(", "").replace(")", "").replace(/\"/gi, ""))
                    }
                }
                "" == d && void 0 === (d = l.attr("data-product-lid")) && (d = ""),
                "" == e && void 0 === (e = l.closest(".r").attr("id").replace("rec", "")) && (e = "");
                var y = [];
                l.find(".js-product-option").each(function() {
                    var t = $(this)
                      , r = t.find(".js-product-option-name").text()
                      , o = t.find("option:selected").val()
                      , a = t.find("option:selected").attr("data-product-variant-price");
                    if (a = tcart__cleanPrice(a),
                    void 0 !== r && void 0 !== o) {
                        var c = {};
                        "" != r && (r = tcart__escapeHtml(r)),
                        "" != o && (o = (o = tcart__escapeHtml(o)).replace(/(?:\r\n|\r|\n)/g, "")),
                        1 < r.length && ":" == r.charAt(r.length - 1) && (r = r.substring(0, r.length - 1)),
                        c.option = r,
                        c.variant = o,
                        c.price = a,
                        y.push(c)
                    }
                }),
                "" == n && void 0 === (n = l.find(".js-product-sku").text()) && (n = "")
            }
            if ("" != c || "" != a && 0 != a) {
                "" == c && (c = "NoName"),
                "" == a && (a = 0),
                "" != c && (c = tcart__escapeHtml(c)),
                "" != i && (i = tcart__escapeHtmlImg(i));
                var f = {};
                if (f.name = c,
                f.price = a,
                f.img = i,
                f.pid = p,
                void 0 !== y && 0 < y.length && (f.options = y),
                void 0 !== n && "" != n && (n = tcart__escapeHtml(n),
                f.sku = n),
                tcart__addProduct(f),
                void 0 !== window.tcart_sendevent_onadd && "y" == window.tcart_sendevent_onadd && window.Tilda && "function" == typeof Tilda.sendEventToStatistics) {
                    var h = "/tilda/cart/add/";
                    0 < e && (h += e),
                    0 < d && (h += "-" + d);
                    var b = c
                      , g = a
                      , k = "";
                    void 0 !== y && 0 < y.length && $.each(y, function(t, r) {
                        k += r.option + ": " + r.variant + "; "
                    });
                    var C = {
                        ecommerce: {
                            add: {
                                products: [{
                                    recid: e,
                                    lid: d,
                                    sku: n,
                                    name: c,
                                    price: a,
                                    variant: k,
                                    quantity: 1
                                }]
                            }
                        }
                    };
                    Tilda.sendEventToStatistics(h, b, C, g)
                }
            }
        }
    })
}
function tcart__addProduct(t) {
    var r = Math.floor(Date.now() / 1e3)
      , o = window.tcart.products
      , a = "";
    0 < o.length && $.each(o, function(o, c) {
        if (void 0 !== window.tcart_oneproduct && "y" == window.tcart_oneproduct) {
            if (c.name == t.name && c.price == t.price) {
                if (void 0 === c.options && void 0 === t.options && void 0 === c.sku && void 0 === t.sku)
                    return !(a = "yes");
                if (void 0 === c.options && void 0 === t.options && void 0 !== c.sku && void 0 !== t.sku && c.sku == t.sku)
                    return !(a = "yes")
            }
        } else if (c.name == t.name && c.price == t.price && void 0 === c.options && void 0 === t.options && void 0 === c.sku && void 0 === t.sku)
            return window.tcart.products[o].quantity++,
            window.tcart.products[o].amount = window.tcart.products[o].price * window.tcart.products[o].quantity,
            window.tcart.products[o].amount = tcart__roundPrice(window.tcart.products[o].amount),
            window.tcart.products[o].ts = r,
            !(a = "yes")
    }),
    "" == a && (t.amount = t.price,
    t.quantity = 1,
    t.ts = r,
    window.tcart.products.push(t)),
    tcart__updateTotalProductsinCartObj(),
    tcart__reDrawCartIcon(),
    tcart__saveLocalObj(),
    "yes" == $(".t706").attr("data-opencart-onorder") ? setTimeout(function() {
        tcart__openCart()
    }, 10) : ($(".t706__carticon").addClass("t706__carticon_neworder"),
    setTimeout(function() {
        $(".t706__carticon").removeClass("t706__carticon_neworder")
    }, 2e3))
}
function addCount() {
    jQuery(".header").removeClass("sbottom"),
    window.tcart.total >= 1 && jQuery(".count-cart.mobiles").addClass("red"),
    jQuery(".count-cart").html("(" + window.tcart.total + ")"),
    jQuery(".count-cart.mobiles").html(window.tcart.total),
    jQuery(".count-cart.mobiles").addClass("animate"),
    setTimeout(function() {
        jQuery(".count-cart.mobiles").removeClass("animate")
    }, 1e3)
}
function tcart__updateTotalProductsinCartObj() {
    var t = window.tcart.products;
    if (0 < t.length) {
        var r = 0
          , o = 0;
        $.each(t, function(t, a) {
            r += 1 * a.quantity,
            o = 1 * o + 1 * a.amount
        }),
        o = tcart__roundPrice(o),
        window.tcart.total = r;
        var a = window.tcart.prodamount = o;
        if ("object" == typeof window.tcart.promocode && void 0 !== window.tcart.promocode.promocode && "" != window.tcart.promocode.promocode) {
            var c = 0;
            void 0 !== window.tcart.promocode.discountsum && 0 < window.tcart.promocode.discountsum ? c = 1 * window.tcart.promocode.discountsum : void 0 !== window.tcart.promocode.discountpercent && 0 < window.tcart.promocode.discountpercent ? c = tcart__roundPrice(a * window.tcart.promocode.discountpercent * 1 / 100) : console.log("Cart Some error."),
            (a -= c) < 0 && (a = 0),
            window.tcart.prodamount_discountsum = c,
            window.tcart.prodamount_withdiscount = a
        }
        "object" == typeof window.tcart.delivery && void 0 !== window.tcart.delivery.price && 0 < window.tcart.delivery.price && 0 < window.tcart.prodamount && (a += 1 * window.tcart.delivery.price),
        0 < a && (a = tcart__roundPrice(a)),
        window.tcart.amount = a
    } else
        window.tcart.total = 0,
        window.tcart.prodamount = 0,
        window.tcart.amount = 0;
    addCount()
}
function tcart__reDrawCartIcon() {
    var t = window.tcart
      , r = $(".t706__carticon");
    1 == t.total && (r.css("opacity", 0),
    r.animate({
        opacity: 1
    }, 300)),
    0 < t.total ? (r.addClass("t706__carticon_showed"),
    r.find(".t706__carticon-counter").html(t.total)) : (r.removeClass("t706__carticon_showed"),
    r.find(".t706__carticon-counter").html("")),
    $(".t706__carticon-text").html("=&nbsp;" + tcart__showPrice(window.tcart.prodamount))
}
function tcart__openCart() {
    $(".t706__carticon").removeClass("t706__carticon_showed"),
    $("body, html").addClass("t706__body_cartwinshowed"),
    setTimeout(function() {
        tcart__lockScroll()
    }, 500);
    var t = $(".t706__cartwin");
    if (t.css("opacity", 0),
    t.addClass("t706__cartwin_showed"),
    t.animate({
        opacity: 1
    }, 300),
    tcart__reDrawProducts(),
    tcart__reDrawTotal(),
    $(document).keyup(tcart__keyUpFunc),
    "y" == window.lazy)
        try {
            t_lazyload_update()
        } catch (t) {
            console.log("js lazyload not loaded")
        }
}
function tcart__reDrawProducts() {
    var t = $(".t706__cartwin-products")
      , r = window.tcart.products
      , o = "";
    if (0 < r.length && $.each(r, function(t, r) {
        "" != r.img && (o = "yes")
    }),
    0 < r.length) {
        var a = "";
        $.each(r, function(t, r) {
            a += '<div class="t706__product" data-cart-product-i="' + t + '">',
            "yes" == o && (a += '<div class="t706__product-thumb"><div class="t706__product-imgdiv" style="background-image:url(' + r.img + ');"></div></div>'),
            a += '<div class="prod_descr"><div class="t706__product-title t-descr t-descr_sm">',
            a += r.name,
            void 0 !== r.options && 0 < r.options.length && (a += '<div style="opacity:0.7;font-size:12px;font-weight:400;">',
            $.each(r.options, function(t, r) {
                a += "<div>" + r.option + ": " + r.variant + "</div>"
            }),
            a += "</div>"),
            void 0 !== r.sku && "" != r.sku && (a += '<div style="opacity:0.7;font-size:12px;font-weight:400;">',
            a += r.sku,
            a += "</div>"),
            a += "</div>",
            void 0 !== window.tcart_oneproduct && "y" == window.tcart_oneproduct ? a += '<div class="t706__product-plusminus t-descr t-descr_sm" style="display:none;"><span class="t706__product-quantity">' + r.quantity + "</span></div>" : a += '<div class="t706__product-plusminus t-descr t-descr_sm"><span class="t706__product-minus"><img src="https://static.tildacdn.com/lib/linea/c8eecd27-9482-6c4f-7896-3eb09f6a1091/arrows_circle_minus.svg" style="width:16px;height:16px;border:0;"></span><span class="t706__product-quantity">' + r.quantity + '</span><span class="t706__product-plus"><img src="https://static.tildacdn.com/lib/linea/c47d1e0c-6880-dc39-ae34-521197f7fba7/arrows_circle_plus.svg" style="width:16px;height:16px;border:0;"></span></div>',
            a += '<div class="t706__product-amount t-descr t-descr_sm"></div>',
            0 < r.amount && (a += tcart__showPrice(r.amount)),
            a += "</div>",
            a += '<div class="t706__product-del"><img src="https://static.tildacdn.com/lib/linea/1bec3cd7-e9d1-2879-5880-19b597ef9f1a/arrows_circle_remove.svg" style="width:20px;height:20px;border:0;"></div>',
            a += "</div>"
        }),
        t.html(a),
        tcart__addEvents__forProducts()
    } else
        t.html("")
}
function tcart__reDrawTotal() {
    $(".t706__cartwin-prodamount").html(tcart__showPrice(window.tcart.prodamount)),
    $(".t706__cartwin-totalamount").html(tcart__showPrice(window.tcart.amount));
    var t = $(".t706__cartwin-totalamount-info");
    t.html(""),
    "object" != typeof window.tcart.promocode && "object" != typeof window.tcart.delivery || (t.css("display", "block"),
    t.append(tcart__dict(2, "Subtotal") + ": " + tcart__showPrice(window.tcart.prodamount) + "<br>")),
    "object" == typeof window.tcart.promocode && (t.append(tcart__dict(9, "Promo code") + ": " + window.tcart.promocode.promocode + (void 0 !== window.tcart.promocode.discountpercent ? " " + window.tcart.promocode.discountpercent + "% " : "") + "<br>"),
    t.append(tcart__dict(10, "Discount") + ": " + tcart__showPrice(window.tcart.prodamount_discountsum) + "<br>"),
    0 < window.tcart.prodamount_withdiscount ? t.append(tcart__dict(8, "Subtotal with discount") + ": " + tcart__showPrice(window.tcart.prodamount_withdiscount) + "<br>") : t.append(tcart__dict(8, "Subtotal with discount") + ": 0<br>")),
    "object" == typeof window.tcart.delivery && void 0 !== window.tcart.delivery.name && void 0 !== window.tcart.delivery.price && 0 < window.tcart.delivery.price && t.append(window.tcart.delivery.name + ": " + tcart__showPrice(window.tcart.delivery.price) + "<br>"),
    0 == window.tcart.prodamount ? $(".t706__cartwin-prodamount-wrap").css("display", "none") : $(".t706__cartwin-prodamount-wrap").css("display", "block"),
    void 0 !== window.tcart_minorder && 0 < window.tcart_minorder && (window.tcart.prodamount >= window.tcart_minorder ? ($(".t706__cartwin-prodamount-minorder").css("display", "none"),
    $(".t706").find(".t-submit").removeClass("t706__submit_disable")) : ($(".t706__cartwin-prodamount-minorder").css("display", "block"),
    $(".t706").find(".t-submit").addClass("t706__submit_disable"))),
    void 0 !== window.tcart_mincntorder && 0 < window.tcart_mincntorder && (window.tcart.total >= window.tcart_mincntorder ? ($(".t706__cartwin-prodamount-mincntorder").css("display", "none"),
    $(".t706").find(".t-submit").removeClass("t706__submit_disable")) : ($(".t706__cartwin-prodamount-mincntorder").css("display", "block"),
    $(".t706").find(".t-submit").addClass("t706__submit_disable"))),
    0 == window.tcart.amount ? $(".t706__cartwin-totalamount-wrap").css("display", "none") : window.tcart.prodamount == window.tcart.amount ? $(".t706__orderform").length && 700 < $(".t706__orderform").height() ? $(".t706__cartwin-totalamount-wrap").css("display", "block") : $(".t706__cartwin-totalamount-wrap").css("display", "none") : $(".t706__cartwin-totalamount-wrap").css("display", "block"),
    void 0 !== window.tcart.promocode && ($(".t706__cartwin-totalamount-wrap").css("display", "block"),
    0 == window.tcart.amount && $(".t706__cartwin-totalamount").html("0")),
    void 0 !== window.tcart.delivery && void 0 !== window.tcart.delivery.price && 0 < window.tcart.delivery.price && $(".t706__cartwin-totalamount-wrap").css("display", "block"),
    $(".t706__carticon-text").html("=&nbsp;" + tcart__showPrice(window.tcart.prodamount))
}
function tcart__addEvents__forProducts() {
    $(".t706__product-plus").click(function(t) {
        tcart__product__plus($(this))
    }),
    $(".t706__product-minus").click(function(t) {
        tcart__product__minus($(this))
    }),
    $(".t706__product-del").click(function(t) {
        tcart__product__del($(this))
    })
}
function tcart__closeCart() {
    $("body, html").removeClass("t706__body_cartwinshowed"),
    tcart__unlockScroll(),
    void 0 !== window.tcart_dontstore && "y" == window.tcart_dontstore && ("undefind" != typeof window.tcart && "undefind" != typeof window.tcart.products && (window.tcart.products = []),
    tcart__updateTotalProductsinCartObj(),
    tcart__saveLocalObj(),
    $(".t706__carticon-counter").html(window.tcart.total),
    tcart__reDrawTotal(),
    tcart__reDrawProducts()),
    0 < window.tcart.total && $(".t706__carticon").addClass("t706__carticon_showed"),
    tcart__delZeroquantity_inCartObj(),
    $(document).unbind("keyup", tcart__keyUpFunc),
    $(".t706__carticon").removeClass("t706__carticon_neworder"),
    $(".t706__cartwin").animate({
        opacity: 0
    }, 300),
    setTimeout(function() {
        $(".t706__cartwin").removeClass("t706__cartwin_showed"),
        $(".t706__cartwin").css("opacity", "1")
    }, 300),
    void 0 !== window.tcart_success && "yes" == window.tcart_success && location.reload()
}
function tcart__keyUpFunc(t) {
    27 == t.keyCode && tcart__closeCart()
}
function tcart__product__plus(t) {
    var r = t.closest(".t706__product")
      , o = r.attr("data-cart-product-i");
    window.tcart.products[o].quantity++,
    window.tcart.products[o].amount = window.tcart.products[o].price * window.tcart.products[o].quantity,
    window.tcart.products[o].amount = tcart__roundPrice(window.tcart.products[o].amount),
    r.find(".t706__product-quantity").html(window.tcart.products[o].quantity),
    0 < window.tcart.products[o].amount ? r.find(".t706__product-amount").html(tcart__showPrice(window.tcart.products[o].amount)) : r.find(".t706__product-amount").html(""),
    tcart__updateTotalProductsinCartObj(),
    $(".t706__carticon-counter").html(window.tcart.total),
    tcart__reDrawTotal(),
    tcart__saveLocalObj()
}
function tcart__product__minus(t) {
    var r = t.closest(".t706__product")
      , o = r.attr("data-cart-product-i");
    0 < window.tcart.products[o].quantity && window.tcart.products[o].quantity--,
    window.tcart.products[o].amount = window.tcart.products[o].price * window.tcart.products[o].quantity,
    window.tcart.products[o].amount = tcart__roundPrice(window.tcart.products[o].amount),
    r.find(".t706__product-quantity").html(window.tcart.products[o].quantity),
    0 < window.tcart.products[o].amount ? r.find(".t706__product-amount").html(tcart__showPrice(window.tcart.products[o].amount)) : tcart__product__del(t),
    tcart__updateTotalProductsinCartObj(),
    $(".t706__carticon-counter").html(window.tcart.total),
    tcart__reDrawTotal(),
    tcart__saveLocalObj()
}
function tcart__product__del(t) {
    var r = t.closest(".t706__product")
      , o = r.attr("data-cart-product-i");
    window.tcart.products.splice(o, 1),
    r.remove(),
    tcart__updateTotalProductsinCartObj(),
    $(".t706__carticon-counter").html(window.tcart.total),
    tcart__reDrawTotal(),
    tcart__saveLocalObj(),
    tcart__reDrawProducts(),
    0 == window.tcart.products.length && tcart__closeCart()
}
function tcart__delZeroquantity_inCartObj() {
    var t = window.tcart.products
      , r = "";
    0 < t.length && $.each(t, function(t, o) {
        void 0 !== o && 0 == o.quantity && (window.tcart.products.splice(t, 1),
        r = "yes")
    }),
    "yes" == r && tcart__saveLocalObj()
}
function tcart__drawBottomTotalAmount() {
    $(".t706 .t-form__errorbox-middle").before('<div class="t706__cartwin-totalamount-wrap t-descr t-descr_xl"><div class="t706__cartwin-totalamount-info" style="font-size:14px; padding-bottom:10px; font-weight:400;"></div><span class="t706__cartwin-totalamount-label">Total:&nbsp;</span><span class="t706__cartwin-totalamount"></span></div>')
}
function tcart__addDelivery() {
    var t = $(".t706 .t-form .t-radio__wrapper-delivery input:checked").val()
      , r = $(".t706 .t-form .t-radio__wrapper-delivery input:checked").attr("data-delivery-price");
    if (void 0 !== t && void 0 !== r && "" != t && "" != r) {
        r = tcart__cleanPrice(r);
        var o = t.indexOf("=");
        0 < o && (t = (t = t.substring(0, o)).trim()),
        window.tcart.delivery = {},
        window.tcart.delivery.name = t,
        window.tcart.delivery.price = r
    }
    var a = $(".t706 .t-form .t-radio__wrapper-delivery input");
    a.length && a.change(function() {
        var t = $(".t706 .t-form .t-radio__wrapper-delivery input:checked").val()
          , r = $(".t706 .t-form .t-radio__wrapper-delivery input:checked").attr("data-delivery-price");
        if (void 0 !== t && void 0 !== r) {
            if (r = tcart__cleanPrice(r),
            "" != t) {
                var o = t.indexOf("=");
                0 < o && (t = (t = t.substring(0, o)).trim())
            }
            window.tcart.delivery = {},
            window.tcart.delivery.name = t,
            window.tcart.delivery.price = r
        } else
            void 0 !== window.tcart.delivery && delete window.tcart.delivery;
        tcart__updateTotalProductsinCartObj(),
        tcart__reDrawTotal()
    })
}
function tcart__updateDelivery() {}
function tcart__addPromocode(t) {
    "object" != typeof window.tcart.promocode ? ("object" == typeof t && void 0 !== t.promocode && "" != t.promocode && (0 < t.discountsum || 0 < t.discountpercent) && (window.tcart.promocode = t),
    tcart__updateTotalProductsinCartObj(),
    tcart__reDrawTotal()) : console.log("Error. Promocode already activated before")
}
function tcart__addEvent__selectpayment() {
    if (0 != $(".t706").find(".t-input-group_pm").length) {
        var t = $(".t706 .t-form .t-radio__wrapper-payment input");
        t.length && (t.change(function() {
            var t = $(".t706 .t-form .t-radio__wrapper-payment input:checked").attr("data-payment-variant-system");
            void 0 !== t && "" != t || (t = ""),
            $(".t706").attr("data-payment-variant-system", t),
            window.tcart.system = t
        }),
        $(".t706 .t-form .t-radio__wrapper-payment input:checked").trigger("change"))
    }
}
function tcart__escapeHtml(t) {
    var r = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return t.replace(/[<>"']/g, function(t) {
        return r[t]
    })
}
function tcart__escapeHtmlImg(t) {
    var r = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
    };
    return t.replace(/[<>"]/g, function(t) {
        return r[t]
    })
}
function tcart__cleanPrice(t) {
    return void 0 === t || "" == t || 0 == t ? t = 0 : (t = (t = t.replace(",", ".")).replace(/[^0-9\.]/g, ""),
    t = parseFloat(t).toFixed(2),
    isNaN(t) && (t = 0),
    t = parseFloat(t),
    (t *= 1) < 0 && (t = 0)),
    t
}
function tcart__roundPrice(t) {
    return void 0 === t || "" == t || 0 == t ? t = 0 : (t = parseFloat(t).toFixed(2),
    t = parseFloat(t),
    (t *= 1) < 0 && (t = 0)),
    t
}
function tcart__showPrice(t) {
    return void 0 === t || 0 == t || "" == t ? t = "" : (t = t.toString(),
    void 0 !== window.tcart.currency_sep && "," == window.tcart.currency_sep && (t = t.replace(".", ",")),
    t = window.tcart.currency_txt_l + t + window.tcart.currency_txt_r),
    t
}
function tcart__lockScroll() {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        var t = $("body");
        if (!t.hasClass("t-body_scroll-locked")) {
            var r = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            t.addClass("t-body_scroll-locked"),
            t.css("top", "-" + r + "px"),
            t.attr("data-popup-scrolltop", r)
        }
    }
}
function tcart__unlockScroll() {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream) {
        var t = $("body");
        if (t.hasClass("t-body_scroll-locked")) {
            var r = $("body").attr("data-popup-scrolltop");
            t.removeClass("t-body_scroll-locked"),
            t.css("top", ""),
            t.removeAttr("data-popup-scrolltop"),
            window.scrollTo(0, r)
        }
    }
}
