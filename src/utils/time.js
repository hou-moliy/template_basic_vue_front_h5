// 根据时间相关的工具方法
// 日期转换
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value]; }
    return value.toString().padStart(2, '0');
  });
  return time_str;
};

//计算两个时间相差了几个小时
export const getIntervalHour = (startDate, endDate) => {
  console.log(parseTime(startDate), 'startDate');
  var ms = endDate - startDate;
  if (ms < 0) { return 0; }
  return Math.floor(ms / 1000 / 60 / 60);
};

// 当前日期的前后几个月时间
export const getpreDate = (month, type = 1) => { // type = 1是前几个月，0是后几个月
  var dt = new Date();
  if (type === 1) {
    dt.setMonth(dt.getMonth() - month);
  } else {
    dt.setMonth(dt.getMonth() + month);
  }
  // dt = dt.toLocaleString();
  return dt;
};

// 获取时间段
/**
 * [getTimeList description] 生成时间列表
 * @param  {[type]} hours [description] 小时
 * @param  {[type]} step  [description] 分段
 * @return {[type]}       [description] 时间段列表
 */
export const getTimeList = (hours, step) => {
  var minutes = 60;
  var timeArr = [];
  for (var i = 0; i < hours; i++) {
    var str = '';
    if (i < 10) {
      str = 0 + '' + i;
    } else {
      str = '' + i;
    }

    for (var j = 0; j < minutes; j++) {
      if (j % step == 0) {
        var s = j < 10 ? ':' + 0 + '' + j : ':' + j;
        let ii;
        if (i < 9) {//改造地方
          ii = "0" + (i + 1);
        } else {
          ii = i + 1;
        }
        s = str + s + "-" + ii + s;
        timeArr.push(s);
      }
    }
  }
  return timeArr;
};
// 某个日期后几天时间
export const GetDateStr = (AddDayCount) => {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期  
  var y = dd.getFullYear();
  var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0  
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0  
  return y + "-" + m + "-" + d;
};

// 某个日期处于星期几
export const formatTime = (time, spliter) => {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
  let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  let str = "";
  let week = new Date(date).getDay();
  if (week == 0) {
    str = "星期日";
  } else if (week == 1) {
    str = "星期一";
  } else if (week == 2) {
    str = "星期二";
  } else if (week == 3) {
    str = "星期三";
  } else if (week == 4) {
    str = "星期四";
  } else if (week == 5) {
    str = "星期五";
  } else if (week == 6) {
    str = "星期六";
  }
  // 今天
  let todayDate = '';
  todayDate = parseTime(new Date(), '{y}-{m}-{d}');
  // 明天
  let tomorrowData = GetDateStr(1);
  // 后天
  let tomorrowAfterData = GetDateStr(2);
  date = parseTime(date, '{y}-{m}-{d}');
  // 后天
  if (date === todayDate) {
    str = '今天';
  } else if (date === tomorrowData) {
    str = '明天';
  } else if (date === tomorrowAfterData) {
    str = '后天';
  }
  return { date: year + spliter + month + spliter + day, week: str };
};
// 当前时间是否处于某个时间段
export const checkAuditTime = (beginTime, endTime) => {
  var nowDate = new Date();
  var beginDate = new Date(nowDate);
  var endDate = new Date(nowDate);
  var beginIndex = beginTime.lastIndexOf("\\:");
  var beginHour = beginTime.substring(0, beginIndex);
  var beginMinue = beginTime.substring(beginIndex + 1, beginTime.length);
  beginDate.setHours(beginHour, beginMinue, 0, 0);
  var endIndex = endTime.lastIndexOf("\\:");
  var endHour = endTime.substring(0, endIndex);
  var endMinue = endTime.substring(endIndex + 1, endTime.length);
  endDate.setHours(endHour, endMinue, 0, 0);
  if (nowDate.getTime() - beginDate.getTime() >= 0 && nowDate.getTime() <= endDate.getTime()) {
    return 1;
  }
  return 0;
};
//获取两日期之间日期列表函数
export const getdiffdate = (stime, etime) => {
  //初始化日期列表，数组
  var diffdate = new Array();
  var i = 0;
  //开始日期小于等于结束日期,并循环
  while (stime <= etime) {
    diffdate[i] = stime;
    //获取开始日期时间戳
    var stime_ts = new Date(stime).getTime();
    //增加一天时间戳后的日期
    var next_date = stime_ts + (24 * 60 * 60 * 1000);
    //拼接年月日，这里的月份会返回（0-11），所以要+1
    var next_dates_y = new Date(next_date).getFullYear() + '-';
    var next_dates_m = (new Date(next_date).getMonth() + 1 < 10) ? '0' + (new Date(next_date).getMonth() + 1) + '-' : (new Date(next_date).getMonth() + 1) + '-';
    var next_dates_d = (new Date(next_date).getDate() < 10) ? '0' + new Date(next_date).getDate() : new Date(next_date).getDate();
    stime = next_dates_y + next_dates_m + next_dates_d;
    //增加数组key
    i++;
  }
  return diffdate;
};
