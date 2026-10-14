import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

// 自动发现 blogs 目录下的 Markdown 文件，文件名即侧边栏文本
const blogsItems = readdirSync(join(process.cwd(), 'docs', 'blogs'))
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
    .map((f) => {
        const name = f.replace(/\.md$/, '')
        return { text: name, link: `/blogs/${name}` }
    })

// 最新一篇博客的链接（blogsItems 已按日期降序，首个即最新）
const latestBlogLink = blogsItems[0]?.link

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
            { text: 'Blogs', link: latestBlogLink },
            { text: 'Projects', link: '/projects/index' },
        ],

        sidebar: [
            {
                text: 'Blogs',
                collapsed: false,
                items: [
                    ...blogsItems,
                ]
            },
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
            { icon: 'tiktok', link: 'https://v.douyin.com/EBbctOWqOUU/' },
            { icon: 'bilibili', link: 'https://space.bilibili.com/39121400' },
        ]
    },

    // 首页 hero 的「Blogs」按钮也指向最新一篇
    transformPageData(pageData) {
        if (pageData.relativePath === 'index.md') {
            const actions = (pageData.frontmatter as any)?.hero?.actions
            if (Array.isArray(actions)) {
                for (const a of actions) {
                    if (a?.text === 'Blogs') a.link = latestBlogLink
                }
            }
        }
    }
})
