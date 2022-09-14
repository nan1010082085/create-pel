import Resolve from '@rollup/plugin-node-resolve';
import Commonjs from '@rollup/plugin-commonjs';
import Json from '@rollup/plugin-json'
import RollupPluginCopy from 'rollup-plugin-copy';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'widget',
      exports: 'named'
    }
  ],
  plugins: [
    Resolve({
      extensions: ['.ts', '.tsx', '.jsx', '.js'],
      preferBuiltins: false
    }),
    Json(),
    Commonjs(),
    RollupPluginCopy({
      targets: [{ src: 'packages', dest: 'lib' }]
    })
  ]
};
