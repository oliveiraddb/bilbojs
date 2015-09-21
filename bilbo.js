(function(){"use strict";

  var
  events = {},
  queueList = {},
  auxDiv = document.createElement('div'),
  addClass = function(el, classNames, index){
    (classNames instanceof Function) && (classNames = classNames.call(el, index, el.className));
    forEach((classNames || "").split(" "), function (className) { el.classList.add(className) });
  },
  _after = function(el, newNode){
    //el.parentElement.insertBefore(newNode, el.nextSibling);
    el.insertAdjacentHTML('afterend', htmlString);
  },
  after = function(el, newNodes, index) {
    forEach(newNodes, function(newNode){
      (newNode instanceof HTMLElement) && _after(el, newNode) ||
      (newNode instanceof Function) && _after(el, newNode.call(el, index)) ||
      (newNode instanceof Array) && forEach(newNode, function(node){ _after(el, node); }) ||
      forEach(createElements(newNode), function(node){ _after(el, node) }); // we'll assume its a html string
    });
  },
  _append = function(el, newNode){
    el.parentElement.insertBefore(newNode, el);
  },
  append = function(el, newNodes, index) {
    forEach(newNodes, function(newNode){
      (newNode instanceof HTMLElement) && _append(el, newNode) ||
      (newNode instanceof Function) && _append(el, newNode.call(el, index)) ||
      (newNode instanceof Array) && forEach(newNode, function(node){ _after(el, node) }) ||
      forEach(createElements(newNode), function(node){ _append(el, node) }); // we'll assume its a html string
    });
  },
  getAttribute = function(el, attr){
    return el && el.getAttribute(attr) || null;
  },
  setAttribute = function(el, attr, value){
    el.setAttribute(attr, value);
  },
  setAttributes = function(el, attr){
    for(var i in attr){ el.setAttribute(i, attr[i]); }
  },
  _before = function(el, newNode){
    //el.parentElement.insertBefore(newNode, el);
    el.insertAdjacentHTML('beforeend', htmlString);
  },
  before = function(el, newNodes, index) {
    forEach(newNodes, function(newNode){
      (newNode instanceof HTMLElement) && _before(el, newNode) ||
      (newNode instanceof Function) && _before(el, newNode.call(el, index)) ||
      (newNode instanceof Array) && forEach(newNode, function(node){ _before(el, node); }) ||
      forEach(createElements(newNode), function(node){ _before(el, node) }); // we'll assume its a html string
    });
  },
  children = function(el, selector){
    return createArray(selector && el.querySelectorAll(selector) || el.children);
  },
  filter = function(list, action){ return createArray(list).filter(action) },
  forEach = function(list, action){ createArray(list).forEach(action) },
  index = function(el){
    var i = 0;
 		while( (el = el.previousSibling) !== null ) i++;
 		return i;
  },
  createArray = function(list){
    if(!list){ return new Array(); } else if(list instanceof Array){ return list; }
    return Array.prototype.slice.call(list, 0);
  },

  mergeArray = function(array1, array2){
    for(var i in array2){ array1.push(array2[i]); }
    return array1;
  },

  contents = function(el){
    return createArray(el.childNodes);
  },

  getCss = function(el, prop){
    return getComputedStyle(el)[prop];
  },

  setCss = function(el, prop, value){
    el.style[prop] = value;
  },

  _setCss = function(el, props, value, index){
    (value instanceof Function)? setCss(el, props, value.call(el, index, el.style[props])) :
    (typeof value === "string")? setCss(el, props, value) :
    forEach(createArray(props), function(value, prop){ setCss(el, prop, value) });
  },

  getData = function(el, key){
    return key && el.dataset[key] || el.dataset;
  },

  setData = function(el, key, value){
    forEach(createArray(props), function(value, prop){ el.dataset[key] = value })
  },

  empty = function(el){
    el.innerHTML = "";
  },

  eq = function(elements, index){
    if(index < 0){
      return elements[elements.lenght + index];
    }
    return elements[index];
  },

  hasClass = function(el, className){
    el.classList.contains(className);
  },

  getHtml = function(el){
    return el.innerHTML;
  },

  setHtml = function(el, html, index){
    if(html instanceof Function){
      html = html(index, el.innerHTML);
    }
    el.innerHTML = hmtl;
  },

  prev = function(el, selector){
    if(selector){
      var match = el.parentElement.querySelector(selector);
      if(!match) return null;
      var prev = prev.previousElementSibling;
      while(prev && prev != match) prev.previousElementSibling;
      return prev;
    }
    return el.previousElementSibling;
  },

  next = function(el, selector){
    if(selector){
      var match = el.parentElement.querySelector(selector);
      if(!match) return null;
      var next = next.nextElementSibling;
      while(next && next != match) next = next.nextElementSibling;
      return next;
    }
    return el.nextElementSibling;
  },
  //no prototype, adicionar varios em lista

  _contain = function(array, match){
    return !!~(array || "").indexOf(match);
  },

  noop = function(){},

  uuid = function(){
    return 'mxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
  },

  _on = function(el, eventName, handler){
    // var evt = eventName.split(".");
    // if(!evt[1]){ evt[1] = evt[0]; evt[0] = (el.uuid || el.uuid = uuid()); }
    //
    // events[evt[0]][evt[1]][] = handler;
    // el.addEventListener(evt[1], handler);
  },

  on = function(el, events, handler){
    if(typeof events === "string") var evts = (events || "").split(" ");
    else var evts = createArray(events);

    forEach(evts, function(handler, evtName){ _on(el, evtName, handler); })
  },

  off = function(){},

  one = function(){}, //igual ao on mas é executado apenas uma vez e depois é removido

  parent = function(el, selector){
    var parentOfParent = (el.parentElement.parentElement || document.body);
    if(el.parentElement === parentOfParent.querySelector(selector)) return el.parentElement;
    else return null;
  },

  parents = function(el, selector){
    if(selector){
      var
      parentOfParent = (el.parentElement.parentElement || document.body),
      match = parentOfParent.querySelector(selector);
      if(!match) return null;
      var next = next.parentElement;
      while(next && next != match) next = next.parentElement;
      return next;
    }
    return el.parentElement;
  },

  createElements = function(string){
    auxDiv.innerHTML = string;
    if(auxDiv.children) return auxDiv.children;
    return [document.createElement(string)];
  },

  prepend = function(el, element){
    if(typeof element === "string"){
      var elements = createElements(element);
    } else {
      var elements = createArray(element);
    }

    forEach(elements, function(element){ el.insertBefore(element, el.firstChild) });
  },

  prop = function(el, prop){
    return el[prop];
  },

  queue = function(queueName, items){
    queueList[queueName] = new Array();
    mergeArray(queueList[queueName], createArray(items));
  },

  dequeue = function(queueName){
    var
    q = queueList[queueName],
    item = q && q.splice(0,1)[0];
    item && item();
  },

	addToQueue = function(queueName, fn){ mergeArray(queueList[queueName], createArray(fn)) },

	runQueue = function(queueName){ var q = queueList[queueName]; q.reverse(); while(q.length){ q.pop()(); }; },

	clearQueue = function(queueName){ var q = queueList[queueName]; while(q.length){ q.pop() } },

  ready = function(handler){
    document.addEventListener("load", handler);
  },

  remove = function(el, selector){
    if(selector){
      var elements = createArray(el.tagName + document.querySelectorAll(selector));
      if(contain(el, elements)) el.parentElement.removeChild(el);
    } else {
      el.parentElement.removeChild(el);
    }
  },

  removeAttr = function(el, props){
    forEach((props || "").split(" "), function(prop){ el.removeAttribute(prop) });
  },

  removeClass = function(el, classNames, index){
    (classNames instanceof Function) && (classNames = classNames.call(el, index, el.className));
    forEach((classNames || "").split(" "), function (className) { el.classList.remove(className) });
  },

  removeData = function(el, keys){
    if(typeof keys === "string"){
      keys = (keys || "").split(" ");
    }
    forEach(keys, function(key){ delete el.dataset.key });
  },

  replaceWith = function(el, elements){
    after(el, elements);
    el.parentElement.removeChild(el);
  },

  scrollLeft = function(el, value){
    if(value) el.scrollLeft = value;
    else return el.scrollLeft;
  },

  scrollTop = function(el, value){
    if(value) el.scrollTop = value;
    else return el.scrollTop;
  },

  getText = function(el){
    return el.textContent;
  },

  setText = function(el, text, index){
    if(text instanceof Function){ text = text(index(el), el.textContent); }
    el.innerHTML = ""; el.appendChild(document.createTextNode(text));
  },

  toggleClass = function(el, classNames, index){
    (classNames instanceof Function) && (classNames = classNames.call(el, index, el.className));
    forEach((classNames || "").split(" "), function (className) { el.classList.toggle(className) });
  },

  trigger = function(){},

  triggerHandler = function(){},

  unbind = function(){},

  setVal = function(el){},

  getVal = function(el){},

  getValSelect = function(el) {
    var result = [];
    var options = el && el.options;
    var opt;

    for (var i = 0; i < options.length; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }

    return (result.lenght > 1)? result : result[0];
    //ou
    var values = createArray(el.querySelectorAll('option:checked')).map(function(v,i,a) {
      return v.value;
    });
  },

  wrap = function(el, wrapper){
    if(typeof wrapper === "string"){
      wrapper = createElements(wrapper)[0];
    }
    el.parentElement.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  },

  proxyFn = function(fn, context, args){
    return fn.bind(context, args);
  },

  proxyObj = function(context, name, args){
    return context[name].bind(context, args);
  }

  //TODO funções relacionadas ao form e ajax
  //TODO adicionar as funções de extend e plugin

  ;

  window.jQuery = window.$ = function(selector){
    if(this instanceof jQuery){
      // return
      this.elements = createArray(
        (selector instanceof Array || selector instanceof NodeList || selector instanceof HTMLElement || selector instanceof Window || selector instanceof HTMLDocument)?selector:
		document.querySelectorAll(selector)
      );
      // TODO: ver se o parametro são htmlString e transformar em elements
    } else {
      return new jQuery(selector);
    }
  };

  window.$.prototype = window.$.fn = {
    addClass: function(classNames){ forEach(this.elements, function(el, index){ addClass(el, classNames, index) }); },
    after: function(){ forEach(this.elements, function(el, index){ after(el, arguments, index) }); },
    append: function(){ forEach(this.elements, function(el, index){ append(el, arguments, index) }); },
    attr: function(attr, value){
      if(typeof attr === "string"){
        if(value){
          forEach(this.elements, function(el){ setAttribute(el, attr, value) });
        } else {
          return getAttribute(this.elements[0], attr);
        }
      } else {
        forEach(this.elements, function(el){ setAttributes(el, attr) });
      }
    },
    before: function(){ forEach(this.elements, function(el, index){ before(el, arguments, index) }); },
    bind: function(eventNames, handler){ forEach(this.elements, function(el){ on(el, eventNames, handler) }); },
    children: function(selector){
      var nodes = new Array();
      forEach(this.elements, function(el){ nodes = nodes.concat(children(el, selector)) });
      return nodes;
    },
    clone: function(){
      var nodes = new Array();
      forEach(this.elements, function(el){ nodes.push(el.cloneNode()) });
      return nodes;
    },
    contents: function(){
      var nodes = new Array();
      forEach(this.elements, function(el){ mergeArray(nodes, contents(el)) })
      return this(nodes);
    },
    css: function(prop, value){
      if(value) forEach(this.elements, function(el, index){ _setCss(el, prop, value, index) });
      else return getCss(this.elements[0]);
    },
    data: function(prop, value){
      if(value) forEach(this.elements, function(el){ setData(el, prop, value) });
      else return getData(this.elements[0]);
    },
    each: function(handler){
      forEach(this.elements, function(el, index){ (handler || noop)(index, el); })
    },
    empty: function(){
      forEach(this.elements, function(el){ empty(el); })
    },
    eq: function(index){
      return eq(this.elements, index);
    },
    find: function(selector){
      var nodes = new Array();
      forEach(this.elements, function(el){ nodes = nodes.concat(children(el, selector)) });
      return this(nodes);
    },
    get: function(index){ return this.elements[index] },
    hasClass: function(className){
      return hasClass(this.elements[0], className);
    },
    html: function(html){
      if(value) forEach(this.elements, function(el, index){ setHtml(el, html, index) });
      else return getHtml(this.elements[0]);
    },
    map: function(){},
    merge: function(list){
      return mergeArray(this.elements, createArray(list))
    },
    prev: function(selector){
      var nodes = new Array();
      forEach(this.elements, function(el){ nodes = nodes.concat(prev(el, selector)) });
      return this(nodes);
    },
    next: function(selector){
      var nodes = new Array();
      forEach(this.elements, function(el){ nodes = nodes.concat(next(el, selector)) });
      return this(nodes);
    },
    parent: function(selector){
      var nodes = new Array();
      forEach(this.elements, function(el){ nodes = nodes.concat(parent(el, selector)) });
      return this(nodes);
    },
    parents: function(selector){
      var nodes = new Array();
      forEach(this.elements, function(el){ nodes = nodes.concat(parents(el, selector)) });
      return this(nodes);
    },
    prepend: function(element){
      forEach(this.elements, function(el){ prepend(el, element) });
    },
    prop: function(prop){
      prop(this.elements[0], prop);
    },
    queue: queue,
    dequeue: dequeue,
    addToQueue: addToQueue,
    runQueue: runQueue,
    clearQueue: clearQueue,
    ready: function(handler){
      ready(handler);
    },
    remove: function(selector){
      forEach(this.elements, function(el){ prepend(el, element) });
    },
    removeAttr: function(attr){
      forEach(this.elements, function(el){ removeAttr(el, attr) });
    },
    removeClass: function(classNames){ forEach(this.elements, function(el, index){ removeClass(el, classNames, index) }); },
    removeData: function(keys){
      forEach(this.elements, function(el){ removeData(el, keys) });
    },
    replaceWith: function(element){
      forEach(this.elements, function(el){ replaceWith(el, element) });
    },
    scrollLeft: function(value){
      return scrollLeft(this.elements[0]) || value;
    },
    scrollTop: function(value){
      return scrollTop(this.elements[0]) || value;
    },
    text: function(value){
      var text = "";
      forEach(this.elements, function(el){ value && setText(el, value, index) || text.concat(getText(el)) });
      return text || null;
    },
    toggleClass: function(classNames){ forEach(this.elements, function(el, index){ toggleClass(el, classNames, index) }); },
    proxy: function(){
      return (arguments[0] instanceof Function) && proxyFn.call(proxyFn, arguments) || proxyObject.call(proxyObject, arguments);
    }
  };
})()
