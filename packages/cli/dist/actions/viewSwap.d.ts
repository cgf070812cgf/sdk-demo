declare type Options = {
    endpoint: string;
    marketId: string;
};
declare const viewSwap: (opts: Options) => Promise<void>;
export default viewSwap;
