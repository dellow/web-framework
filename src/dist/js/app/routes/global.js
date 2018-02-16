/**
 *
 * Route
 *
 * Copyright 2018, Author Name
 * Some information on the license.
 *
**/

import React from 'react'
import ReactDOM from 'react-dom'

import Menus from '../classes/global/menus'
import Email from '../classes/global/email'
import FormsNewsletter from '../classes/forms/newsletter'

;(function (Module, window) {

  /**
   * Module
   * Constructor for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module = function () {
  }

  /**
   * init
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.init = function () {
    // Init Menus.
    Menus.init()
    // Init Email.
    Email.init()
    // Init newsletter form.
    this.subscriberForm()
  }

  /**
   * events
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.events = function () {
    // Extend the events system.
    window.Events.extend({
      events: {
        'scroll null': 'scrollable',
        'click [data-js-event="mobileSearch"]': 'toggleSearchBox'
      },
      scrollable: (e) => {
        if (window.Breakpoint.current === 'mobile') {
          // Cache page header height.
          let height = Math.round($('.page-mobile-wrapper').height())
          // Cache scroll top.
          let scrollTop = $(document).scrollTop()

          if (scrollTop > height) {
            return $('body').addClass('js-scrolled-past-header').css({'padding-top': height})
          }

          return $('body').removeClass('js-scrolled-past-header').css({'padding-top': ''})
        }
      },
      toggleSearchBox: function (e) {
        return $('[data-js-target="mobileSearch"]').toggleClass('active')
      }
    })
  }

  /**
   * subscriberForm
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.subscriberForm = function () {
    // Cache element.
    let $el = $('[data-js-target="subscriberForm"]')
    // React render method.
    if ($el.length) {
      ReactDOM.render(<FormsNewsletter placeholder={$el.data('react-placeholder')} />, $el[0])
    }
  }

  // Export
  module.exports = new Module()

}(function () {}, window))
