export interface UseFetchOptions {
  initialState?: any;
  format?: (data: any) => any;
  beforeLoad?: () => void;
  afterLoad?: (data: any) => void;
  afterError?: (error: any) => void;
  method?: string;
  endpoint?: string;
  path?: string;
  urlParams?: any[];
  params?: any;
  autoLoad?: boolean;
  reloadValue?: any;
}

declare function useFetch(options: UseFetchOptions): [() => void, any, boolean, any];
export default useFetch;
