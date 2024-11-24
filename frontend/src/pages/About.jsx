
const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          About Builder Blog
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Welcome to{" "}
          <span className="font-semibold text-gray-800">Builder Blog</span>,
          your go-to platform for exploring a diverse range of articles, tips,
          and resources written by passionate creators. Whether you&apos;re a
          reader, a writer, or both, Builder Blog provides a space to share
          knowledge, ignite ideas, and foster community.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Our mission is to empower builders, creators, and enthusiasts by
          providing a platform to express their thoughts and insights. From tech
          innovations to personal stories, we believe in the power of words to
          inspire and connect people.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Join us on this journey of discovery and creation. Whether you&apos;re
          here to learn, share, or simply get inspired, Builder Blog is the
          perfect place to start!
        </p>
        <div className="mt-6">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-500 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
