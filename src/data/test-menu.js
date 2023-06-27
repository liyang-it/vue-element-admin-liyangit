// 对接后端实现 用户动态菜单，后端返回的菜单json参考格式
// 除了 id、parent、children、alwaysShow 这四个 参数，其他参数都是 vue-router 中的必须参数，具体请参考 /router/index.js

export const menu = [
  {
    'id': 1, // 菜单ID
    'parent': 0, // 父级菜单ID，0表示没有父级
    'name': 'ComponentDemo', // 页面名称 这些参数 就是 vue-router 中的参数
    'path': '/components', // 页面路径
    'component': 'Layout', // 页面对应的组件路径
    'alwaysShow': true, // 是否是目录，方便直接判断处理菜单
    'meta': {
      'icon': 'component',
      'title': 'components'
    },
    'hidden': false, // 是否隐藏
    'children': [ // 子菜单列表
      {
        'id': 2, // 子菜单ID
        'parent': 1, // 父级菜单ID
        'children': [], // 子菜单列表
        'alwaysShow': false, // 是否是目录，方便直接判断处理菜单
        'name': 'TinymceDemo', // 页面名称 这些参数 就是 vue-router 中的参数
        'path': '/tinymce', // 页面路径
        'component': 'components-demo/tinymce', // 页面对应的组件路径, 如果是目录 则固定 'Layout',不是则填入具体的组件路径,后面需要而外处理 转换为 @/views/components-demo/tinymce
        'meta': {
          'icon': 'edit', // 菜单图标
          'title': 'tinymce' // 页面标题
        },
        'hidden': false // 是否隐藏
      },
      {
        'id': 3, // 子菜单ID
        'parent': 1, // 父级菜单ID
        'children': [], // 子菜单列表
        'alwaysShow': false, // 是否是目录，方便直接判断处理菜单
        'name': 'MarkdownDemo', // 页面名称 这些参数 就是 vue-router 中的参数
        'path': '/markdown', // 页面路径
        'component': 'components-demo/markdown', // 页面对应的组件路径, 如果是目录 则固定 'Layout',不是则填入具体的组件路径,后面需要而外处理 转换为 @/views/components-demo/tinymce
        'meta': {
          'icon': 'markdown', // 菜单图标
          'title': 'markdown' // 页面标题
        },
        'hidden': false // 是否隐藏
      }
    ]
  }
]
