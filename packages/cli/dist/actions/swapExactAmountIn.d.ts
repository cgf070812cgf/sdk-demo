declare type Options = {
    endpoint: string;
    assetIn: string;
    assetAmountIn: string;
    assetOut: string;
    minAmountOut: string;
    maxPrice: string;
    poolId: number;
    seed: string;
};
declare const swapExactAmountIn: (opts: Options) => Promise<void>;
export default swapExactAmountIn;
