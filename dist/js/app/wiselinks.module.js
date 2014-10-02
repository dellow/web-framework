/* ======================================================== */
/* ModuleWiselinks
/* Adds Ajax loading to page.
/* Just add '<a href="link.php" data-push="true">Page 2</a>'
/* to any link that needs to be loaded with Ajax
/* ======================================================== */
require('../plugins/wiselinks');
;(function(Module, $, window, undefined){
	'use strict';

	/**
	 * Module.init
	 * Init method for this module
	**/
	Module.init = function(helper){
		$(function(){
			window.wiselinks = new Wiselinks($('.main'));

			$(document).off('page:loading').on('page:loading', function(event, $target, render, url){
	            helper.log("Loading: " + url + " to " + $target.selector + " within '" + render);
	            //code to start loading animation
		    });

			$(document).off('page:redirected').on('page:redirected', function(event, $target, render, url){
	            helper.log("Redirected to: " + url);
	            // code to start loading animation
		    });

			$(document).off('page:always').on('page:always', function(event, xhr, settings){
	            helper.log("Wiselinks page loading completed");
	            // code to stop loading animation
		    });

			$(document).off('page:done').on('page:done', function(event, $target, status, url, data){
	            helper.log("Wiselinks status: '" + status);
	            // Push Google Analytics page view here
		    });

			$(document).off('page:fail').on('page:fail', function(event, $target, status, url, error, code){
	            helper.log("Wiselinks status: '" + status);
	            // code to show error message
		    });
	    });
	}

	// Export
	module.exports = Module;

}(window.ModuleWiselinks = window.ModuleWiselinks || {}, jQuery, window));