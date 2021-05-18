function LazyInit() {
    function logElementEvent(eventName, element) {
        console.log(new Date().getTime(), eventName, element.getAttribute('data-src'));
    }
    function logEvent(eventName, elementsLeft) {
        console.log(new Date().getTime(), eventName, elementsLeft + " images left");
    }
    function createImageFragment(srcUrl) {
        var imageFragment = document.createElement('img');
        imageFragment.setAttribute('src', srcUrl);
        return imageFragment;
    }
    //Lazyload
    /*var myLazyLoad = new LazyLoad({
        elements_selector: ".js-lazy",
        threshold: -100,
        callback_enter: function(el){
            $(el).addClass('is-loaded');
        }
    });*/
    var lazy_load = new LazyLoad({
        elements_selector: ".js-lazy",
        threshold: 200,
        callback_enter: function (element) {
            function callback_load(event) {
                element.classList.remove('is-loading');
                element.classList.add('is-loaded');
                //logElementEvent("LOADED", element);
                imageFragment.removeEventListener('load', callback_load);
            }
            console.log(element)
            var imageFragment = createImageFragment(element.getAttribute('data-src'));
            imageFragment.addEventListener('load', callback_load);
            element.classList.add('is-loading');
            //logElementEvent("ENTERED", element);
        },
        callback_set: function (element) {
            //logElementEvent("SET", element);
        },
        callback_error: function(element) {
            //logElementEvent("ERROR", element);
            element.src = "https://placeholdit.imgix.net/~text?txtsize=21&txt=Fallback%20image&w=220&h=280";
        }
    });
}
(function(w, d){
    var b = d.getElementsByTagName('body')[0];
    var s = d.createElement("script"); 
    var v = !("IntersectionObserver" in w) ? "8.17.0" : "10.19.0";
    s.async = true; // This includes the script as async. See the "recipes" section for more information about async loading of LazyLoad.
    s.src = "https://cdn.jsdelivr.net/npm/vanilla-lazyload@" + v + "/dist/lazyload.min.js";
    w.lazyLoadOptions = {};
    b.appendChild(s);
}(window, document));

//Polyfill
(function () {
    if (typeof window.CustomEvent === "function") {
        return false;
    }

    function CustomEvent(event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent (event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();