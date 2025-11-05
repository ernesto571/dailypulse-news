import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-8 mt-12">
      <div className="w-[94%] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left Section */}
        <div className="md:w-[70%]">
          <h2 className="text-2xl font-bold text-white mb-2">DailyPulse</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            DailyPulse brings you the latest stories from trusted global sources —
            covering business, technology, sports, entertainment, health, and more.
            Stay informed with real-time updates, powered by{" "}
            <span className="text-blue-400 font-medium">NewsAPI.org</span>.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center border-t border-gray-800 pt-4 text-xs text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">DailyPulse News</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
