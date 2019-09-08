const md = require('markdown-it')({
  // need `html: true` so prism generated markup doesn't render literally
  html: true,
  linkify: true
});

addLinkAttributes(md);

module.exports = md;

// based on
// https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
function addLinkAttributes(md) {
  var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // add attributes
    tokens[idx].attrPush(['rel', 'noopener']);

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };

}