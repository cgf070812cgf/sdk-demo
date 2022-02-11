declare type Options = {
    endpoint: string;
    amountIn: string;
    amountOut: string;
    poolId: number;
    seed: string;
};
declare const countMarkets: (opts: Options) => Promise<void>;
export default countMarkets;
