import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Lyn-77",
    description: "",
    base: '/PersonalPage/',
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ],
    markdown: {
        theme: {
            light: "catppuccin-latte",
            dark: "catppuccin-frappe",
        },
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blogs', link: '/blogs/index' },
            { text: 'Projects', link: '/projects/index' },
        ],

        sidebar: [
            {
                text: 'Blogs',
                items: [
                    { text: 'Home', link: '/blogs/index' },
                ]
            },
            {
                text: 'Projects',
                items: [
                    { text: 'Home', link: '/projects/index' },
                    { text: 'ProMentor', link: '/projects/ProMentor' },
                    { text: 'WakeUp', link: '/projects/WakeUp' },
                    { text: 'FocusPulse', link: '/projects/FocusPulse' },
                ]
            },
            {
                text: '',
                items: [
                    { text: 'Contact Me', link: '/contact' },
                ]
            },
        ],

        socialLinks: [
            { icon: 'leetcode', link: 'https://leetcode.cn/u/Lyn-77' },
            { icon: 'github', link: 'https://github.com/Lyn-77' },
        ]
    }
})
