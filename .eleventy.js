const
  dev = global.dev  = (process.env.ELEVENTY_ENV === 'development');
  // Import fast-glob package
//fg = require('fast-glob'),

// Run search for images 
//logoImages = fg.sync(['**/client-logos/*', '!**/build']);

  // 11ty configuration
module.exports = config => {


//Create collection of gallery images
 // config.addCollection('logos', function(collection) {
 //   return logoImages;
 // });

  /* --- PLUGINS --- */

  // navigation
  config.addPlugin( require('@11ty/eleventy-navigation') );

  // inline assets
  config.addTransform('inline', require('./lib/transforms/inline'));

  /* --- SHORTCODES --- */
  // page navigation
  config.addShortcode('navlist', require('./lib/shortcodes/navlist.js'));

  //config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/fonts');


  // CSS processing
  config.addTransform('postcss', require('./lib/transforms/postcss'));
  config.addWatchTarget('./src/scss/');

  

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