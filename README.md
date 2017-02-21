# React开发环境搭建[WebPack入门介绍]
本教程介绍React开发和模块管理的主流工具Webpack

[TOC]

## 准备工作，安装npm
参考链接：[安装Node.js和npm](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143450141843488beddae2a1044cab5acb5125baf0882000)

>npm是Node.js的包管理工具（package manager）。

我们在web开发时，会用到很多别人写的JavaScript代码。如果我们要使用别人写的某个包，每次都根据名称搜索一下官方网站，下载代码，解压，再使用，非常繁琐。于是一个集中管理的工具应运而生：大家都把自己开发的模块打包后放到npm官网上，如果要使用，直接通过npm安装就可以直接用，不用管代码存在哪，应该从哪下载。
更重要的是，如果我们要使用模块A，而模块A又依赖于模块B，模块B又依赖于模块X和模块Y，npm可以根据依赖关系，把所有依赖的包都下载下来并管理起来。否则，靠我们自己手动管理，肯定既麻烦又容易出错。

讲了这么多，npm究竟在哪？

>npm包含在Node.js中，我们先安装Node.js.

### 安装Node.js

目前Node.js的最新版本是v7.5.0。首先，从[Node.js官网](Node.js官网 "https://nodejs.org/")下载对应平台的安装程序
在Windows上安装时务必选择全部组件，包括勾选`Add to Path`。安装完成后，在Windows环境下，请打开命令提示符，然后输入`node -v`，如果安装正常，你应该看到v7.5.0这样的输出：

>C:\Users\IEUser>node -v
>v7.5.0

继续在命令提示符输入`node`，此刻你将进入Node.js的交互环境。在交互环境下，你可以输入任意JavaScript语句，例如`100+200`，回车后将得到输出结果。

要退出Node.js环境，连按两次Ctrl+C。

### npm

npm已经在Node.js安装的时候顺带装好了。我们在命令提示符或者终端输入`npm -v`，应该看到类似的输出：

>C:\>npm -v
>4.1.2

如果直接输入`npm`，你会看到类似下面的输出：

>C:\> npm
>Usage: npm <command>
>where <command> is one of:  
>  ...

上面的一大堆文字告诉你，`npm`需要跟上命令。现在我们不用关心这些命令，后面会一一讲到。目前，你只需要确保npm正确安装了，能运行就行。

## 使用Webpack打包web代码

### 为什要使用WebPack

现今的很多网页其实可以看做是功能丰富的应用，它们拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法

*   **模块化**，让我们可以把复杂的程序细化为小的文件;
*   类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能能装换为JavaScript文件使浏览器可以识别；
*   Scss，less等CSS预处理器
*   ...

这些改进确实大大的提高了我们的开发效率，但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别,而手动处理又是非常繁琐的，这就为WebPack类的工具的出现提供了需求。

### 什么是Webpack

WebPack可以看做是**模块打包机**：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

### 安装WebPack
新建一个项目文件夹`first-react-project`,`cd`到当前文件夹

#### 1. 先创建package.json文件
package.json文件，这是一个标准的npm说明文件，里面蕴含了丰富的信息，包括当前项目的依赖模块，自定义的脚本任务等等。

在文件夹中创建一个在终端中使用`npm init`命令可以自动创建这个package.json文件
  >  npm init

输入这个命令后，终端会问你一系列诸如项目名称，项目描述，作者等信息，不过不用担心，如果你不准备在npm中发布你的模块，这些问题的答案都不重要，回车默认即可,该文件夹下会自动生成package.json文件。

#### 2. install webpack
package.json文件已经就绪，我们在本项目中安装Webpack作为依赖包,
执行命令安装Webpack
> npm install --save-dev webpack

#### 3. 创建配置文件webpack.config.js文件
在根目录下新建一个名为webpack.config.js的文件，并在其中进行最最简单的配置，如下所示，它包含入口文件路径和存放打包后文件的地方的路径。

```javascript
module.exports = {
  entry: {
    index:"./src/index.js"//入口文件
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: 'bundle_[name].js'//打包后输出文件的文件名
  },
}
```

#### 4. 新建相关文件
在当前目录创建两个文件夹,src文件夹和public文件夹，src文件夹用来存放原始数据和我们将写的JavaScript模块，public文件夹用来存放准备给浏览器读取的数据（包括使用webpack生成的打包后的js文件以及一个index.html文件）。在这里还需要创建三个文件，index.html 文件放在public文件夹中，两个js文件（index.js和main.js）放在src文件夹中，此时项目结构如下图所示：

```
- first-react-project
  + node_modules/
  - public/
     index.html
  - src/
     App.js
     index.js
  package.json
  webpack.config.js
```

**index.html**文件只有最基础的html代码，它唯一的目的就是加载打包后的js文件(bundle_index.js)
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle_index.js"></script>
  </body>
</html>

```
**App.js**只包括一个用来返回包含问候信息的html元素的函数。

```javascript
// app.js
module.exports = function() {
  var app = document.createElement('div');
  app.textContent = "Welcome to React!";
  return app;
};
```

**index.js** 用来把App模块返回的节点插入页面。

```javascript
//app.js 
var app = require('./App.js');
document.getElementById('root').appendChild(app());
```

**package.json** 添加start命令，相当于把npm的start命令指向webpack命令

```
{
  "name": "first-react-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack"//配置的地方就是这里啦
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^2.2.1"
  }
}

```

#### 5. 打包文件

现在只需要使用`npm start`就可以打包文件了
>npm start

执行成功后会在`/public`文件夹下生成一个`bundle_index.js`文件。
然后打开`index.html`就可以看到页面了

有没有觉得webpack也不过如此，不过不要太小瞧Webpack，其强大的功能包含在其一系列可供配置的选项中，我们一项项来看。


## 使用webpack打包React代码
Webpack拥有很多其它的比较高级的功能（比如说本文后面会介绍的loaders和plugins），这些功能其实都可以通过命令行模式实现，但是正如已经提到的配置文件`webpack.config.js`其实也是一个简单的JavaScript模块，可以把所有的与构建相关的信息放在里面。

### Loaders
**鼎鼎大名的Loaders登场了！**
Loaders是webpack中最让人激动人心的功能之一了。通过使用不同的loader，webpack通过调用外部的脚本或工具可以对各种各样的格式的文件进行处理，比如说分析JSON文件并把它转换为JavaScript文件，或者说把下一代的JS文件（ES6，ES7)转换为现代浏览器可以识别的JS文件。或者说对React的开发而言，合适的Loaders可以把React的JSX文件转换为JS文件。

Loaders需要单独安装并且需要在webpack.config.js下的`modules`关键字下进行配置，Loaders的配置选项包括以下几方面：

*   **test**：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
*   **loader**：loader的名称（必须）
*   **include/exclude**:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
*   **query**：为loaders提供额外的设置选项（可选）

继续上面的例子，我们把App.js里的问候消息放在一个单独的JSON文件里,并通过合适的配置使App.js可以读取该JSON文件的值，配置方法如下

安装可以装换JSON的loader
>npm install --save-dev json-loader

**webpack.config.js**文件
```javascript
module.exports = {
  entry: {
    index:"./src/index.js"//入口文件
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: 'bundle_[name].js'//打包后输出文件的文件名
  },

  module: {//在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
}
```


创建带有问候信息的JSON文件,命名为`hello.json`

```json
{
  "greetText": "Hi there and greetings from JSON!"
}
```

更新后的App.js

```javascript
var text = require('./hello.json');

module.exports = function() {
  var app = document.createElement('div');
  app.textContent = text.content;
  return app;
};

```

然后运行`npm start`打包打开`index.html`即可看到从json文件读取的信息

Loaders很好，不过有的Loaders使用起来比较复杂，比如说Babel。

### Babel

Babel其实是一个编译JavaScript的平台，它的强大之处表现在可以通过编译帮你达到以下目的：

*   下一代的JavaScript标准（ES6，ES7），这些标准目前并未被当前的浏览器完全的支持；
*   使用基于JavaScript进行了拓展的语言，比如React的JSX

#### Babel的安装与配置

Babel其实是几个模块化的包，其核心功能位于称为`babel-core`的npm包中，不过webpack把它们整合在一起使用，但是对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的babel-preset-es2015包和解析JSX的babel-preset-react包）。

我们先来一次性安装这些依赖包
npm一次性安装多个依赖模块，模块之间用空格隔开

>npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react

在webpack中配置Babel的方法如下,在`loadler`节点下添加:
```json
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
     presets: ['es2015', 'react']
  }
}
```

现在你的webpack的配置已经允许你使用ES6以及JSX的语法了。继续用上面的例子进行测试，不过这次我们会使用React，记得先安装 `React` 和 `React-DOM`

### 安装React

>npm install --save react react-dom


使用ES6的语法，修改`App.js`并返回一个React组件,`App.css`文件稍后需要新建，先不管
```javascript
import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          Welcome to React
        </div>
    );
  }
}

export default App;
```

使用ES6的模块定义和渲染App模块,修改`/src/index.js`。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

```
### CSS
**一切皆模块**
Webpack有一个不可不说的优点，它把所有的文件都可以当做模块处理，包括你的JavaScript代码，也包括CSS和fonts以及图片等等等，只有通过合适的loaders，它们都可以被当做模块被处理。

webpack提供两个工具处理样式表，`css-loader` 和 `style-loader`，二者处理的任务不同，`css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能,`style-loader`将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。

安装
>npm install --save-dev style-loader css-loader

在webpack中配置方法如下,在`loadler`节点下添加:
```json
{
   test: /\.css$/,
   loader: 'style-loader!css-loader'//添加对样式表的处理
}
```
在`src`文件夹下添加`App.css`样式文件：
```css
.App{
    font-size: xx-large;
    text-align: center;
    background-color: #222;
    height: 150px;
    color: white;
    line-height: 150px; /*垂直居中关键*/
}

```

webpack配置文件代码如下：
```javascript
module.exports = {
  entry: {
    index:"./src/index.js"//入口文件
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: 'bundle_[name].js'//打包后输出文件的文件名
  },

  module: {//在配置文件里添加JSON loader
    loaders: [
      {test: /\.json$/,loader: "json-loader"},
      {test: /\.css$/,loader: 'style-loader!css-loader'//添加对样式表的处理},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
}
```

运行打包命令`npm start`，打开`index.html`.

## webpack本地服务器+热替换
想不想让你的浏览器监测你的代码的修改，并自动刷新修改后的结果，其实Webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖

### 搭建webpack本地服务器

>npm install --save-dev webpack-dev-server

devserver作为webpack配置选项中的一项，具有以下配置选项

| devserver配置选项 | 功能描述 |
| --- | --- |
| contentBase | 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录） |
| port | 设置默认监听端口，如果省略，默认为”8080“ |
| inline | 设置为`true`，当源文件改变时会自动刷新页面 |
| historyApiFallback | 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为`true`，所有的跳转将指向index.html |

继续把这些命令加到webpack的配置文件中，现在的webpack配置文件如下所示
```javascript
module.exports = {
  entry: {
    index:"./src/index.js"//入口文件
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: 'bundle_[name].js'//打包后输出文件的文件名
  },

  module: {..省略...},

  //服务器配置
  devServer: {
    contentBase: "./public",//设定webpack-dev-server的director根目录
    historyApiFallback: true,
    inline: true,
    open: true//启动命令，自动打开浏览器
  }
}
```
**package.json**添加webpack-dev-server命令启动服务器
```json
"scripts": {
    "start": "webpack-dev-server --progress"
 }
```

执行命令`npm start`即可启动webpack服务并打开网页访问`http://localhost:8080/`

现在还不能实现热替换的功能，需要添加插件

### Hot Module Replacement
Hot Module Replacement（HMR）也是webpack里很有用的一个插件，它允许你在修改组件代码后，自动刷新实时预览修改后的效果。
在webpack中实现HMR也很简单，只需要做两项配置

1.  在webpack配置文件中添加HMR插件；
2.  在Webpack Dev Server中添加“hot”参数；

Babel有一个叫做react-transform-hrm的插件，可以在不对React模块进行额外的配置的前提下让HMR正常工作
安装react-transform-hmr
>npm install --save-dev babel-plugin-react-transform react-transform-hmr

webpack配置：
```javascript
//webpack中的配置
var webpack = require('webpack');

module.exports = {
  entry: {
    index:"./src/index.js"//入口文件
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: 'bundle_[name].js'//打包后输出文件的文件名
  },

  module: {//在配置文件里添加JSON loader
    loaders: [
      {test: /\.json$/,loader: "json-loader"},
      {test: /\.css$/,loader: 'style-loader!css-loader'//添加对样式表的处理},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          "env": {//热替换添加的代码
            "development": {
              "plugins": [["react-transform", {
                "transforms": [{
                  "transform": "react-transform-hmr",
                  "imports": ["react"],
                  "locals": ["module"]
                }]
              }]]
            }
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],

  devServer: {
    contentBase: "./public",//设定webpack-dev-server的director根目录
    historyApiFallback: true,
    inline: true,
    open: true,//启动命令，自动打开浏览器
    hot: true//热替换
  }
}
```

现在就可以热加载模块了，执行`npm start`,修改代码就能实时刷新界面了。
**貌似只有chrome浏览器能够实时同步，其他浏览器无效。**



---



参考链接：  
[入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f "入门Webpack，看这篇就够了")  
[create-react-app:来自Facebook官方的零配置命令行工具](https://segmentfault.com/a/1190000006055973 "create-react-app:来自Facebook官方的零配置命令行工具")  
webpack进阶参考链接：  
[React开发神器Webpack](http://www.infoq.com/cn/articles/react-and-webpack/)  
[一小时包教会 —— webpack 入门指南](http://www.w2bc.com/Article/50764 "一小时包教会 —— webpack 入门指南")  
[WebPack介绍](http://www.68kejian.com/app/detail.html?id=76&&c=442&&name=WebPack%E4%BB%8B%E7%BB%8D "WebPack介绍")



