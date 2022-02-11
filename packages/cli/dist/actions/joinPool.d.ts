declare type Options = {
    endpoint: string;
    amountIn: string;
    amountOut: string;
    poolId: number;
    seed: string;
};
declare const joinPool: (opts: Options) => Promise<void>;
export default joinPool;
