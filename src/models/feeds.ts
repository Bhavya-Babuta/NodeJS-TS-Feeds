import FEEDS from '../data/mock_data.json';
import { getDoubleQuotedString } from '../utils';

export default class FeedsModel {
  private _feeds: FeedItems;

  constructor() {
    this._feeds = FEEDS;
  }

  get feeds(): FeedItems {
    return this._feeds;
  }

  get count(): number {
    return this._feeds.length;
  }

  search(searchString: string) {
    const doubleQuotesString: string = getDoubleQuotedString(searchString);
    searchString = searchString.replace(`"${doubleQuotesString}"`, '').trim();
    console.log('Search string: ', searchString);
    var regexBuilder = searchString.length > 0 ? searchString.split(' ') : [];
    console.log(regexBuilder);
    doubleQuotesString.length > 0 && regexBuilder.push(`${doubleQuotesString}`);
    var searchRegex: RegExp = new RegExp(regexBuilder.join('|'), 'i');
    this._feeds = this.feeds.filter((el) =>
      searchRegex.test(el.name.concat(' ', el.description))
    );
  }

  // By default .sort method employs merge sort O(n logn) in average case
  sortBy = (key: 'name' | 'dateLastEdited', type: 'asc' | 'desc' = 'asc') => {
    switch (key) {
      case 'name':
        this._feeds.sort(
          (a, b) => (type === 'asc' ? 1 : -1) * a[key].localeCompare(b[key])
        );
        break;
      case 'dateLastEdited':
        this._feeds.sort((a, b) => {
          if (type === 'desc') {
            return new Date(a.dateLastEdited) < new Date(b.dateLastEdited)
              ? 1
              : new Date(a.dateLastEdited) === new Date(b.dateLastEdited)
              ? 0
              : -1;
          }
          return new Date(a.dateLastEdited) > new Date(b.dateLastEdited)
            ? 1
            : new Date(a.dateLastEdited) === new Date(b.dateLastEdited)
            ? 0
            : -1;
        });
        break;
      default:
        break;
    }
  };

  // slice complexity O(N) where N = endIndex - startIndex
  paginate = (pageNo: number = 1, perPage: number = 10) =>
    (this._feeds = this._feeds.slice((pageNo - 1) * perPage, pageNo * perPage));
}
