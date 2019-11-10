import pug from 'pug';
import { makeComments, stripComments } from '../utilities';

export default ({ content, filename }, options = {}) => {
  options = {
    svelteBlocks: true,
    ...options,
    
    renderOptions: {
      doctype: 'html',
      filename,
      ...(options.renderOptions || {}),
    }
  };

  const code = options.svelteBlocks
    ? stripComments(pug.render(makeComments(content), options.renderOptions))
    : pug.render(content, options.renderOptions)

  return {
    code
  };
};