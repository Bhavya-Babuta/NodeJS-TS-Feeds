import FeedsModel from '../../src/models/feeds';
import FEEDS from '../../src/data/mock_data.json';

describe('Get feeds data', () => {
  var feedsModel: FeedsModel;

  beforeEach(() => {
    feedsModel = new FeedsModel();
  });

  it('Sorting by name in ascending order', () => {
    feedsModel.sortBy('name', 'asc');
    const { feeds } = feedsModel;
    var isAsc = false;
    for (var i = 0; i < feeds.length - 1; i++) {
      isAsc = feeds[i].name.localeCompare(feeds[i + 1].name) < 0;
    }
    expect(isAsc).toBeTruthy();
  });

  it('Sorting by dateLastEdited in ascending order', () => {
    feedsModel.sortBy('dateLastEdited', 'asc');
    const { feeds } = feedsModel;
    var isAsc = false;

    for (var i = 0; i < feeds.length - 1; i++) {
      isAsc =
        new Date(feeds[i].dateLastEdited) <
        new Date(feeds[i + 1].dateLastEdited);
    }
    expect(isAsc).toBeTruthy();
  });

  it('Sorting by name in descending order', () => {
    feedsModel.sortBy('name', 'desc');
    const { feeds } = feedsModel;
    var isDesc = false;
    for (var i = 0; i < feeds.length - 1; i++) {
      isDesc = feeds[i].name.localeCompare(feeds[i + 1].name) >= 0;
    }
    expect(isDesc).toBeTruthy();
  });

  it('Sorting by dateLastEdited in descending order', () => {
    feedsModel.sortBy('dateLastEdited', 'desc');
    const { feeds } = feedsModel;
    var isDesc = false;

    for (var i = 0; i < feeds.length - 1; i++) {
      isDesc =
        new Date(feeds[i].dateLastEdited) >
        new Date(feeds[i + 1].dateLastEdited);
    }
    expect(isDesc).toBeTruthy();
  });

  it('Search with exact match', () => {
    feedsModel.search('"the king"');
    const { feeds } = feedsModel;
    var isTrue = false;
    var searchRegex: RegExp = new RegExp('the king', 'i');
    for (var i = 0; i < feeds.length; i++) {
      isTrue =
        searchRegex.test(feeds[i].name) ||
        searchRegex.test(feeds[i].description);
    }
    expect(isTrue).toBeTruthy();
  });

  it('Search without exact match', () => {
    feedsModel.search('the king');
    const { feeds } = feedsModel;
    var isTrue = false;
    var searchRegex: RegExp = new RegExp('the|king', 'i');

    for (var i = 0; i < feeds.length; i++) {
      isTrue =
        searchRegex.test(feeds[i].name) ||
        searchRegex.test(feeds[i].description);
    }
    expect(isTrue).toBeTruthy();
  });

  it('Search with both exact and non exact match', () => {
    feedsModel.search('the king "the king"');
    const { feeds } = feedsModel;
    var isTrue = false;
    var searchRegex: RegExp = new RegExp('the|king|the king', 'i');

    for (var i = 0; i < feeds.length; i++) {
      isTrue =
        searchRegex.test(feeds[i].name) ||
        searchRegex.test(feeds[i].description);
    }
    expect(isTrue).toBeTruthy();
  });

  it('Search with both exact and non exact match with extra spaces around double quotes', () => {
    feedsModel.search('the king  "the king" ');
    const { feeds } = feedsModel;
    var isTrue = false;
    var searchRegex: RegExp = new RegExp('the|king|the king', 'i');

    for (var i = 0; i < feeds.length; i++) {
      isTrue =
        searchRegex.test(feeds[i].name) ||
        searchRegex.test(feeds[i].description);
    }
    expect(isTrue).toBeTruthy();
  });

  it('Paginate perPage 10', () => {
    feedsModel.paginate(1, 10);
    var { feeds } = feedsModel;
    expect(feeds).toHaveLength(10);
  });

  it('Paginate perPage 20', () => {
    feedsModel.paginate(1, 20);
    var { feeds } = feedsModel;
    expect(feeds).toHaveLength(20);
  });

  it('Paginate page start', () => {
    feedsModel.paginate(1, 10);
    var { feeds } = feedsModel;
    for (var i = 0; i < feeds.length; i++) {
      expect(feeds[i]).toEqual(FEEDS[i]);
    }
    expect(feeds).toHaveLength(10);
  });

  it('Paginate end no search', () => {
    feedsModel.paginate(10, 10);
    var originalFeeds = FEEDS.slice(FEEDS.length - 10);
    var { feeds } = feedsModel;
    for (var i = 0; i < feeds.length; i++) {
      expect(feeds[i]).toEqual(originalFeeds[i]);
    }
    expect(feeds).toHaveLength(10);
  });

  it('Paginate end with search', () => {});
});
