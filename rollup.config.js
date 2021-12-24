import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import svgr from '@svgr/rollup';

const config = {
  input: './src/lib/index.js',
  output: {
    file: './dist/index.min.js',
    format: 'cjs',
    exports: 'auto',
  },
  external: ['react'],
  plugins: [
    babel({
      plugins: ['@babel/plugin-transform-runtime'],
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
      babelHelpers: 'runtime',
    }),
    postcss(),
    image(),
    svgr({
      svgoConfig: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
        ],
      },
    }),
  ],
};

export default config;
