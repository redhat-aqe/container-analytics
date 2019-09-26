const fs = require('fs');

class WebComponentStylesPlugin {

  constructor(options={}) {
    this.options = options;
  }

  apply(compiler) {
    const {stylesPath, scriptPath, replace} = this.options;
    compiler.hooks.afterEmit.tapAsync('InjectStylesPlugin', (compilation, callback) => {
      let styles = fs.readFileSync(stylesPath, 'utf8');
      let script = fs.readFileSync(scriptPath, 'utf8');

      styles = styles.replace(/:root/g, ':host').replace(/"/g, '\\"');
      const regex = new RegExp(`${replace}=\".*?\"`, 'g');
      script = script.replace(regex, `${replace}="${styles}"`)

      fs.writeFileSync(scriptPath, script);

      callback();
    });
  }
}

module.exports = WebComponentStylesPlugin