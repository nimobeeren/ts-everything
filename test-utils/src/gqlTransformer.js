module.exports = {
  /**
   * Generates code that transforms a GraphQL document string to a DocumentNode.
   * This transformer is needed for Jest to load .graphql files.
   * @param {string} sourceText original content of the document
   * @returns {string} code that transforms the source text to a DocumentNode
   */
  process(sourceText) {
    return `
      const gql = require('graphql-tag');
      module.exports = gql\`${sourceText}\`;
    `;
  }
};
