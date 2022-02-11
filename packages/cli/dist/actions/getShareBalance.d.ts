declare type Options = {
    addressOrSeed: string;
    seed?: string;
    address?: string;
    asset: string;
    endpoint: string;
};
declare const getShareBalance: (opts: Options) => Promise<void>;
export default getShareBalance;
