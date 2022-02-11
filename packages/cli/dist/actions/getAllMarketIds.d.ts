declare type Options = {
    endpoint: string;
};
declare const getAllMarketIds: (opts: Options) => Promise<void>;
export default getAllMarketIds;
