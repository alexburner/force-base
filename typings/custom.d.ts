// XXX: typescript hack to allow new WorkerLoader()
// https://github.com/webpack-contrib/worker-loader/issues/69#issue-227091107
declare module 'src/worker' {
    const content:any;
    export = content;
}