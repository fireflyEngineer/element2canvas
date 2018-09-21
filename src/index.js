import ElementUtil from './elementUtil'

// elementUtil instan
let utilInstance = null
export default class element2canvas {

  constructor(opts) {

    // configuration
    this.opts = null

    // context
    this.ctx = null

    this.canvas = null

    this.defaultOptions = {
      background: '#fff'
    }

    this.opts = { 
      ...this.defaultOptions,
      ...opts
    }
  }

  /**
  * @return {Promise}
  */
  async init() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    const opts = this.opts
    const body = document.body || document.documentElement

    {
      // init elementUtil
      utilInstance = new ElementUtil({
        radio: window.devicePixelRatio,
        crossOrigin: this.opts.crossOrigin,
        ctx: this.ctx,
        canvas: this.canvas
      })
    }

    {
      // init canvas
      this.canvas.width = utilInstance.normalizeUnit(opts.width)
      this.canvas.height = utilInstance.normalizeUnit(opts.height)
      this.canvas.style.width = opts.width.indexOf('px') > -1 ? opts.width : opts.width + 'px'
      this.canvas.style.height = opts.height.indexOf('px') > -1 ? opts.height : opts.height + 'px'
      this.canvas.style.zIndex = opts.zIndex || opts['z-index'] || 1
    }

    {
      // wrapper
      opts.container ? document.querySelector(opts.container).appendChild(this.canvas) : body.appendChild(this.canvas)
    }

    // background
    if (opts.background.indexOf('/') > -1 || opts.background.indexOf('.') > -1) {
      // background image
      utilInstance.drawImage({
        src: opts.background,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      })
    } else {
      // background color
      this.ctx.fillStyle = opts.background
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // insert elements
    utilInstance.sortByCSSProperty(opts.elements)
    return new Promise(async resolve => {
      opts.elements = opts.elements || []
      for (let i = 0; i < opts.elements.length; i++) {
        await utilInstance.drawElement(opts.elements[i])
      }
      resolve(this.canvas)
    })
  }

  /** 
   * @return img base64
   */
  toDataURL(type, encoderOptions) {
    return this.canvas.toDataURL(type, encoderOptions)
  }

  
  /**
   *
   * @desc add a element
   * @param {Object} [element={}]
   * @memberof element2canvas
   * @return {Promise}
   */
  add(element = {}) {
    element.zIndex = ++utilInstance.zIndexMax
    return utilInstance.drawElement(element)
  }
}
