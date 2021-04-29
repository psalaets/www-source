---
title: Dynamic Netlify redirects in Eleventy
layout: post
metaDescription: How to generate dynamic Netlify redirects with Eleventy
---

With a site hosted on Netlify, I want requests to `/blog` to be redirected to the latest blog post. Also, I don't want to manually update the `_redirects` file each time a new post is published.

I did it with Nunjucks templates but the idea should translate to all of Eleventy's supported template languages.

## Steps

1. Create a file named `_redirects.njk` in your Eleventy input directory.
2. The content of that file should be something like this

{% highlight text %}
---
permalink: _redirects
---
{%- set latestPost = collections.posts | reverse | first -%}
/blog {{latestPost.url}}
{% endhighlight %}

3. Test by running an Eleventy build in your site's repo.

{% highlight bash %}
$ npx @11ty/eleventy
{% endhighlight %}

4. Verify the presence and content of `_redirects` in the Eleventy output directory.

The format of the `_redirects` file is described in [Netlify's redirects documentation](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file).
