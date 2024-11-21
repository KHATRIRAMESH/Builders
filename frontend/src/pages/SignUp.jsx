import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Handle form changes here

    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("All fields are required!!");
    }
    // Handle form submission here

    // Perform form validation and API call to sign up the user
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        console.log(errorMessage);
        setLoading(false);
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 flex-col max-w-3xl mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Builder&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Sign up to get the chance to post and read the amazing blogs by
            millions of bloggers
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="username" />
              <TextInput
                placeholder="Username"
                type="text"
                id="username"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="email" />
              <TextInput
                placeholder="name@company.com"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="password" />
              <TextInput
                placeholder="Your password..."
                type="password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
          )}
          <div>
            <span>Already have a account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign-in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;