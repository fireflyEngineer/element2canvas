# element2canvas
a plugin for canvert elements like iamge, text and so on to a canvas or image, screenshot and so on.

## Install
```npm install elment2canvas --save```

## Useage
```
  import Element2canvas from 'element2canvas';
  const canvas = new Element2canvas({
    width: '300px',
    height: '300px',
    zIndex: -1,
    container: '#root',
    elements: [
      {
        src: require('xxx.png'),
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 200,
        height: 200
        type: 'image'
      },
      {
        text: 'hello world',
        fontSize: '24px',
        fontFamily: 'consolas',
        left: 0,
        top: 0,
        width: 100,
        zIndex: 4,
        color: '#fff',
        type: 'text'
      }
    ]
  })
  cavans.init().then(() => {x});
```