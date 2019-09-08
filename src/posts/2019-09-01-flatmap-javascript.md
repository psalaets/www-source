---
title: Mental model for flatMap in JavaScript
layout: post
metaDescription: How to think about Array.prototype.flatMap
---

es2019 added `Array.prototype.flatMap`

## Naming

Naming is hard and breaking tradition is even harder. It should really be called `mapThenFlatten()`.

## Implementation in es2019

```js
flatMap(fn, context) {
  return this.map(fn, context).flat();
}
```

## Implementation pre es2019

```js
flatMap(fn, context) {
  return this.map(fn, context)
    .reduce((prev, curr) => prev.concat(curr), []);
}
```

## When it's useful

- pulling arrays from each element of an array and want one final array