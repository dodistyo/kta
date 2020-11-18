/**
 * @example
 * const loader = new ScriptStyleLoader();
 * loader.require("example.js").then(() => console.log('scripts loaded');)
 * loader.require("example.css").then(() => console.log('stylesheet loaded');)
 * @see https://css-tricks.com/snippets/javascript/async-script-loader-with-callback/
 * @see https://github.com/LukasBombach/Lazyloader
 * @see https://htmldom.dev/load-a-javascript-file-dynamically/
 */
class ScriptStyleLoader {
  _CSS_REGEX = /(\.css|\.less)/i;
  _JS_REGEX = /(\.js|\.es6|\.es|\.jsx)/i;

  getFileType = (url: string) => {
    if (this._JS_REGEX.test(url)) return 'js';
    if (this._CSS_REGEX.test(url)) return 'css';
    return null;
  };

  alreadyLoaded = (url: string) => {
    const fileType = this.getFileType(url);
    if (fileType === 'js') {
      return document.querySelectorAll(`script[src="${url}"]`).length > 0;
    } else if (fileType === 'css') {
      return document.querySelectorAll(`link[href="${url}"]`).length > 0;
    }
    return true;
  };

  // Load a script from given `url`
  loadScript = (url: string) => {
    return new Promise((resolve, reject) => {
      const fileType = this.getFileType(url);

      if (this.alreadyLoaded(url)) {
        resolve(url);
      } else {
        if (fileType === 'js') {
          const script = document.createElement('script');
          script.src = url;
          script.type = 'text/javascript';
          script.async = true;
          script.crossOrigin = 'anonymous';
          script.addEventListener('error', () => {
            reject();
          });
          script.addEventListener('load', () => {
            resolve(url);
          });
          document.head.appendChild(script);
        } else if (fileType === 'css') {
          const link = document.createElement('link');
          link.href = url;
          link.rel = 'stylesheet';
          link.crossOrigin = 'anonymous';
          link.addEventListener('error', () => {
            reject();
          });
          link.addEventListener('load', () => {
            resolve(url);
          });
          document.head.appendChild(link);
        }
      }
    });
  };

  require = (url: string) => {
    return this.loadScript(url);
  };
}

export { ScriptStyleLoader };
