import { DEFAULT_EXTENSIONS } from '@babel/core'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'

export default [
  {
    input: './src/index.ts',
    output: {
      name: 'URLHandler',
      format: 'umd',
      file: 'dist/url-handler.js'
      // exports: 'named'
    },
    plugins: [
      typescript({}),
      babel({
        extensions: [...DEFAULT_EXTENSIONS, '.ts'],
        babelHelpers: 'bundled'
      }),
      terser({ compress: { drop_console: false } })
    ]
  },
  {
    input: './src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/url-handler.cjs',
      exports: 'default'
    },
    plugins: [typescript({})]
  },
  {
    input: './src/index.ts',
    output: {
      format: 'esm',
      file: 'dist/url-handler.mjs'
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: { declaration: true }
        }
      })
    ]
  }
]
