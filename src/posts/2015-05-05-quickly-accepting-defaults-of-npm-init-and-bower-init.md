---
title: Quickly accepting defaults of npm init
layout: post
metaDescription: Start an npm module with minimal fuss
twitter_url: https://twitter.com/paulsalaets/status/595550000702173186
---

When trying out a module I start by downloading it into a new directory. I want to do that as fast as possible.

**Versions used below**

{% highlight bash %}
npm 2.8.4
{% endhighlight %}

## Test-driving a module

To try a module for the first time, my steps are:

{% highlight bash %}
$ mkdir foo-test-drive
$ cd $_
$ npm init
$ npm install foo -S
{% endhighlight %}

*I can `npm install` without having a package.json so technically `npm init` is unnecessary. I do it because package.json is an easily accessible record of what version the test-drive code was written against.*

During `init` npm asks some questions and since the test-drive code won't be reused, I don't care about the answers. I press and hold `<enter>` to accept the default answers. That's more work than I want to do for this.

There's a quicker way.

## npm init

{% highlight bash %}
$ npm init -y
{% endhighlight %}

This will automatically accept the defaults.

The `-y` stands for yes as in say yes to all the prompts. These flags also work: `--yes`, `-f`, `--force`.
