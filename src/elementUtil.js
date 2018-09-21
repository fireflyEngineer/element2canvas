import {
  autoTransformCamel
} from './utils.js'

export default class ElementUtil {

  constructor(opts) {
    // single case
    if (this.instance) return this.instance

    // the browser's dpi.
    this.radio = opts.radio

    // cross origin resourse share
    this.crossOrigin = opts.crossOrigin

    // ctx
    this.ctx = opts.ctx

    // canvas
    this.canvas = opts.canvas

    this.zIndexMax = 0
  }

  /**
   * @desc transform actual pixels to canvas unit
   *
   * @param {string} pixels actual pixels
   * @return unit in canvas
   * @memberof Canvas
   */
  normalizeUnit(pixels) {
    pixels = String(pixels)
    if (pixels.indexOf('px') > -1) pixels = pixels.replace('px', '')
    return pixels * this.radio
  }

  /**
   * @desc the major is sorting the elements by zIndex
   *
   * @param {Array} elements
   * @memberof Canvas
   */
  sortByCSSProperty(elements, type) {
    elements.sort((left, right) => {
      this.zIndexMax = left[type || autoTransformCamel(type)] > this.zIndexMax ? left[type || autoTransformCamel(type)] : this.zIndexMax
      return (left[type] || left[autoTransformCamel(type) || 0] - (right[type] || right[autoTransformCamel(type)] || 0))
    })
  }

  /**
   * @desc deal with text
   * @param {Object} item={}
   * @memberof Canvas
   * @return {Promise}
   */
  drawText(element = {}) {
    if (!(element instanceof Object)) throw('the configuration of the text if not an object')
    const normalizeUnit = this.normalizeUnit.bind(this)

    const left = element.left ? normalizeUnit(element.left) : element.right ? this.canvas.width - normalizeUnit(element.right) : 0
    const top = (element.top ? normalizeUnit(element.top) : element.bottom ? this.canvas.height - normalizeUnit(element.bottom) : 0) + normalizeUnit(element.fontSize || element['font-size'])

    return new Promise(resolve => {
      element.color ? (this.ctx.fillStyle = element.color) : void 0
      this.ctx.font =
        normalizeUnit(element.fontSize || element['font-size']) + 'px ' + (element.fontFamily || element['font-family']);
      (element.left && element.right) || element.width ?
        this.ctx.fillText(
          element.text,
          left,
          top,
          element.width ?
            normalizeUnit(element.width) :
            this.canvas.width - normalizeUnit(element.left) - normalizeUnit(element.right)
        ) :
        this.ctx.fillText(
          element.text,
          left,
          top
        )
      resolve()
    })
  }

  /**
   * @desc deal with image
   *
   * @param {*} image={}
   * @return {Promise}
   * @memberof Canvas
   */
  async drawImage(image = {}) {
    if (!(image instanceof Object)) throw('传入的图片不是 object')
    const img = document.createElement('img')
    const normalizeUnit = this.normalizeUnit.bind(this)

    // was already normalized
    let widthFlag = false
    let heightFlag = false

    // image cross-origin
    img.crossOrigin = this.crossOrigin

    img.src = image.src; {
      // left && right but not widht
      if (image.width === undefined && image.left !== undefined && image.right !== undefined) {
        widthFlag = true
        image.width = this.canvas.width - normalizeUnit(image.left) - normalizeUnit(image.right)
      }
      // top && bottom but not height
      if (image.height === undefined && image.top !== undefined && image.bottom !== undefined) {
        heightFlag = true
        image.height = this.canvas.height - normalizeUnit(image.top) - normalizeUnit(image.bottom)
      }
    }

    return new Promise(resolve => {
      img.onload = () => {
        this.ctx.drawImage(
          img,
          image.left ?
            normalizeUnit(image.left) :
            image.right ?
              this.canvas.width - normalizeUnit(image.width) - normalizeUnit(image.right) :
              0,
          image.top ?
            normalizeUnit(image.top) :
            image.bottom ?
              this.canvas.height - normalizeUnit(image.height) - normalizeUnit(image.height) :
              0,
          widthFlag ? image.width : normalizeUnit(image.width),
          heightFlag ? image.height : normalizeUnit(image.height)
        )
        resolve()
      }
    })
  }

  /**
   * @desc midware to detail type
   *
   * @param {Object} element
   * @returns {Function}
   * @memberof Canvas
   */
  drawElement(element) {
    if (element.src) return this.drawImage(element)
    else return this.drawText(element)
  }
}
