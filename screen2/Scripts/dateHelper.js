
function getCurrentDate() {
    var timeStr = '-';
    var curDate = new Date();
    var curYear = curDate.getFullYear();  //获取完整的年份(4位,1970-????)
    var curMonth = curDate.getMonth() + 1;  //获取当前月份(0-11,0代表1月)
    var curDay = curDate.getDate();       //获取当前日(1-31)
    var curWeekDay = curDate.getDay();    //获取当前星期X(0-6,0代表星期天)
    var curHour = curDate.getHours();      //获取当前小时数(0-23)
    var curMinute = curDate.getMinutes();   // 获取当前分钟数(0-59)
    var curSec = curDate.getSeconds();      //获取当前秒数(0-59)
    var Current = curYear + timeStr + curMonth + timeStr + curDay + ' ' + curHour + ':' + curMinute + ':' + curSec;
    return Current;
}
//获取目标日期 num+1取明天日期 num-1取昨天日期，str为分隔字符串
function getTargetDate(num, str) {
    var today = new Date();
    var nowTime = today.getTime();
    var ms = 24 * 3600 * 1000 * num;
    today.setTime(parseInt(nowTime + ms));
    var oYear = today.getFullYear();
    var oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    var oDay = today.getDate().toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
}
//获取本月的起止时间
function getDateFromEnd_Month() {
    var arr = [];
    var nowDate = new Date();
    var cloneNowDate = new Date();
    var fullYear = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
    var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
    function getFullDate(targetDate) {
        var D, y, m, d;
        if (targetDate) {
            D = new Date(targetDate);
            y = D.getFullYear();
            m = D.getMonth() + 1;
            d = D.getDate();
        } else {
            y = fullYear;
            m = month;
            d = date;
        }
        m = m > 9 ? m : '0' + m;
        d = d > 9 ? d : '0' + d;
        return y + '-' + m + '-' + d;
    };
    var endDate = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
    var starDate = getFullDate(cloneNowDate.setDate(1));//当月第一天
    arr.push(starDate);
    arr.push(endDate);
    return arr;
}
//获取本年的起止日期
function getDateFromEnd_Year() {
    var arr = [];
    var fullYear = new Date().getFullYear();
    var starDate = fullYear + "-01-01";
    var endDate = fullYear + "-12-31";
    arr.push(starDate);
    arr.push(endDate);
    return arr;
}