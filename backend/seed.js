// seed.js
const mongoose = require("mongoose");
const Blog = require("./models/Blog"); // adjust path if needed
const User = require("./models/User"); // assuming you have a User model
require('dotenv').config();


const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)

    console.log("MongoDB connected");

    // Optional: clear existing blogs
    await Blog.deleteMany({});
    console.log("Existing blogs cleared");

    // Dummy users (you can adjust or create real users in DB)
    const users = [
      { _id: new mongoose.Types.ObjectId(), name: "Alice Johnson" },
      { _id: new mongoose.Types.ObjectId(), name: "Bob Smith" },
      { _id: new mongoose.Types.ObjectId(), name: "Charlie Brown" },
      { _id: new mongoose.Types.ObjectId(), name: "Diana Prince" },
      { _id: new mongoose.Types.ObjectId(), name: "Ethan Hunt" },
      { _id: new mongoose.Types.ObjectId(), name: "Fiona Gallagher" },
      { _id: new mongoose.Types.ObjectId(), name: "George Martin" },
      { _id: new mongoose.Types.ObjectId(), name: "Hannah Lee" },
      { _id: new mongoose.Types.ObjectId(), name: "Ian Somerhalder" },
      { _id: new mongoose.Types.ObjectId(), name: "Julia Roberts" },
    ];

    // Optionally insert users into DB if you want references to exist
    // await User.insertMany(users);

    const blogs = [
      {
        title: "5 Tips for Creative Writing",
        description:
          "Learn how to improve your storytelling, build engaging characters, and structure your narrative effectively.",
        pictures: ["https://via.placeholder.com/400x200?text=Creative+Writing"],
        creator: users[0]._id,
        comments: [],
        totalLikes: 12,
        likedBy: [users[1]._id, users[2]._id],
        tags: ["writing", "creativity"],
        category: "Writing",
      },
      {
        title: "Understanding Poetry",
        description:
          "Dive into the world of poetry and explore different forms, styles, and techniques to express yourself.",
        pictures: ["https://via.placeholder.com/400x200?text=Poetry"],
        creator: users[1]._id,
        comments: [],
        totalLikes: 8,
        likedBy: [users[0]._id],
        tags: ["poetry", "literature"],
        category: "Poetry",
      },
      {
        title: "How to Start a Blog",
        description:
          "Step-by-step guide to creating a blog, picking a niche, and writing content that resonates with your audience.",
        pictures: ["https://via.placeholder.com/400x200?text=Blogging"],
        creator: users[2]._id,
        comments: [],
        totalLikes: 20,
        likedBy: [users[0]._id, users[1]._id],
        tags: ["blogging", "tips"],
        category: "Blogging",
      },
      {
        title: "Writing for Social Media",
        description:
          "Tips and tricks to engage your audience on social media platforms through compelling posts and visuals.",
        pictures: ["https://via.placeholder.com/400x200?text=Social+Media"],
        creator: users[3]._id,
        comments: [],
        totalLikes: 15,
        likedBy: [users[1]._id, users[2]._id],
        tags: ["social media", "writing"],
        category: "Social Media",
      },
      {
        title: "Mastering Short Stories",
        description:
          "Learn how to write short stories that leave an impact and keep your readers hooked from start to finish.",
        pictures: ["https://via.placeholder.com/400x200?text=Short+Stories"],
        creator: users[4]._id,
        comments: [],
        totalLikes: 25,
        likedBy: [users[0]._id, users[2]._id, users[3]._id],
        tags: ["fiction", "short stories"],
        category: "Fiction",
      },
      {
        title: "Journaling for Self-Improvement",
        description:
          "Explore how journaling can boost your creativity, mindfulness, and personal growth.",
        pictures: ["https://via.placeholder.com/400x200?text=Journaling"],
        creator: users[5]._id,
        comments: [],
        totalLikes: 18,
        likedBy: [users[1]._id, users[4]._id],
        tags: ["self-help", "journaling"],
        category: "Self-Help",
      },
      {
        title: "Building Characters That Resonate",
        description:
          "Tips for creating memorable characters that readers will love and remember.",
        pictures: ["https://via.placeholder.com/400x200?text=Characters"],
        creator: users[6]._id,
        comments: [],
        totalLikes: 22,
        likedBy: [users[0]._id, users[2]._id, users[5]._id],
        tags: ["writing", "characters"],
        category: "Writing",
      },
      {
        title: "Exploring Fantasy Worlds",
        description:
          "Create immersive worlds for your readers with these world-building techniques.",
        pictures: ["https://via.placeholder.com/400x200?text=Fantasy"],
        creator: users[7]._id,
        comments: [],
        totalLikes: 30,
        likedBy: [users[1]._id, users[3]._id, users[4]._id],
        tags: ["fantasy", "world-building"],
        category: "Fiction",
      },
      {
        title: "Blog SEO Basics",
        description:
          "Learn how to optimize your blog posts for search engines and attract more readers.",
        pictures: ["https://via.placeholder.com/400x200?text=SEO"],
        creator: users[8]._id,
        comments: [],
        totalLikes: 10,
        likedBy: [users[0]._id, users[6]._id],
        tags: ["blogging", "SEO"],
        category: "Blogging",
      },
      {
        title: "Engaging Your Audience",
        description:
          "Tips to interact with readers and build a loyal community around your content.",
        pictures: ["https://via.placeholder.com/400x200?text=Engagement"],
        creator: users[9]._id,
        comments: [],
        totalLikes: 28,
        likedBy: [users[1]._id, users[2]._id, users[7]._id],
        tags: ["community", "engagement"],
        category: "Social Media",
      },
    ];

    await Blog.insertMany(blogs);
    console.log("Dummy blogs inserted successfully");

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seed();
