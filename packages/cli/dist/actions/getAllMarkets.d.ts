declare type Options = {
    endpoint: string;
    filter?: string[];
};
declare const getAllMarkets: (opts: Options) => Promise<void>;
export default getAllMarkets;
