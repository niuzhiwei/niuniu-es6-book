module.exports = {
    title: "niuniu's ES6-10 book",
    description: "niuniu's est-10 book",
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link',
            {
                rel: 'icon',
                href: '/cow.png'
            }
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],
    ],
    themeConfig: {
        logo: '/cow.png', //网页顶端导航栏左上角的图标

        //顶部导航栏
        nav: [
            //格式一：直接跳转，'/'为不添加路由，跳转至首页
            {
                text: '首页',
                link: '/'
            },

            //格式二：添加下拉菜单，link指向的文件路径
            {
                text: '分类', //默认显示        
                ariaLabel: '分类', //用于识别的label
                items: [{
                        text: '文章',
                        link: '/pages/folder/es6.md'
                    },
                    // //点击标签会跳转至link的markdown文件生成的页面
                    // {
                    //     text: '琐碎',
                    //     link: '/pages/folder2/test4.md'
                    // },
                ]
            },
            // {
            //     text: '功能演示',
            //     link: '/pages/folder1/test3.md'
            // },

            //格式三：跳转至外部网页，需http/https前缀
            {
                text: 'Github',
                link: 'https://github.com/niuzhiwei'
            },
        ],

        //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
        sidebar: {
            '/pages/folder/': [{
                    title: '项目准备', // 一级菜单名称
                    collapsable: false, // false为默认展开菜单, 默认值true是折叠,
                    sidebarDepth: 2, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
                    children: [
                        ['es6.md', 'ES6语法汇总'], //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
                        ['es7-11.md', 'ES7-ES11语法汇总']
                    ]
                },
                {
                    title: 'ES6',
                    collapsable: false,
                    children: [
                        ['let-const.md', 'let、const'],
                        ['desctructuring.md', '解构赋值'],
                        ['array.md', 'Array'],
                        ['function.md', 'Function'],
                        ['object.md', 'Object'],
                        ['class.md', 'Class'],
                        ['symbol.md', 'Symbol'],
                        ['set.md', 'Set'],
                        ['map.md', 'Map'],
                        ['string.md', "String"],
                        ['regexp.md','RegExp'],
                        ['number.md',"Number"],
                        ["proxy.md","Proxy"],
                        ["reflect.md",'Reflect'],
                        ['promise.md','Promise'],
                        ['generator.md','Generator'],
                        ['Iterator.md','Iterator']
                    ]
                },
                {
                    title: 'ES7',
                    collapsable: false,
                    children: [
                        ['includes.md', 'Array.prototype.includes()'],
                        ['power.md', '幂运算符**'],
                    ]
                },
                {
                    title: 'ES8',
                    collapsable: false,
                    children: [
                        ['async-await.md', 'async/await'],
                        ['es8-object.md', 'Object'],
                        ['es8-string.md', 'String'],
                    ]
                },
                {
                    title: 'ES9',
                    collapsable: false,
                    children: [
                        ['for-await-of.md', 'for await of'],
                        ['object-rest&spread.md', 'Object Rest & Spread'],
                        ['finally.md', 'Promise.prototype.finally()'],
                    ]
                },
                {
                    title: 'ES10',
                    collapsable: false,
                    children: [
                        ['fromentries.md', 'Object.fromEntries'],
                        ['es10-string.md', 'String'],
                        ['es10-array.md', 'Array'],
                        ['es10-function.md', 'Function'],
                        ['catchbinding.md', '可选的Catch Binding'],
                        ['es10-symbol.md', 'Symbol'],
                    ]
                },
                {
                    title: 'ES11',
                    collapsable: false,
                    children: [
                        ['drnamic-import.md', 'Dynamic Import'],
                        ['bigint.md', 'BigInt'],
                        ['promise-allsettled.md', 'Promise.allSettled()'],
                        ['globalThis.md', 'globalThis'],
                        ['optional-chaining.md', '可选链Optional chaining'],
                        ['nullish-coalescing-operator.md', '空值合并运算符'],
                    ]
                }
            ],

            //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
        }
    }
}