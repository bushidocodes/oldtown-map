'use strict';

/**
* @description Represents a site in Old Town Alexandria
* @constructor
* @param {string} name - The name of the site
* @param {string} address - The address of the site
* @param {number} lat - The latitude of the site
* @param {number} lng - The longitude of the site
* @param {string} description - A description of the site
* @param {string} wikipediaID - The unique wikipedia ID of the site if it has a Wikipedia page. Or null if it does not.
*/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var Site = /*#__PURE__*/_createClass(function Site(name, address, lat, lng, description, wikipediaID) {
  var _localStorage$getItem;
  _classCallCheck(this, Site);
  this.name = name;
  this.address = address;
  this.lat = lat;
  this.lng = lng;
  this.description = description;
  this.wikipediaID = wikipediaID;
  var favorites = JSON.parse((_localStorage$getItem = localStorage.getItem('oldtown-favorites')) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : '[]');
  this.isFavorite = ko.observable(favorites.includes(name));
}); // Declare Google Maps UI elements
// infoWindow is a single global object in order to ensure that only one infoWindow is rendered at a time
// wasWarned is a boolean to make sure that the end user is only warned once about Wikipedia errors
// defaultIcon is a dynamically generated (during initMap()) custom icon that is used for markers
// highlightenIcon is a dynamically generated (during initMap()) custom icon that is used for markers when they are
// hovered over (via the marker itself or via the sidebar)
var infoWindow = null;
var map = null;
var markers = ko.observableArray();
var defaultIcon;
var highlightedIcon;
var favoriteIcon;

// Global variable that stores a boolean to indicate if the end-use has been warned about Wikipedia or not.
//This is to ensure an end-user is only warned once.

var wasWarnedAboutWikipedia = ko.observable(false);
var wasWarnedAboutMaps = ko.observable(false);

// Custom Google Maps Style

var styles = [{
  "featureType": "all",
  "elementType": "labels.text.fill",
  "stylers": [{
    "saturation": 36
  }, {
    "color": "#000000"
  }, {
    "lightness": 40
  }]
}, {
  "featureType": "all",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#000000"
  }, {
    "lightness": 16
  }]
}, {
  "featureType": "all",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "administrative",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 20
  }]
}, {
  "featureType": "administrative",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 17
  }, {
    "weight": 1.2
  }]
}, {
  "featureType": "landscape",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 20
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 21
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 17
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 29
  }, {
    "weight": 0.2
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 18
  }]
}, {
  "featureType": "road.local",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 16
  }]
}, {
  "featureType": "transit",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 19
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 17
  }]
}];

// initMap() is the main function for creating the Google Map
// It generates the Google Map, generates the custom icons, generates an array of markers with listeners.

function initMap() {
  // Declare and instatiate Google Map object using desired view zoom, custom styling and map type
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 38.806,
      lng: -77.045
    },
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styles
  });
  defaultIcon = makeMarkerIcon('ffffff');
  highlightedIcon = makeMarkerIcon('ff661a');
  favoriteIcon = makeMarkerIcon('ffd700');

  /* Iterate through the array of sites, create a marker for each site, add a listener on the marker that bounces the
  marker twice and renders the infowindow for this marker, and add the marker to the markers array. All markers are
  diplayed on the map upon initial load*/
  var _iterator = _createForOfIteratorHelper(vm.sites()),
    _step;
  try {
    var _loop2 = function _loop2() {
      var site = _step.value;
      var marker = new google.maps.Marker({
        position: {
          lat: site.lat,
          lng: site.lng
        },
        map: map,
        title: site.name,
        icon: site.isFavorite() ? favoriteIcon : defaultIcon
      });
      marker.site = site;
      marker.addListener('click', function () {
        return vm.selectMarker(marker);
      });
      //Event Listeners for mouseover and mouseout that modify the marker colors upon hover
      marker.addListener('mouseover', function () {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function () {
        this.setIcon(this.site.isFavorite() ? favoriteIcon : defaultIcon);
      });
      markers.push(marker);
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop2();
    }

    // Reactively sync marker visibility whenever filteredSites changes (covers both
    // search input and favorites toggle). peek() avoids a dependency on the markers
    // array itself since all markers are already pushed above.
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  ko.computed(function () {
    var filtered = vm.filteredSites();
    var allMarkers = markers.peek();
    clearInfoWindow();
    var _iterator2 = _createForOfIteratorHelper(allMarkers),
      _step2;
    try {
      var _loop = function _loop() {
        var m = _step2.value;
        m.setMap(filtered.some(function (s) {
          return s.name === m.title;
        }) ? map : null);
      };
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });
}

// clearInfoWindow() gracefully closes the infoWindow if it is open

function clearInfoWindow() {
  if (infoWindow) {
    infoWindow.close();
  }
}

/* generateInfoWindow() issues API calls to Wikipedia for images, builds InfoWindow content using
DOM APIs (not HTML string concatenation), and opens the infoWindow after a delay. */

function generateInfoWindow(site, map, marker, delay) {
  var nameEl = document.createElement('strong');
  nameEl.textContent = site.name;
  var container = document.createElement('div');
  var descEl = document.createElement('p');
  descEl.innerHTML = site.description; // hardcoded data, not from external sources
  container.appendChild(descEl);
  if (site.wikipediaID) {
    var imgHeader = document.createElement('strong');
    imgHeader.appendChild(document.createTextNode('Images From '));
    var wikiLink = document.createElement('a');
    wikiLink.href = "https://en.wikipedia.org/?curid=".concat(site.wikipediaID);
    wikiLink.textContent = 'Wikipedia Page';
    imgHeader.appendChild(wikiLink);
    container.appendChild(imgHeader);
    container.appendChild(document.createElement('br'));
    var imagesContainer = document.createElement('div');
    imagesContainer.style.maxHeight = '160px';
    imagesContainer.style.overflowY = 'auto';
    container.appendChild(imagesContainer);
    pullImagesFromWikipedia(site, site.wikipediaID, imagesContainer);
  }
  infoWindow = new google.maps.InfoWindow({
    headerContent: nameEl,
    content: container
  });
  setTimeout(function () {
    return infoWindow.open(map, marker);
  }, delay);
}

// bounce() helper function bounced a marker a set number of times

function bounce(marker, numberOfBounces) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  }
  // The BOUNCE animation lasts 700ms, so calculate duration and then use setTimeout()
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function () {
    return marker.setAnimation(null);
  }, 700 * numberOfBounces);
}

/*makeMarkerIcon(markerColor) takes in a color in hexidecimal notation and creates a new marker icon of that color.
This function was presented in the Google Maps Udacity course, but I have updated it for version 3.11 of the maps API*/

function makeMarkerIcon(markerColor) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "#".concat(markerColor),
    fillOpacity: 1,
    strokeColor: '#333333',
    strokeWeight: 1.5,
    scale: 9
  };
}

/*pullImagesFromWikipedia() issues JSON requests to the Wikipedia MediaWiki API via CORS.
It retrieves images from the site's Wikipedia page, filters out known junk images, and then calls
resolveWikipediaImageURL for images that pass the filter.*/

var BLOCKED_IMAGE_TERMS = ['map', 'Map', 'logo', 'Logo', 'pog', 'Flag', 'book', 'question', 'Ambox', 'Nuvola', 'btn'];
function pullImagesFromWikipedia(_x, _x2, _x3) {
  return _pullImagesFromWikipedia.apply(this, arguments);
} // googleError performs error handling for the Google Maps API.
function _pullImagesFromWikipedia() {
  _pullImagesFromWikipedia = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(site, wikipediaID, imagesContainer) {
    var wikipediaEndpoint, timeout, _data$query$pages$wik, params, response, data, images, _iterator3, _step3, _loop3, resolveWikipediaImageURL, _resolveWikipediaImageURL, _t2, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _resolveWikipediaImageURL = function _resolveWikipediaImag2() {
            _resolveWikipediaImageURL = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(imageName, imagesContainer) {
              var _params, _response, _data, _Object$keys, _Object$keys2, pageId, imageUrl, parsed, anchor, img, _t;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.p = _context2.n) {
                  case 0:
                    _context2.p = 0;
                    _params = new URLSearchParams({
                      action: 'query',
                      prop: 'imageinfo',
                      iiprop: 'url',
                      titles: imageName,
                      format: 'json',
                      origin: '*'
                    });
                    _context2.n = 1;
                    return fetch("".concat(wikipediaEndpoint, "?").concat(_params));
                  case 1:
                    _response = _context2.v;
                    _context2.n = 2;
                    return _response.json();
                  case 2:
                    _data = _context2.v;
                    _Object$keys = Object.keys(_data.query.pages), _Object$keys2 = _slicedToArray(_Object$keys, 1), pageId = _Object$keys2[0];
                    imageUrl = _data.query.pages[pageId].imageinfo[0].url;
                    parsed = new URL(imageUrl);
                    if (!(parsed.protocol !== 'https:')) {
                      _context2.n = 3;
                      break;
                    }
                    return _context2.a(2);
                  case 3:
                    if (!(!parsed.hostname.endsWith('.wikimedia.org') && !parsed.hostname.endsWith('.wikipedia.org'))) {
                      _context2.n = 4;
                      break;
                    }
                    return _context2.a(2);
                  case 4:
                    anchor = document.createElement('a');
                    anchor.href = imageUrl;
                    img = document.createElement('img');
                    img.className = 'wiki-img img-circle';
                    img.src = imageUrl;
                    img.alt = imageName.replace(/^File:/i, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ');
                    img.style.height = '80px';
                    img.style.width = '80px';
                    anchor.appendChild(img);
                    imagesContainer.appendChild(anchor);
                    _context2.n = 6;
                    break;
                  case 5:
                    _context2.p = 5;
                    _t = _context2.v;
                  case 6:
                    return _context2.a(2);
                }
              }, _callee, null, [[0, 5]]);
            }));
            return _resolveWikipediaImageURL.apply(this, arguments);
          };
          resolveWikipediaImageURL = function _resolveWikipediaImag(_x4, _x5) {
            return _resolveWikipediaImageURL.apply(this, arguments);
          };
          wikipediaEndpoint = 'https://en.wikipedia.org/w/api.php';
          timeout = !wasWarnedAboutWikipedia() ? setTimeout(function () {
            return wasWarnedAboutWikipedia(true);
          }, 3000) : null;
          _context3.p = 1;
          params = new URLSearchParams({
            action: 'query',
            pageids: wikipediaID,
            prop: 'images',
            format: 'json',
            origin: '*'
          });
          _context3.n = 2;
          return fetch("".concat(wikipediaEndpoint, "?").concat(params));
        case 2:
          response = _context3.v;
          _context3.n = 3;
          return response.json();
        case 3:
          data = _context3.v;
          clearTimeout(timeout);
          images = (_data$query$pages$wik = data.query.pages[wikipediaID].images) !== null && _data$query$pages$wik !== void 0 ? _data$query$pages$wik : [];
          _iterator3 = _createForOfIteratorHelper(images);
          _context3.p = 4;
          _loop3 = /*#__PURE__*/_regenerator().m(function _loop3() {
            var image;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  image = _step3.value;
                  if (!BLOCKED_IMAGE_TERMS.some(function (term) {
                    return image.title.includes(term);
                  })) {
                    resolveWikipediaImageURL(image.title, imagesContainer);
                  }
                case 1:
                  return _context.a(2);
              }
            }, _loop3);
          });
          _iterator3.s();
        case 5:
          if ((_step3 = _iterator3.n()).done) {
            _context3.n = 7;
            break;
          }
          return _context3.d(_regeneratorValues(_loop3()), 6);
        case 6:
          _context3.n = 5;
          break;
        case 7:
          _context3.n = 9;
          break;
        case 8:
          _context3.p = 8;
          _t2 = _context3.v;
          _iterator3.e(_t2);
        case 9:
          _context3.p = 9;
          _iterator3.f();
          return _context3.f(9);
        case 10:
          _context3.n = 12;
          break;
        case 11:
          _context3.p = 11;
          _t3 = _context3.v;
          clearTimeout(timeout);
        case 12:
          return _context3.a(2);
      }
    }, _callee2, null, [[4, 8, 9, 10], [1, 11]]);
  }));
  return _pullImagesFromWikipedia.apply(this, arguments);
}
function googleMapsError() {
  wasWarnedAboutMaps(true);
}

//Knockout Functionality
var ViewModel = function ViewModel() {
  // ViewModel Data
  var self = this;

  // Intially set searchString, which is bound to sidebar search field, to an empty string
  self.searchString = ko.observable('');
  self.showFavoritesOnly = ko.observable(false);

  /*Create a Knockout Observable Array of instances of Site with prepopulated lats and lngs and wikipediaIDs
  Site descriptions are pulled from Frommer's at http://www.frommers.com/destinations/alexandria-va/623095 and
  from the Extraordinary Alexandria tourism site at
  http://www.visitalexandriava.com/things-to-do/historic-attractions-and-museums/*/

  self.sites = ko.observableArray([new Site("Ramsay House & Visitor's Center", "221 King St, Alexandria, VA 22314", 38.804628, -77.042357, "Alexandria's Visitor's Center was originally the home of William Ramsay, one of the three original " + "Scottish settlers that settled the area in November 1748 and petitioned the House of Burgesses to " + "establish a town.", null), new Site("Carlyle House", "121 N Fairfax St, Alexandria, VA 22314", 38.805228, -77.042012, "A Georgian Palladian manor house built in 1753 by merchant and city founder John Carlyle. Here, five " + "royal governors and General Braddock met to discuss funding of the French and Indian War. Daily " + "tours, youth programs, special events, exhibits and lectures offer visitors a chance to experience " + "eighteenth century life through the eyes of one man and his family as he made the journey from " + "English citizen to American patriot. The story of Carlyle House parallels the early history of " + "Alexandria, colonial Virginia, and America and is brought to life through costumed interpreters, " + "guides and fun family programs. Tues.-Sat. 10 a.m.-4 p.m.; Sun. noon-4 p.m. (tours on the hour and " + "half hour, last tour at 4).", 12593872), new Site("Gadsby's Tavern Museum", "134 N Royal St, Alexandria, VA 22314", 38.805554, -77.043619, "Discover Alexandria's five-star hotel of the 18th century! The Museum consists of the c. 1785 tavern " + "and the 1792 City Tavern and Hotel. Both were constructed by John Wise but made famous by " + "tavernkeeper John Gadsby. His establishment was the center of political, business, and social " + "life in Alexandria and in the new federal city of Washington, D.C. The City Tavern's Ballroom was " + "the location of George Washington's Birthnight Ball in 1798 and 1799, as well as Thomas Jefferson's " + "Inaugural Banquet in 1801. The museum offers tours, programs and special events. " + "Apr.-Oct.: Sun. & Mon. 1-5 p.m., Tues.-Sat. 10 a.m.-5 p.m.; " + "Nov.-March.: Wed.-Sat. 11 a.m.-4 p.m., Sun. 1-4 p.m", 3903736), new Site("Spite House", "523 Queen St, Alexandria, VA 22314", 38.807307, -77.045064, "The Spite House was built by John Hollensbury in 1830 to keep horse drawn wagons and loiterers out of " + "his alley. At seven feet wide and 25 feet deep, the home is 325 square feet over two floors.", null), new Site("Revolutionary War Cobblestones", "607 Princess St, Alexandria, VA 22314", 38.808553, -77.045503, "The 600 block of Princess Street retains the historic Revolutionary War cobblestone streets that once " + "lined much of Old Town. Local folklore says the cobblestones were brought from England in ships as " + "ballast and were laid by captured Hessians, the German mercenaries hired to fight for the British " + "during the Revolutionary War.", null), new Site("Robert E. Lee's Boyhood Home", "607 Oronoco Street, Alexandria, Virginia 22314", 38.809808, -77.045208, "Robert E. Lee left this home that he loved so well to enter West Point. After Appomattox he returned " + "and climbed the wall to see if the snowballs were in bloom. George Washington dined here when it was " + "the home of William Fitzhugh, Lee's kinsman and his wife's grandfather. Lafayette visited here in 1824.", 30089861), new Site("Lee-Fendall House", "614 Oronoco St, Alexandria, VA 22314", 38.809437, -77.045725, "The Lee-Fendall House is a historic house museum and garden located in Old Town Alexandria, Virginia. " + "Since its construction in 1785 the house has served as home to thirty-seven members of the Lee family " + "(1785–1903), hundreds of convalescing Union soldiers (1863–1865), the prominent Downham family " + "(1903–1937), and powerful labor leader John L. Lewis (1937–1969).", 9032278), new Site("Lloyd House", "220 N Washington St, Alexandria, VA 22314", 38.807214, -77.046751, "Constructed around 1796-1797, Lloyd House is one of the best examples of Alexandria's late " + "eighteenth-century Georgian style, and one of five buildings of the Georgian style remaining in the " + "city. Lloyd House is particularly important to the streetscape of Washington Street, part of the George " + "Washington Memorial Parkway.", 26657462), new Site("Christ Church", "118 North Washington St, Alexandria, Virginia 22314", 38.806271, -77.047460, "This beautiful English country-style church was built between 1767-1773 and was attended by George " + "Washington & Robert E. Lee. Tours available Mon.-Sat. 9 a.m.-4 p.m.; Sun. 2-4 p.m., with Sun. morning " + "and evening worship services.", 7769126), new Site("Friendship Firehouse", "107 S Alfred St, Alexandria, VA 22314", 38.804955, -77.049491, "Established in 1774, the Friendship Fire Company was the first volunteer fire company in Alexandria. " + "The current firehouse was built in 1855 and now houses historic firefighting equipment and exhibits. " + "Sat. and Sun. 1-4 p.m.", null), new Site("Lyceum", "201 S Washington St, Alexandria, VA 22314", 38.803759, -77.047537, "The 1839 Greek Revival building serves as the City's history museum. An ongoing exhibition tells the " + "story of Alexandria, once one of the busiest ports in America. Archaeological finds, old photographs, " + "maps, original art works and a wide variety of historic artifacts provide the visitor with a picture of " + "the City's past. Changing exhibitions explore special themes, people, places or events within " + "Alexandria's history. Mon.-Sat. 10 a.m.-5 p.m., Sun. 1-5 p.m.", 23047751), new Site("Appomattox Statue", "201 S Washington St, Alexandria, VA 22314", 38.803911, -77.047210, "Appomattox is a bronze statue created by sculptor M. Caspar Buberl and commissioned and erected by the " + "Robert E. Lee camp of the United Confederate Veterans in 1889. The form of the soldier was designed by " + "John Adams Elder and shows a lone Confederate viewing the aftermath of the battle of Appomattox Court " + "House, where Gen. Robert E. Lee ultimately surrendered to Union general Ulysses S. Grant. The soldier " + "is facing south, the direction which the soldiers from Alexandria would have marched to meet their Union " + "foes in battle in 1861, and also the direction of the former CSA.", 27208344), new Site("City Hall and Market Square", "301 King St, Alexandria, VA 22314", 38.805406, -77.042894, "The Alexandria City Hall also known as the Alexandria Market House & City Hall, in Alexandria, " + "Virginia, is a building built in 1871 and designed by Adolph Cluss. It was listed on the U.S. National " + "Register of Historic Places in 1984. The original city hall was something of a complex, containing the " + "Masonic Lodge, court facility, and both the principal police and fire stations of Alexandria. Market " + "stalls were once situated on the first floors of the west and north wings and in the courtyard which " + "are absent today. A new building was constructed in 1817 but after an extensive fire in 1871 it was " + "rebuilt as a replica of the former building.", 23888997), new Site("Stabler-Leadbeater Apothecary", "107 S Fairfax St, Alexandria, VA 22314", 38.804238, -77.042773, "The Stabler-Leadbeater Apothecary Museum was a family business founded in 1792 and operated in this " + "location from 1805 until 1933.  It represents one of Alexandria's oldest continuously run businesses " + "that combined retailing, wholesaling, and manufacturing. The museum boasts a vast collection of herbal " + "botanicals, handblown glass, and medical equipment.  It also has a spectacular collection of archival " + "materials, including journals, letters and diaries, prescription and formula books, ledgers, orders " + "and invoices. The names of famous customers appear in these documents, including Martha Washington, " + "Nelly Custis and Robert E. Lee.", 16173672), new Site("Old Presbyterian Meeting House", "323 S Fairfax St, Alexandria, VA 22314", 38.801352, -77.043419, "Erected in 1775, the Old Presbyterian Meeting House was the place of worship of the Scottish merchants " + "that founded Alexandria. The Burial Ground adjoining the Church is the final resting place of many " + "patriots of the Revolutionary War, including the Tomb of an Unknown Soldier of the American Revolution" + ", John Carlyle, founder and first overseer of Alexandria; Dr. James Craik, Physician General of the " + "Continental Army and close friend of George Washington, and William Hunter, Jr., mayor of Alexandria " + "and founder of the St. Andrew's Society.", 23439578), new Site("Gentry Row", "212 Prince St, Alexandria, VA 22314", 38.803181, -77.042304, "Gentry Row has many historic home that were once owned by prominent figures as William Fairfax, one of " + "Alexandria's founding trustees, and Dr. James Craik, surgeon-general during the American Revolution as " + "well as George Washington's personal physician.", null), new Site("Athenaeum", "201 Prince St, Alexandria, VA 22314", 38.803438, -77.041821, "A Greek Revival building built in 1851, it was home to the Bank of the Old Dominion, where Robert E. " + "Lee did his banking. During the Civil War occupation of Alexandria, Federal troops commandeered the " + "building, which they used as Commissary Headquarters for the Union Army. After the Battle of Bull Run/" + "First Manassas, the building served as a triage facility for wounded Union soldiers. One of the few " + "remaining examples of neo-classical Greek revival architecture in historic Alexandria, the Athenaeum " + "is on both the Virginia Trust and National Register of Historic Places. Today it is an art gallery and " + "home of the Northern Virginia Fine Arts Association. Open  Thurs.-Sun. noon-4 p.m. Closed major holidays.", 32040345), new Site("Captain's Row", "115 Prince St, Alexandria, VA 22314", 38.803433, -77.041098, "Captain's Row is a line of homes once heavily inhabited by sea captains in the days when Alexandria " + "was a major commercial port and clipper ships and brigs lined the Potomac waterfront. The homes were " + "mostly rebuilt in 1827 after a fire. The street retains the historic Revolutionary War cobblestone " + "streets that once lined much of Old Town. Local folklore says the cobblestones were brought from " + "England in ships as ballast and were laid by captured Hessians, the German mercenaries hired to fight " + "for the British during the Revolutionary War.", null), new Site("Black History Museum", "902 Wythe St, Alexandria, VA 22314", 38.812054, -77.048045, "Originally the segregated library for Alexandria's African American residents, the museum documents the " + "local and national history, culture and contributions of Black America. Tues.-Sat. 10 a.m.-4 p.m. The " + "Museum's permanent exhibition, Securing the Blessings of Liberty, seeks to document how the area " + "African Americans survived slavery, helped to destroy it and eventually helped shape the community " + "that we know today.", null), new Site("Torpedo Factory", "105 N Union St, Alexandria, VA 22314", 38.804892, -77.039802, "The Torpedo Factory Art Center was once a torpedo factory!<br>The U.S. Naval Torpedo Station opened in " + "1919 and operated for five years before becoming munitions storage. With the onset of WWII, it " + "produced Mark III and Mark IV torpedoes. By the war's end, it was converted to government storage " + "until the City of Alexandria bought it in 1969. In 1974, a group of visionary artists proposed to " + "renovate part of the neglected factory into usable studio spaces. One of the country's earliest " + "examples of creative reuse of industrial space, the Torpedo Factory Art Center became a catalyst " + "for the revitalization of the Potomac riverfront and the historic preservation of Old Town Alexandria " + "as a thriving visitor destination. Today, it continues to be a prototype for other visual arts " + "organizations around the world.", 21469711)]);

  // filteredSites is a Knockout Computed object that stores all sites with a title that matches searchString
  // without regard to case. This filter implementation is based on Ryan Niemeyer's Array Filtering section
  // found at http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  self.filteredSites = ko.computed(function () {
    var sites = self.showFavoritesOnly() ? self.sites().filter(function (site) {
      return site.isFavorite();
    }) : self.sites();
    if (self.searchString() === '') {
      return sites;
    }
    var filter = self.searchString().toLowerCase();
    return sites.filter(function (site) {
      return site.name.toLowerCase().includes(filter);
    });
  });

  // Behaviors

  // selectSite is called when a specific site is selected from the filtered list of sites in the sidebar
  // It finds the marker with a title that matches the name of the selected site, bounces that marker twice, and
  // then renders the infoWindow on that marker using the data from the selected site.
  self.selectSite = function (site) {
    var marker = markers().find(function (m) {
      return m.title === site.name;
    });
    clearInfoWindow();
    //Don't close the sidebar automatically if the window is so wide that the infowindow is fully visible on the visible portion of the map div
    if ($(window).width() < 1500) {
      hamburger_cross();
      $("#wrapper").toggleClass("toggled");
    }
    map.panTo({
      lat: site.lat,
      lng: site.lng
    });
    bounce(marker, 2);
    generateInfoWindow(site, map, marker, 1400);
  };
  self.toggleShowFavorites = function () {
    self.showFavoritesOnly(!self.showFavoritesOnly());
  };
  self.toggleFavorite = function (site) {
    var _localStorage$getItem2;
    var newValue = !site.isFavorite();
    site.isFavorite(newValue);
    var favorites = JSON.parse((_localStorage$getItem2 = localStorage.getItem('oldtown-favorites')) !== null && _localStorage$getItem2 !== void 0 ? _localStorage$getItem2 : '[]');
    if (newValue) {
      if (!favorites.includes(site.name)) favorites.push(site.name);
    } else {
      favorites = favorites.filter(function (n) {
        return n !== site.name;
      });
    }
    localStorage.setItem('oldtown-favorites', JSON.stringify(favorites));
    var marker = markers().find(function (m) {
      return m.title === site.name;
    });
    marker === null || marker === void 0 || marker.setIcon(newValue ? favoriteIcon : defaultIcon);
  };

  // highlightMarkerOfSite() and unhighlightMarkerOfSite() are used to allow the end user to hover over sites in
  // the side bar and see the associated marker of that site highlighted on the map.
  self.highlightMarkerOfSite = function (site) {
    var _markers$find;
    (_markers$find = markers().find(function (m) {
      return m.title === site.name;
    })) === null || _markers$find === void 0 || _markers$find.setIcon(highlightedIcon);
  };
  self.unhighlightMarkerOfSite = function (site) {
    var marker = markers().find(function (m) {
      return m.title === site.name;
    });
    marker === null || marker === void 0 || marker.setIcon(site.isFavorite() ? favoriteIcon : defaultIcon);
  };

  // selectMarker() is used to override the default behavior of when a marker is clicked. This ensures uniform
  // behavior between the sidebar and the map
  self.selectMarker = function (marker) {
    var site = self.sites().find(function (s) {
      return s.name === marker.title;
    });
    clearInfoWindow();
    bounce(marker, 2);
    generateInfoWindow(site, map, marker, 1400);
  };
}; //endViewModel

var vm = new ViewModel();
ko.applyBindings(vm);
function hamburger_cross() {
  var trigger = $('#menu-toggle');
  if (trigger.hasClass('is-closed')) {
    trigger.removeClass('is-closed').addClass('is-open');
    $('.overlay').show();
  } else {
    trigger.removeClass('is-open').addClass('is-closed');
    $('.overlay').hide();
  }
  trigger.attr('aria-expanded', trigger.hasClass('is-open'));
}
$('#menu-toggle').click(function (e) {
  e.preventDefault();
  hamburger_cross();
  $('#wrapper').toggleClass('toggled');
});
$('.overlay').click(function () {
  hamburger_cross();
  $('#wrapper').removeClass('toggled');
});