export default {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    library: 'ReactSubX',
    libraryTarget: 'umd',
    globalObject: 'this' // fix window undefined issue in node
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    subx: {
      commonjs: 'subx',
      commonjs2: 'subx',
      amd: 'subx',
      root: 'SubX'
    }
  }
}
