const esbuild = require('esbuild');
const { sassPlugin } = require('esbuild-sass-plugin');
const dotenv = require('dotenv');

dotenv.config();

// Debug: Log what environment variables are loaded
console.log('Environment variables loaded:');
console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? 'SET' : 'NOT SET');
console.log('SEARCH_ENGINE_ID:', process.env.SEARCH_ENGINE_ID ? 'SET' : 'NOT SET');

const envDefine = {};
['GOOGLE_API_KEY', 'SEARCH_ENGINE_ID'].forEach((key) => {
  if (process.env[key] !== undefined) {
    envDefine[`process.env.${key}`] = JSON.stringify(process.env[key]);
  } else {
    console.log(`WARNING: ${key} not found in environment`);
  }
});

// For ES modules, we need to handle process.env differently
if (Object.keys(envDefine).length > 0) {
  // Remove the process.env prefix replacements and handle them individually
  const newEnvDefine = {};
  Object.entries(envDefine).forEach(([key, value]) => {
    // Replace process.env.GOOGLE_API_KEY with the actual value
    newEnvDefine[key] = value;
  });
  Object.assign(envDefine, newEnvDefine);
}

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
  plugins: [sassPlugin()],
  external: ['react', 'react-dom'],
  // Force CSS to be extracted to a separate file
  write: true,
  outExtension: { '.css': '.css' },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    ...envDefine
  }
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