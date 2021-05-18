function checkTransitionEvents() {
  var el = document.createElement('fakeelement');
  var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
  };
  var animations = {
      "animation": "animationend",
      "OAnimation": "oAnimationEnd",
      "MozAnimation": "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
  };
  var result = {
      animationEnd: null,
      transitionEnd: null
  };
  var transitionKeys = Object.keys(transitions);
  var animationKeys = Object.keys(animations);
  for (var i = 0, s = 4; i < s; i++) {
      if (result.transitionEnd !== null && result.animationEnd === null) {
          break;
      }
      if (transitionKeys[i] in el.style && result.transitionEnd === null) {
          result.transitionEnd = transitions[transitionKeys[i]];
      }
      if (animationKeys[i] in el.style && result.animationEnd === null) {
          result.animationEnd = animations[animationKeys[i]];
      }
  }
  return result;
}
var _a = checkTransitionEvents(), transitionEnd = _a.transitionEnd, animationEnd = _a.animationEnd;

function createElement(_a) {
  var _b = _a.tagName, tagName = _b === void 0 ? 'div' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.container, container = _d === void 0 ? null : _d, _e = _a.position, position = _e === void 0 ? 'beforeend' : _e, _f = _a.content, content = _f === void 0 ? '' : _f, _g = _a.outer, outer = _g === void 0 ? false : _g;
  var element;
  element = document.createElement(tagName);
  if (typeof content === 'string') {
      element.innerHTML = content;
  }
  if (!outer) {
      element.className = className;
  }
  else {
      if (typeof content === 'string') {
          if (element.children.length > 0) {
              element = element.children.length === 1 ? element.firstChild : element.children;
          }
          else {
              throw new Error('Содержимое элемента пустое');
          }
      }
  }
  if (container instanceof Element) {
      if (element instanceof HTMLCollection) {
          Array.prototype.slice.call(element).forEach(function (el) {
              container.insertAdjacentElement(position, el);
          });
      }
      else {
          container.insertAdjacentElement(position, element);
      }
  }
  return element;
}

function empty(e) {
  switch (e) {
      case '':
      case 0:
      case '0':
      case null:
      case false:
      case undefined:
      case typeof e === 'undefined':
          return true;
      default:
          return false;
  }
}

var getContent = function ($el) { return $el.content ? $el.cloneNode(true).innerHTML : $el.innerHTML; };
var CTemplateRenderer = /** @class */ (function () {
    function CTemplateRenderer() {
        // Объект, хранящий шаблоны
        this.templates = {};
        // Префикс для атрибутов id шаблонов.
        this.prefix = 'tpl-';
        // Объект, содержащий кастомные функции рендеринга
        this.builds = {};
        // Регулярные выражения для различных опереций парсинга
        this.pattern = {
            block: /\{block="(.+?)"\}(.*?)\{\/block="\1"\}/g,
            clean: /\{(.+?)\}/g
        };
        var $elems = document.querySelectorAll("[id^=\"" + this.prefix + "\"], [id*=\"" + this.prefix + "\"]");
        if ($elems.length > 0) {
            for (var i = 0, s = $elems.length; i < s; i++) {
                var id = $elems[i].getAttribute('id').replace(this.prefix, '');
                var content = getContent($elems[i]);
                if (content.match(this.pattern.block) == null) {
                    this.templates[id] = content;
                }
                else {
                    var parsed = this.parse($elems[i]);
                    this.templates[id] = parsed.html;
                    var keys = Object.keys(parsed.blocks);
                    for (var j = 0, sj = keys.length; j < sj; j++) {
                        this.templates[id + "_" + keys[j]] = parsed.blocks[keys[j]];
                    }
                }
                $elems[i].remove();
            }
        }
    }
    CTemplateRenderer.prototype.load = function (name) {
        if (this.templates.hasOwnProperty(name)) {
            return this.templates[name];
        }
        throw new Error('Такого шаблона не существует');
    };
    CTemplateRenderer.prototype.render = function (_a) {
        var template = _a.template, data = _a.data, _b = _a.clean, clean = _b === void 0 ? false : _b, _c = _a.map, map = _c === void 0 ? null : _c, _d = _a.field, field = _d === void 0 ? null : _d;
        // РАЗДЕЛ: Загрузка шаблона
        // Если передано название шаблона и такой шаблон существует - загрузить его содержимое.
        // Если нет, значит, передан внешний шаблон и нужно использовать его
        var tpl = typeof template === 'string' && this.templates.hasOwnProperty(template) ? this.templates[template] : template;
        if (data instanceof Array) {
            var content = '';
            for (var i = 0, s = data.length; i < s; i++) {
                content += this.render({
                    template: template,
                    data: data[i],
                    clean: clean,
                    map: map,
                    field: field
                });
            }
            tpl = content;
        }
        else {
            // РАЗДЕЛ: Парсинг данных
            if (data === Object(data)) {
                for (var k in data) {
                    if (data.hasOwnProperty(k)) {
                        // Если передана карта соответствий - искать не по ключам объекта данных, а по соответствующим им ключам карты
                        var key = map && map.hasOwnProperty(k) === Object(map) ? map[k] : k;
                        if (!empty(data[k])) {
                            // Если по данному ключу найден блок, сделать вуду магию
                            if (this.templates.hasOwnProperty(template + "_" + key) && tpl.match(new RegExp("{block-" + key + "}", "g"))) {
                                // Если ключ не является объектом, заменить блок на значение по ключу
                                if (data[k] !== Object(data[k])) {
                                    tpl = tpl.replace(new RegExp("{block-" + key + "}", 'g'), data[k]);
                                }
                                else {
                                    // Если ключ - объект, то на каждый ключ этого объекта прорендерить блок и заменить блок в шаблоне получившейся строкой
                                    var blockContent = '';
                                    for (var i = 0, s = data[k].length; i < s; i++) {
                                        blockContent += this.render({ template: template + "_" + key, data: data[k][i], clean: true, map: map });
                                    }
                                    tpl = tpl.replace(new RegExp("{block-" + key + "}", 'g'), blockContent);
                                }
                            }
                            else {
                                // Если не найден, просто заменить в шаблоне значением из данных
                                tpl = tpl.replace(new RegExp("{" + key + "}", 'g'), data[k]);
                            }
                        }
                    }
                }
            }
            else {
                // Если шаблон не является объектом и передано имя ключа, заменить ключ на шаблон
                if (!empty(field)) {
                    tpl = tpl.replace(new RegExp("{" + field + "}", 'g'), data);
                }
                else {
                    // Если шаблон - строка и имя ключа не передано, заменить шаблоном все ключи
                    if (typeof data === 'string') {
                        tpl = tpl.replace(this.pattern.clean, data);
                    }
                }
            }
            if (!empty(clean) && clean === true) {
                tpl = tpl.replace(this.pattern.clean, '');
            }
        }
        return tpl;
    };
    CTemplateRenderer.prototype.clean = function (tpl, field) {
        if (field === void 0) { field = null; }
        var template = typeof tpl === 'string' && this.templates.hasOwnProperty(tpl) ? this.templates[tpl] : tpl;
        if (!empty(field)) {
            if (typeof field === 'string') {
                template = template.replace(new RegExp("{" + field + "}", 'g'), '');
            }
            else {
                throw new Error('Переданный ключ не является строкой');
            }
        }
        else {
            template = template.replace(this.pattern.clean, '');
        }
        return template;
    };
    CTemplateRenderer.prototype.parse = function (tpl) {
        var t = getContent(tpl);
        var data = {};
        while (t.match(this.pattern.block) != null) {
            var d = t.match(this.pattern.block);
            data[d[1]] = d[2];
            t = t.replace(d[0], "{block-" + d[1] + "}");
        }
        return {
            blocks: data,
            html: t
        };
    };
    CTemplateRenderer.prototype.build = function (name) {
        if (!empty(this.builds[name]) && typeof this.builds[name] === 'function') {
            this.builds[name]();
        }
        else {
            throw new Error('Такой функции построения не существует');
        }
    };
    CTemplateRenderer.prototype.registerBuilder = function (name, builder, once) {
        if (once === void 0) { once = false; }
        if (!empty(builder) && typeof builder === 'function') {
            this.builds[name] = builder.bind(this);
        }
        else {
            throw new Error('Переданный билдер не является функцией');
        }
    };
    CTemplateRenderer.prototype.check = function (tplName) {
        if (typeof tplName === 'string') {
            if (this.templates.hasOwnProperty(tplName)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            throw new Error('Переданный аргумент не является строкой');
        }
    };
    return CTemplateRenderer;
}());
var TemplateRenderer = new CTemplateRenderer;

var modals = {};
var currentModal = null;
var modalOpened = new CustomEvent('modalopen', {
    bubbles: false,
    cancelable: true
});
var modalClosed = new CustomEvent('modalclose', {
    bubbles: false,
    cancelable: true
});
var loadTemplate = function (template, fallback) {
    if (fallback === void 0) { fallback = null; }
    if (template && typeof template === 'string') {
        return TemplateRenderer.check(template) ? TemplateRenderer.load(template) : template;
    }
    else if (template instanceof HTMLTemplateElement) {
        return template.cloneNode(true).innerHTML;
    }
    else if (template instanceof HTMLElement) {
        return template.innerHTML;
    }
    else if (typeof fallback === 'string') {
        return TemplateRenderer.check(fallback) ? TemplateRenderer.load(fallback) : template;
    }
    else {
        throw new Error('Невозможно обработать шаблон');
    }
};
var Modal = /** @class */ (function () {
    function Modal(_a) {
        var name = _a.name, content = _a.content, _b = _a.template, template = _b === void 0 ? null : _b, _c = _a.data, data = _c === void 0 ? null : _c, _d = _a.modifier, modifier = _d === void 0 ? null : _d, _e = _a.elevation, elevation = _e === void 0 ? 1000 : _e, _f = _a.scrollLock, scrollLock = _f === void 0 ? false : _f, _g = _a.callbacks, callbacks = _g === void 0 ? null : _g, _h = _a.animations, animations = _h === void 0 ? { type: 'transition', duration: 'auto' } : _h, _j = _a.parent, parent = _j === void 0 ? document.body : _j;
        // Обрабатываем и задаем шаблон и контент
        this.template = loadTemplate(template, 'modal-default');
        this.contentTemplate = loadTemplate(content);
        this.parent = parent;
        this.busy = false;
        this.paused = false;
        this.scrollLock = scrollLock;
        this.operationsStack = [];
        this.isOpened = false;
        this.isBlocked = false;
        if (callbacks) {
            this.callbacks = callbacks;
        }
        // Создаем элемент окна
        if (data === Object(data)) {
            this.currentData = data;
        }
        var element = createElement({
            outer: true,
            container: this.parent,
            content: TemplateRenderer.render({
                template: this.template,
                data: this.contentTemplate,
                field: 'contents'
            })
        });
        // Функция createElement может вернуть коллекцию элементов, если в переданном ей контенте содержится больше одного корневого элемента
        // Модальное окно должно быть представлено одним корневым элементом
        if (element instanceof HTMLElement) {
            this.modal = element;
            this.content = this.modal.getElementsByClassName('js-modal__content')[0];
        }
        else {
            throw new Error('Шаблон модального окна должен иметь один корневой элемент');
        }
        // Добавляем классы
        if (typeof modifier === 'string') {
            this.modal.classList.add(modifier);
        }
        if (!empty(animations) && typeof animations.modifier === 'string') {
            this.modal.classList.add(animations.modifier);
        }
        // Устанавливаем базовый z-index
        this.elevation = elevation;
        // Определяемся с анимацией
        this.animations = this.setAnimations(animations);
        // Подключаем слушатели событий
        this.setListeners();
        // Заносим в массив модальных окон
        modals[name] = this;
        if (this.callbacks && typeof this.callbacks.onAfterInit === 'function') {
            this.callbacks.onAfterInit(this);
        }
    }
    Modal.getByName = function (name) {
        if (!empty(modals[name])) {
            return modals[name];
        }
        else {
            return false;
        }
    };
    Modal.prototype.setAnimations = function (animations) {
        var result = {
            open: {},
            close: {}
        };
        if (empty(animations.type)) {
            animations.type = 'transition';
        }
        if (empty(animations.duration)) {
            animations.duration = 'auto';
        }
        if (animations.target) {
            if (animations.target instanceof HTMLElement) {
                result.open.target = result.close.target = animations.target;
            }
            else {
                result.open.target = animations.target.open;
                result.close.target = animations.target.close;
            }
        }
        else {
            result.open.target = result.close.target = this.modal;
        }
        if (typeof animations.type === 'string') {
            result.open.type = result.close.type = animations.type;
        }
        else {
            result.open.type = animations.type.open;
            result.close.type = animations.type.close;
        }
        result.open.trigger = animations.open || null;
        result.close.trigger = animations.close || null;
        if (animations.duration === 'string' || typeof animations.duration === 'number') {
            result.open.duration = result.close.duration = animations.duration;
        }
        else {
            result.open.duration = animations.duration.open;
            result.close.duration = animations.duration.close;
        }
        return result;
    };
    Modal.prototype.runEvent = function (eventType, callback) {
        var _this = this;
        var callbackName = "onAfter" + (eventType[0].toUpperCase() + eventType.slice(1));
        if (this.animations[eventType].type !== 'none') {
            var onEventEnd_1 = function (event) {
                _this.modal.removeEventListener("modal" + eventType, onEventEnd_1);
                window.requestAnimationFrame(function () {
                    // После завершения анимации вызываем коллбек
                    typeof callback === 'function' && callback();
                    if (_this.callbacks && _this.callbacks.hasOwnProperty(callbackName) && typeof _this.callbacks[callbackName] === 'function') {
                        _this.callbacks[callbackName](_this);
                    }
                    if (!_this.paused) {
                        _this.shiftStack();
                        _this.busy = false;
                    }
                });
            };
            this.modal.addEventListener("modal" + eventType, onEventEnd_1);
            var triggerEvent_1 = function (event) {
                if (event.target === _this.animations[eventType].target) {
                    _this.modal.removeEventListener(_this.animations[eventType].type === 'transition' ? transitionEnd : animationEnd, triggerEvent_1);
                    _this.modal.dispatchEvent(eventType === 'open' ? modalOpened : modalClosed);
                }
            };
            this.modal.addEventListener(this.animations[eventType].type === 'transition' ? transitionEnd : animationEnd, triggerEvent_1);
        }
        else {
            typeof callback === 'function' && callback();
            // После завершения анимации вызываем коллбек
            if (this.callbacks && this.callbacks.hasOwnProperty(callbackName) && typeof this.callbacks[callbackName] === 'function') {
                this.callbacks[callbackName](this);
            }
            if (!this.paused) {
                this.shiftStack();
                this.busy = false;
            }
        }
    };
    Modal.prototype.doOpen = function () {
        var _this = this;
        // Добавляем класс, делающий окно активным
        this.modal.classList.add('is-active');
        // Выставляем z-index равным базовому индексу либо индексу, превышающему индекс текущего окна в том же контейнере
        this.modal.style.zIndex = (currentModal && currentModal.isOpened && currentModal.parent === this.parent && currentModal.elevation > this.elevation) ? (++currentModal.elevation).toString() : this.elevation.toString();
        // Сбрасываем предыдущее значение прокрутки
        this.modal.scrollTop = 0;
        // Отключаем скролл родителя
        if (this.scrollLock) {
            var lock = true;
            if (currentModal && currentModal !== this && currentModal.isOpened && currentModal.parent === this.parent) {
                lock = false;
            }
            else {
                if (!empty(modals)) {
                    for (var _i = 0, _a = Object.keys(modals); _i < _a.length; _i++) {
                        var modal = _a[_i];
                        if (modals[modal] !== this && modals[modal].isOpened && modals[modal].parent === this.parent) {
                            lock = false;
                            break;
                        }
                    }
                }
            }
            if (lock) {
                var scrollBarWidth = this.parent === document.body ? window.innerWidth - document.documentElement.clientWidth : this.parent.offsetWidth - this.parent.clientWidth;
                this.parent.style.paddingRight = scrollBarWidth + "px";
                this.parent.style.overflowY = 'hidden';
            }
        }
        // Делаем это окно текущим
        currentModal = this;
        // Вызываем коллбэк перед открытием
        if (this.callbacks && typeof this.callbacks.onBeforeOpen === 'function') {
            this.callbacks.onBeforeOpen(this);
        }
        window.requestAnimationFrame(function () {
            // Добавляем класс, открывающий окно
            _this.modal.classList.add('is-opened');
            if (typeof _this.animations.open.trigger === 'function') {
                _this.animations.open.trigger();
            }
            _this.parent.setAttribute('aria-hidden', 'true');
            // Запускаем
            _this.runEvent('open', function () {
                _this.isOpened = true;
                window.addEventListener("keydown", _this.escClose, false);
            });
        });
    };
    Modal.prototype.open = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.data, data = _c === void 0 ? null : _c, _d = _b.field, field = _d === void 0 ? null : _d, _e = _b.closeCurrent, closeCurrent = _e === void 0 ? false : _e, _f = _b.closeAll, closeAll = _f === void 0 ? false : _f;
        if (!this.isOpened && !this.isBlocked) {
            this.stack(function () {
                _this.busy = true;
                window.requestAnimationFrame(function () {
                    // Если переданы данные - рендерим
                    if (data && JSON.stringify(data) !== JSON.stringify(_this.currentData)) {
                        _this.currentData = data;
                        _this.content.innerHTML = TemplateRenderer.render({
                            template: _this.contentTemplate,
                            data: data,
                            field: field
                        });
                        _this.setListeners();
                    }
                    // Если нужно закрыть текущее окно в том же контейнере, сначала закрываем его, потом открываем это
                    if (closeCurrent && !closeAll) {
                        if (currentModal && currentModal !== _this && currentModal.isOpened && currentModal.parent === _this.parent) {
                            currentModal.close().run(function () { return _this.doOpen(); });
                        }
                    } /* if (closeAll && !closeCurrent) {
                      const stack:Modal[] = []
                      for(const modal of Object.keys(modals)){
                        if(modals[modal] !== this && modals[modal].isOpened && modals[modal].parent === this.parent){
                          stack.push(modals[modal])
                        }
                      }
                      if(stack.length > 0){
                        for(let i = 0, s = stack.length; i < s; i++){
          
                        }
                        stack[0].close().run(() => {
                          stack[1].close().run(() => {
                            stack[2].close().run(() => {
                              this.doOpen()
                            })
                          })
                        })
                      }
                    } */
                    else {
                        _this.doOpen();
                    }
                });
            });
            return this;
        }
    };
    Modal.prototype.close = function () {
        var _this = this;
        if (this.isOpened && !this.isBlocked) {
            this.stack(function () {
                _this.isOpened = false;
                _this.busy = true;
                window.requestAnimationFrame(function () {
                    if (_this.callbacks && typeof _this.callbacks.onBeforeClose === 'function') {
                        _this.callbacks.onBeforeClose(_this);
                    }
                    _this.modal.classList.remove('is-opened');
                    if (typeof _this.animations.close.trigger === 'function') {
                        _this.animations.close.trigger();
                    }
                    _this.runEvent('close', function () {
                        _this.modal.classList.remove('is-active');
                        _this.modal.style.removeProperty('z-index');
                        if (currentModal === _this) {
                            currentModal = null;
                        }
                        if (_this.scrollLock) {
                            var unlock = true;
                            if (currentModal && currentModal !== _this && currentModal.isOpened && currentModal.parent === _this.parent) {
                                unlock = false;
                            }
                            else if (!empty(modals)) {
                                for (var _i = 0, _a = Object.keys(modals); _i < _a.length; _i++) {
                                    var modal = _a[_i];
                                    if (modals[modal] !== _this && modals[modal].isOpened && modals[modal].parent === _this.parent) {
                                        unlock = false;
                                        break;
                                    }
                                }
                            }
                            if (unlock) {
                                _this.parent.style.removeProperty('padding-right');
                                _this.parent.style.removeProperty('overflow-y');
                            }
                        }
                        _this.parent.removeAttribute('aria-hidden');
                    });
                });
            });
            return this;
        }
    };
    Modal.prototype.run = function (operation, duration) {
        var _this = this;
        if (duration === void 0) { duration = null; }
        if (typeof operation === 'function') {
            this.stack(function () {
                _this.busy = true;
                if (duration && typeof duration === 'number') {
                    setTimeout(function () {
                        if (!_this.paused) {
                            operation(_this);
                            _this.shiftStack();
                            _this.busy = false;
                        }
                    }, duration);
                }
                else {
                    if (!_this.paused) {
                        operation(_this);
                        _this.shiftStack();
                        _this.busy = false;
                    }
                }
            });
        }
        return this;
    };
    Modal.prototype.pause = function () {
        if (!this.paused) {
            this.paused = true;
        }
    };
    Modal.prototype.continue = function () {
        if (this.paused) {
            this.paused = false;
            this.shiftStack();
        }
    };
    Modal.prototype.setListeners = function () {
        var _this = this;
        Array.prototype.slice.call(this.modal.getElementsByClassName('js-modal__close')).forEach(function (button) {
            button.addEventListener('click', function () {
                _this.close();
            });
        });
        // this.modal.addEventListener('mousedown', function (e) {
        //     if (!e.target.closest('.js-modal__content')) {
        //         _this.close();
        //     }
        // });
        this.escClose = function (e) {
            if (e.keyCode === 27) {
                window.removeEventListener('keydown', _this.escClose);
                _this.close();
            }
        };
    };
    Modal.prototype.stack = function (operation) {
        if (!this.busy) {
            operation();
        }
        else {
            this.operationsStack.push(operation);
        }
    };
    Modal.prototype.shiftStack = function () {
        if (this.operationsStack.length > 0) {
            this.operationsStack.shift()();
        }
    };
    return Modal;
}());


var menuActive = false;
var menuAnimating = false;
var anim = new TimelineLite({
    onComplete: function () {
        menuActive = true;
        menuAnimating = false;
    },
    onReverseComplete: function () {
        menuActive = false;
        menuAnimating = false;
    }
});
var modalMenu = new Modal({
    name: 'menu',
    parent: document.body,
    template: 'modal-menu',
    content: 'menu',
    elevation: 1400,
    scrollLock: true,
    animations: {
        type: 'none'
    },
    callbacks: {
        onAfterInit: function (self) {
            var $logo = self.modal.querySelector('.js-menu__logo');
            var $items = self.modal.getElementsByClassName('js-menu__item');
            Array.prototype.slice.call($items).forEach(function ($item) {
                $item.addEventListener('click', function () {
                    if (!menuAnimating && menuActive) {
                        $burger.click();
                    }
                });
            });
            anim
                .fromTo(self.modal, .6, {
                opacity: .1
            }, {
                opacity: 1
            })
                .fromTo(self.modal, .8, {
                clipPath: 'circle(28px at calc(100% - 54px) calc(100% - (36px + 27.5px)))'
            }, {
                clipPath: 'circle(860px at calc(50% - 1px) calc(50% - 1px)',
                delay: -.6,
                ease: Sine.easeInOut,
                force3D: true
            })
                .staggerFrom($items, .5, { opacity: 0, y: 35, ease: Power2.easeInOut, force3D: true }, 0.06, '-=.5')
                .fromTo($logo, .4, {
                opacity: 0,
                y: -40,
            }, {
                opacity: 1,
                y: 0,
                delay: -.3,
                onComplete: function() {
                    console.log("test1")
                    jQuery(".header").removeClass("sbottom")
                }
            })
                .paused(true);
        },
        onAfterOpen: function (self) {
            anim.play();
        }
    }
});

var $burger = document.getElementsByClassName('js-burger')[0];
var onClose = function () {
    $burger.removeEventListener(transitionEnd, onClose);
    setTimeout(function () {
        modalMenu.close();
    }, 600);
};
$burger.addEventListener('click', function () {
    if (!menuAnimating) {
        menuAnimating = true;
        if (!menuActive) {
            jQuery("body, html").addClass("fixed")
            $burger.classList.add('is-pressed');
            modalMenu.open();
            $(".header .categories").addClass('hide');
        }
        else {
            jQuery("body, html").removeClass("fixed")
            $burger.classList.remove('is-pressed');
            anim.reverse();
            $burger.addEventListener(transitionEnd, onClose);
            $(".header .categories").removeClass('hide');
        }
    }
});