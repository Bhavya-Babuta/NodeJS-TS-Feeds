import FeedsModel from '../../src/models/feeds';

describe('Get feeds data', () => {
  var feedsModel: FeedsModel;

  beforeEach(() => {
    feedsModel = new FeedsModel();
  });

  it('Sorting by name in ascending order', () => {
    feedsModel.sortBy('name', 'asc');
    const { feeds } = feedsModel;
    expect(feeds[0].name).toEqual('Central Creative Producer');
    expect(feeds[1].name).toEqual('Central Implementation Coordinator');
  });

  it('Sorting by dateLastEdited in ascending order', () => {
    feedsModel.sortBy('dateLastEdited', 'asc');
    const { feeds } = feedsModel;
    expect(feeds[0].dateLastEdited).toEqual('2017-10-15T21:10:51.560Z');
    expect(feeds[1].dateLastEdited).toEqual('2017-10-16T22:16:25.514Z');
  });

  it('Sorting by name in descending order', () => {
    feedsModel.sortBy('name', 'desc');
    const { feeds } = feedsModel;
    expect(feeds[0].name).toEqual(
      'The Lord of the Rings: The Return of the King'
    );
    expect(feeds[1].name).toEqual('The Lion King');
  });

  it('Sorting by dateLastEdited in descending order', () => {});

  it('Search with exact match', () => {});

  it('Search without exact match', () => {});

  it('Paginate start', () => {});

  it('Paginate end no search', () => {});

  it('Paginate end with search', () => {});
});
