import { ApiPromise } from "@polkadot/api";
import { GraphQLClient } from "graphql-request";
import { ISubmittableResult } from "@polkadot/types/types";
import { MarketPeriod, MarketId, KeyringPairOrExtSigner, PoolId, DecodedMarketMetadata, MarketDisputeMechanism, CurrencyIdOf, MarketStatusText, MarketsOrdering, MarketsOrderBy, MarketTypeOf } from "../types";
import Market from "./market";
import Swap from "./swaps";
import ErrorTable from "../errorTable";
export { Market, Swap };
declare type Options = {
    MAX_RPC_REQUESTS?: number;
    graphQLClient?: GraphQLClient;
};
export default class Models {
    private api;
    private errorTable;
    private graphQLClient?;
    MAX_RPC_REQUESTS: number;
    constructor(api: ApiPromise, errorTable: ErrorTable, opts?: Options);
    getGraphQLClient(): GraphQLClient;
    getAllMarketIds(): Promise<number[]>;
    getAllMarkets(): Promise<Market[]>;
    createCpmmMarketAndDeployAssets(signer: KeyringPairOrExtSigner, oracle: string, period: MarketPeriod, creationType: string, marketType: MarketTypeOf, mdm: MarketDisputeMechanism, amounts: string[], baseAssetAmount: string, weights: string[], keep: string[], metadata: DecodedMarketMetadata, callbackOrPaymentInfo?: ((result: ISubmittableResult, _unsub: () => void) => void) | boolean): Promise<string>;
    createCategoricalMarket(signer: KeyringPairOrExtSigner, oracle: string, period: MarketPeriod, creationType: string, mdm: MarketDisputeMechanism, scoringRule: string, metadata: DecodedMarketMetadata, callbackOrPaymentInfo?: ((result: ISubmittableResult, _unsub: () => void) => void) | boolean): Promise<string>;
    createScalarMarket(signer: KeyringPairOrExtSigner, title: string, description: string, oracle: string, period: MarketPeriod, creationType: string, bounds: number[], mdm: MarketDisputeMechanism, scoringRule?: string, callbackOrPaymentInfo?: ((result: ISubmittableResult, _unsub: () => void) => void) | boolean): Promise<string>;
    private createAssetsForMarket;
    private constructMarketFromQueryData;
    private queryMarket;
    filterMarkets({ statuses, tags, creator, oracle, }: {
        statuses?: MarketStatusText[];
        tags?: string[];
        creator?: string;
        oracle?: string;
    }, paginationOptions?: {
        ordering: MarketsOrdering;
        orderBy: MarketsOrderBy;
        pageSize: number;
        pageNumber: number;
    }): Promise<Market[]>;
    fetchMarketData(marketId: MarketId): Promise<Market>;
    getMarketCount(): Promise<number | null>;
    fetchDisputes(marketId: MarketId): Promise<any>;
    fetchPoolData(poolId: PoolId): Promise<Swap | null>;
    assetSpotPricesInZtg(blockHash?: any): Promise<any>;
    getBlockData(blockHash?: any): Promise<any>;
    indexTransferRecipients(startBlock?: number, endBlock?: number, arbitrarySet?: number[], filter?: any): Promise<any[]>;
    currencyTransfer: (signer: KeyringPairOrExtSigner, dest: string, currencyId: CurrencyIdOf, amount: number, callbackOrPaymentInfo?: boolean | ((result: ISubmittableResult, _unsub: () => void) => void)) => Promise<string | boolean>;
}
