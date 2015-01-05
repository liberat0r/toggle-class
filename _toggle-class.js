/**
 * Toggle Class
 *
 * toggls class from elements
 * add the attribute data-class-toggle="class to toggle"
 * add the attribute data-class-toggle-target="button class" if you want
 * the class to be toggled from an external element
 */


if (typeof globals === 'undefined') {
	var globals = {};
}

if (typeof globals.$header === 'undefined') {
	globals.$header = $(".js-header");
}

if (typeof globals.$body_html === 'undefined') {
	globals.$body_html = $("body, html");
}

if (typeof globals.$body === 'undefined') {
	globals.$body = $("body");
}

(function() {
	"use strict";

	function ToggleClass() {

		var self = this;

		self.scrollLatency = 300;

		self.$toggleElements = $("[data-class-toggle]");

		// Scrolls to the offset top of an element
		self.scrollTo = function($element) {
			self.headerOffset = (typeof globals.$header !== 'undefined' && globals.$header.length > 0) ? globals.$header.height() : 0;

			globals.$body_html.stop().animate({
				scrollTop: $element.offset().top - self.headerOffset
			}, self.scrollLatency);
		};

		// Bind toggle class events
		self.start = function() {

			var counter = 0;
			self.$toggleElements.each(function() {

				var bindClassName = 'js-toggle-class-bind-' + counter;

				if (typeof $(this).attr('data-class-toggle-target') != 'undefined') {
					/* the click event should be bound to the data-class-toggle-target */

					/* add a unique class name to the element that will be toggled */
					$(this).addClass(bindClassName);

					/* find the class toggle targets */
					var $classToggleTarget = $($(this).attr('data-class-toggle-target'));

					/* add the parent element as a new attribute to the toggle targets */
					$classToggleTarget.attr('data-class-toggle-element', '.' + bindClassName);

					/* toggle target on click event */
					$classToggleTarget.on('click', function(e) {
						/* find the element to toggle */
						self.$parentElement = $(this).closest($(this).attr('data-class-toggle-element'));
						if (self.$parentElement.length === 0) {
							/* if closest didnt yield any results, then search the whole body */
							self.$parentElement = globals.$body.find($(this).attr('data-class-toggle-element'));
						}

						/* check if default behavior should be prevented */
						if (typeof self.$parentElement.attr('data-class-toggle-default') != 'undefined' &&
							$(self.$parentElement).attr('data-class-toggle-default') == 'false') {
							e.preventDefault();
						}

						/* toggle the class */
						if (self.$parentElement.hasClass(self.$parentElement.attr('data-class-toggle'))) {
							self.$parentElement.removeClass(self.$parentElement.attr('data-class-toggle'));
						} else {
							/* if data class single is set to true, only one element will have the class */
							if (typeof self.$parentElement.attr('data-class-single') != 'undefined' &&
								self.$parentElement.attr('data-class-single') == 'true') {
								$('.' + self.$parentElement.attr('data-class-toggle')).removeClass(self.$parentElement.attr('data-class-toggle'));
							}

							self.$parentElement.addClass(self.$parentElement.attr('data-class-toggle'));
						}

						/* if data-class-toggle-scrollto, scroll to that item */
						if (typeof self.$parentElement.attr('data-class-toggle-scrollto') != 'undefined' &&
							self.$parentElement.attr('data-class-toggle-scrollto') == 'true') {
							self.$parentElement.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
								self.scrollTo($(this))
							);
						}

					});

				} else {

					$(this).on('click', function(e) {
						/* the click event should be binded to $(this) */

						/* check if default behavior should be prevented */
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

						/* if data-class-toggle-scrollto, scroll to that item */
						if (typeof $(this).attr('data-class-toggle-scrollto') != 'undefined' &&
							$(this).attr('data-class-toggle-scrollto') == 'true') {
							$(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
								self.scrollTo($(this))
							);
						}
					});
				}

				counter++;
			});
		};

	}

	var _ToggleClass = new ToggleClass();

	$(function() {
		_ToggleClass.start();
	});

})();