const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const glob = require('glob');
const config = require('../../config').img;

/**
 * コマンドライン上のカラー設定
 */
const color_black   = '\u001b[30m';
const color_red     = '\u001b[31m';
const color_green   = '\u001b[32m';
const color_yellow  = '\u001b[33m';
const color_blue    = '\u001b[34m';
const color_magenta = '\u001b[35m';
const color_cyan    = '\u001b[36m';
const color_white   = '\u001b[37m';
const color_reset   = '\u001b[0m';

// JPEG
for (let i = 0, len = config.path.length; i < len; i++) {
  const jpg = new glob.Glob(`${config.path[i]}/**/*.jpg`, (err, payload) => {
    let dir;
    for (let j = 0, len = payload.length; j < len; j++) {
      dir = payload[j].replace(/^(.+)\/.*?\.jpg$/, '$1');
      imagemin([payload[j]], dir, {
        use: [mozjpeg({ quality: 98 })]
      })
      .then(() => {
        console.log(`${color_yellow}mozjpeg${color_reset} : ${color_cyan}${payload[j]}${color_reset} - ${color_green}compressed!${color_reset}`);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  });

  // PNG
  const png = new glob.Glob(`${config.path[i]}/**/*.png`, (err, payload) => {
    let dir;
    for (let j = 0, len = payload.length; j < len; j++) {
      dir = payload[j].replace(/^(.+)\/.*?\.png$/, '$1');
      imagemin([payload[j]], dir, {
        use: [pngquant({ quality: '80-90' })]
      })
      .then(() => {
        console.log(`${color_yellow}pngquant${color_reset} : ${color_cyan}${payload[j]}${color_reset} - ${color_green} compressed!${color_reset}`);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  });
}
