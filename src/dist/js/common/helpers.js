/**
 *
 * Helpers
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

;(function(Helpers, window)
{

  /**
   * Customised and cross browser window.Helpers.log.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.log = function(message, type, alertlog)
  {
    // Guard :: Check environment.
    if (process.env.NODE_ENV === 'production') {
      return
    }

    alertlog = (typeof alertlog === 'undefined')
    if (typeof console === 'undefined' || typeof console.log === 'undefined') {
      if (alertlog) {
        window.alert(message)
      }
    } else {
      var color = (type === 'positive') ? '#097809' : (type === 'negative') ? '#c5211d' : (typeof type !== 'undefined') ? type : '#240ad0'
      console.log('%c-- DEBUG ---------------------------------------------------------', 'color:' + color + ';font-weight:bold;')
      if (message instanceof Array || message instanceof Object) {
        console.log(message)
      } else {
        console.log('%c' + message, 'color: ' + color)
      }
      console.log('%c-- DEBUG ---------------------------------------------------------', 'color:' + color + ';font-weight:bold;')
      console.log('')
    }
  }

  /**
   * Measures a hidden element.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.mhe = function(el)
  {
    // Clone element.
    let clone = el.clone()
    // Add to DOM in place and measure height.
    let height = clone.addClass('mhe-clone-remove').css({'position': 'absolute', 'top': '-100%', 'display': 'block', 'max-height': 'none', 'height': 'auto', 'visibility': 'hidden'}).prependTo(el.parent()).outerHeight()
    // Destroy the clone.
    $('.mhe-clone-remove').remove()

    return height
  }

  /**
   * Checks if a value is empty, undefined or false.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isEmpty = function(value)
  {
    return (value === undefined || value === null || value === '' || value.length === 0)
  }

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   *
   * $(window).on('resize', Module.test)
   *
   * Module.test = this.debounce(function () {
   *     window.Helpers.log('This has been debounced')
   * }, 250)
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.debounce = function(func, wait, immediate)
  {
    let timeout

    return function () {
      let args = arguments
      let later = () => {
        timeout = null
        if (!immediate) {
          func.apply(this, args)
        }
      }
      let callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) {
        func.apply(this, args)
      }
    }
  }

  /**
   * Converts the URL parameters into an object.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.parseURLParams = function(url)
  {
    // Check if URL contains a ?.
    if (url && url.indexOf('?') !== -1) {
      // Split URL at ?
      let urlSplit = url.split('?')
      let urlParsed = urlSplit[1]
      let urlParams = (!this.isEmpty(urlParsed)) ? urlParsed : false

      if (urlParams) {
        return  {url: urlSplit[0], params: JSON.parse('{"' + decodeURI(urlParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')}
      }
    }

    return false
  }

  /**
   * Converts an object in URL parameters.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.parseParamObject = function(obj)
  {
    let str = ''
    for (let key in obj) {
      if (encodeURIComponent(obj[key])) {
        if (str != '') {
          str += '&'
        } else {
          str += '?'
        }
        str += key + '=' + encodeURIComponent(obj[key])
      }
    }

    return str
  }

  /**
   * Updates the URL parameters.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.updateUrlParameter = function(url, param, paramVal)
  {
    let TheAnchor = null
    let newAdditionalURL = ''
    let tempArray = url.split('?')
    let baseURL = tempArray[0]
    let additionalURL = tempArray[1]
    let temp = ''

    if (additionalURL) {
      let tmpAnchor = additionalURL.split('#')
      let TheParams = tmpAnchor[0]

      TheAnchor = tmpAnchor[1]

      if (TheAnchor) {
        additionalURL = TheParams
      }

      tempArray = additionalURL.split('&')

      for (let i = 0, ii = tempArray.length; i < ii; i++) {
        if (tempArray[i].split('=')[0] != param) {
          newAdditionalURL += temp + tempArray[i]
          temp = '&'
        }
      }
    } else {
      let tmpAnchor = baseURL.split('#')
      let TheParams = tmpAnchor[0]

      TheAnchor  = tmpAnchor[1]

      if (TheParams) {
        baseURL = TheParams
      }
    }

    if (TheAnchor) {
      paramVal += '#' + TheAnchor
    }

    let rows_txt = temp + '' + param + '=' + paramVal

    return baseURL + '?' + newAdditionalURL + rows_txt
  }

  /**
   * Updates a URL parameter with or without history.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.changeUrlParameterState = function(uri, key, value, history)
  {
    let update = this.updateUrlParameter(uri, key, encodeURIComponent(value))

    if (history) {
      window.history.pushState(null, null, update)
    } else {
      window.history.replaceState(null, null, update)
    }
  }

  /**
   * Updates a URL path with or without history.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.changeUrlPathState = function(value, history)
  {
    if (history) {
      window.history.pushState(null, null, value)
    } else {
      window.history.replaceState(null, null, value)
    }
  }

  /**
   * Splits an array into chunks.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.splitArrayIntoChunks = function(arr, n)
  {
    if (!arr.length) {
      return []
    }

    let rest = arr.length % n
    let restUsed = rest
    let partLength = Math.floor(arr.length / n)
    let result = []

    for (var i = 0; i < arr.length; i += partLength) {
      let end = partLength + i
      let add = false

      if (rest !== 0 && restUsed) {
        end++
        restUsed--
        add = true
      }

      result.push(arr.slice(i, end))

      if (add) {
        i++
      }
    }

    return result
  }

  /**
   * Make string safe for CSS class.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.cssSafeName = function(string)
  {
    return string.replace(/[^a-z0-9]/g, function(s) {
      var c = s.charCodeAt(0)
      if (c == 32) return '-'
      if (c >= 65 && c <= 90) return '_' + s.toLowerCase()
      return '__' + ('000' + c.toString(16)).slice(-4)
    })
  }

  /**
   * Decodes HTML entities.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.decodeEntities = function(val)
  {
    const he = require('he')

    if (val) {
      return he.decode(val)
    }

    return val
  }

  /**
   * Checks var is integer.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isInt = function(n)
  {
    return n === +n && n === (n|0)
  }

  /**
   * Creates a unique ID.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.guid = function()
  {
    return Math.random().toString(36).substr(2, 9)
  }

  /**
   * Returns an error message from an error response/object.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.error = function(error, logIt)
  {
    let errorResponse = null

    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx.
      if (typeof error.response === 'string') {
        errorResponse = error.response
      } else if (typeof error.response.data === 'string' || typeof error.response.data === 'object') {
        errorResponse = error.response.data
      } else {
        return this.error(error.response.data, logIt)
      }
    } else if (error.request) {
      // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js.
      errorResponse = error.request
    } else if (error.msg) {
      // The request has a msg property.
      errorResponse = error.msg
    } else if (error.message) {
      // The request has a message property.
      errorResponse = error.message
    } else if (typeof error === 'string') {
      // Something happened in setting up the request that triggered an Error.
      errorResponse = error
    }

    if (logIt) {
      this.log(errorResponse, 'negative')
    }

    return errorResponse
  }

  /**
   * Creates a random string.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.randomString = function()
  {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
  }

  /**
   * Check string is alphanumeric.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isAlphanumeric = function(e)
  {
    // Regex to allow letters, numbers and spaces.
    let regex = new RegExp(/^[a-z\d\-_\s]+$/i)
    // Check character code.
    let str = String.fromCharCode(!e.charCode ? e.which : e.charCode)

    return ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 8 || e.target.value === '' || regex.test(str))
  }

  /**
   * Checks if a user is located in localStorage.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isUserLocated = function(retrieve)
  {
    // Check location is set in localStorage.
    let check = (!this.isEmpty(window.localStorage['geolocation_lat']) && !this.isEmpty(window.localStorage['geolocation_lng']))

    if (retrieve) {
      return (check) ? {latitude: window.localStorage['geolocation_lat'], longitude: window.localStorage['geolocation_lng']} : {latitude: 55.3781, longitude: 3.4360}
    }

    return check
  }

  /**
   * Determines if a string is a valid URL.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isValidURL = function(str)
  {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i') // fragment locator

    return !!pattern.test(str)
  }

  /**
   * Customised alert().
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.alert = function(title, body, closeCallback)
  {
    // Check body is string.
    if (typeof body !== 'string') {
      throw new Error('body var is not a string, could not be sent to alert.')
    }
    // Check for existing modals and close.
    if ($('.obj-modal').length) { $('.obj-modal').removeClass('active') }
    // Check for an existing alert and destroy.
    if ($('.obj-modal').length && $('.obj-modal').hasClass('active')) $('.obj-modal').remove()

    // Create an ID.
    const ID = this.guid()
    // Define modal
    const tpl = `<div id="modal-` + ID + `" class="obj-modal">
      <div class="obj-modal__window">
        <div class="obj-modal__window__header">
          <div class="obj-modal__window__header__title">` + title + `</div>
        </div>
        <div class="obj-modal__window__main">
          ` + body + `
        </div>
        <div class="obj-modal__window__footer">
          <button class="btn positive" data-alert-close>Okay</button>
        </div>
      </div>
    </div>`
    // Get 10% of document height.
    let docHeight = ($(window).height() / 100) * 10
    // Add to body.
    $('body').append(tpl)
    // Set maxium height.
    $('#modal-' + ID + ' .obj-modal__window').css({'maxHeight': ($(window).height() - docHeight)})
    // Wait and show modal.
    $('#modal-' + ID).addClass('active')
    // Click listener.
    $('[data-alert-close]').on('click', () => {
      $('#modal-' + ID).remove()
      if (closeCallback) closeCallback()
    })
  }

  /**
   * Customised confirm().
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.confirm = function(title, body, confirmCallback, refuteCallback)
  {
    // Check for existing modals and close.
    if ($('.obj-modal').length) { $('.obj-modal').removeClass('active') }
    // Check for an existing alert and destroy.
    if ($('.obj-modal').length && $('.obj-modal').hasClass('active')) $('.obj-modal').remove()

    // Create an ID.
    const ID = this.guid()
    // Define modal
    const tpl = `<div id="modal-` + ID + `" class="obj-modal">
      <div class="obj-modal__window">
        <div class="obj-modal__window__header">
          <div class="obj-modal__window__header__title">` + title + `</div>
        </div>
        <div class="obj-modal__window__main">
          ` + body + `
        </div>
        <div class="obj-modal__window__footer">
          <button class="btn positive" data-confirm>Yes</button>
          <button class="btn negative" data-refute>No</button>
        </div>
      </div>
    </div>`
    // Get 10% of document height.
    let docHeight = ($(window).height() / 100) * 10
    // Add to body.
    $('body').append(tpl)
    // Set maxium height.
    $('#modal-' + ID + ' .obj-modal__window').css({'maxHeight': ($(window).height() - docHeight)})
    // Wait and show modal.
    $('#modal-' + ID).addClass('active')
    // Click listener.
    $('[data-confirm]').on('click', () => {
      $('#modal-' + ID).remove()
      if (confirmCallback) confirmCallback()
    })
    $('[data-refute]').on('click', () => {
      $('#modal-' + ID).remove()
      if (refuteCallback) refuteCallback()
    })
  }

  /**
   * Calculates a percentage between two numbers.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.calculatePercentageChange = function(oldNumber, newNumber)
  {
    var decreaseValue = oldNumber - newNumber

    return (decreaseValue / oldNumber) * 100
  }

  /**
   * Converts bytes to human readable format.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.humanFileSize = function(bytes, si)
  {
    var thresh = si ? 1000 : 1024
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B'
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB']
    var u = -1
    do {
        bytes /= thresh
        ++u
    } while(Math.abs(bytes) >= thresh && u < units.length - 1)

    return bytes.toFixed(1)+' '+units[u]
  }

  /**
   * Converts meters to miles.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.convertToMiles = function(meters, withText)
  {
    return (meters * 0.000621371192).toFixed(2) + ((withText) ? ' miles' : '')
  }

  /**
   * Converts meters to km.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.convertToKm = function(meters, withText)
  {
    return (meters / 1000).toFixed(2) + ((withText) ? ' km' : '')
  }

  /**
   * Uses haversine formula to get distance between points.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.getDistance = function(p1, p2)
  {
    // Rad function.
    var rad = function(x) { return x * Math.PI / 180 }

    let dLat = rad(p2.lat() - p1.lat())
    let dLong = rad(p2.lng() - p1.lng())
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return 6378137 * c
  }

  // Export
  module.exports = Helpers

}({}, window))