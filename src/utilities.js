// Add comments to svelte locks before processing by rendering engine
// remove comments afterwards
const svelteBlockFinder = `({[:#\/](if|else if|else|each|await|then|catch).*?})`
export const makeComments = content => content.replace(new RegExp(svelteBlockFinder, 'g'), '<!--$1-->')
export const stripComments = content => content.replace(new RegExp(`<!--${svelteBlockFinder}-->`, 'g'), '$1')

// check if the file ends with the given extension
import { extname } from 'path';
export const checkExt = (filename, ext) => extname(filename).startsWith(`.${ext}`)