import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _objectSpread from '@babel/runtime/helpers/objectSpread';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(opts) {
    _classCallCheck(this, Canvas);

    // dpi
    this.radio = null; // configuration

    this.opts = null; // context

    this.ctx = null;
    this.canvas = null;
    this.defaultOptions = {
      background: '#fff'
    };
    this.opts = _objectSpread({}, this.defaultOptions, opts);
    this.radio = window.devicePixelRatio;
  }
  /**
   * @desc transform actual pixels to canvas unit
   *
   * @param {string} pixels actual pixels
   * @return unit in canvas
   * @memberof Canvas
   */


  _createClass(Canvas, [{
    key: "normalizeUnit",
    value: function normalizeUnit(pixels) {
      pixels = String(pixels);
      if (pixels.indexOf('px') > -1) pixels = pixels.replace('px', '');
      return pixels * this.radio;
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var opts, body;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.canvas = document.createElement('canvas');
                this.ctx = this.canvas.getContext('2d');
                opts = this.opts;
                body = document.body || document.documentElement;
                // init canvas
                this.canvas.width = this.normalizeUnit(opts.width);
                this.canvas.height = this.normalizeUnit(opts.height);
                this.canvas.style.width = opts.width.indexOf('px') > -1 ? opts.width : opts.width + 'px';
                this.canvas.style.height = opts.height.indexOf('px') > -1 ? opts.height : opts.height + 'px';
                this.canvas.style.zIndex = opts.zIndex || opts['z-index'] || 1;
                // wrapper
                opts.container ? document.querySelector(opts.container).appendChild(this.canvas) : body.appendChild(this.canvas);

                // background
                if (opts.background.indexOf('/') > -1 || opts.background.indexOf('.') > -1) {
                  // background image
                  this.dealImage({
                    src: opts.background,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                  });
                } else {
                  // background color
                  this.ctx.fillStyle = opts.background;
                  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                } // insert elements


                this.elementsSort(opts.elements);
                return _context2.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  _regeneratorRuntime.mark(function _callee(resolve) {
                    var i;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            opts.elements = opts.elements || [];
                            i = 0;

                          case 2:
                            if (!(i < opts.elements.length)) {
                              _context.next = 8;
                              break;
                            }

                            _context.next = 5;
                            return _this.dealElement(opts.elements[i]);

                          case 5:
                            i++;
                            _context.next = 2;
                            break;

                          case 8:
                            resolve();

                          case 9:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function init() {
        return _init.apply(this, arguments);
      };
    }()
    /**
     * @desc midware to detail type
     *
     * @param {Object} element
     * @returns {Function}
     * @memberof Canvas
     */

  }, {
    key: "dealElement",
    value: function dealElement(element) {
      if (element.type === 'image') return this.dealImage(element);else return this.dealText(element);
    }
    /**
     * @desc deal with image
     *
     * @param {*} image={}
     * @returns
     * @memberof Canvas
     */

  }, {
    key: "dealImage",
    value: function () {
      var _dealImage = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var image,
            img,
            normalizeUnit,
            widthFlag,
            heightFlag,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                image = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                if (!(image instanceof Object)) console.error('传入的图片不是 object');
                img = document.createElement('img');
                normalizeUnit = this.normalizeUnit.bind(this); // was already normalized

                widthFlag = false;
                heightFlag = false;
                img.src = image.src;

                // left && right but not widht
                if (image.width === undefined && image.left !== undefined && image.right !== undefined) {
                  widthFlag = true;
                  image.width = this.canvas.width - normalizeUnit(image.left) - normalizeUnit(image.right);
                } // top && bottom but not height


                if (image.height === undefined && image.top !== undefined && image.bottom !== undefined) {
                  heightFlag = true;
                  image.height = this.canvas.height - normalizeUnit(image.top) - normalizeUnit(image.bottom);
                }

                return _context3.abrupt("return", new Promise(function (resolve) {
                  img.onload = function () {
                    _this2.ctx.drawImage(img, image.left ? normalizeUnit(image.left) : image.right ? _this2.canvas.width - normalizeUnit(image.width) - normalizeUnit(image.right) : 0, image.top ? normalizeUnit(image.top) : image.bottom ? _this2.canvas.height - normalizeUnit(image.height) - normalizeUnit(image.height) : 0, widthFlag ? image.width : normalizeUnit(image.width), heightFlag ? image.height : normalizeUnit(image.height));

                    resolve();
                  };
                }));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function dealImage() {
        return _dealImage.apply(this, arguments);
      };
    }()
    /**
     * @desc deal with text
     *
     * @param {Object} item={}
     * @memberof Canvas
     */

  }, {
    key: "dealText",
    value: function dealText() {
      var _this3 = this;

      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!(item instanceof Object)) console.error('传入的图片不是 object');
      var normalizeUnit = this.normalizeUnit.bind(this);
      return new Promise(function (resolve) {
        item.color ? _this3.ctx.fillStyle = item.color : void 0;
        _this3.ctx.font = normalizeUnit(item.fontSize || item['font-size']) + 'px ' + (item.fontFamily || item['font-family']);
        item.left && item.right || item.width ? _this3.ctx.fillText(item.text, item.left ? normalizeUnit(item.left) : item.right ? _this3.canvas.width - normalizeUnit(item.right) : 0, item.top ? normalizeUnit(item.top) : item.bottom ? _this3.canvas.height - normalizeUnit(item.bottom) : 0, item.width ? normalizeUnit(item.width) : _this3.canvas.width - normalizeUnit(item.left) - normalizeUnit(item.right)) : _this3.ctx.fillText(item.text, item.left ? normalizeUnit(item.left) : item.right ? _this3.canvas.width - normalizeUnit(item.right) : 0, item.top ? normalizeUnit(item.top) : item.bottom ? _this3.canvas.height - normalizeUnit(item.bottom) : 0);
        resolve();
      });
    }
    /**
     * @desc images sort
     *
     * @param {Array} images
     * @memberof Canvas
     */

  }, {
    key: "elementsSort",
    value: function elementsSort(elements) {
      elements.sort(function (left, right) {
        return (left['z-index'] || left['zIndex'] || 0) - (right['z-index'] || right['zIndex'] || 0);
      });
    }
  }, {
    key: "toDataURL",
    value: function toDataURL() {
      return this.canvas.toDataURL();
    }
  }]);

  return Canvas;
}();

export default Canvas;
