module.exports = {
  process(sourceText) {
    return `module.exports = \`${sourceText}\``;
  }
};
