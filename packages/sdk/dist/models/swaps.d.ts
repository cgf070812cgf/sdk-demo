import { ApiPromise } from "@polkadot/api";
import { ISubmittableResult } from "@polkadot/types/types";
import { KeyringPairOrExtSigner, AssetId, poolJoinOpts } from "../types";
import { Asset, Pool } from "@zeitgeistpm/types/dist/interfaces/index";
export default class Swap {
    assets: Asset[];
    status: string;
    swapFee: string;
    totalWeight: string;
    weights: any;
    poolId: number;
    private api;
    constructor(poolId: number, details: Pool, api: ApiPromise);
    toJSONString(): string;
    getSpotPrice(inAsset: string | Asset, outAsset: string | Asset, blockHash?: any): Promise<any>;
    assetSpotPricesInZtg(blockHash?: any): Promise<{
        [key: string]: string;
    }>;
    fetchPoolSpotPrices(inAsset: string | AssetId, outAsset: string | AssetId, blockNumbers: number[]): Promise<any>;
    sharesId(): Promise<any>;
    accountId(): Promise<any>;
    joinPool: (signer: KeyringPairOrExtSigner, poolAmountOut: string, maxAmountsIn: string[], callbackOrPaymentInfo?: boolean | ((result: ISubmittableResult, _unsub: () => void) => void)) => Promise<string | boolean>;
    poolJoinWithExactAssetAmount: (signer: KeyringPairOrExtSigner, assetIn: any, assetAmount: any, minPoolAmount: any, callbackOrPaymentInfo?: boolean | ((result: ISubmittableResult, _unsub: () => void) => void)) => Promise<string | boolean>;
    joinPoolMultifunc: (signer: KeyringPairOrExtSigner, opts: poolJoinOpts, callbackOrPaymentInfo?: boolean | ((result: ISubmittableResult, _unsub: () => void) => void)) => Promise<string | boolean>;
    exitPool: (signer: KeyringPairOrExtSigner, poolAmountIn: string, minAmountsOut: string[], callbackOrPaymentInfo?: boolean | ((result: ISubmittableResult, _unsub: () => void) => void)) => Promise<string | boolean>;
    swapExactAmountIn: (signer: KeyringPairOrExtSigner, assetIn: string, assetAmountIn: string, assetOut: string, minAmountOut: string, maxPrice: string, callbackOrPaymentInfo?: boolean | ((result: ISubmittableResult, _unsub: () => void) => void)) => Promise<string | boolean>;
    swapExactAmountOut: (signer: KeyringPairOrExtSigner, assetIn: string, maxAmountIn: string, assetOut: string, assetAmountOut: string, maxPrice: string, callbackOrPaymentInfo?: boolean | ((result: ISubmittableResult, _unsub: () => void) => void)) => Promise<string | boolean>;
}
