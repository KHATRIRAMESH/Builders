import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";

const FooterCom = () => {
  return (
    <Footer container className="border-t-4 border-teal-400 bg-gray-50 py-10 dark:bg-gray-900">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Logo and Tagline */}
              <div className="flex flex-col ">
          <Link
            to="/"
            className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Builder&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Insights, ideas, and tutorials to build the future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <Footer.Title title="Quick Links" />
          <Footer.LinkGroup col>
            <Footer.Link href="/about" rel="noopener noreferrer">
              About Us
            </Footer.Link>
            <Footer.Link href="/contact" rel="noopener noreferrer">
              Contact Us
            </Footer.Link>
            <Footer.Link href="/support" rel="noopener noreferrer">
              Support
            </Footer.Link>
          </Footer.LinkGroup>
        </div>

        {/* Legal */}
        <div>
          <Footer.Title title="Legal" />
          <Footer.LinkGroup col>
            <Footer.Link href="/terms" rel="noopener noreferrer">
              Terms & Conditions
            </Footer.Link>
            <Footer.Link href="/privacy" rel="noopener noreferrer">
              Privacy Policy
            </Footer.Link>
          </Footer.LinkGroup>
        </div>

        {/* Follow Us */}
        <div>
          <Footer.Title title="Follow Us" />
          <div className="flex gap-4 mt-2">
            <Footer.Icon href="https://facebook.com" icon={BsFacebook} />
            <Footer.Icon href="https://twitter.com" icon={BsTwitter} />
            <Footer.Icon href="https://instagram.com" icon={BsInstagram} />
            <Footer.Icon href="https://linkedin.com" icon={BsLinkedin} />
            <Footer.Icon href="https://youtube.com" icon={BsYoutube} />
            <Footer.Icon href="https://github.com" icon={BsGithub} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <Footer.Divider className="my-8" />

      {/* Footer Bottom */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
        <Footer.Copyright
          href="#"
          by="Builder's Academy Inc"
          year={new Date().getFullYear()}
        />
        <div className="flex gap-6">
          <Footer.Link href="/faq" rel="noopener noreferrer">
            FAQ
          </Footer.Link>
          <Footer.Link href="/feedback" rel="noopener noreferrer">
            Feedback
          </Footer.Link>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
