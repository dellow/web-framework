/**
 *
 * Module
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
**/

;(function(Module, $, window, undefined){
	'use strict';

    /**
     * Module
     * Constructor for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
		// Set active flag.
		this.menu_active = false;
		this.sub_menu_active = false;
    }

	/**
	 * init
	 * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.init = function(){
		var _this = this;

		// Start binds on window load / resize.
		$(window).on('load resize',function(){
			// Vars.
			_this.$button    = $('.js-mobile-button');
			_this.$menu      = $('.js-mobile-menu');
			_this.$content   = $('.js-mobile-content');
			_this.$close     = $('.js-close-mobile-menu');
			_this.$sub_close = $('.js-sub-menu-close');
        	// Check screen is below mobile breakpoint.
			if(Helpers.breakpoint(window.mobile_breakpoint)){
            	return _this.binds();
            }
            else{
				// Reset flag.
				_this.set_menu_flag(false);
            	// Reset any menus.
            	return _this.hide_primary_menu();
            }
		});
	}

	/**
	 * binds
	 * jQuery event binds for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.binds = function(){
		var _this = this;

		// Click on the mobile menu.
		this.$button.on('click', function(){
			var _self = $(this);

			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
			// Run hide operations.
			else if(_this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu(_self);
				// Set flag.
				_this.set_menu_flag(false);
			}
			// Run show operations.
			else{
				// Show mobile menu.
				_this.show_primary_menu(_self);
				// Set flag.
				_this.set_menu_flag(true);
			}
		});

		// Sub Menu Close.
		_this.$sub_close.on('click', function(){
			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
		});

		// Sub Menu Click.
		$('a', _this.$menu).on('click', function(e){
			var _self = $(this);

			if(_self.next('.sub-menu').length){
				e.preventDefault();
				// Init sub menu.
				_this.show_sub_menu(_self.next('.sub-menu'));
			}
		});

		// Escape key pressed.
		$(document).on('keyup', function(e){
			// Check key type & menu is active.
			if(e.keyCode == 27 && _this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu();
			}
		});

		// Close menu.
		this.$close.on('click', function(){
			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
			// Check menu is active.
			else if(_this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu();
				// Set flag.
				_this.set_menu_flag(false);
			}
		});

		// Close menu.
		this.$content.on('click', function(){
			// Check menu is active.
			if(_this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu();
				// Set flag.
				_this.set_menu_flag(false);
			}
		});
	}

	/**
	 * show_primary_menu
	 * Show menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.show_primary_menu = function(){
		// Vars.
		var doc_width  = $(document).width(),
			doc_height = $(document).height(),
			doc_85     = (doc_width / 100) * 85;

		// Add 85% width to menu.
		this.$menu.css({'width': doc_85});
		// Move page content 85% left.
		this.$content.addClass('active-menu').css({'left': doc_85});
		// Add active class to menu button.
		this.$button.addClass('active-menu');
		// Restrict body height.
		$('body').css({'height': doc_height, 'overflow': 'hidden'});
	}

	/**
	 * hide_primary_menu
	 * Hide menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hide_primary_menu = function(){
		var _this = this;

		// Remove the active class.
		_this.$content.removeClass('active-menu');
		// Remove active class from menu button.
		_this.$button.removeClass('active-menu');
		// Remove the active class.
		_this.$content.css({'left': ''});

		// Wait 10ms.
		setTimeout(function(){
			// Remove 90% width to menu.
			_this.$menu.css({'width': ''});
			// Restrict body height.
			$('body').css({'height': '', 'overflow': ''});
		}, 500); // Needs to be the same as the animation speed in the CSS.
	}

	/**
	 * show_sub_menu
	 * Show sub menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.show_sub_menu = function(el){
		var _this = this;

		// Vars.
		var menu_width = _this.$menu.width(),
			menu_95    = (menu_width / 100) * 95;

		// Add 95% width to sub menu.
		el.addClass('active-sub-menu').css({'width': menu_95});
		// Wait 10ms.
		setTimeout(function(){
			_this.$menu.addClass('sub-menu-active');
			_this.sub_menu_active = true;
		}, 100);
	}

	/**
	 * hide_sub_menu
	 * Hides sub menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hide_sub_menu = function(el){
		var _this = this;

		// Set close button text.
		this.$close.html('<i class="icon icon--menu--close"></i> Close Menu');
		// Remove 80% width from sub menus.
		$('.active-sub-menu').css({'width': ''});
		// Wait 10ms.
		setTimeout(function(){
			_this.sub_menu_active = false;
		}, 100);
		// Wait 20ms.
		setTimeout(function(){
			_this.$menu.removeClass('sub-menu-active');
			// Remove active class from sub menus.
			$('.active-sub-menu').removeClass('active-sub-menu');
		}, 200);
	}

	/**
	 * set_menu_flag
	 * Set flag after 10ms
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.set_menu_flag = function(state){
		var _this = this;

		// Wait 10ms.
		setTimeout(function(){
			// Set flag.
			_this.menu_active = state;
		}, 100);
	}

	// Export
	module.exports = new Module();

}(window.Menu = window.Menu || function(){}, jQuery, window));