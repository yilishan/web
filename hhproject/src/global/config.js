import md5 from 'md5';
import cookie from 'react-cookies';

global.user = function getUser(){
    return {
        name: cookie.load("username") || "",
        id: cookie.load("userid") || "",
        identity: cookie.load("identity") || "",
        department: cookie.load("department") || "",
    }
};

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

global.department = [
    { "name": "铆一车间", "code": "A" },
    { "name": "铆二车间", "code": "B" },
    { "name": "铆三车间", "code": "C" },
    { "name": "成型车间", "code": "D" },
    { "name": "重钢车间", "code": "E" },
    { "name": "轻钢车间", "code": "F" },
    { "name": "配件车间", "code": "G" },
    { "name": "备料车间", "code": "J" },
    { "name": "质监站", "code": "Z" },
    { "name": "其他", "code": "-1" },
];

// MD5 加密
global.md5Pwd = function (pwd) {
    //salt为任意乱序字符串，目的在于使加密后的密码不容易被破解 
    const salt = "fndjvrfewewq9eu!";
    return md5(md5(pwd + salt));
};

// 产品字段对照表
global.productWordList = [
    { "desc": "合同号", "name": "contractNo", "canSelect": false, },
    { "desc": "产品名称", "name": "productName", "canSelect": false, },
    { "desc": "产品编号", "name": "productNo", "canSelect": false, },
]

/* 
* part；所属展示部分，{attorneyTitle：委托单标题},{attorneyItem：委托说明},{attorneyOther：委托单其余部分},{unShow：委托填写中不展示的部分}
*/
// 委托单字段对照表
global.attorneyWordList = [
    { "desc": "委托单位", "name": "attorneyDepartment", "part": "attorneyTitle", "canSelect": true, "selectList": global.department.map((item) => {return item.name})},
    { "desc": "委托人", "name": "attorneyPeople", "part": "attorneyTitle", "canSelect": false, },
    { "desc": "委托单编号", "name": "attorneyNo", "part": "attorneyTitle", "canSelect": false, },
    { "desc": "委托日期", "name": "attorneyDate", "part": "attorneyTitle", "canSelect": false, },
    { "desc": "检测方法", "name": "detectionMethod", "part": "attorneyTitle", "canSelect": true, "selectList": ["射线检测", "超声波检测", "焊后检测", "渗透检测", "TOFD检测",], },
    { "desc": "检测时机", "name": "detectionWindow", "part": "attorneyTitle", "canSelect": true, "selectList": ["焊后", "焊后24h", "焊后36h", "焊后48h", "热处理后", "水压试验后", "机加工后", "坡口加工前", "坡口加工后", "毛坯", "堆焊后", "打磨后", "清根后", "缺陷去除后", "校形后", "表修后", "与上部支柱组焊前",] },
    { "desc": "检测比例", "name": "detectionRatio", "part": "attorneyTitle", "canSelect": true, "selectList": ["10%", "20%", "25%", "40%", "50%", "100%",] },
    { "desc": "检测标准", "name": "detectionStandard", "part": "attorneyTitle", "canSelect": false, },
    { "desc": "合格级别", "name": "qualifiedLevel", "part": "attorneyTitle", "canSelect": true, "selectList": ["Ⅰ", "Ⅱ", "Ⅲ",] },
    { "desc": "技术等级", "name": "techLevel", "part": "attorneyTitle", "canSelect": true, "selectList": ["A", "AB", "B", "C"] },
    { "desc": "表面状态", "name": "surfaceState", "part": "attorneyTitle", "canSelect": true, "selectList": ["焊态", "打磨", "机加工", "喷砂面", "轧制面", "毛坯",] },
    { "desc": "热处理状态", "name": "heatTreatmentState", "part": "attorneyTitle", "canSelect": true, "selectList": ["/", "热处理前", "热处理后", "正火",] },
    { "desc": "委托说明", "name": "attorneyItem", "part": "attorneyItem", "canSelect": false, },
    { "desc": "工件表面检查结果", "name": "surfaceConclusion", "part": "attorneyOther", "canSelect": false, },
    { "desc": "检测示意图", "name": "detectionImage", "part": "attorneyOther", "canSelect": false, },
    { "desc": "日期", "name": "date", "part": "unShow", "canSelect": false, },
    { "desc": "版次", "name": "version", "part": "unShow", "canSelect": false, "defaultValue": "01", },
    { "desc": "检查员", "name": "checkManSign", "part": "unShow", "canSelect": false, },
    { "desc": "接收审核人", "name": "receiveManSign", "part": "unShow", "canSelect": false, },
    { "desc": "日期", "name": "dateSign", "part": "unShow", "canSelect": false, },
    { "desc": "当前页码", "name": "curPage", "part": "unShow", "canSelect": false, },
    { "desc": "总页码", "name": "totalPage", "part": "unShow", "canSelect": false, },
];

// 委托说明
global.attorneyItem = [
    {"desc": "部件名称（开孔编号）", "name": "partName", "flex": 1.5},
    {"desc": "焊缝编号", "name": "weldingLineNo", "flex": 1},
    {"desc": "材质", "name": "material", "flex": 3},
    {"desc": "规格（mm）", "name": "size", "flex": 3},
    {"desc": "焊接方法", "name": "weldType", "flex": 1},
    {"desc": "坡口形式", "name": "grooveType", "flex": 1},
    {"desc": "焊工代号", "name": "welderNo", "flex": 1},
    {"desc": "备注", "name": "comment", "flex": 1},
];
