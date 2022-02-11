declare type Options = {
    poolId: string;
    assetIn: string;
    assetOut: string;
    blocks: string;
    endpoint: string;
    displayWeights?: boolean;
};
declare const viewSpotPrices: (opts: Options) => Promise<void>;
export default viewSpotPrices;
