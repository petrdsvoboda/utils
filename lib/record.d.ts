export declare function get<T extends Record<string, any>, K1 extends keyof T>(record: T | undefined, key1: K1): T[K1] | undefined;
export declare function get<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>>(record: T | undefined, key1: K1, key2: K2): T[K1][K2] | undefined;
export declare function get<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>>(record: T | undefined, key1: K1, key2: K2, key3: K3): T[K1][K2][K3] | undefined;
export declare function get<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>, K4 extends keyof NonNullable<T[K1][K2][K3]>>(record: T | undefined, key1: K1, key2: K2, key3: K3, key4: K4): T[K1][K2][K3][K4] | undefined;
export declare function get<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>, K4 extends keyof NonNullable<T[K1][K2][K3]>, K5 extends keyof NonNullable<T[K1][K2][K3][K4]>>(record: T | undefined, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5): T[K1][K2][K3][K4][K5] | undefined;
export declare function set<T extends Record<string, any>, K1 extends keyof T>(record: T | undefined, key1: K1): (value: T[K1]) => T;
export declare function set<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>>(record: T | undefined, key1: K1, key2: K2): (value: T[K1][K2]) => T;
export declare function set<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>>(record: T | undefined, key1: K1, key2: K2, key3: K3): (value: T[K1][K2][K3]) => T;
export declare function set<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>, K4 extends keyof NonNullable<T[K1][K2][K3]>>(record: T | undefined, key1: K1, key2: K2, key3: K3, key4: K4): (value: T[K1][K2][K3][K4]) => T;
export declare function set<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>, K4 extends keyof NonNullable<T[K1][K2][K3]>, K5 extends keyof NonNullable<T[K1][K2][K3][K4]>>(record: T | undefined, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5): (value: T[K1][K2][K3][K4][K5]) => T;
declare type UpdateFn<T> = (value: T) => T;
export declare function update<T extends Record<string, any>, K1 extends keyof T>(record: T | undefined, key1: K1): (callback: UpdateFn<NonNullable<T[K1]>>) => T;
export declare function update<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>>(record: T | undefined, key1: K1, key2: K2): (callback: UpdateFn<NonNullable<NonNullable<T[K1]>[K2]>>) => T;
export declare function update<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>>(record: T | undefined, key1: K1, key2: K2, key3: K3): (callback: UpdateFn<NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>>) => T;
export declare function update<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>, K4 extends keyof NonNullable<T[K1][K2][K3]>>(record: T | undefined, key1: K1, key2: K2, key3: K3, key4: K4): (callback: UpdateFn<NonNullable<NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>[K4]>>) => T;
export declare function update<T extends Record<string, any>, K1 extends keyof T, K2 extends keyof NonNullable<T[K1]>, K3 extends keyof NonNullable<T[K1][K2]>, K4 extends keyof NonNullable<T[K1][K2][K3]>, K5 extends keyof NonNullable<T[K1][K2][K3][K4]>>(record: T | undefined, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5): (callback: UpdateFn<NonNullable<NonNullable<NonNullable<NonNullable<NonNullable<T[K1]>[K2]>[K3]>[K4]>[K5]>>) => T;
export declare const toArray: <T extends any>(record: Record<string, T>) => T[];
export declare function merge<T extends Record<string, any>, U extends Record<string, any>>(left: undefined, right: undefined): undefined;
export declare function merge<T extends Record<string, any>, U extends Record<string, any>>(left: T, right: undefined): T;
export declare function merge<T extends Record<string, any>, U extends Record<string, any>>(left: undefined, right: U): U;
export declare function merge<T extends Record<string, any>, U extends Record<string, any>>(left: T, right: U): T & U;
export declare function map<T>(record: Record<string, T>, callback: (value: T) => T): Record<string, T>;
export declare function map<T, U>(record: Record<string, T>, callback: (value: T) => U): Record<string, U>;
export declare function reduce<T, U>(record: Record<string, T>, callback: (acc: U, curr: T, index: number) => U, initialValue: U): U;
export {};
