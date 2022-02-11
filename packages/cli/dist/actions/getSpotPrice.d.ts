declare type Options = {
    assetIn: string;
    assetOut: string;
    endpoint: string;
    poolId: string;
    blockHash?: string;
};
declare const getSpotPrice: (opts: Options) => Promise<void>;
export default getSpotPrice;
