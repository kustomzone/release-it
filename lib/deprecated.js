const Log = require('./log');
const deprecated = require('../conf/deprecated.json');
const Deprecated = require('deprecated-obj');

module.exports = (config, log = new Log()) => {
  const deprecations = new Deprecated(deprecated, config);
  const compliant = deprecations.getCompliant();
  const violations = deprecations.getViolations();
  if (Object.keys(violations).length > 0) {
    log.warn(`Deprecated configuration options found. Please migrate before the next major release.`);
  }
  for (const d in violations) {
    log.warn(`The "${d}" option is deprecated.${violations[d] ? ` Please use "${violations[d]}" instead.` : ''}`);
  }
  return compliant;
};
