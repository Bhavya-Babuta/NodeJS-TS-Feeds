interface FeedsQueryParams {
  sortBy?: 'name' | 'dateLastEdited';
  sortType?: 'asc' | 'desc';
  search?: string;
  pageNo?: number;
  perPage?: number;
}
