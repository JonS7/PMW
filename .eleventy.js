const dev = global.dev  = (process.env.ELEVENTY_ENV === 'development');
//const pluginESbuild = require('@jamshop/eleventy-plugin-esbuild');


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

  config.addWatchTarget('./src/images/**/*.svg');

  

  // minify HTML
  //config.addTransform('htmlminify', require('./lib/transforms/htmlminify'));

  



  // 11ty defaults
  return {

    dir: {
      input: 'src',
      output: '_site'
    }

  };
};