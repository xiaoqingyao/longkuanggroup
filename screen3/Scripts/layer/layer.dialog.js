var clayer = window.layer || window.top.layer || {};

// 对话框数组
var dialogArray = [];
function openDialog(args, cb) {
    var height = args.height || 500;
    var width = args.width || 520;
    var closeBtn = 1;
    if (args.closeBtn === 0) {
        closeBtn = 0;
    }
    // 格式化Url
    try {
        // 将..替换成全路径
        if (getRootUrl && typeof (getRootUrl) == "function") {
            args.url = args.url.replace("", getRootUrl());
        }
    } catch (e) {

    }

    var type = typeof (args.url) === "string" ? 2 : 1;
    var index = clayer.open({
        type: type,
        title: args.title || "",
        moveType: 1,        //拖拽风格，0是默认，1是传统拖动
        shift: 0,           //0-6的动画形式，-1不开启
        shadeClose: false,  //是否点击遮罩关闭
        area: [width + 'px', height + 'px'],
        content: args.url || "",
        closeBtn: closeBtn,
        success: function (layero, index) {
            // 关闭loading...
            hideLoad();
            
        },
        cancel: function (index) {
            // 维护dialogArray中数据
            var start = -1;
            $.each(dialogArray, function (i, value) {
                if (value.index == index) {
                    start = i;
                }
            });
            // 如果搜索出数据，则进行删除
            if (start != -1)
                dialogArray.splice(start, 1);
        }
    });

    dialogArray.push({
        index: index,
        callback: cb
    });
    
    // 显示loading...
    //showLoad();
    if (type != 1) {
        clayer.load();
    }
    
}

function _closeDialog(b) {
    var dialog = dialogArray.pop();
    if (dialog === undefined)
        return;

    try {
        dialog.callback & dialog.callback(b);
    } catch (e) {

    }
    clayer.close(dialog.index);
}

function showLoad() {
    try{
        clayer && clayer.load(1, {
            shade: [0.5, '#000'] //0.5透明度的黑色背景
        });
    } catch (e) {

    }
}

function hideLoad() {
    try {
        // 关闭所有的加载层
        clayer && clayer.closeAll('loading');
    } catch (e) {

    }
}
