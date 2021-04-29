---
title: Setting up dynamic Netlify redirects in Eleventy
layout: post
metaDescription: How to generate redirects dynamically at build time
---

I did it with Nunjucks but the idea should translate to all of Eleventy's supported template languages.

### Objective

In my site hosted on Netlify, I want requests to `/blog` to be redirected to the latest blog post.

I don't want to manually update the `_redirects` file each time a post is published.

### Steps

1. Create a file named `_redirects.njk` in your Eleventy input directory.
2. The content of that file should be something like this

```
---
permalink: _redirects
---
{%- set latestPost = collections.posts | reverse | first -%}
/blog {{latestPost.url}}
```

3. Test by running an Eleventy build in your site's repo.

```sh
$ npx @11ty/eleventy
```

4. Verify that a `_redirects` file exists in the Eleventy output directory.

The format of the `_redirects` file is described in [Netlify's documentation](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file).
