import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-white py-10 text-sm">
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-700 pb-10">
        <div className="flex gap-22 flex-wrap">
          {/* Cột 1 */}
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-400 ">
              <li className="hover:text-white">About</li>
              <li className="hover:text-white">Jobs</li>
              <li className="hover:text-white">For the Record</li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div>
            <h4 className="font-bold mb-3">Communities</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white">For Artists</li>
              <li className="hover:text-white">Developers</li>
              <li className="hover:text-white">Advertising</li>
              <li className="hover:text-white">Investors</li>
              <li className="hover:text-white">Vendors</li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h4 className="font-bold mb-3">Useful links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white">Support</li>
              <li className="hover:text-white">Free Mobile App</li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div>
            <h4 className="font-bold mb-3">Spotify Plans</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white">Premium Individual</li>
              <li className="hover:text-white">Premium Student</li>
              <li className="hover:text-white">Spotify Free</li>
            </ul>
          </div>
        </div>

        {/* Mạng xã hội */}
        <div className="flex gap-4">
          <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full h-fit">
            <FaInstagram />
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full h-fit">
            <FaTwitter />
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full h-fit">
            <FaFacebookF />
          </button>
        </div>
      </div>

      {/* Footer dưới */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-gray-400 gap-4 text-xs">
        <div className="flex flex-wrap gap-4">
          <span className="hover:text-white">Legal</span>
          <span className="hover:text-white">Safety & Privacy Center</span>
          <span className="hover:text-white">Privacy Policy</span>
          <span className="hover:text-white">Cookies</span>
          <span className="hover:text-white">About Ads</span>
          <span className="hover:text-white">Accessibility</span>
        </div>
        <div className="text-xs">© 2025 Spotify AB</div>
      </div>
    </footer>
  );
};

export default Footer;
