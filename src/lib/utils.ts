export const go = <T>(promise: Promise<T>) => promise.then(data => [null, data]).catch(err => [err]);
