import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-3 min-h-screen mx-auto max-w-3xl">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a New Post
      </h1>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
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
        />

        <Button type="submit" outline className="mt-12">
          Publish
        </Button>
      </form>
    </div>
  );
};
export default CreatePost;
