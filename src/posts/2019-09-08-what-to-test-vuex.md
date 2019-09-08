---
title: What to test in Vuex modules
layout: post
metaDescription: What parts to test in a Vuex module
---

Testing is good and we like it. However, testing every single thing can take too long and become tedious. While inching towards 100% test coverage you may find that some tests have a very low value-to-cost ratio.

Sometimes you can't test everything even if you wanted to.

When it comes to testing our Vuex modules, my team has decided that some tests can be skipped.

## Getters

**No tests needed when:**

The getter is just returning something from the `state`.

```js
// no tests needed
{
  modalVisible(state) {
    return state.modal.visible;
  }
}
```

**Write tests when:**

The getter does a transformation or filtering.

```js
// write tests for this
{
  filteredRecords(state) {
    const name = state.filter.name;
    return state.records
      .filter(record => record.name.startsWith(name));
  }
}
```

**Write tests when:**

The getter takes arguments.

```js
// write tests for this
{
  recordsById(state) {
    return id => {
      return state.records.find(record => record.id === id);
    };
  }
}
```

## Mutations

**No tests needed when:**

The mutation is just getting something from its payload and setting it on `state`.

```js
// no tests needed
{
  LOAD_DOMAINS_COMPLETED(state, payload) {
    state.domains = payload.domains;
  }
}
```

**No tests needed when:**

The mutation is hardcoded.

```js
// no tests needed
{
  SHOW_MODAL(state) {
    state.modal.visible = true;
  }
}
```

## Actions

**No tests needed when:**

The action only commits an analogous mutation.

```js
// no tests needed
{
  showModal(context) {
    context.commit('SHOW_MODAL');
  }
}
```

**Write tests when:**

The action orchestrates other actions or mutations.

```js
// write tests for this
{
  load(context) {
    context.commit('LOADING_STARTED');

    return context.dispatch('loadRecords')
      .then(records => {
        if (records.length > 0) {
          return context.dispatch('loadSchedules');
        }
      })
      .finally(() => {
        context.commit('LOADING_ENDED');
      });
  }
}
```

**Write tests when:**

The action has conditional logic based on payload or getters.

```js
// write tests for this
{
  save(context) {
    if (context.getters.exists) {
      return context.dispatch('update');
    } else {
      return context.dispatch('create');
    }
  }
}
```

### Shameless plug

I've written a [module](https://github.com/psalaets/vuex-mock-context) that makes it a little easier to test Vuex actions.

## When in doubt

My favorite things to test are

- The most important things
- The most complicated things
- The things that always break

Use your best judgement or start a conversation to determine if something needs a test.
