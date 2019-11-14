import markdown from 'markdown-it';
import hljs from 'highlight.js'
import { makeComments, stripComments } from '../utilities';

const blockReplacer = content => content.replace(new RegExp(`<svelte:(.*)?>`, 'gm'), '<script>svelte-builtin-tag--$1--start')
  .replace(new RegExp(`<\/svelte:(.*)?>`, 'gm'), 'svelte-builtin-tag--$1--end</script')
const blockRestorer = content => content.replace(new RegExp(`<script>svelte-builtin-tag--(.*)--start`, 'gm'), '<svelte:$1>')
  .replace(new RegExp(`svelte-builtin-tag--(.*)--end<\/script`, 'gm'), '<\/svelte:$1>')


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
    ? blockRestorer(stripComments(
        markdown(options.renderOptions).render(
            blockReplacer(makeComments(content))
          )
      ))
    : markdown(options.renderOptions).render(content)

  return {
    code
  }
}

