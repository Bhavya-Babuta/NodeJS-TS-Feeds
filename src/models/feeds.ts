import FEEDS from '../data/mock_data.json';
import { getDoubleQuotes } from '../utils';

export default class FeedsModel {
  private _feeds: FeedItems;

  constructor() {
    this._feeds = FEEDS;
  }

  get feeds(): FeedItems {
    return this._feeds;
  }

  get total(): number {
    return this._feeds.length;
  }

  search(searchString: string) {
    const doubleQuotesString: string = getDoubleQuotes(searchString);
    searchString = searchString.replace(`"${doubleQuotesString}"`, '');
    var regexBuilder = searchString.length > 0 ? searchString.split(' ') : [];
    if (doubleQuotesString.length > 0) {
      regexBuilder.push(`${doubleQuotesString}`);
    }
    var searchRegex: RegExp = new RegExp(regexBuilder.join('|'), 'i');
    this._feeds = this.feeds.filter((el) =>
      searchRegex.test(el.name.concat(' ', el.description))
    );
  }

  // By default .sort method employs merge sort
  sortBy = (key: 'name' | 'dateLastEdited', type: 'asc' | 'desc' = 'asc') => {
    switch (key) {
      case 'name':
        this._feeds = this._feeds.sort((a, b) => a[key].localeCompare(b[key]));
        break;
      case 'dateLastEdited':
        this._feeds = this._feeds.sort((a, b) =>
          new Date(a.dateLastEdited) > new Date(b.dateLastEdited)
            ? 1
            : new Date(a.dateLastEdited) === new Date(b.dateLastEdited)
            ? 0
            : -1
        );
        break;
      default:
        break;
    }
  };

  paginate = (pageNo: number = 1, perPage: number = 10) => {
    const startIndex = (pageNo - 1) * perPage;
    const endIndex = pageNo * perPage;
    this._feeds = this._feeds.slice(startIndex, endIndex);
  };
}
