export default class Canvas {

  constructor(opts) {
    // dpi
    this.radio = null;

    // configuration
    this.opts = null;

    // context
    this.ctx = null;

    this.canvas = null;

    this.defaultOptions = {
      background: '#fff'
    };
    this.opts = { ...this.defaultOptions, ...opts };
    this.radio = window.devicePixelRatio;
  }

  /**
   * @desc transform actual pixels to canvas unit
   *
   * @param {string} pixels actual pixels
   * @return unit in canvas
   * @memberof Canvas
   */
  normalizeUnit(pixels) {
    pixels = String(pixels);
    if (pixels.indexOf('px') > -1) pixels = pixels.replace('px', '');
    return pixels * this.radio;
  }

  async init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    const opts = this.opts;
    const body = document.body || document.documentElement;

    {
      // init canvas
      this.canvas.width = this.normalizeUnit(opts.width);
      this.canvas.height = this.normalizeUnit(opts.height);
      this.canvas.style.width = opts.width.indexOf('px') > -1 ? opts.width : opts.width + 'px';
      this.canvas.style.height = opts.height.indexOf('px') > -1 ? opts.height : opts.height + 'px';
      this.canvas.style.zIndex = opts.zIndex || opts['z-index'] || 1;
    }

    {
      // wrapper
      opts.container ? document.querySelector(opts.container).appendChild(this.canvas) : body.appendChild(this.canvas);
    }

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
    }

    // insert elements
    this.elementsSort(opts.elements);
    return new Promise(async resolve => {
      opts.elements = opts.elements || [];
      for (let i = 0; i < opts.elements.length; i++) {
        await this.dealElement(opts.elements[i]);
      }
      resolve();
    });
  }

  /**
   * @desc midware to detail type
   *
   * @param {Object} element
   * @returns {Function}
   * @memberof Canvas
   */
  dealElement(element) {
    if (element.type === 'image') return this.dealImage(element);
    else return this.dealText(element);
  }

  /**
   * @desc deal with image
   *
   * @param {*} image={}
   * @returns
   * @memberof Canvas
   */
  async dealImage(image = {}) {
    if (!(image instanceof Object)) console.error('传入的图片不是 object');
    const img = document.createElement('img');
    const normalizeUnit = this.normalizeUnit.bind(this);

    // was already normalized
    let widthFlag = false;
    let heightFlag = false;

    img.src = image.src;
    {
      // left && right but not widht
      if (image.width === undefined && image.left !== undefined && image.right !== undefined) {
        widthFlag = true;
        image.width = this.canvas.width - normalizeUnit(image.left) - normalizeUnit(image.right);
      }
      // top && bottom but not height
      if (image.height === undefined && image.top !== undefined && image.bottom !== undefined) {
        heightFlag = true;
        image.height = this.canvas.height - normalizeUnit(image.top) - normalizeUnit(image.bottom);
      }
    }

    return new Promise(resolve => {
      img.onload = () => {
        this.ctx.drawImage(
          img,
          image.left
            ? normalizeUnit(image.left)
            : image.right
              ? this.canvas.width - normalizeUnit(image.width) - normalizeUnit(image.right)
              : 0,
          image.top
            ? normalizeUnit(image.top)
            : image.bottom
              ? this.canvas.height - normalizeUnit(image.height) - normalizeUnit(image.height)
              : 0,
          widthFlag ? image.width : normalizeUnit(image.width),
          heightFlag ? image.height : normalizeUnit(image.height)
        );
        resolve();
      };
    });
  }

  /**
   * @desc deal with text
   *
   * @param {Object} item={}
   * @memberof Canvas
   */
  dealText(item = {}) {
    if (!(item instanceof Object)) console.error('传入的图片不是 object');

    const normalizeUnit = this.normalizeUnit.bind(this);

    return new Promise(resolve => {
      item.color ? (this.ctx.fillStyle = item.color) : void 0;
      this.ctx.font =
        normalizeUnit(item.fontSize || item['font-size']) + 'px ' + (item.fontFamily || item['font-family']);
      (item.left && item.right) || item.width
        ? this.ctx.fillText(
            item.text,
            item.left ? normalizeUnit(item.left) : item.right ? this.canvas.width - normalizeUnit(item.right) : 0,
            item.top ? normalizeUnit(item.top) : item.bottom ? this.canvas.height - normalizeUnit(item.bottom) : 0,
            item.width
              ? normalizeUnit(item.width)
              : this.canvas.width - normalizeUnit(item.left) - normalizeUnit(item.right)
          )
        : this.ctx.fillText(
            item.text,
            item.left ? normalizeUnit(item.left) : item.right ? this.canvas.width - normalizeUnit(item.right) : 0,
            item.top ? normalizeUnit(item.top) : item.bottom ? this.canvas.height - normalizeUnit(item.bottom) : 0
          );
      resolve();
    });
  }

  /**
   * @desc images sort
   *
   * @param {Array} images
   * @memberof Canvas
   */
  elementsSort(elements) {
    elements.sort((left, right) => {
      return (left['z-index'] || left['zIndex'] || 0) - (right['z-index'] || right['zIndex'] || 0);
    });
  }

  toDataURL() {
    return this.canvas.toDataURL();
  }
}
