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
const queryMarket = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { endpoint, graphQlEndpoint, marketId } = opts;
    const sdk = yield sdk_1.default.initialize(endpoint, { graphQlEndpoint });
    const res = yield sdk.models.fetchMarketData(marketId);
    console.log(res.toJSONString());
});
exports.default = queryMarket;
//# sourceMappingURL=queryMarket.js.map