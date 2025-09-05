import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 border-t border-gray-100">
      <div className="footer-container flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-6">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            CarHub 2025 <br /> All rights reserved &copy;
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          {footerLinks.map((link) => (
            <div key={link.title} className="flex flex-col gap-2">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-container flex flex-col md:flex-row justify-between items-center border-t border-gray-100 gap-4">
        <p className="text-gray-500">@2025 CarHub. All Rights Reserved</p>
        <div className="flex gap-4">
          <Link href="/" className="text-gray-500 hover:text-gray-800">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-800">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
