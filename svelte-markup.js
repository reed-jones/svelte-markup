import { markdownRenderer, pugRenderer } from './renderers'

export default (options = {}) => {
  return {
    markup({ content, filename }) {
      switch (true) {

        case checkExt(filename, 'md'):
          return markdownRenderer({ content, filename }, options.markdown);

      case checkExt(filename, 'pug'):
      case checkExt(filename, 'jade'):
          return pugRenderer({ content, filename }, options.pug);
          
        default:
          return; // not our problem
      }
    }
  };
}