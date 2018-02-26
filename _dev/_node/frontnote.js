const FrontNote = require('frontnote');
const config = require('../../config.js').styleguide;

const note = new FrontNote({
  template: __dirname + '/frontnote_template/index.ejs',
  includeAssetPath: __dirname + '/frontnote_template/assets/**/*',
  out: config.output,
  title: config.title,
  css: config.css,
  script: config.js,
  overview: config.overview
});

note.render(config.entry).subscribe(() => {});
