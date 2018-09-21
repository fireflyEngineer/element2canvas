const canvas = new window.element2canvas({
  width: '300px',
  height: '300px',
  zIndex: -1,
  container: '#container',
  background: '#666',
  crossOrigin: 'anonymous',
  elements: [
    {
      src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=415293130,2419074865&fm=27&gp=0.jpg',
      top: 10,
      left: 10,
      right: 10,
      bottom: 100
    },
    {
      text: 'hello world',
      fontSize: 12,
      fontFamily: 'consolas',
      left: 20,
      top: 40,
      width: 100,
      zIndex: 4,
      color: '#666'
    }
  ]
})

canvas.init().then(() => {
  return canvas.add({
    src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3258641584,555286175&fm=27&gp=0.jpg',
    top: 100,
    left: 100,
    width: 100,
    height: 100
  })
}).then(() => {
  var img = document.createElement('img')
  img.style.width = '340px'
  img.src = canvas.toDataURL('image/jpeg', 0.8)
  img.onload = () => {
    document.querySelector('body').appendChild(img)
  }
})