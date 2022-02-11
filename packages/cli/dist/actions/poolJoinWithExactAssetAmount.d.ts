declare type Options = {
    assetIn: string;
    assetAmount: string;
    endpoint: string;
    minPoolAmount: string;
    poolId: number;
    seed: string;
};
declare const poolJoinWithExactAssetAmount: (opts: Options) => Promise<void>;
export default poolJoinWithExactAssetAmount;
