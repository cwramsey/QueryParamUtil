interface IQueryParamUtil {
    find(name: string, default_val: any = null):string;
    all(): string[];
    _mergeArrayParams(prev: any, curr: any, key: number, arr: string[]):string[];
}