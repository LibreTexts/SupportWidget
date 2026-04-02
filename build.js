const esbuild = require('esbuild');
const fs = require('fs');

const isProd = process.argv.includes('--prod');

// Inlines CSS as a JS snippet that appends a <style> tag to <head>.
// Replaces style-loader with zero runtime overhead.
const cssInjectPlugin = {
  name: 'css-inject',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, (args) => {
      const css = fs.readFileSync(args.path, 'utf8');
      return {
        contents: `
const __style = document.createElement('style');
__style.textContent = ${JSON.stringify(css)};
document.head.appendChild(__style);
`,
        loader: 'js',
      };
    });
  },
};

const options = {
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: isProd,
  sourcemap: !isProd,
  format: 'iife',
  outfile: isProd
    ? 'dist/libretexts-support-widget.min.js'
    : 'dist/libretexts-support-widget.dev.js',
  target: ['es2018'],
  plugins: [cssInjectPlugin],
  logLevel: 'info',
};

async function main() {
  if (process.argv.includes('--watch')) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await esbuild.build(options).catch(() => process.exit(1));
  }
}

main();
