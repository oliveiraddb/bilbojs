var bb = (function(){'use strict';
return {
	get: function(arg){
		this.el = this.$element = (typeof arg === 'string') ? document.querySelector(arg) : arg;
		if(this.$element && !this.$element.id){	this.$element.id = this.uuid(); }

		return this.el;
	},
	create: function(elType, options){
		var element = document.createElement(elType),
			options = options || {};

		element.className = options['class'] || "";
		element.id = options.id || "";

		return element;
	},
	uuid: function(){
		return 'mxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	stringToBoolean: function(string){
		if(!string) return null;
		switch(string.toLowerCase()){
			case "true": case "yes": case "1": return true;
			default: return false;
		}
	},
	isString: function(s) {
		return typeof(s) === 'string' || s instanceof String;
	},
	format: function(number, n, x, s, c) {
		var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
			num = number.toFixed(Math.max(0, ~~n));

		return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	},
	applyMask: function(value, mascara) {
		var boleanoMascara,
			exp = /\-|\.|\/|\(|\)| /g,
			campoSoNumeros = value.toString().replace(exp, ""),

			posicaoCampo = 0,
			valor = "",
			tamanhoMascara = campoSoNumeros.length;

		for(var i = 0; i <= tamanhoMascara; i++) {
			boleanoMascara  = ((mascara.charAt(i) == "-") || (mascara.charAt(i) == ".")
										|| (mascara.charAt(i) == "/"));
			boleanoMascara  = boleanoMascara || ((mascara.charAt(i) == "(")
										|| (mascara.charAt(i) == ")") || (mascara.charAt(i) == " "));
			if (boleanoMascara) {
				valor += mascara.charAt(i);
				tamanhoMascara++;
			} else {
				valor += campoSoNumeros.charAt(posicaoCampo);
				posicaoCampo++;
			}
		}

		return valor;
	},
	formatDate: function(date, showTime){
		var miliseconds = Date.parse(date);
		if(miliseconds){
			var d = new Date(miliseconds);

			return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
			+ ((showTime)? ' '+d.getHours()+':'+d.getMinutes() :'');
		} else {
			var bound = date.indexOf(' ') || date.indexOf('T'),
				splitDate = date.slice(0, bound).split('/'),
				splitTime = date.slice(bound+1, -1).split(':');

			return splitDate[0] + '/' + splitDate[1] + '/' + splitDate[2]
			+ ((showTime)? ' '+splitTime[0]+':'+splitTime[1] :'');
		}
	},
	getChildIndex: function(child){
		var i = 0;
		while( (child = child.previousSibling) != null ) i++;
		return i;
	},
	isTouch: function(){
		var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
		return isTouch;
	},
	getParentElement: function(element, tagName){
		tagName = tagName.toUpperCase();
		do{
			if(element.tagName === tagName){ return element;}
		} while(element = element.parentNode);

		return null;
	},
	plugin: function(name, f){
		this[name] = function(){ return f.apply(f, arguments); };
	},
	extend: function(_class){

	},
	noop: function(){},
	each: function(list, action){
		for(var i in list){
			action(list[i], i);
		}
	},
	createAudioPool: function(){
		var Pool = function(){

		};

		Pool.prototype = {
			add: function(id, fileName){},
			remove: function(id){},
			play: function(id){}
		};
	}
};

})();
