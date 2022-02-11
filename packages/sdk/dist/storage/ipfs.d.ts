import CID from "cids";
export default class IPFS {
    private client;
    constructor();
    add(content: string, hashAlg?: string): Promise<CID>;
    read(partialCid: string): Promise<string>;
}
