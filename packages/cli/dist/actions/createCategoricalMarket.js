"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = __importStar(require("@zeitgeistpm/sdk"));
const createCategoricalMarket = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug, description, oracle, period, categories, advised, endpoint, seed, question, timestamp, authorized, court, cpmm, } = opts;
    const sdk = yield sdk_1.default.initialize(endpoint);
    const signer = sdk_1.util.signerFromSeed(seed);
    console.log("Sending transaction from", signer.address);
    if (categories && !(categories.length > 1)) {
        if (categories.length === 1) {
            console.log("Valid: -c Yes No Maybe");
            console.log("Valid: --categories Yes No Maybe");
            console.log("Invalid: -categories Yes No Maybe");
            console.log("(no space) Invalid: --cYes No Maybe");
            console.log("(too few categories) Invalid: --c Inevitably");
            console.log();
            if (categories[0] === "ategories") {
                console.log("Did you use the right number of dashes (-c or --categories) ?");
                console.log();
            }
        }
        throw new Error("If specifying categories, at least two must be specified.");
    }
    const categoriesMeta = categories != null
        ? categories.map((cat) => {
            return { name: cat, ticker: cat.slice(0, 5) };
        })
        : [
            { name: "Yes", ticker: "YES" },
            { name: "No", ticker: "NO" },
        ];
    const metadata = {
        description,
        slug,
        question,
        categories: categoriesMeta,
    };
    const marketPeriod = timestamp
        ? { timestamp: period.split(" ").map((x) => +x) }
        : { block: period.split(" ").map((x) => +x) };
    let mdm = null;
    if (authorized) {
        mdm = { Authorized: authorized };
    }
    else {
        mdm = court ? { Court: null } : { SimpleDisputes: null };
    }
    const marketId = yield sdk.models.createCategoricalMarket(signer, oracle, marketPeriod, advised ? "Advised" : "Permissionless", mdm, cpmm ? "CPMM" : "RikiddoSigmoidFeeMarketEma", metadata, false);
    if (marketId && marketId.length > 0) {
        console.log(`Categorical market created! Market Id: ${marketId}`);
    }
    else {
        console.log(`Categorical market creation failed!`);
    }
    process.exit(0);
});
exports.default = createCategoricalMarket;
//# sourceMappingURL=createCategoricalMarket.js.map