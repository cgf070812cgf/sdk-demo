declare type Options = {
    block: string | number;
    endpoint: string;
};
declare const getAssetsPrices: (opts: Options) => Promise<void>;
export default getAssetsPrices;
