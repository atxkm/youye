// default settings. fis3 release
fis.match('/src/(**)', {
  release: '/$1'
});

fis.set('project.ignore', [
  'output/**',
  'dist/**',
  'node_modules/**',
  '.git/**',
  'package.json',
  'package-lock.json',
  '.gitignore',
  'dev.bat',
  'fis-conf.js',
  'README.md',
]);

fis.hook('relative');

// Global start
fis.match('*.scss', {
  parser: fis.plugin('node-sass'),
  rExt: '.css'
});

fis.match('*.ts', {
  parser: fis.plugin('typescript'),
  rExt: '.js'
});

fis.match('*.{js,css,ts,scss}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

// default media is `dev`
fis.media('prod')
  .match('**.{js, ts}', {
    optimizer: fis.plugin('uglify-js')
  })
  // .match('**.{css, scss}', {
  //   optimizer: fis.plugin('clean-css')
  // })
  .match('*.png', {
    optimizer: fis.plugin('png-compressor')
  }).match('**', {
    relative: true
  });

// extends GLOBAL config
// fis.media('production');