import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Lyn-77",
    description: "",
    base: '/PersonalPage/',
    head: [
        ['link', { rel: 'icon', type: 'image/png', href: '/PersonalPage/favicon.png' }],
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
            { text: 'Projects', link: '/projects/index' },
        ],

        sidebar: [
            {
                text: 'Projects',
                collapsed: false,
                items: [
                    { text: 'Home', link: '/projects/index' },
                    { text: 'ProMentor', link: '/projects/ProMentor' },
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/Lyn-77' },
            { icon: 'leetcode', link: 'https://leetcode.cn/u/Lyn-77' },
        ]
    },
})
