/*
 Based on http://tympanus.net/codrops/2014/05/22/inspiration-for-article-intro-effects/
*/

var Header = function() {
	this.keys = [32, 37, 38, 39, 40];
	this.wheelIter = 0;
	this.docElem = window.document.documentElement,
	this.scrollVal,
	this.isRevealed, 
	this.noscroll, 
	this.isAnimating,
	this.container = $( '.article' ),
	//this.trigger = this.container.querySelector( 'button.trigger' ),
	this.header = $( '.cover' )
	//this.toc = document.getElementById( 'toc' );
}

Header.prototype.init = function() {
	var self = this,
		pageScroll = this.scrollY();

	this.noscroll = this.pageScroll === 0;
				
	this.disable_scroll();
				
	if( this.pageScroll ) {
		this.isRevealed = true;
		this.container.addClass( 'notrans' );
		this.container.addClass( 'modify' );
	}
				
	window.addEventListener( 'scroll', function(){self.scrollPage();} );
	//this.trigger.addEventListener( 'click', function() { self.toggle( 'reveal' ); } );
}

Header.prototype.ie = function(){
	var undef,rv = -1, // Return value assumes failure.
		ua = window.navigator.userAgent
		msie = ua.indexOf('MSIE '),
		trident = ua.indexOf('Trident/');

	if (msie > 0) {
		// IE 10 or older => return version number
		rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	} else if (trident > 0) {
		// IE 11 (or newer) => return version number
		var rvNum = ua.indexOf('rv:');
		rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
	}

	return ((rv > -1) ? rv : undef);
}

Header.prototype.preventDefault = function(e){
	e = e || window.event;
	if (e.preventDefault)
	e.preventDefault();
	e.returnValue = false;  
}

Header.prototype.keydown = function(e,context){
	var self = context;
	for (var i = self.keys.length; i--;) {
		if (e.keyCode === self.keys[i]) {
			self.preventDefault(e);
			return;
		}
	}
}

Header.prototype.touchmove = function(e,context){
	var self = context;
	self.preventDefault(e);
}

Header.prototype.wheel = function(e,context){
	// for IE 
	//if( ie ) {
		//preventDefault(e);
	//}
}

Header.prototype.disable_scroll = function(){
	var self;
	window.onmousewheel = document.onmousewheel = function(event){self.wheel(event,self);}
	document.onkeydown = function(event){self.keydown(event,self);}
	document.body.ontouchmove = function(event){self.touchmove(event,self);}
	//if (style.display === 'none') {this.header.removeClass( 'visible' );}
}

Header.prototype.enable_scroll = function(){
	window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
	this.header.addClass( 'visible' );
}

Header.prototype.scrollY = function(){
	return window.pageYOffset || this.docElem.scrollTop;
}
				
Header.prototype.scrollPage = function(){
	var self = this;
	this.scrollVal = this.scrollY();
					
	if( this.noscroll && !this.ie ) {
		if( this.scrollVal < 0 ) return false;
		// keep it that way
		window.scrollTo( 0, 0 );
	}

	if( this.container.hasClass( 'notrans' ) ) {
		this.container.removeClass( 'notrans' );
		return false;
	}

	if( this.isAnimating ) {
		return false;
	}
					
	if( this.scrollVal <= 0 && this.isRevealed ) {
		this.toggle(0);
	} else if( this.scrollVal > 0 && !this.isRevealed ){
		this.toggle(1);
	}
}

Header.prototype.toggle = function(reveal){
	var self = this;
	this.isAnimating = true;
					
	if( reveal ) {
		this.container.addClass( 'modify' );
	} else {
		this.noscroll = true;
		this.disable_scroll();
		this.container.removeClass( 'modify' );
	}

	// simulating the end of the transition:
	setTimeout( function() {
		self.isRevealed = !self.isRevealed;
		self.isAnimating = false;
		if( reveal ) {
			self.noscroll = false;
			self.enable_scroll();
		}
	}, 600 );
}