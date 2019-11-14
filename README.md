# Svelte Markup
> Pug & Markdown support for svelte made easy

Svelte-markup uses the existing file extension to find the appropriate renderer. That means no more `<template lang="pug">`.
Additionally, according to my minimal research* is the only svelte pug preprocessor on the face of the planet which supports the builtin svelte blocks (e.g. `{#if x > 10}`).


\* _I could definately be wrong, but I couldn't find anything to suite my needs in the 10 minutes I looked..._

> Disclaimer:...
> **_This project is made of dumb hacks._**


### Install 
```sh
yarn add -D svelte-markup
```
```sh
npm install -D svelte-markup
```

__Example Rollup Config__
```js
// rollup.config.js

//...
import markup from 'svelte-markup';

export default {
  //...
  plugins: [
    svelte({
      // add file extensions you wish to use
      extensions: ['.svelte', '.pug', '.md'],
      
      //...

      // run the preprocessors
      preprocess: [
        //... 
        markup(),
        //...
      ]
    }),
```

### Usage with sapper
Add the required extensions ` --ext '.md .pug .svelte'` to the package.json sapper scripts
```json
{
  "dev": "sapper dev --ext '.md .pug .svelte'",
  "build": "sapper build --legacy --ext '.md .pug .svelte'",
  "export": "sapper export --legacy --ext '.md .pug .svelte'",
}
```

### Options
options can be supplied to the pre-processors
```js
preprocess: [
  markup(options)
]
```

available options are as follows:
```js
const options = {
  pug: {
    renderOptions: {
      // see: the render() method options
      // https://pugjs.org/api/reference.html
    }
  markdown: {
    renderOptions: {
      // https://markdown-it.github.io/markdown-it/#MarkdownIt.new
    }
  }
}
```

- [Pugjs reference](https://pugjs.org/api/reference.html)
- [Markdown-it reference](https://markdown-it.github.io/markdown-it/#MarkdownIt.new)


---
---

### Example Time

__App.pug__
```pug
svelte:head
  link(rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/dracula.min.css")

script.
  import Counter from './Counter.svelte'
  import MarkdownTest from './MarkdownTest.md'
  let x = 73

//- note: scss not included in this package
style(lang="scss").
  .count {
    width: 100vw;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    &:hover {
      background: red;
    }
  }

h1 The App

MarkdownTest 

.count
  Counter

p is {x} greater than 10? {#if x > 10} Yes it is! {:else} not a chance! {/if}

{#if x > 10}
p {x} is too large
{/if}
```

---

__MarkdownTest.md__
```md
<script>
let name = 'World'
let x = 60
</script>


<style>
h1 {
  color: green;
}
</style>


# Hello {name}
> welcome

‎`‎`‎`‎js
// Syntax Highlighting from highlight.js
if (5 > 9) return 9;
‎`‎`‎`‎

# is {x} greater than 10? {#if x > 10} Yes it is! {:else} not a chance! {/if}
```

---

__Counter.svelte__
```svelte
<script>
var count = 5
$: double = count * 2
const increment = () => count++
const decrement = () => count--
</script>

<style>
button {
  color: red;
  font-weight: 700;
}
</style>

<h2>Count: {count}</h2>
<h2>Double: {double}</h2>

<button on:click={increment}>Increment</button>
<button on:click={decrement}>Decrement</button>

```
