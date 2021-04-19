const dev = global.dev  = (process.env.ELEVENTY_ENV === 'development');
/*const Image = require("@11ty/eleventy-img");
function imageShortcode(src, cls, alt, sizes, widths) {
  let options = {
    widths: widths,
    formats: ['jpeg'],
  };

  // generate images, while this is async we don’t wait
  Image(src, options);

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  // get metadata even the images are not fully generated
  metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, imageAttributes);
}
*/


  // 11ty configuration
module.exports = config => {


  /* --- PLUGINS --- */

  /*config.addPlugin(pluginESbuild, {
    entryPoints: {
      main: 'src/scripts/index.js'
    },
    output: '_site/scripts'
  });*/

  // navigation
  config.addPlugin( require('@11ty/eleventy-navigation') );

  //config.addNunjucksShortcode("myImage", imageShortcode);
  //config.addLiquidShortcode("myImage", imageShortcode);
  //config.addJavaScriptFunction("myImage", imageShortcode);

  // inline assets
  config.addTransform('inline', require('./lib/transforms/inline'));

  /* --- SHORTCODES --- */
  // page navigation
  config.addShortcode('navlist', require('./lib/shortcodes/navlist.js'));

  //config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/fonts');
  config.addPassthroughCopy('src/scripts');

  // CSS processing
  config.addTransform('postcss', require('./lib/transforms/postcss'));

  config.addWatchTarget('./src/styles/');
  config.addWatchTarget('./src/scripts/');
  config.addWatchTarget('./lib/**/*.js');
  config.addWatchTarget('./src/images/**/*.svg');


  // minify HTML
  config.addTransform('htmlminify', require('./lib/transforms/htmlminify'));


  // 11ty defaults
  return {

    dir: {
      input: 'src',
      output: '_site'
    }

  };
};