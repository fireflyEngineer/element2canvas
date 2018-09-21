# element2canvas
##### [英文版 English](https://github.com/fireflyEngineer/element2canvas)
一个把图片，文本等转成 canvas 合成图片实现截屏的工呢个，这是插件不需要计算DOM属性，也不会出现偏差，所以还原度高达99%+

---------------------

## 安装
```npm install elment2canvas --save```
or
```<script src="path/to/index.min.js"></script>```

---------------------

## 用法
[详细的demo](https://github.com/fireflyEngineer/element2canvas/tree/master/example/demo)
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
### 配置属性

| 属性 | 说明 | 类型 | 默认值
| :-: | :-: | :-: | :-: |
| width | canvas 的宽度 | number | 0 |
| height | canvas 的高度 | number | 0 |
| zIndex | 和 css z-index 属性类似 | number | 0 |
| container | canvas 插入的DOM位置 | string / DOM | body|
| background | 背景颜色或图片 | string | transparent |
| crossOrigin | 图片跨域 | sring(anonymous) | none |
| elements | 子元素配置 | array | none |

---------------------
### element properties

| 属性 | 说明 | 类型 | 默认值
| :-: | :-: | :-: | :-: |
| width | element 的宽度 | number | 0 |
| height | element 的高度 | number | 0 |
| zIndex | 和 css z-index 属性类似 | number | 0 |
| top |  和 css top 属性类似 | number | 0 |
| bottom |  和 css bottom 属性类似 | number | 0 |
| left |  和 css left 属性类似 | number | 0 |
| right |  和 css right 属性类似 | number | 0 |
| src | 图片的 src | string | none |
| text | 文本内容 | string | none |
| fontSize | 字体大小 | number | 12 |
| fontFamily | 字体 | string | none |
| color | 字体颜色 | string | none |

---------------

### 实例的方法
| 方法 | 说明 | 返回 | 参数 |
| :-: | :-: | :-: | :-: |
| init | 初始化配置信息 | Promise |
| toDataURL | 转化 canvas 为base64编码的图片 | image of base64 | type(image/jpeg, ...), quality |
| add | 增加一个元素 | Promise | element |