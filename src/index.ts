import express, { Express, Request, Response } from 'express';
import FeedsModel from './models/feeds';

const app: Express = express();

const port: number = 8080;

app.get('/feeds', (req: Request, res: Response) => {
  console.time('requestTime');
  const { sortBy, sortType, search, pageNo, perPage }: FeedsQueryParams =
    req.query;

  const feedsModel = new FeedsModel();

  // Filter by search value
  if (search) {
    console.time('search');
    feedsModel.search(search);
    console.timeEnd('search');
  }

  // Sort post search

  const count = feedsModel.total;

  if (sortBy) {
    console.time('sort');
    feedsModel.sortBy(sortBy, sortType);
    console.timeEnd('sort');
  }

  console.time('pagination');
  // Paginate (By Default PageNumber = 1 and Per Page = 10)
  feedsModel.paginate(pageNo, perPage);
  console.timeEnd('pagination');

  const { feeds, total } = feedsModel;

  res.json({
    data: {
      feeds,
      total,
      perPage,
      pageNo,
      count
    }
  });
  console.timeEnd('requestTime');
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});