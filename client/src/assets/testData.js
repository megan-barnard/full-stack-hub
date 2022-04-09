const users = {
  testacc1: {
    id: "testacc1",
    email: "test1@gmail.com",
    password: "test1",
    displayName: "Test 1",
    avatarSrc: "https://www.bioid.com/wp-content/uploads/face-database-bioid.jpg",
    bannerSrc: "https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg",
    bio: "This is my bio",
    bioUrl: "http://fco.gov.uk",
    joined: "2016-02-02T12:00",
    followingIds: ["testacc2"],
    followerIds: ["testacc2"],
    likeIds: ["test2"],
    postIds: ["test1"]
  },
  testacc2: {
    id: "testacc2",
    email: "test2@gmail.com",
    password: "test2",
    displayName: "Test 2",
    avatarSrc: "https://www.bioid.com/wp-content/uploads/face-database-bioid.jpg",
    bannerSrc: "https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg",
    bio: "This is my bio",
    bioUrl: "http://fco.gov.uk",
    joined: "2016-02-02T12:00",
    followingIds: ["testacc1"],
    followerIds: ["testacc1"],
    likeIds: ["test1"],
    postIds: ["test2"]
  },
  testacc3: {
    id: "testacc3",
    email: "test3@gmail.com",
    password: "test3",
    displayName: "Test 3",
    avatarSrc: "https://www.bioid.com/wp-content/uploads/face-database-bioid.jpg",
    bannerSrc: "https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg",
    bio: "This is my bio",
    bioUrl: "http://fco.gov.uk",
    joined: "2016-02-02T12:00",
    followingIds: ["testacc4"],
    followerIds: ["testacc4"],
    likeIds: ["test4"],
    postIds: ["test3"]
  },
  testacc4: {
    id: "testacc4",
    email: "test4@gmail.com",
    password: "test4",
    displayName: "Test 4",
    avatarSrc: "https://www.bioid.com/wp-content/uploads/face-database-bioid.jpg",
    bannerSrc: "https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg",
    bio: "This is my bio 4",
    bioUrl: "http://fco.gov.uk",
    joined: "2016-02-02T12:00",
    followingIds: ["testacc3"],
    followerIds: ["testacc3"],
    likeIds: ["test3"],
    postIds: ["test4"]
  },
  
};

const posts = {
  // TreasuryMog
  "test1": {
    id: "test1",
    authorHandle: "testacc1",
    timestamp: "2020-01-19T09:14:00+00:00",
    sortedTimestamp: "2020-01-19T09:14:00+00:00",
    likedBy: ["test2"],
    status: "Look how cool",
    media: [
      {
        type: "img",
        url: "https://www.economist.com/sites/default/files/images/2015/09/blogs/economist-explains/code2.png",
      },
    ],
  },
  "test2": {
    id: "test2",
    authorHandle: "testacc2",
    timestamp: "2020-01-12T09:14:00+00:00",
    sortedTimestamp: "2020-01-12T09:14:00+00:00",
    likedBy: ["test1"],
    status: "Ok people #backtowork you go. I'm so smart. Lol",
    media: [
      {
        type: "img",
        url: "https://static01.nyt.com/images/2022/04/04/multimedia/15ai-nocode/15ai-nocode-mediumSquareAt3X.jpg",
      },
    ],
  },
  "test3": {
    id: "test3",
    authorHandle: "testacc3",
    timestamp: "2019-12-29T22:19:00+00:00",
    sortedTimestamp: "2019-12-29T22:19:00+00:00",
    likedBy: ["test4"],
    status: "The principle of coding is so cool and fun.",
    media: [],
  },
  "test4": {
    id: "test4",
    authorHandle: "testacc4",
    timestamp: "2019-12-29T22:19:00+00:00",
    sortedTimestamp: "2019-12-29T22:19:00+00:00",
    likedBy: ["test3"],
    status: `"The principle of giant military cats deterrence states that a country’s possession of giant military cats discourages other countries from using giant military cats".`,
    media: [],
  }
};

module.exports = {
  users,
  posts,
};
