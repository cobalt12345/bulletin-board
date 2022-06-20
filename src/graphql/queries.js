/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allMessages = /* GraphQL */ `
  query AllMessages {
    allMessages {
      id
      channel
      body
      publishedAt
    }
  }
`;
export const lastNMessages = /* GraphQL */ `
  query LastNMessages($numOfMessages: Int!) {
    lastNMessages(numOfMessages: $numOfMessages) {
      id
      channel
      body
      publishedAt
    }
  }
`;
