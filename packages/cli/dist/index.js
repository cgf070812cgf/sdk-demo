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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importStar(require("commander"));
const approveMarket_1 = __importDefault(require("./actions/approveMarket"));
const blockHashes_1 = __importDefault(require("./actions/blockHashes"));
const buyCompleteSet_1 = __importDefault(require("./actions/buyCompleteSet"));
const createScalarMarket_1 = __importDefault(require("./actions/createScalarMarket"));
const cancelPendingMarket_1 = __importDefault(require("./actions/cancelPendingMarket"));
const countMarkets_1 = __importDefault(require("./actions/countMarkets"));
const createMarketAndDeployPool_1 = __importDefault(require("./actions/createMarketAndDeployPool"));
const createCategoricalMarket_1 = __importDefault(require("./actions/createCategoricalMarket"));
const currencyTransfer_1 = __importDefault(require("./actions/currencyTransfer"));
const deployKusamaDerby_1 = __importDefault(require("./actions/deployKusamaDerby"));
const deployPool_1 = __importDefault(require("./actions/deployPool"));
const disputeMarket_1 = __importDefault(require("./actions/disputeMarket"));
const exitPool_1 = __importDefault(require("./actions/exitPool"));
const getAllMarketIds_1 = __importDefault(require("./actions/getAllMarketIds"));
const getAllMarkets_1 = __importDefault(require("./actions/getAllMarkets"));
const getAssetsPrices_1 = __importDefault(require("./actions/getAssetsPrices"));
const getShareBalance_1 = __importDefault(require("./actions/getShareBalance"));
const getShareBalances_1 = __importDefault(require("./actions/getShareBalances"));
const getSpotPrice_1 = __importDefault(require("./actions/getSpotPrice"));
const joinPool_1 = __importDefault(require("./actions/joinPool"));
const poolJoinWithExactAssetAmount_1 = __importDefault(require("./actions/poolJoinWithExactAssetAmount"));
const redeemShares_1 = __importDefault(require("./actions/redeemShares"));
const rejectMarket_1 = __importDefault(require("./actions/rejectMarket"));
const reportMarket_1 = __importDefault(require("./actions/reportMarket"));
const sellCompleteSet_1 = __importDefault(require("./actions/sellCompleteSet"));
const swapExactAmountIn_1 = __importDefault(require("./actions/swapExactAmountIn"));
const swapExactAmountOut_1 = __importDefault(require("./actions/swapExactAmountOut"));
const transfer_1 = __importDefault(require("./actions/transfer"));
const viewDisputes_1 = __importDefault(require("./actions/viewDisputes"));
const viewMarket_1 = __importDefault(require("./actions/viewMarket"));
const viewPoolSpotPrices_1 = __importDefault(require("./actions/viewPoolSpotPrices"));
const viewSwap_1 = __importDefault(require("./actions/viewSwap"));
const queryAllMarketIds_1 = __importDefault(require("./actions/graphql/queryAllMarketIds"));
const queryMarket_1 = __importDefault(require("./actions/graphql/queryMarket"));
const queryFilteredMarkets_1 = __importDefault(require("./actions/graphql/queryFilteredMarkets"));
const catchErrorsAndExit = (fn, opts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fn(opts);
        process.exit(0);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
});
commander_1.default
    .command("deployKusamaDerby")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .action((opts) => catchErrorsAndExit(deployKusamaDerby_1.default, opts));
commander_1.default
    .command("createMarketAndDeployPool <slug> <description> <oracle> <period> <question>")
    .option("--advised", "Create Advised market instead of Permissionless market", false)
    .option("-c --categories [categories...]", "A space-separated strings for names of categories for the market")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--timestamp", "Interpret period as a unix timestamp instead of a block number", false)
    .option("--authorized <string>", "Specify account id which is authorized to handle Market Dispute Mechanism")
    .option("--court", "Use Court instead of Simple Disputes as Market Dispute Mechanism", false)
    .option("--amounts <amounts>", "A comma-separated list of amounts of each outcome asset that should be deployed", "")
    .option("--base-asset-amount <amount>", "Amount to deploy for native currency", "")
    .option("--weights <weights>", "A comma-separated list of relative denormalized weights of each asset price", "")
    .option("--keep <keep>", "A comma-separated list of assets to keep", "")
    .action((slug, description, oracle, period, question, opts) => catchErrorsAndExit(createMarketAndDeployPool_1.default, Object.assign(opts, { slug, description, oracle, period, question })));
commander_1.default
    .command("createCategoricalMarket <slug> <description> <oracle> <period> <question>")
    .option("--advised", "Create Advised market instead of Permissionless market", false)
    .option("-c --categories [categories...]", "A space-separated strings for names of categories for the market")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--timestamp", "Interpret period as a unix timestamp instead of a block number", false)
    .option("--authorized <string>", "Specify account id which is authorized to handle Market Dispute Mechanism")
    .option("--court", "Use Court instead of Simple Disputes as Market Dispute Mechanism", false)
    .option("--cpmm", "Use cpmm as a scoring rule instead of RikiddoSigmoidFeeMarketEma", false)
    .action((slug, description, oracle, period, question, opts) => catchErrorsAndExit(createCategoricalMarket_1.default, Object.assign(opts, { slug, description, oracle, period, question })));
commander_1.default
    .command("createScalarMarket <title> <description> <oracle> <period>")
    .option("--advised", "Create Advised market instead of Permissionless market", false)
    .option("-b --bounds [bounds...]", "A space-separated lower and higher bound for the market")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--timestamp", "Interpret period as a unix timestamp instead of a block number", false)
    .option("--authorized <string>", "Specify account id which is authorized to handle Market Dispute Mechanism")
    .option("--court", "Use Court instead of Simple Disputes as Market Dispute Mechanism", false)
    .option("--cpmm", "Use cpmm as a scoring rule instead of RikiddoSigmoidFeeMarketEma", false)
    .action((title, description, oracle, period, opts) => catchErrorsAndExit(createScalarMarket_1.default, Object.assign(opts, { title, description, oracle, period })));
commander_1.default
    .command("blockHashes")
    .option("-b, --blocks [blocks...]", "the blocks to retrieve hashes of")
    .option("--link", "Include a block explorer link", true)
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((opts) => catchErrorsAndExit(blockHashes_1.default, Object.assign(opts)));
commander_1.default
    .command("viewMarket <marketId>")
    .option("--address <string>", "An address on which to report ownership of assets.")
    .option("--seed <string>", "A seed from which to calculate an address on which to report ownership of assets", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, opts) => catchErrorsAndExit(viewMarket_1.default, Object.assign(opts, { marketId })));
commander_1.default
    .command("cancelMarket <marketId>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, opts) => catchErrorsAndExit(cancelPendingMarket_1.default, Object.assign(opts, { marketId })));
commander_1.default
    .command("viewSwap <marketId>")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, opts) => catchErrorsAndExit(viewSwap_1.default, Object.assign(opts, { marketId })));
commander_1.default
    .command("buyCompleteSet <marketId> <amount>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, amount, opts) => catchErrorsAndExit(buyCompleteSet_1.default, Object.assign(opts, { marketId, amount })));
commander_1.default
    .command("sellCompleteSet <marketId> <amount>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, amount, opts) => catchErrorsAndExit(sellCompleteSet_1.default, Object.assign(opts, { marketId, amount })));
commander_1.default
    .command("report <marketId> <outcome>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, outcome, opts) => catchErrorsAndExit(reportMarket_1.default, Object.assign(opts, { marketId, outcome })));
commander_1.default
    .command("dispute <marketId> <outcome>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, outcome, opts) => catchErrorsAndExit(disputeMarket_1.default, Object.assign(opts, { marketId, outcome })));
commander_1.default
    .command("redeem <marketId>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, opts) => catchErrorsAndExit(redeemShares_1.default, Object.assign(opts, { marketId })));
commander_1.default
    .command("deployPool <marketId>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--weights <weights>", "A comma-separated list of lengths for each asset", "")
    .action((marketId, opts) => catchErrorsAndExit(deployPool_1.default, Object.assign(opts, { marketId })));
commander_1.default
    .command("joinPool <poolId> <amountOut> <amountIn>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((poolId, amountOut, amountIn, opts) => catchErrorsAndExit(joinPool_1.default, Object.assign(opts, { amountOut, amountIn, poolId })));
commander_1.default
    .command("poolJoinWithExactAssetAmount <poolId> <assetIn> <assetAmount> <minPoolAmount>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((poolId, assetIn, assetAmount, minPoolAmount, opts) => catchErrorsAndExit(poolJoinWithExactAssetAmount_1.default, Object.assign(opts, { poolId, assetIn, assetAmount, minPoolAmount })));
commander_1.default
    .command("exitPool <poolId> <amountIn> <amountOut>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((poolId, amountIn, amountOut, opts) => catchErrorsAndExit(exitPool_1.default, Object.assign(opts, { amountIn, amountOut, poolId })));
commander_1.default
    .command("swapExactAmountIn <poolId> <assetIn> <assetAmountIn> <assetOut> <minAmountOut> <maxPrice>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((poolId, assetIn, assetAmountIn, assetOut, minAmountOut, maxPrice, opts) => catchErrorsAndExit(swapExactAmountIn_1.default, Object.assign(opts, {
    assetIn,
    assetAmountIn,
    assetOut,
    minAmountOut,
    maxPrice,
    poolId,
})));
commander_1.default
    .command("swapExactAmountOut <poolId> <assetIn> <maxAmountIn> <assetOut> <assetAmountOut> <maxPrice>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((poolId, assetIn, maxAmountIn, assetOut, assetAmountOut, maxPrice, opts) => catchErrorsAndExit(swapExactAmountOut_1.default, Object.assign(opts, {
    assetIn,
    maxAmountIn,
    assetOut,
    assetAmountOut,
    maxPrice,
    poolId,
})));
commander_1.default
    .command("getBalance <addressOrSeed>, <asset>")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((addressOrSeed = "//Alice", asset, opts) => catchErrorsAndExit(getShareBalance_1.default, Object.assign(opts, { addressOrSeed, asset })));
commander_1.default
    .command("getBalances <addressOrSeed>")
    .option("-m --marketId <number>")
    .option("--endpoint <string>", "The endpoint URL of the API connection")
    .action((addressOrSeed = "//Alice", opts) => catchErrorsAndExit(getShareBalances_1.default, Object.assign(opts, { addressOrSeed })));
commander_1.default
    .command("getSpotPrice <poolId> <assetIn> <assetOut>")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((poolId, assetIn, assetOut, opts) => catchErrorsAndExit(getSpotPrice_1.default, Object.assign(opts, { poolId, assetIn, assetOut })));
commander_1.default
    .command("viewSpotPrices <poolId> <assetIn> <assetOut> [blocks...]")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((poolId, assetIn, assetOut, blocks, opts) => catchErrorsAndExit(viewPoolSpotPrices_1.default, Object.assign(opts, { poolId, assetIn, assetOut, blocks })));
commander_1.default
    .command("getAssetsPrices")
    .option("-b --block <number>", "The block number at which to get historic prices")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((opts) => catchErrorsAndExit(getAssetsPrices_1.default, opts));
commander_1.default
    .command("transfer <marketId> <sharesIndex> <to> <amount>")
    .option("--seed <string>", "The signer's seed", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, sharesIndex, to, amount, opts) => catchErrorsAndExit(transfer_1.default, Object.assign(opts, { marketId, sharesIndex, to, amount })));
commander_1.default
    .command("currencyTransfer <dest> <amount")
    .option("--seed <string>", "The seed used to derive the address from which the assets should be transferred", "//Alice")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--marketId <string>", "The unique identifier of the market")
    .option("--categoryIndex <number>", "An index from the list of categories as categorical outcome")
    .option("--scalarPos <string>", "The scalar position can be either Long or Short")
    .option("--poolShare <number>", "The amount of pool share to be transferred")
    .option("--ztg", "Use ztg as currency instead of CombinatorialOutcome", false)
    .action((dest, amount, opts) => catchErrorsAndExit(currencyTransfer_1.default, Object.assign(opts, { dest, amount })));
commander_1.default
    .command("countMarkets")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((opts) => catchErrorsAndExit(countMarkets_1.default, Object.assign(opts)));
commander_1.default
    .command("getAllMarketIds")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((opts) => catchErrorsAndExit(getAllMarketIds_1.default, Object.assign(opts)));
commander_1.default
    .command("getAllMarkets")
    .option("-f, --filter [fields...]", "only output specified fields")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((opts) => catchErrorsAndExit(getAllMarkets_1.default, Object.assign(opts)));
commander_1.default
    .command("approveMarket <marketId>")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--seed <string>", "The signer's seed. Must be an ApprovalOrigin", "//Alice")
    .action((marketId, opts) => catchErrorsAndExit(approveMarket_1.default, Object.assign(opts, { marketId })));
commander_1.default
    .command("rejectMarket <marketId>")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--seed <string>", "The signer's seed. Must be an ApprovalOrigin", "//Alice")
    .action((marketId, opts) => catchErrorsAndExit(rejectMarket_1.default, Object.assign(opts, { marketId })));
commander_1.default
    .command("viewDisputes <marketId>")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .action((marketId, opts) => catchErrorsAndExit(viewDisputes_1.default, Object.assign(opts, { marketId })));
commander_1.default
    .command("queryMarketIds")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--graphQlEndpoint <string>", "Endpoint of the graphql query node", "https://processor.zeitgeist.pm/graphql")
    .action((opts) => {
    catchErrorsAndExit(queryAllMarketIds_1.default, opts);
});
commander_1.default
    .command("queryMarket <marketId>")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--graphQlEndpoint <string>", "Endpoint of the graphql query node", "https://processor.zeitgeist.pm/graphql")
    .action((marketId, opts) => {
    marketId = Number(marketId);
    catchErrorsAndExit(queryMarket_1.default, Object.assign({ marketId }, opts));
});
commander_1.default
    .command("queryFilteredMarkets")
    .option("--endpoint <string>", "The endpoint URL of the API connection", "wss://bsr.zeitgeist.pm")
    .option("--graphQlEndpoint <string>", "Endpoint of the graphql query node", "https://processor.zeitgeist.pm/graphql")
    .option("--statuses [strings...]", "Statuses of markets to display. By default shows all statuses.")
    .option("--tags [strings...]", "Filter markets by supplied tags. By default shows all tags.")
    .option("--page-number <number>", "Page number of market results", "1")
    .option("--page-size <number>", "Page size for the results", "100")
    .option("--creator [string]", "Filter only markets created by account address")
    .option("--oracle [string]", "Filter only markets created by market oracle")
    .addOption(new commander_1.Option("--ordering <string>", "Ordering of markets")
    .choices(["asc", "desc"])
    .default("asc"))
    .addOption(new commander_1.Option("--order-by <string>", "Order markets by paramater")
    .choices(["newest", "end"])
    .default("newest"))
    .action(({ graphQlEndpoint, endpoint, statuses, tags, pageNumber, pageSize, ordering, orderBy, creator, oracle, }) => {
    if (typeof statuses === "string") {
        statuses = [statuses];
    }
    if (typeof tags === "string") {
        tags = [tags];
    }
    catchErrorsAndExit(queryFilteredMarkets_1.default, {
        statuses,
        tags,
        graphQlEndpoint,
        endpoint,
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
        ordering,
        orderBy,
        creator,
        oracle,
    });
});
commander_1.default.parse(process.argv);
//# sourceMappingURL=index.js.map