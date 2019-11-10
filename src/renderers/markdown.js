import markdown from 'markdown-it';
import hljs from 'highlight.js'
import { makeComments, stripComments } from '../utilities';

export default ({ content }, options = {}) => {
  options = {
    svelteBlocks: true,
    ...options,

    renderOptions: {
      html: true,
      langPrefix: 'hljs ',
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) { }
        }

        return ''; // use external default escaping
      },
      ...(options.renderOptions || {})
    }
  }

  const code = options.svelteBlocks
    ? stripComments(markdown(options.renderOptions).render(makeComments(content)))
    : markdown(options.renderOptions).render(content)

  return {
    code
  }
}

