declare type Options = {
    endpoint: string;
    marketId: number;
    seed: string;
    weights: string;
};
declare const deployPool: (opts: Options) => Promise<void>;
export default deployPool;
