declare type Options = {
    endpoint: string;
    amountIn: string;
    amountOut: string;
    poolId: number;
    seed: string;
};
declare const exitPool: (opts: Options) => Promise<void>;
export default exitPool;
