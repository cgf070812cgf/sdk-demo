import { ApiPromise } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import "@zeitgeistpm/types";
export declare const initApi: (endpoint?: string) => Promise<ApiPromise>;
export declare const unsubOrWarns: (unsub: () => void) => void;
export declare const signerFromSeed: (seed: string) => KeyringPair;
export declare const isValidAddress: (address: any) => boolean;
