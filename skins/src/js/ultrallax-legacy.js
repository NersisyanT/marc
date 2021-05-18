"use strict";

function create_el(tag, el_class, append) {
    var outer =
        arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var insert =
        arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var pos =
        arguments.length > 5 && arguments[5] !== undefined ?
        arguments[5] :
        "beforeend";

    var elem = void 0;
    if (!outer) {
        elem = document.createElement(tag);
        elem.className = el_class;
        append.insertAdjacentElement(pos, elem);
    } else {
        elem = document.createElement("div");
        elem.innerHTML = insert;
        elem = elem.firstChild;
        append.insertAdjacentElement(pos, elem);
    }
    return elem;
}

function throttle(fn, interval) {
    var lastTime = void 0;
    return function throttled() {
        var timeSinceLastExecution = Date.now() - lastTime;
        if (!lastTime || timeSinceLastExecution >= interval) {
            fn.apply(this, arguments);
            lastTime = Date.now();
        }
    };
}

function is_touch_device() {
    return (
        "ontouchstart" in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

function empty(e) {
    switch (e) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case undefined:
        case typeof this == "undefined":
            return true;
        default:
            return false;
    }
}

function check_iOS() {
    var iDevices = [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod"
    ];

    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) {
                return true;
            }
        }
    }
    return false;
}

var do_parallax = new Event("do_parallax");
var undo_parallax = new Event("undo_parallax");

var observer = new IntersectionObserver(function (entries) {
    for (var i = 0, l = entries.length; i < l; i++) {
        if (entries[i].isIntersecting) {
            entries[i].target.dispatchEvent(do_parallax);
        } else {
            entries[i].target.dispatchEvent(undo_parallax);
        }
    }
});

observer.POLL_INTERVAL = 100;

var parallax_obj = {
    class: "js-parallax-viewport",
    style: "position: absolute; width: 100%; height: 100%; top: 0; left: 0; overflow: hidden; will-change: transform; backface-visibility: hidden; perspective: 1000; transform-style: preserve-3d;"
};

function ultrallax(el) {
    var settings =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var defaults = {
        speed: 0.6,
        mode: "picture"
    };

    var options = !empty(settings) ? Object.assign(defaults, settings) : defaults;
    var speed = options.speed,
        mode = options.mode;

    var coeff = 1;
    var symb = mode == "picture" ? 1 : -1;
    var position = void 0;
    if (mode == "block") {
        position = getComputedStyle(el).position;
    }
    var is_iOS = check_iOS();
    if (is_iOS) {
        el.classList.add("no-parallax");
    }

    var target = el,
        html = el.outerHTML,
        parent = el.parentNode;
    target.remove();

    var viewport = void 0,
        moving = void 0,
        img = void 0,
        is_video = void 0;

    if (mode == "picture") {
        viewport = create_el("div", parallax_obj.class, parent);
        viewport.style.cssText = parallax_obj.style;

        moving = create_el("div", "", viewport);
        moving.style.cssText = parallax_obj.style;
        moving.style.overflow = "visible";
        moving.insertAdjacentHTML("afterbegin", html);
        img = moving.querySelector("img, video");
        is_video = img.tagName == "VIDEO";
    } else {
        viewport = parent;
        moving = create_el("div", "", viewport);
        moving.style.cssText = "display: inline-block;";
        if (position == "absolute") {
            moving.style.position = "absolute";
            moving.style.top = 0;
            moving.style.left = 0;
            moving.style.width = "100%";
            moving.style.height = "100%";
        }
        moving.insertAdjacentHTML("afterbegin", html);
    }

    var do_flow = throttle(function (e) {
        window.requestAnimationFrame(function () {
            translate(parent, moving, coeff);
        });
    }, 10);

    if (!is_iOS) {
        viewport.addEventListener("do_parallax", function () {
            window.addEventListener("scroll", do_flow, {
                passive: true
            });
        });

        viewport.addEventListener("undo_parallax", function () {
            window.removeEventListener("scroll", do_flow);
        });

        observer.observe(viewport);
    }

    var p_pos = void 0,
        p_stat_top = void 0,
        p_stat_mid = void 0,
        p_mid = void 0,
        doc_scrl = void 0,
        win_offset = void 0,
        win_mid = void 0,
        perc = void 0;

    function translate(p, el) {
        var perc = calc(p, window.pageYOffset);
        el.style.transform = "translateY(" + perc + "px)";
    }

    function calc(p, offset) {
        p_pos = p.getBoundingClientRect();
        doc_scrl = document.documentElement.scrollTop;
        p_stat_top = p_pos.top + doc_scrl;
        p_stat_mid = p_stat_top + p_pos.height / 2;
        win_offset = offset;

        if (window.innerHeight / 2 > p_stat_mid) {
            perc = -win_offset;
        } else {
            win_mid = win_offset + window.innerHeight / 2;
            p_mid = p_pos.top + window.pageYOffset + p_pos.height / 2;
            perc = p_mid - win_mid;
        }

        return -perc * (speed * coeff) * symb;
    }

    function resize() {
        p_pos = viewport.getBoundingClientRect();
        doc_scrl = document.documentElement.scrollTop;
        p_stat_top = p_pos.top + doc_scrl;
        p_stat_mid = p_stat_top + p_pos.height / 2;

        var target_h =
            viewport.offsetHeight +
            (viewport.offsetHeight / 100) *
            (speed * coeff * 10 * (2 + speed * coeff));
        img.style.height = "auto";
        if (window.innerHeight / 2 < p_stat_mid && p_stat_top != 0) {
            img.style.height =
                img.scrollHeight < target_h ?
                target_h + "px" :
                (img.style.height = "auto");
        } else {
            img.style.height =
                img.scrollHeight < viewport.offsetHeight ? "100%" : "auto";
        }

        if (is_touch_device()) {
            coeff = img.scrollHeight >= window.innerHeight ? 0.7 : 1;
        } else {
            coeff = 1;
        }
        if (!is_iOS) {
            translate(parent, moving, coeff);
        }
        if (is_video) {
            img.removeEventListener("loadedmetadata", resize);
        }
    }

    if (mode == "picture") {
        if (!is_video) {
            resize();
        } else {
            if (img.readyState == 4) {
                resize();
            } else {
                img.addEventListener("loadedmetadata", resize);
            }
        }

        window.addEventListener("onresizeend", resize);
    } else {
        if (!is_iOS) {
            translate(parent, moving, coeff);
            window.addEventListener("onresizeend", translate(parent, moving, coeff));
        }
    }
}