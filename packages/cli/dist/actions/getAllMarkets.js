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
const getAllMarkets = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { endpoint, filter } = opts;
    if (Array.isArray(filter) && filter[0] === "ilter") {
        return console.log("-filter is not an option. Did you mean --filter ?");
    }
    const sdk = yield sdk_1.default.initialize(endpoint, { logEndpointInitTime: false });
    const res = yield sdk.models.getAllMarkets();
    if (Array.isArray(filter)) {
        res.forEach((market) => console.log(market.toFilteredJSONString(filter)));
    }
    else {
        res.forEach((market) => console.log(market.toJSONString()));
    }
});
exports.default = getAllMarkets;
//# sourceMappingURL=getAllMarkets.js.map