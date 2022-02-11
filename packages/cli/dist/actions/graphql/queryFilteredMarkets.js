"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __importDefault(require("@zeitgeistpm/sdk"));
const queryFilteredMarkets = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { endpoint, graphQlEndpoint, statuses, tags, ordering, orderBy, pageNumber, pageSize, creator, oracle, } = opts;
    const sdk = yield sdk_1.default.initialize(endpoint, { graphQlEndpoint });
    const res = yield sdk.models.filterMarkets({ statuses, creator, oracle, tags }, {
        ordering,
        orderBy,
        pageSize,
        pageNumber,
    });
    for (const market of res) {
        console.log(`\nData for market of id ${market.marketId}\n`);
        console.log(market.toJSONString());
    }
});
exports.default = queryFilteredMarkets;
//# sourceMappingURL=queryFilteredMarkets.js.map