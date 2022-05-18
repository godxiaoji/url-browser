import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: './src/index.ts',
    output: {
      name: 'URLHandler',
      format: 'umd',
      file: 'dist/url-handler.js'
      // exports: 'named'
    },
    plugins: [typescript({}), terser({ compress: { drop_console: false } })]
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
