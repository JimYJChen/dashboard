# webpack5-react-template

基于 webpack 5 实现的 React App 模板。

## 和 webpack 4 的对比

### Node polyfill

**v4.x**

webpack 4 内部自带 Node 原生模块的 polyfill, 意味着在 web 环境，也可以直接使用 Node 模块，不需要额外的配置。

```typescript
import Buffer from 'buffer'
import { createHash } from 'crypto'

Buffer.from('666').toString('base64') // NjY2
createHash('sha256').update('666').digest('base64') // x+YWgi82b7G14HVq9JjMEdLAhi7csyymWIL2Iv853hs=
```

**v5.x**

上面的代码到了 webpack 5 会直接报错。

使用 buffer 模块报错

```bash
Module not found: Error: Can't resolve 'buffer' in '/Users/.../webpack5-react-template/src'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
 - add a fallback 'resolve.fallback: { "buffer": require.resolve("buffer/") }'
 - install 'buffer'
If you don't want to include a polyfill, you can use an empty module like this:
 resolve.fallback: { "buffer": false }
```

使用 crypto 模块报错

```bash
Module not found: Error: Can't resolve 'crypto' in '/Users/mingyuanyun/CesarLai/Repos/public/webpack5-react-template/src'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
 - add a fallback 'resolve.fallback: { "crypto": require.resolve("crypto-browserify") }'
 - install 'crypto-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
 resolve.fallback: { "crypto": false }
```

原因是 webpack 5 不再提供内部的 Node 原生模块 polyfill，在 web 端无法直接使用 Node 原生模块，因此如果需要使用 Node 原生模块，需要根据 webpack 错误提示，在 webpack 配置中设置解析规则。

同时可以通过 node 字段，配置 Node 环境全局变量的 polyfill, 该功能由 [NodeStuffPlugin](https://github.com/webpack/webpack/blob/main/lib/NodeStuffPlugin.js) 插件提供。

```javascript
/**
 * webpack.config.js
 */

module.exports = {
  mode: 'development',
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/')
    }
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true
  }
}
```

### Node process polyfill

**v4.x**

在 webpack 4 中，可以使用 Node 的 `process` 变量。

```javascript
process.env.NODE_ENV // development
```

**v5.x**

在 webpack 5 中，移除了对 process 变量的 polyfill ，直接使用 process 变量会抛出错误

```javascript
process.env.NODE_ENV // throw Error
```

```bash
App.tsxx:5 Uncaught ReferenceError: process is not defined
    at App (App.tsxx:5:5)
    at renderWithHooks (react-dom.development.jss:14985:1)
    at mountIndeterminateComponent (react-dom.development.jss:17811:1)
    at beginWork (react-dom.development.jss:19049:1)
    at HTMLUnknownElement.callCallback (react-dom.development.jss:3945:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.jss:3994:1)
    at invokeGuardedCallback (react-dom.development.jss:4056:1)
    at beginWork$1 (react-dom.development.jss:23964:1)
    at performUnitOfWork (react-dom.development.jss:22776:1)
    at workLoopSync (react-dom.development.jss:22707:1)
```

为了对 webpack 5 进行兼容，可以在 webpack 通过 `ProvidePlugin` 导入 `process/browser` 模块

```bash
npm install -D process
```

```javascript
/**
 * webpack.config.js
 */

const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ]
}
```

如果需要定义环境变量，可以使用 `DefinePlugin` 或 `EnvironmentPlugin`。

如果需要读取 `.env` 文件中定义的环境变量，可以使用 `dotenv-webpack`

```bash
npm i -D dotenv-webpack
```

```javascript
/**
 * webpack.config.js
 */

const Dotenv = require('dotenv-webpack')

module.exports = {
  plugins: [
    new Dotenv({
      path: path.resolve(CONTEXT_PATH, '.env'),
      // webpack 5 should skip stub
      ignoreStub: true
    })
  ]
}
```

### webpack.NamedModulesPlugin

**v4.x**

NamedModulesPlugin 是 webpack 4 内置的插件，一般用于开发环境，显示模块的相对路径。

```javascript
/**
 * webpack.config.js
 */

module.exports = {
  plugins: [new webpack.NamedModulesPlugin()]
}
```

**v5.x**

webpack 5 废弃了 NamedModulesPlugin, 并将模块命名的功能放入了 optimization 字段的配置项中。

```javascript
/**
 * webpack.config.js
 */

module.exports = {
  optimization: {
    moduleIds: 'named'
  }
}
```

## 相关插件的变化

### webpack-merge

**v4.x**

```javascript
/**
 * webpack.config.js
 */

const merge = require('webpack-merge')
module.exports = merge(baseConfig, {
  ...
})
```

**v5.x**

```javascript
/**
 * webpack.config.js
 */

const { merge } = require('webpack-merge')
// 或 const { default: merge } = require('webpack-merge')
module.exports = merge(baseConfig, {
  ...
})
```

### webpack-dev-server

**v3.x**

```javascript
/**
 * webpack.config.js
 */

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(CONTEXT_PATH, 'build'),
    compress: true,
    hotOnly: true,
    port: 3030,
    open: true,
    inline: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/index.html' }]
    }
  }
}
```

**v4.x**

v4.x 版本的 devServer 废弃了一些配置项。

```javascript
/**
 * webpack.config.js
 */

module.exports = {
  mode: 'development',
  devServer: {
    // deprecate
    // contentBase: path.resolve(CONTEXT_PATH, 'build'),
    compress: true,
    // deprecate
    // hotOnly: true,
    port: 3000,
    open: true,
    // deprecate
    // inline: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/index.html' }]
    }
  }
}
```

### copy-webpack-plugin

**v5.x**

```javascript
/**
 * webpack.config.js
 */

module.exports = {
  plugins: [new CopyWebpackPlugin([{ from: 'public/favicon.ico', to: './' }])]
}
```

**v10.x**

v10.x 版本的插件参数格式发生了变更。

```javascript
/**
 * webpack.config.js
 */

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/favicon.ico', to: './' }]
    })
  ]
}
```

### optimize-css-assets-webpack-plugin

该插件在 webpack 构建阶段会将 CSS 资源进行压缩，适用于 webpack 5 之前的 webpack 版本。

```javascript
/**
 * webpack.config.js
 */

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
}
```

对于 webpack 5，该插件作者推荐使用 `css-minimizer-webpack-plugin` 替代当前插件。
详见 [issue](https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/134)。

```javascript
/**
 * webpack.config.js
 */

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
}
```
