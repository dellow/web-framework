/**
 *
 * Public
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Public, window, undefined){
	'use strict';

    /**
     * Public
     * Constructor for Public.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
	Public = function(){
    }

	/**
	 * modules
	 * Public modules.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
    Public.prototype.modules = {
	}

	/**
	 * events
	 * Public events listeners.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
    Public.prototype.events = {
        events:	{},
        extend: function(args){
            // Extend.
            var extension = $.extend({}, this, args);
            // Setup events.
            $.each(extension.events, function(name, callback){
                extension.register(name, callback);
            });

            return extension;
        },
        register: function(name, callback){
            var _this = this;
            // Cache event.
            var event = name.substr(0, name.indexOf(' '));
            // Cache selector.
            var selector = name.substr(name.indexOf(' ')+1);
            // Add event.
            $(document).on(event, selector, function(e){
                // Append $el to event object
                e.$el = $(this);
                // Event
                if(typeof _this.event === 'function'){
                    e = _this.event(e);
                }
                // Callback
                _this[callback].apply(_this, [e]);
            });
        }
    }

	/**
	 * init
	 * Module init method.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
    Public.prototype.init = function(){
		getModules.call(this);
	}

	/**
	 * getModules
	 * Loads any child modules.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
    var getModules = function(){
		// Require :: Modules
		this.modules.Plugins      = require('./module.plugins');
		this.modules.MobileMenu   = require('./module.mobile-menu-side');
		this.modules.ModuleSample = require('./module.sample');
	}

	// Export
	module.exports = new Public();

}(window.Public = window.Public || function(){}, window));