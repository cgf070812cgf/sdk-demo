"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAGMENT_MARKET_DETAILS = void 0;
const graphql_request_1 = require("graphql-request");
exports.FRAGMENT_MARKET_DETAILS = graphql_request_1.gql `
  fragment MarketDetails on Market {
    marketId
    description
    end
    creator
    creatorFee
    creation
    oracle
    question
    slug
    img
    tags
    status
    scoringRule
    resolvedOutcome
    marketType {
      categorical
      scalar
    }
    period {
      block
      timestamp
    }
    report {
      outcome {
        categorical
        scalar
      }
      at
      by
    }
    mdm {
      Authorized: authorized
      Court: court
      SimpleDisputes: simpleDisputes
    }
    categories {
      ticker
      name
      color
    }
  }
`;
//# sourceMappingURL=market.js.map