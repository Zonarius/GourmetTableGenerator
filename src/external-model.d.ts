type nodeFunction = (...args: any[]) => void;
type promisified = (...args: any[]) => Promise<any>;
declare var promisify: (input: nodeFunction) => promisified;
declare module 'es6-promisify' {
    export = promisify;
}
