declare type Options = {
    endpoint: string;
    assetIn: string;
    maxAmountIn: string;
    assetOut: string;
    assetAmountOut: string;
    maxPrice: string;
    poolId: number;
    seed: string;
};
declare const swapExactAmountOut: (opts: Options) => Promise<void>;
export default swapExactAmountOut;
