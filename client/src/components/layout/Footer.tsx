import { Link } from "react-router";
import Logo from "../ui/Logo.js";
import { SOCIAL_LINKS, LEGAL_LINKS } from "../../constants/data.js";
import { FOOTER_SECTIONS } from "../../constants/footer.js";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8 mt-auto pl-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              A modern task management platform designed to help you organize
              priorities and achieve goals faster.
            </p>

            <div className="flex gap-4 pt-2">
              {SOCIAL_LINKS.map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  className="text-muted hover:text-primary transition-colors"
                  aria-label={label}
                  target="_blank"
                >
                  <Icon width={20} height={20} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_SECTIONS.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-text-primary mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.to}
                      className="hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-border mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted text-center md:text-left">
          <p>© 2026 Prioritix Inc. All rights reserved.</p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
