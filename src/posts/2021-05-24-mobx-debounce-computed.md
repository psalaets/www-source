---
title: Debouncing a Mobx computed
layout: post
metaDescription: How to get a debounce effect on a Mobx computed property.
---

Let's say that you have a Mobx computed property that changes often and it has an expensive reaction. For some reason you can't easily debounce the reaction (e.g. React component) nor the computed's dependencies.

_Edited on 2021-06-21:_ There is a [better way to handle this scenario](https://github.com/mobxjs/mobx/discussions/3013). Everything that follows will work but may not be the cleanest way to do it.

**Versions used below**

{% highlight javascript %}
{
  "mobx": "6.1.8"
}
{% endhighlight %}

## tl;dr

This isn't actually a debounced computed, which doesn't seem possible, but it achieves the same effect.

1. Replace the computed you want to debounce with an observable
2. Use a reaction to keep the new observable updated
3. Debounce the reaction from step 2
4. Modify the expensive reaction to use the observable from step 1

## Detailed steps

Here is a contrived example.

We start with some items and we compute their count. We also compute the doubled count.

{% highlight javascript %}
import {
  computed,
  makeObservable,
  observable,
} from 'mobx';

class Store {
  items = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      count: computed,
      doubleCount: computed,
    });
  }

  get count() {
    return this.items.length;
  }

  // this is what we want to debounce
  get doubleCount() {
    return this.count * 2;
  }
}
{% endhighlight %}

### 1. Define observable

Replace the computed with an observable. Creating an observable for a derivable value is uncommon in Mobx so it's probably a good idea to write a comment about why it's being done.

{% highlight javascript %}
class Store {
  items = [];
  doubleCount = 0;

  constructor() {
    makeObservable(this, {
      items: observable,
      // doubleCount is now an observable property
      doubleCount: observable,
      count: computed,
    });
  }

  get count() {
    return this.items.length;
  }
}
{% endhighlight %}

### 2. Sync new observable with its dependencies

We need to manually keep the observable in sync with its dependencies. Define a reaction that updates `doubleCount` when `count` changes.

{% highlight javascript %}
import {
  // ...previously shown imports...
  action,
  reaction,
} from 'mobx';

class Store {
  items = [];
  doubleCount = 0;

  constructor() {
    makeObservable(this, {
      items: observable,
      doubleCount: observable,
      count: computed,
      setDoubleCount: action,
    });

    // keep doubleCount's value in sync
    reaction(
      () => this.count,
      // same logic as the original computed
      count => this.setDoubleCount(count * 2)
    );
  }

  get count() {
    return this.items.length;
  }

  setDoubleCount(doubleCount) {
    this.doubleCount = doubleCount;
  }
}
{% endhighlight %}

### 3. Debounce the reaction

Debounce the reaction so `doubleCount` doesn't change too frequently.

{% highlight javascript %}
import debounce from 'lodash/debounce';

class Store {
  items = [];
  doubleCount = 0;

  constructor() {
    makeObservable(this, {
      items: observable,
      doubleCount: observable,
      count: computed,
      setDoubleCount: action,
    });

    reaction(
      () => this.count,
      // now the reaction is debounced
      debounce(count => {
        this.setDoubleCount(count * 2);
      }, 1000)
    );
  }

  get count() {
    return this.items.length;
  }

  setDoubleCount(doubleCount) {
    this.doubleCount = doubleCount;
  }
}
{% endhighlight %}

### 4. Dependent reactions use the new observable

If the observable added in step 1 has the same name as the old computed property, no reactions actually need to change.
