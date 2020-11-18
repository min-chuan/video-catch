
$(function(){
    new Drawer();
})

// 注入injectScript
const injectCustomJs = async (path) => {
    // 获取文件类型
    const type = path.split('.').pop();
    if(type === 'css'){
        const $link = $(`<link rel='stylesheet' href='${chrome.extension.getURL(path)}' />`)
        $('head').append($link);
    } else if(type === 'js'){
        path = path || 'js/inject.js';
        const $script = $(`<script async='false' type='text/javascript' src=${chrome.extension.getURL(path)}></script>`);
        $('body').append($script);
    } else {
        throw(new Error('注入文件类型错误'))
    }
}
