declare type Options = {
    endpoint: string;
    marketId: number;
};
declare const viewDisputes: (opts: Options) => Promise<void>;
export default viewDisputes;
