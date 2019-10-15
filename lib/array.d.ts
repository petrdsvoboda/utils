import { Map } from './record';
declare type CompareOptions = {
    ascending?: boolean;
    isDate?: boolean;
};
export declare function sort<T extends Map<any>, K1 extends keyof T>(array: T[], options: CompareOptions, key1: K1): T[];
export declare function sort<T extends Map<any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>>(array: T[], options: CompareOptions, key1: K1, key2: K2): T[];
export declare function sort<T extends Map<any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<NonNullable<T[K1]>[K2]>>(array: T[], options: CompareOptions, key1: K1, key2: K2, key3: K3): T[];
export declare function sort<T extends Map<any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>, K4 extends keyof NonNullable<T[K1][K2][K3]>>(array: T[], options: CompareOptions, key1: K1, key2: K2, key3: K3, key4: K4): T[];
export declare function sort<T extends Map<any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>, K4 extends keyof NonNullable<T[K1][K2][K3]>, K5 extends keyof NonNullable<T[K1][K2][K3][K4]>>(array: T[], options: CompareOptions, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5): T[];
declare type MergeOptions = {
    unique?: boolean;
};
export declare function merge(left: any[], right: any[], options?: MergeOptions): any[];
export {};
