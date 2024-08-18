const Blog = require("../models/blogItem.model.js");
const BlogCategory = require("../models/blogCategory.model.js");

const GetCategoryOnly = async (req, res) => {
  try {
    const category = await BlogCategory.find().sort({ _id: -1 });
    const response = category.map((item) => {
      return {
        id: item._id,
        categoryName: item.categoryName,
        categoryDescription: item.categoryDescription,
        blogItemId: item.blogItemId,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetBlogByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const blog = await Blog.find({ blogCategoryId: categoryId })
      .sort({
        _id: -1,
      })
      .populate("blogCategoryId");
    const response = blog.map((item) => {
      return {
        id: item._id,
        blogTitle: item.blogTitle,
        author: item.author,
        publishedDate: item.publishedDate,
        categoryId: item.blogCategoryId._id,
        categoryName: item.blogCategoryId.categoryName,
        mainContent: item.mainContent,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetLatestBlog = async (req, res) => {
  try {
    const blog = await Blog.find()
      .sort({ _id: -1 })
      .limit(5)
      .populate("blogCategoryId");
    const response = blog.map((item) => {
      return {
        id: item._id,
        blogTitle: item.blogTitle,
        author: item.author,
        publishedDate: item.publishedDate,
        categoryId: item.blogCategoryId._id,
        categoryName: item.blogCategoryId.categoryName,
        mainContent: item.mainContent,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddCategoryWithBlog = async (req, res) => {
  try {
    await BlogCategory.create({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    }).then((item) => {
      req.body.blogItem.forEach((element) => {
        Blog.create({
          blogTitle: element.blogTitle,
          author: element.author,
          publishedDate: new Date(),
          mainContent: element.mainContent,
          blogImage:req.file.filename,
          blogCategoryId: item._id,
        }).then((response) => {
          res.status(200).json(response);
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddBlogOnly = async (req, res) => {
  try {
    const blog = await Blog.create({
      blogTitle: req.body.blogTitle,
      author: req.body.author,
      publishedDate: new Date(),
      mainContent: req.body.mainContent,
      blogCategoryId: req.body.blogCategoryId,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const EditBlogOnly = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      { _id: blogId },
      {
        blogTitle: req.body.blogTitle,
        author: req.body.author,
        publishedDate: new Date(),
        mainContent: req.body.mainContent,
        blogCategoryId: req.body.blogCategoryId,
      }
    );
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const EditCategoryOnly = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await BlogCategory.findByIdAndUpdate(
      { _id: categoryId },
      {
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
      }
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findByIdAndDelete({ _id: blogId });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Blog.deleteMany({
      blogCategoryId: categoryId,
    });
    const category = await BlogCategory.findByIdAndDelete({ _id: categoryId });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetCategoryOnly,
  GetBlogByCategory,
  GetLatestBlog,
  AddBlogOnly,
  AddCategoryWithBlog,
  EditBlogOnly,
  EditCategoryOnly,
  DeleteBlog,
  DeleteCategory,
};
