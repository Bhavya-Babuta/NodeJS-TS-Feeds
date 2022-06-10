interface Feed {
  name: string;
  image: string;
  description: string;
  dateLastEdited: string;
}

interface FeedItems extends Array<Feed> {}
