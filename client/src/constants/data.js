import { TwitterIcon, GithubIcon, LinkedInIcon } from "../components/ui/SocialIcons";

export const FOOTER_SECTIONS = [
    {
        title: "Product",
        links: [
            { label: "Features", to: "/features" },
            { label: "Pricing", to: "/pricing" },
            { label: "Integrations", to: "/integrations" },
            { label: "Changelog", to: "/changelog" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", to: "/docs" },
            { label: "API Reference", to: "/api" },
            { label: "Community", to: "/community" },
            { label: "Help Center", to: "/help" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", to: "/about" },
            { label: "Careers", to: "/careers" },
            { label: "Blog", to: "/blog" },
            { label: "Contact", to: "/contact" },
        ],
    },
];

export const SOCIAL_LINKS = [
    {
        Icon: TwitterIcon,
        href: "https://twitter.com/iqoqacolaa",
        label: "Twitter",
    },
    {
        Icon: GithubIcon,
        href: "https://github.com/Iqoqacola",
        label: "GitHub"
    },
    {
        Icon: LinkedInIcon,
        href: "https://www.linkedin.com/in/iqoqacola/",
        label: "LinkedIn",
    },
];

export const LEGAL_LINKS = [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
];