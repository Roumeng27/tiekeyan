// 数字转成大写
function digitUppercase(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};
// 验证名字
function getName(name) {
    let regName = /^[\u4E00-\u9FA5]{2,4}$/;
    if (!regName.test(name)) {
        return false;
    } else {
        return true;
    }
};
//验证身份证号码
function getIdcard(idNo) {
    let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(idNo)) {
        return false;
    } else {
        return true;
    }
};
// 判断是否为手机号
function ismobilePhone(phone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
};
// 电话判断
function isPhone(str) {
    var myreg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
// 邮箱判断
function isEmail(str) {
    var myreg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
// 转换日期格式 yyyy-MM-dd
function formatDate(time) {
    var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    return Y + M + D
};
// 转换日期格式 yyyy-MM-dd h:m:s
function formatTime(time) {
    var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
};
//判断字符是否为空的方法
function isEmpty(obj) {
    if (obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
};
// yyyy-MM-dd h:m:s 转换成时间戳
function changeTime(time) {
    let date = new Date(time);
    let changetime = date.getTime();
    return changetime
}
//单位代码校验
function checkCode(codes){
    var myreg = /^[a-zA-Z]{3}$/;
    if (!myreg.test(codes)) {
        return false;
    } else {
        return true;
    }
}

export {
    digitUppercase,
    getName,
    getIdcard,
    isMobilephone,
    isEmpty,
    formatDate,
    formatTime,
    changeTime,
    isPhone,
    isEmail,
    checkCode
}