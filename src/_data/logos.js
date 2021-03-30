// _data/icons.js
const fg = require('fast-glob');
const path = require('path');
const fs = require('fs');

module.exports = function() {
    return new Promise(async (resolve, reject) => {
        //const logoFolder = path.resolve(__dirname, './images/client-logos/');
        //const logos = await fg('**/*.png', { cwd: logoFolder });
        const logos = await fg(['**/client-logos/*', '!**/build']);
        const logoData = await Promise.all(logos.map(async (logo) => {
         
            const name = path.basename(logo);
            //const name = path.replace('src/', 'hi');
            //const name = logo.;
            //const revisedString = logo.replace('src/', 'hi');
            return { name };
        }));
        resolve(logoData);
    });
};

/*
const nameWithoutExtension = path.parse(name).name;
            const source = fs.readFileSync(path.resolve(iconFolder, name), { encoding: 'utf8' });
            const sourceWithClass = source.replace('<svg', '<svg class="my-custom-class"');
            return { name, source, sourceWithClass, nameWithoutExtension }; */