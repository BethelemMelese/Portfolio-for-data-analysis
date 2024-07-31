import { useState } from "react";

const CategoryDetailBlog = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);

  return (
    <div>
      <h2>Category Detail Blog is here</h2>
    </div>
  );
};

export default CategoryDetailBlog;
