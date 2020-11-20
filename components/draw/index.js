// 1. 创建组件
(function(){
    class Drawer {
        $drawer = null;
        $btn = null;
        $list = null;
        imgs = [];
        constructor(){
            // 添加结构到dom中
            const $drawer = $('<div class="st-draw"></div>');
            const $list = $('<ul class="st-draw__video-list"></ul>');
            const $btn = $('<button class="st-draw__catch">抓取图片</button>')
            const $folder = $('<div class="st-draw__folder"></div>')
            $drawer.append($btn);
            $drawer.append($list);
            $('body').append($drawer);
            // 添加抓取事件
            $btn.on('click', () => {this.onCatchImg()});
            // 添加图片下载事件
            $list.on('click', (e) => {this.onSingleDownload(e)});
            // 保存变量
            this.$drawer = $drawer;
            this.$btn = $btn;
            this.$list = $list;
            // 抓取
            $btn.trigger('click');
        }
        // 单个下载事件
        onSingleDownload(e){
            if($(e.target).hasClass('download')){
                // 获取数据
                const {src, name} = $(e.target).closest('li').data('img');
                this.downloadImage(src, name);
            }
        }
        // 图片下载
        downloadImage(url, name){
            if(url.startsWith('data:')){
                // 1. base64
                const $downloader = $(`<a href="${url}" download="${name}"></a>`)
                $('body').append($downloader);
                $downloader.trigger('click');
                $('body').remove($downloader);
            } else {
                // 2. url
                // 使用canvas创建图片
                const image = new Image();
                image.src = url;
                image.setAttribute("crossOrigin",'Anonymous'); // 解决跨域问题
                image.onload = () => {
                    const $canvas = $(`<canvas width="${image.width}" height="${image.height}"></canvas>`);
                    const context = $canvas.get(0).getContext('2d')
                    context.drawImage(image, 0, 0, image.width, image.height);
                    // 将canvas转成base64编码
                    const base64 = $canvas.get(0).toDataURL('image/png');
                    // 使用链接下载
                    const $downloader = $(`<a href="${base64}" download="${name}">我干</a>`)
                    $('body').append($downloader);
                    $downloader.get(0).click(); // toFix: 为啥$downloader.trigger('click') 没用
                    $('body').remove($downloader);
                }
            }
        }
        // 生成随机数
        generateRanddom(num){
            const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            let result = '';
            for(let i = 0; i < num; i++){
                const index = Math.round(Math.random() * 61);
                result += char[index];
            }
            return result;
        }
        // 获取后缀
        getSuffix(path){
            return path.split('.').pop();
        }
        // 下载图片
        // onDownload(e){
        // }
        // 抓取图片
        onCatchImg(){
            
            $('img').each((index, oEle) => {
                this.imgs.push(oEle.src);
            })
            // 渲染图片列表
            if(this.imgs.length){
                this.renderList();
            }
        }
        renderList(){
            // 移除原来的
            this.$list.empty();
            // 创建
            this.imgs.forEach((img, index) => {
                const imgName = this.generateRanddom(16);
                const imgData = {
                    src: img,
                    name: imgName,
                }
                const imgDataString = JSON.stringify(imgData);
                const $li = $(`
                    <li data-img='${imgDataString}' class="st-draw__video-lsit__item">
                        <div class="st-draw__video-lsit__item__left">
                            <img src="${img}" />
                            <span>${imgName}</span>
                        </div>
                        <div class="st-draw__video-lsit__item__operater">
                            <i class="iconfont icondownload download"></i>
                        </div>
                    </li>
                `)
                this.$list.append($li);
            })
        }
    }
    window.Drawer = Drawer;
})()