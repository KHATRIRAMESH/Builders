import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { backendURl } from "../config";

const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState();

  const navigate = useNavigate();
  console.log(formData);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      return;
    }

    // Submit form data to your backend here.
    try {
      const res = await fetch(`${backendURl}/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
      }
      if (res.ok) {
        setPublishError(null);
        setFormData({});
        alert("Post created successfully");
        navigate(`/posts/${data.slug}`);
        // Reset form data
      }
    } catch (error) {
      setPublishError(error.message || "Something went wrong");
      // Reset form data
    }
  };

  return (
    <div className="p-3 min-h-screen mx-auto max-w-3xl">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a New Post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
        <div className="flex flex-col gap-2 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a option</option>
            <option value="react">React</option>
            <option value="blockchain">Blockchain</option>
            <option value="ai-ml">AI/ML</option>
            <option value="python">Python</option>
            <option value="gamedevelopment">Game Development</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted  p-3 ">
          <FileInput type="file" accept="image/*" />
          <Button type="button" size="sm" outline>
            Upload
          </Button>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Write something interesting..."
          className="h-72"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        <Button type="submit" outline className="mt-12">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-3" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};
export default CreatePost;
