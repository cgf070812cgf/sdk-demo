import ipfsClient from "ipfs-http-client";
export declare const initIpfs: () => {
    add: (input: import("ipfs-core-types/src/files").ToEntry, options?: import("ipfs-core-types/src/root").AddAllOptions & ipfsClient.HttpOptions) => Promise<import("ipfs-core-types/src/files").UnixFSEntry>;
    addAll: (source: import("ipfs-core-types/src/files").ImportSource, options?: import("ipfs-core-types/src/root").AddAllOptions & ipfsClient.HttpOptions) => AsyncIterable<import("ipfs-core-types/src/files").UnixFSEntry>;
    bitswap: {
        wantlist: (options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<import("cids")[]>;
        wantlistForPeer: (peerId: string | Uint8Array | import("cids") | import("peer-id"), options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<import("cids")[]>;
        stat: (options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
        unwant: (cid: import("cids") | import("cids")[], options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<void>;
    };
    block: {
        get: (cid: string | Uint8Array | import("cids"), options?: any) => Promise<import("ipfs-core-types/src/block-service").Block>;
        stat: (cid: import("cids"), options?: any) => Promise<any>;
        put: (data: Uint8Array | import("ipfs-core-types/src/block-service").Block, options?: any) => Promise<import("ipfs-core-types/src/block-service").Block>;
        rm: (cid: import("cids") | import("cids")[], options?: any) => AsyncIterable<any>;
    };
    bootstrap: {
        add: (addr: import("multiaddr"), options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
        clear: (options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
        rm: (addr: import("multiaddr"), options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
        reset: (options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
        list: (options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
    };
    cat: (path: import("ipfs-core-types/src/root").IPFSPath, options?: import("ipfs-core-types/src/root").CatOptions & ipfsClient.HttpOptions) => AsyncIterable<Uint8Array>;
    commands: (options?: {}) => Promise<any>;
    config: {
        getAll: import("ipfs-http-client/src/interface").APIWithExtraOptions<(options?: import("ipfs-core-types").AbortOptions) => Promise<any>, ipfsClient.HttpOptions>;
        get: import("ipfs-http-client/src/interface").APIWithExtraOptions<(key: string, options?: import("ipfs-core-types").AbortOptions) => Promise<import("ipfs-core-types/src/basic").ToJSON>, ipfsClient.HttpOptions>;
        set: import("ipfs-http-client/src/interface").APIWithExtraOptions<(key: string, value: import("ipfs-core-types/src/basic").ToJSON, options?: import("ipfs-core-types").AbortOptions) => Promise<void>, ipfsClient.HttpOptions>;
        replace: import("ipfs-http-client/src/interface").APIWithExtraOptions<(value: any, options?: import("ipfs-core-types").AbortOptions) => Promise<void>, ipfsClient.HttpOptions>;
        profiles: {
            apply: (profile: any, options?: {}) => Promise<{
                original: any;
                updated: any;
            }>;
            list: (options?: {}) => Promise<any>;
        };
    };
    dag: {
        get: import("ipfs-http-client/src/interface").APIWithExtraOptions<(ipfsPath: import("ipfs-core-types/src/root").IPFSPath, options?: any) => Promise<any>, ipfsClient.HttpOptions>;
        put: import("ipfs-http-client/src/interface").APIWithExtraOptions<(dagNode: any, options?: any) => Promise<import("cids")>, ipfsClient.HttpOptions>;
        resolve: import("ipfs-http-client/src/interface").APIWithExtraOptions<(ipfsPath: import("ipfs-core-types/src/root").IPFSPath, options?: any) => Promise<any>, ipfsClient.HttpOptions>;
    };
    dht: {
        get: (key: string | Uint8Array, options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<Uint8Array>;
        put: (key: Uint8Array, value: Uint8Array, options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => AsyncIterable<any>;
        findProvs: (cid: import("cids"), options?: any) => AsyncIterable<any>;
        findPeer: (peerId: import("cids") | import("peer-id"), options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<{
            id: string;
            addrs: import("multiaddr")[];
        }>;
        provide: (cids: import("cids") | import("cids")[], options?: any) => AsyncIterable<any>;
        query: (peerId: string | import("peer-id"), options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => AsyncIterable<{
            id: import("cids");
            addrs: import("multiaddr")[];
        }>;
    };
    diag: {
        net: (options?: {}) => Promise<any>;
        sys: (options?: {}) => Promise<any>;
        cmds: (options?: {}) => Promise<any>;
    };
    dns: import("ipfs-http-client/src/interface").APIWithExtraOptions<(domain: string, options?: any) => Promise<string>, ipfsClient.HttpOptions>;
    files: {
        chmod: (path: string, mode: string | number, options?: any) => Promise<void>;
        cp: (...args: [a1: import("ipfs-core-types/src/root").IPFSPath, options?: any] | [a1: import("ipfs-core-types/src/root").IPFSPath, a2: import("ipfs-core-types/src/root").IPFSPath, options?: any] | [a1: import("ipfs-core-types/src/root").IPFSPath, a2: import("ipfs-core-types/src/root").IPFSPath, a3: import("ipfs-core-types/src/root").IPFSPath, options?: any]) => Promise<void>;
        flush: (path: string, options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<import("cids")>;
        ls: (path: string, options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => AsyncIterable<any>;
        mkdir: (path: string, options?: any) => Promise<void>;
        mv: (...args: [a1: string, a2: string, options?: any] | [a1: string, a2: string, a3: string, options?: any]) => Promise<void>;
        read: (path: import("ipfs-core-types/src/root").IPFSPath, options?: any) => AsyncIterable<Uint8Array>;
        rm: (...args: [a1: string, options?: any] | [a1: string, a2: string, options?: any] | [a1: string, a2: string, a3: string, options?: any]) => Promise<void>;
        stat: (path: string, options?: any) => Promise<any>;
        touch: (path: string, options?: any) => Promise<void>;
        write: (path: string, input: string | Uint8Array | AsyncIterable<Uint8Array> | Blob, options?: any) => Promise<void>;
    };
    get: (path: import("ipfs-core-types/src/root").IPFSPath, options?: import("ipfs-core-types/src/root").GetOptions & ipfsClient.HttpOptions) => AsyncIterable<import("ipfs-core-types/src/files").IPFSEntry>;
    getEndpointConfig: () => {
        host: string;
        port: string;
        protocol: string;
        pathname: string;
        'api-path': string;
    };
    id: (options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
    key: {
        gen: (name: any, options?: {}) => Promise<any>;
        list: (options?: {}) => Promise<any>;
        rename: (oldName: any, newName: any, options?: {}) => Promise<any>;
        rm: (name: any, options?: {}) => Promise<any>;
        import: (name: any, pem: any, password: any, options?: {}) => Promise<any>;
    };
    log: {
        tail: (options?: {}) => AsyncGenerator<any, void, undefined>;
        ls: (options?: {}) => Promise<any>;
        level: (subsystem: any, level: any, options?: {}) => Promise<any>;
    };
    ls: (path: any, options?: {}) => AsyncGenerator<{
        name: any;
        path: string;
        size: any;
        cid: import("cids");
        type: string;
        depth: any;
    }, void, undefined>;
    mount: (options?: {}) => Promise<any>;
    name: {
        publish: (path: any, options?: {}) => Promise<any>;
        resolve: (path: any, options?: {}) => AsyncGenerator<any, void, unknown>;
        pubsub: {
            cancel: (name: any, options?: {}) => Promise<any>;
            state: (options?: {}) => Promise<any>;
            subs: (options?: {}) => Promise<any>;
        };
    };
    object: {
        data: (cid: any, options?: {}) => Promise<Uint8Array>;
        get: (cid: any, options?: {}) => Promise<any>;
        links: (cid: any, options?: {}) => Promise<any>;
        new: (options?: {}) => Promise<import("cids")>;
        patch: {
            addLink: (cid: any, dLink: any, options?: {}) => Promise<import("cids")>;
            appendData: (cid: any, data: any, options?: {}) => Promise<import("cids")>;
            rmLink: (cid: any, dLink: any, options?: {}) => Promise<import("cids")>;
            setData: (cid: any, data: any, options?: {}) => Promise<import("cids")>;
        };
        put: (obj: any, options?: {}) => Promise<import("cids")>;
        stat: (cid: any, options?: {}) => Promise<any>;
    };
    pin: {
        add: (path: any, options?: {}) => Promise<import("cids")>;
        addAll: (source: any, options?: {}) => AsyncGenerator<import("cids"), void, unknown>;
        ls: (options?: {}) => AsyncGenerator<{
            type: any;
            cid: import("cids");
        }, void, unknown>;
        rm: (path: any, options?: {}) => Promise<any>;
        rmAll: (source: any, options?: {}) => AsyncGenerator<any, void, any>;
        remote: import("ipfs-http-client/src/pin/remote");
    };
    ping: (peerId: any, options?: {}) => AsyncGenerator<any, void, undefined>;
    pubsub: {
        ls: (options?: {}) => Promise<any>;
        peers: (topic: any, options?: {}) => Promise<any>;
        publish: (topic: any, data: any, options?: {}) => Promise<void>;
        subscribe: (topic: any, handler: any, options?: {}) => Promise<any>;
        unsubscribe: (topic: any, handler: any) => Promise<any>;
    };
    refs: {
        (args: any, options?: {}): AsyncGenerator<any, void, undefined>;
        local: (options?: {}) => AsyncGenerator<any, void, undefined>;
    };
    repo: {
        gc: (options?: {}) => AsyncGenerator<any, void, undefined>;
        stat: (options?: {}) => Promise<{
            numObjects: import("bignumber.js").default;
            repoSize: import("bignumber.js").default;
            repoPath: any;
            version: any;
            storageMax: import("bignumber.js").default;
        }>;
        version: (options?: {}) => Promise<any>;
    };
    resolve: (path: string, options?: any) => Promise<string>;
    stats: {
        bitswap: (options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
        bw: (options?: {}) => AsyncGenerator<any, void, undefined>;
        repo: (options?: {}) => Promise<{
            numObjects: import("bignumber.js").default;
            repoSize: import("bignumber.js").default;
            repoPath: any;
            version: any;
            storageMax: import("bignumber.js").default;
        }>;
    };
    stop: (options?: {}) => Promise<void>;
    shutdown: (options?: {}) => Promise<void>;
    swarm: {
        addrs: (options?: {}) => Promise<{
            id: string;
            addrs: any;
        }[]>;
        connect: (addrs: any, options?: {}) => Promise<any>;
        disconnect: (addrs: any, options?: {}) => Promise<any>;
        localAddrs: (options?: {}) => Promise<any>;
        peers: (options?: {}) => Promise<any>;
    };
    version: (options?: import("ipfs-core-types").AbortOptions & ipfsClient.HttpOptions) => Promise<any>;
};
