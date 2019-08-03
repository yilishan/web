import md5 from 'md5';
import cookie from 'react-cookies';

global.user = {
    name: cookie.load("username") || "",
    id: cookie.load("userid") || "",
    identity: cookie.load("identity") || "",
}

global.product = {

}

global.title = [
    { "name": "产品列表", "path": "/" },
    { "name": "新建产品", "path": "/newProduct" },
    { "name": "编辑委托信息", "path": "/basicInfo" },
    { "name": "现场检测信息", "path": "/detection" },
    { "name": "缺陷相关参数", "path": "/defects" },
    { "name": "报告", "path": "/report" },
];

global.identity = [
    { "name": "技术员", "id": 1001 },
    { "name": "资料员", "id": 1002 },
    { "name": "评片洗片人", "id": 1003 },
    { "name": "现场检测人员", "id": 1004 },
];

// MD5 加密
global.md5Pwd = function(pwd) { 
    //salt为任意乱序字符串，目的在于使加密后的密码不容易被破解 
    const salt = "fndjvrfewewq9eu!"; 
    return md5(md5(pwd + salt));
};

// 委托单字段对照表
global.attorneyWordList = [
{ "desc": "日期", "name": "date", "isBasic": true, "canSelect":false, },
{ "desc": "版次", "name": "version", "isBasic": true, "canSelect":false, "defaultValue":"1",},
{ "desc": "合同号", "name": "contractNo", "isBasic": true, "canSelect":false, },
{ "desc": "委托单编号", "name": "attorneyNo", "isBasic": true, "canSelect":false, },
{ "desc": "委托单位", "name": "attorneyDepartment", "isBasic": true, "canSelect":false, },
{ "desc": "委托人", "name": "attorneyPeople", "isBasic": true, "canSelect":false, },
{ "desc": "委托日期", "name": "attorneyDate", "isBasic": true, "canSelect":false, },
{ "desc": "产品名称", "name": "productName", "isBasic": true, "canSelect":false, },
{ "desc": "产品编号", "name": "productNo", "isBasic": true, "canSelect":false, },
{ "desc": "检测方法", "name": "detectionMethod", "isBasic": true, "canSelect":true, "selectList":["射线检测","超声波检测","焊后检测","渗透检测","TOFD检测",], },
{ "desc": "检测时机", "name": "detectionWindow", "isBasic": true, "canSelect":true, "selectList":["焊后", "焊后24h", "焊后36h", "焊后48h", "热处理后", "水压试验后", "机加工后", "坡口加工前", "坡口加工后", "毛坯", "堆焊后", "打磨后", "清根后", "缺陷去除后", "校形后", "表修后", "与上部支柱组焊前",]},
{ "desc": "检测比例", "name": "detectionRatio", "isBasic": true, "canSelect":true, "selectList":["10%", "20%", "25%", "40%", "50%", "100%",]},
{ "desc": "检测标准", "name": "detectionStandard", "isBasic": true, "canSelect":false, },
{ "desc": "合格级别", "name": "qualifiedLevel", "isBasic": true, "canSelect":true, "selectList":["Ⅰ", "Ⅱ", "Ⅲ",]},
{ "desc": "技术等级", "name": "techLevel", "isBasic": true, "canSelect":true, "selectList":["A", "AB", "B", "C"]},
{ "desc": "表面状态", "name": "surfaceState", "isBasic": true, "canSelect":true, "selectList":["焊态", "打磨", "机加工", "喷砂面", "轧制面", "毛坯",]},
{ "desc": "热处理状态", "name": "heatTreatmentState", "isBasic": true, "canSelect":true, "selectList":["/", "热处理前", "热处理后", "正火",]},
{ "desc": "委托说明", "name": "attorneyItem", "isBasic": false, "canSelect":false, },
{ "desc": "工件表面检查结果", "name": "surfaceConclusion", "isBasic": false, "canSelect":false, },
{ "desc": "检测示意图", "name": "detectionImage", "isBasic": false, "canSelect":false, },
{ "desc": "检查员", "name": "checkManSign", "isBasic": false, "canSelect":false, },
{ "desc": "接收审核人", "name": "receiveManSign", "isBasic": false, "canSelect":false, },
{ "desc": "日期", "name": "dateSign", "isBasic": false, "canSelect":false, },
{ "desc": "当前页码", "name": "curPage", "isBasic": false, "canSelect":false, },
{ "desc": "总页码", "name": "totalPage", "isBasic": false, "canSelect":false, },
];
