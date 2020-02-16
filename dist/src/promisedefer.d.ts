export default function promisedefer(): {
    promise: Promise<unknown>;
    reject: (reason?: any) => void;
    resolve: (value?: any) => void;
};
