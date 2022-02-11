declare type Options = {
    endpoint: string;
    marketId: string;
    amount: string;
    seed: string;
};
declare const buyCompleteSet: (opts: Options) => Promise<void>;
export default buyCompleteSet;
