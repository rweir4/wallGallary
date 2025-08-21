const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/index.js'],
  bundle: true,
  outdir: 'dist',
  entryNames: 'bundle',
  format: 'esm',
  jsx: 'automatic',
  loader: {
    '.jsx': 'jsx',
    '.js': 'jsx',
    '.css': 'css'
  },
  external: ['react', 'react-dom'],
  // Force CSS to be extracted to a separate file
  write: true,
  outExtension: { '.css': '.css' }
};

async function build() {
  if (isWatch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log('👀 Watching for changes...');
    
    // Keep the process alive
    process.on('SIGINT', async () => {
      await ctx.dispose();
      process.exit(0);
    });
  } else {
    await esbuild.build(buildOptions);
    console.log('✅ Build complete!');
  }
}

build().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});