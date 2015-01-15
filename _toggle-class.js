/**
 * Toggle Class
 *
 * toggls class from elements
 * add the attribute data-class-toggle="class to toggle"
 * add the attribute data-class-toggle-target="button class" if you want
 * the class to be toggled from an external element
 */

(function(name, definition) {
	var theModule = definition(),
	// this is considered "safe":
		hasDefine = typeof define === "function" && define.amd,
	// hasDefine = typeof define === "function",
		hasExports = typeof module !== "undefined" && module.exports;

	if (hasDefine) { // AMD Module
		define(theModule);
	} else if (hasExports) { // Node.js Module
		module.exports = theModule;
	} else { // Assign to common namespaces or simply the global object (window)
		( this.jQuery || this.ender || this.$ || this)[name] = theModule;
	}

	// Start
	theModule.init();

})("ToggleClass", function() {
	var module = this;

	// JQuery objects
	module.$toggleElements = $("[data-class-toggle]"); // Elements to be toggled
	module.$header = $(".js-header");
	module.$body_html = $("body, html");
	module.$body = $("body");

	// Other private variables
	module.scrollLatency = 300; // Scrolling animation time

	// Core module

	if (typeof module.$body === 'undefined') {
		module.$body = $("body");
	}

	module.scrollTo = function($element) {
		module.headerOffset = (typeof module.$header !== 'undefined' && module.$header.length > 0) ? module.$header.height() : 0;

		module.$body_html.stop().animate({
			scrollTop: $element.offset().top - module.headerOffset
		}, module.scrollLatency);
	};

	return {

		// Public methods

		// Public method to init all fields
		init: function() {
			var counter = 0;
			module.$toggleElements.each(function() {

				var bindClassName = 'js-toggle-class-bind-' + counter;

				if (typeof $(this).attr('data-class-toggle-target') != 'undefined') {
					// the click event should be bound to the data-class-toggle-target

					// add a unique class name to the element that will be toggled
					$(this).addClass(bindClassName);

					// find the class toggle targets
					var $classToggleTarget = $($(this).attr('data-class-toggle-target'));

					// add the parent element as a new attribute to the toggle targets
					$classToggleTarget.attr('data-class-toggle-element', '.' + bindClassName);

					// toggle target on click event
					$classToggleTarget.on('click', function(e) {
						// find the element to toggle
						module.$parentElement = $(this).closest($(this).attr('data-class-toggle-element'));
						if (module.$parentElement.length === 0) {
							// if closest didnt yield any results, then search the whole body
							module.$parentElement = module.$body.find($(this).attr('data-class-toggle-element'));
						}

						// check if default behavior should be prevented
						if (typeof module.$parentElement.attr('data-class-toggle-default') != 'undefined' &&
							$(module.$parentElement).attr('data-class-toggle-default') == 'false') {
							e.preventDefault();
						}

						// toggle the class
						if (module.$parentElement.hasClass(module.$parentElement.attr('data-class-toggle'))) {
							module.$parentElement.removeClass(module.$parentElement.attr('data-class-toggle'));
						} else {
							// if data class single is set to true, only one element will have the class
							if (typeof module.$parentElement.attr('data-class-single') != 'undefined' &&
								module.$parentElement.attr('data-class-single') == 'true') {
								$('.' + module.$parentElement.attr('data-class-toggle')).removeClass(module.$parentElement.attr('data-class-toggle'));
							}

							module.$parentElement.addClass(module.$parentElement.attr('data-class-toggle'));
						}

						// if data-class-toggle-scrollto, scroll to that item
						if (typeof module.$parentElement.attr('data-class-toggle-scrollto') != 'undefined' &&
							module.$parentElement.attr('data-class-toggle-scrollto') == 'true') {
							module.$parentElement.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
								module.scrollTo($(this))
							);
						}

					});

				} else {

					$(this).on('click', function(e) {
						// the click event should be binded to $(this)

						// check if default behavior should be prevented
						if (typeof $(this).attr('data-class-toggle-default') != 'undefined' &&
							$(this).attr('data-class-toggle-default') == 'false') {
							e.preventDefault();
						}

						if ($(this).hasClass($(this).attr('data-class-toggle'))) {
							$(this).removeClass($(this).attr('data-class-toggle'));
						} else {
							if (typeof $(this).attr('data-class-single') != 'undefined' &&
								$(this).attr('data-class-single') == 'true') {
								$("." + $(this).attr('data-class-toggle')).removeClass($(this).attr('data-class-toggle'));
							}

							$(this).addClass($(this).attr('data-class-toggle'));
						}

						// if data-class-toggle-scrollto, scroll to that item
						if (typeof $(this).attr('data-class-toggle-scrollto') != 'undefined' &&
							$(this).attr('data-class-toggle-scrollto') == 'true') {
							$(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
								module.scrollTo($(this))
							);
						}
					});
				}

				counter++;
			});
		}
	};

});