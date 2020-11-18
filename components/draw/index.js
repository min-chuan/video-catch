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
            const $btn = $('<button class="st-draw__catch">抓取图片</button>')
            $drawer.append($btn);
            $('body').append($drawer);
            // 添加抓取事件
            $btn.on('click', () => {this.onCatchVideo()});
            this.$drawer = $drawer;
            this.$btn = $btn;
            // 抓取
            $btn.trigger('click');
        }
        onCatchVideo(){
            // 抓取图片
            $('img').each((index, oEle) => {
                this.imgs.push(oEle.src);
            })
            // 渲染图片列表
            if(this.imgs.length){
                this.renderList();
            }
        }
        renderList(){
            // 创建
            const $list = $('<ul class="st-draw__video-list"></ul>');
            this.imgs.forEach((img, index) => {
                const $li = $(`
                    <li class="st-draw__video-lsit__item">
                        <img src="${img}" />
                        <span>图片${index + 1}(点击下载)</span>
                    </li>
                `)
                $list.append($li);
            })
            // 移除原来的
            this.$list && this.$list.remove();
            // 插入新的
            console.log('$drawer', this.$drawer);
            this.$drawer.append($list);
            this.$list = $list;
        }
    }
    window.Drawer = Drawer;
})()