// PostCSS CSS processing

/* global dev */

const
  postcss = require('postcss'),
  postcssPlugins = [
    
    //require('postcss-media-variables'),
    require('postcss-custom-media'),

    require('postcss-advanced-variables'),
    require('postcss-custom-properties'),
    require('postcss-nested'),
    require('postcss-conditionals'),
    require('postcss-hexrgba'),
    require("postcss-calc"),
    //require('postcss-media-variables'), // has to be called twice https://www.npmjs.com/package/postcss-media-variables
    require('postcss-sort-media-queries'),
    
    

    require('autoprefixer'),
    require('cssnano')
  ],
  postcssOptions = {
    from: 'src/scss/entry.scss',
    syntax: require('postcss-scss'),
    map: dev ? { inline: true } : false
  };

module.exports = async (content, outputPath) => {

  if (!String(outputPath).endsWith('.css')) return content;

  return (
    await postcss(postcssPlugins).process(content, postcssOptions)
  ).css;

};