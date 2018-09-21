# element2canvas
##### [中文版 Chinese](https://github.com/fireflyEngineer/element2canvas/blob/develop/README.cn.md)
a plugin for canvert elements like iamge, text and so on to a canvas or image, screenshot and so on. It's a little plugin by js and never need to compute DOM properties, so it could have nealy 99% degree of reduction. From the interface It's very convenience.

---------------------

## Install
```npm install elment2canvas --save```
or
```<script src="path/to/index.min.js"></script>```

---------------------

## Usage
[detail in example](https://github.com/fireflyEngineer/element2canvas/tree/master/example/demo)
```
  var canvas = new element2canvas(opts)
  canvas.init().then(() => {
    return canvas.add(opts)
  }).then(() => {
    var img = document.createEelement('img')
    img.src = canvas.toDataURL('image/jpeg', 0.8)
    img.onload = () => {
      (document.body || document.documentElement).appendChild(img)
    }
  }) 
```
--------
### configuration properties options

| properties | instruction | type | default
| :-: | :-: | :-: | :-: |
| width | canvas's width | number | 0 |
| height | canvas's height | number | 0 |
| zIndex | like css z-index property | number | 0 |
| container | canvas Element be appended in | string / DOM | body|
| background | background color or image | string | transparent |
| crossOrigin | image security state | sring(anonymous) | none |
| elements | element in canvas | array | none |

---------------------
### element properties

| properties | instruction | type | default
| :-: | :-: | :-: | :-: |
| width | element's width | number | 0 |
| height | element's height | number | 0 |
| zIndex | like css z-index property | number | 0 |
| top | postion like css property | number | 0 |
| bottom | postion like css property | number | 0 |
| left | postion like css property | number | 0 |
| right | postion like css property | number | 0 |
| src | image src | string | none |
| text | text content | string | none |
| fontSize | font-size like css property | number | 12 |
| fontFamily | font-family like css property | string | none |
| color | font color | string | none |

---------------

### instance's methods
| method | instruction | return | params |
| :-: | :-: | :-: | :-: |
| init | initialize the cavans and append to DOM | Promise |
| toDataURL | cavans to image of base64 | image of base64 | type(image/jpeg, ...), quality |
| add | add a element to canvas | Promise | element |