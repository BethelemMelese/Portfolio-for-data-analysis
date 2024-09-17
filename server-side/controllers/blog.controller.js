const Blog = require("../models/blogItem.model.js");
const BlogCategory = require("../models/blogCategory.model.js");
const { format } = require("date-fns");
const { decode } = require("html-entities");

const GetCategoryOnly = async (req, res) => {
  try {
    const category = await BlogCategory.find().sort({ _id: -1 });
    const response = category.map((item) => {
      return {
        id: item._id,
        categoryName: item.categoryName,
        categoryDescription: item.categoryDescription,
        categoryImage: item.categoryImage,
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
        publishedDate: format(item.publishedDate, "MMMM do yyyy"),
        categoryId: item.blogCategoryId._id,
        categoryName: item.blogCategoryId.categoryName,
        mainContent: item.mainContent,
        blogImage: item.blogImage,
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
      .limit(4)
      .populate("blogCategoryId");
    const response = blog.map((item) => {
      return {
        id: item._id,
        blogTitle: item.blogTitle,
        author: item.author,
        publishedDate: format(item.publishedDate, "MMMM do yyyy"),
        categoryId: item.blogCategoryId._id,
        categoryName: item.blogCategoryId.categoryName,
        mainContent: item.mainContent,
        blogImage: item.blogImage,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddCategoryOnly = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const category = await BlogCategory.create({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
      categoryImage: {
        filename: originalname,
        data: buffer,
        contentType: mimetype,
      },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddBlogOnly = async (req, res) => {
  try {
    // Decode the HTML entities if needed
    const decodedContent = decode(req.body.mainContent);
    const { originalname, mimetype, buffer } = req.file;
    console.log("req.body...",req.body);
    const blog = await Blog.create({
      blogTitle: req.body.blogTitle,
      author: req.body.author,
      publishedDate: new Date(),
      mainContent: decodedContent,
      blogCategoryId: req.body.blogCategoryId,
      blogImage: {
        filename: originalname,
        data: buffer,
        contentType: mimetype,
      },
    });
    console.log("blog...",blog);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const EditBlogOnly = async (req, res) => {
  try {
    const { blogId } = req.params;
    let blog;

    if (req.file != undefined) {
      const { originalname, mimetype, buffer } = req.file;
      blog = await Blog.findByIdAndUpdate(
        { _id: blogId },
        {
          blogTitle: req.body.blogTitle,
          author: req.body.author,
          mainContent: req.body.mainContent,
          blogImage: {
            filename: originalname,
            data: buffer,
            contentType: mimetype,
          },
        }
      );
    } else {
      blog = await Blog.findByIdAndUpdate(
        { _id: blogId },
        {
          blogTitle: req.body.blogTitle,
          author: req.body.author,
          mainContent: req.body.mainContent,
        }
      );
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const EditCategoryOnly = async (req, res) => {
  try {
    const { categoryId } = req.params;
    let category;
    if (req.file != undefined) {
      const { originalname, mimetype, buffer } = req.file;
      category = await BlogCategory.findByIdAndUpdate(
        { _id: categoryId },
        {
          categoryName: req.body.categoryName,
          categoryDescription: req.body.categoryDescription,
          categoryImage: {
            filename: originalname,
            data: buffer,
            contentType: mimetype,
          },
        }
      );
    } else {
      category = await BlogCategory.findByIdAndUpdate(
        { _id: categoryId },
        {
          categoryName: req.body.categoryName,
          categoryDescription: req.body.categoryDescription,
        }
      );
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    await Blog.findByIdAndDelete({ _id: blogId });
    res.status(200).json({ message: "Blog us Successfully Deleted !" });
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
    await BlogCategory.findByIdAndDelete({ _id: categoryId });
    res.status(200).json({ message: "Category is Successfully Deleted !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Construct the file URL (assuming the server serves static files)
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    res.status(200).json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DownloadImage = async (req, res) => {
  try {
    const { filePath } = req.params;
    const path = process.env.FILE_PATH;
    const response = path + filePath;
    res.sendFile(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetCategoryOnly,
  GetBlogByCategory,
  GetLatestBlog,
  AddBlogOnly,
  AddCategoryOnly,
  EditBlogOnly,
  EditCategoryOnly,
  DeleteBlog,
  DeleteCategory,
  UploadImage,
  DownloadImage,
};
