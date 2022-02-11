declare type Options = {
    endpoint: string;
    seed: string;
};
declare const deployKusamaDerby: (opts: Options) => Promise<void>;
export default deployKusamaDerby;
