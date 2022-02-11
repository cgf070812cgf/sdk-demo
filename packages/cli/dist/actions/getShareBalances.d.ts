declare type Options = {
    addressOrSeed: string;
    seed?: string;
    address?: string;
    marketId?: number;
    endpoint: string;
};
declare const getShareBalances: (opts: Options) => Promise<void>;
export default getShareBalances;
