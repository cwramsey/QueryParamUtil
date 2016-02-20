interface IQueryParamUtil {
    find(name:string, default_val:any = null, query_string:string = window.location.search):string;
    all(query_string:string = window.location.search): string[];
    _mergeArrayParams(prev:any, curr:any, key:number, arr:string[]):string[];
}