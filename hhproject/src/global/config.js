import md5 from 'md5';

global.title = [
    { "name": "身份选择", "path": "/" },
    { "name": "新建设备", "path": "/newequip" },
    { "name": "选择检测类型", "path": "/a" },
    { "name": "选择检测时机", "path": "/b" },
    { "name": "记录检测结果", "path": "/c" },
    { "name": "预览与打印", "path": "/d" },
];

global.identity = [
    { "name": "技术员", "id": 1001 },
    { "name": "资料员", "id": 1002 },
    { "name": "评片洗片人", "id": 1003 },
    { "name": "现场检测人员", "id": 1004 },
];

// MD5 加密
global.md5Pwd = function(pwd) { //salt为任意乱序字符串，目的在于使加密后的密码不容易被破解 
    const salt = "fndjvrfewewq9eu!"; 
    return md5(md5(pwd + salt));
}
