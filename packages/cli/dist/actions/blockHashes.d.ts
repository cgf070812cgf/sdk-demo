declare type Options = {
    endpoint: string;
    blocks: number[];
    link?: boolean;
};
declare const getBlockHashes: (opts: Options) => Promise<void>;
export default getBlockHashes;
