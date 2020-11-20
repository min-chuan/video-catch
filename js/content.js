
$(function(){
    // 注入iconfont
    const link = 'https://at.alicdn.com/t/font_2217203_hjmw5xlqfqk.css';
    injectCustomJs({path: link, real: true});
    // 创建操作界面
    new Drawer();
})

// 注入injectScript
const injectCustomJs = async ({path, real = false}) => {
    let realPath = real ? path : chrome.extension.getURL(path);
    const type = path.split('.').pop(); // 获取文件类型
    if(type === 'css'){
        const $link = $(`<link rel='stylesheet' href='${realPath}' />`)
        $('head').append($link);
    } else if(type === 'js'){
        path = path || 'js/inject.js';
        const $script = $(`<script async='false' type='text/javascript' src=${realPath}></script>`);
        $('body').append($script);
    } else {
        throw(new Error('注入文件类型错误'))
    }
}
