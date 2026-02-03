import { Layout, Zap, BarChart3 } from "lucide-react";
import React from "react";

export const FEATURES = [
    {
        icon: React.createElement(Layout, { size: 28 }),
        title: "Intuitive Interface",
        description:
            "Clean and easy-to-use design helps you focus on your tasks, not on how to use the app.",
    },
    {
        icon: React.createElement(Zap, { size: 28 }),
        title: "Smart Priority System",
        description:
            "Categorize tasks by urgency and impact. Our algorithms help you decide what to do first.",
    },
    {
        icon: React.createElement(BarChart3, { size: 28 }),
        title: "Progress Analytics",
        description:
            "Track your productivity with visual charts. See how much you've accomplished every week.",
    },
];

export const PRICING_PLANS = [
    {
        name: "Free",
        price: "0",
        description: "For individuals just starting out.",
        features: [
            "Up to 5 projects",
            "Basic task management",
            "7-day history",
            "Community support",
        ],
        buttonText: "Get Started",
        link: "/signup",
        isHighlighted: false,
    },
    {
        name: "Pro",
        price: "12",
        description: "For power users and freelancers.",
        features: [
            "Unlimited projects",
            "Advanced analytics",
            "Unlimited history",
            "Priority support",
            "Custom tags & filters",
        ],
        buttonText: "Try Pro Free",
        link: "/signup?plan=pro",
        isHighlighted: true,
    },
    {
        name: "Premium",
        price: "29",
        description: "For teams and organizations.",
        features: [
            "Everything in Pro",
            "Team collaboration",
            "Admin controls",
            "API Access",
            "Dedicated account manager",
        ],
        buttonText: "Contact Sales",
        link: "/contact",
        isHighlighted: false,
    },
];

export const VALUE_PROPS = [
    "Structured task organization with folders and tags.",
    "High-level data security with end-to-end encryption.",
    "Access anywhere, real-time sync across devices.",
    "Comfortable dark mode for working at night.",
];