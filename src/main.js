import { markdownRenderer, pugRenderer } from './renderers/index'
import { checkExt } from './utilities'

export default (options = {}) => {
  return {
    markup({ content, filename }) {
      switch (true) {

        // Markdown
        case checkExt(filename, 'md'):
          return markdownRenderer({ content, filename }, options.markdown);

        // Pug (formerly jade)
        case checkExt(filename, 'pug'):
        case checkExt(filename, 'jade'):
            return pugRenderer({ content, filename }, options.pug);
          
        default:
          return; // not our problem
      }
    }
  };
}