const { sequelize, User, Profile, Post, Comment, Like } = require('./index');

describe('Database Connection and Associations', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Database connection works', async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });

  test('User-Profile association', async () => {
    const user = await User.create({
      username: 'john_doe',
      email: 'john_doe@example.com'
    });
    const profile = await Profile.create({
      bio: "I'm a software engineer",
      profilePicture: "https://example.com/profile1.jpg",
      birthday: "1990-06-15"
    });
    await user.setProfile(profile);
    const userProfile = await user.getProfile();
    expect(userProfile.bio).toBe("I'm a software engineer");
  });

  test('User-Post association', async () => {
    const user = await User.create({
      username: 'jane_doe',
      email: 'jane_doe@example.com'
    });
    const post = await Post.create({
      title: "Hiking in Yosemite",
      body: "I had an amazing time hiking in Yosemite National Park!",
      createdAt: "2022-03-15T10:30:00.000Z"
    });
    await user.addPost(post);
    const userPosts = await user.getPosts();
    expect(userPosts.length).toBe(1);
    expect(userPosts[0].title).toBe("Hiking in Yosemite");
  });

  test('Post-Comment association', async () => {
    const post = await Post.create({
      title: "London Street Photography",
      body: "Here are some of my recent street photography shots from London.",
      createdAt: "2022-03-18T14:15:00.000Z"
    });
    const comment = await Comment.create({
      body: "This is a great post!",
      createdAt: "2022-01-01T12:00:00Z"
    });
    await post.addComment(comment);
    const postComments = await post.getComments();
    expect(postComments.length).toBe(1);
    expect(postComments[0].body).toBe("This is a great post!");
  });

  test('User-Like association', async () => {
    const user = await User.create({
      username: 'bob_smith',
      email: 'bob_smith@example.com'
    });
    const like = await Like.create({
      reactionType: "👍",
      createdAt: "2022-03-20T10:00:00Z"
    });
    await user.addLike(like);
    const userLikes = await user.getLikes();
    expect(userLikes.length).toBe(1);
    expect(userLikes[0].reactionType).toBe("👍");
  });

  test('Post-Like association', async () => {
    const post = await Post.create({
      title: "New JavaScript Framework",
      body: "I'm excited to announce the release of our new JavaScript framework!",
      createdAt: "2022-03-21T09:00:00.000Z"
    });
    const like = await Like.create({
      reactionType: "❤️",
      createdAt: "2022-03-21T12:30:00Z"
    });
    await post.addLike(like);
    const postLikes = await post.getLikes();
    expect(postLikes.length).toBe(1);
    expect(postLikes[0].reactionType).toBe("❤️");
  });
});