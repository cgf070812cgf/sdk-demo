"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// import SDK from "./packages/sdk";
var sdk_1 = require("@zeitgeistpm/sdk");
// import types from "@zeitgeistpm/sdk/dist/types";
var api_1 = require("@polkadot/api");
//=================================================================
var InitSDK;
var ConnectSum = 0;
var dist = {};
var InfoDist = {};
var SlugDist = {};
var mSlugDist = {};
var dist_none = [];
var express = require('express'), app = express(), server = require('http').createServer(app), io = require('socket.io')(server), port = process.env.PORT || 6603; //服务器端口
app.use(express.static(__dirname + '/html'));
var ZTGNET = "wss://bsr.zeitgeist.pm";
var opts = {
    endpoint: ZTGNET,
    graphQlEndpoint: "https://processor.zeitgeist.pm/graphql",
    // statuses: ["Active"],
    // orderBy: "newest",
    // ordering: "desc",
    pageSize: 10,
    pageNumber: 1
};
var endpoint = opts.endpoint, graphQlEndpoint = opts.graphQlEndpoint, 
// statuses,
// ordering,
// orderBy,
pageNumber = opts.pageNumber, pageSize = opts.pageSize, creator = opts.creator, oracle = opts.oracle;
var provider = new api_1.WsProvider("wss://bp-rpc.zeitgeist.pm");
//======================================================
function SDKInit() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("start");
                    return [4 /*yield*/, sdk_1["default"].initialize(ZTGNET, { graphQlEndpoint: graphQlEndpoint })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function m_MarketCount() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, InitSDK.getMarketCount()];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/, res];
            }
        });
    });
}
function m_MarketsInfo(id, flag) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!flag) return [3 /*break*/, 2];
                    return [4 /*yield*/, InitSDK.fetchMarketData(id)];
                case 1:
                    res = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    // ~~~~~~~~~~~~~~~~~~~~
                    if (dist_none.includes(id)) {
                        res = id;
                    }
                    else {
                        res = InfoDist[id];
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/, res];
            }
        });
    });
}
function m_BlockInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var api, blockNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api_1.ApiPromise.create({ provider: provider })];
                case 1:
                    api = _a.sent();
                    return [4 /*yield*/, Promise.all([
                            api.rpc.chain.getHeader(),
                        ])];
                case 2:
                    blockNumber = _a.sent();
                    return [2 /*return*/, blockNumber];
            }
        });
    });
}
//=======================
//  获取每个Info中的slug
//=======================
function GetSlug(tag, slug, marketId, categories) {
    if (!mSlugDist.hasOwnProperty(tag)) {
        mSlugDist[tag] = {};
        mSlugDist[tag]['slug'] = [];
        mSlugDist[tag]['marketId'] = [];
        mSlugDist[tag]['categories'] = [];
    }
    if (slug == "no_eixt") {
        mSlugDist[tag]['slug'].push(slug);
        mSlugDist[tag]['marketId'].push(marketId);
        mSlugDist[tag]['categories'].push(categories);
        return;
    }
    if (slug == null) {
        slug = 'null';
    }
    mSlugDist[tag]['slug'].push(slug);
    mSlugDist[tag]['marketId'].push(marketId);
    mSlugDist[tag]['categories'].push(categories);
    // console.log('=========' + marketId + '========' + slug);
}
function SaveSlug() {
    // 内容转存， temp容器清空
    // SlugDist = Object.keys(mSlugDist).sort(function(a, b) {return mSlugDist[a]['marketId'].length - mSlugDist[b]['marketId'].length});
    SlugDist = mSlugDist;
    mSlugDist = {};
    console.log(SlugDist);
}
//定时任务
function intervalFunc() {
    if (ConnectSum > 0) {
        console.log('===Flush data===');
        GetCount(1, false);
        GetBlock(1, false);
        console.log('===Flush done===');
    }
}
//=====================
//  获取tag列表 1. 拿到市场总数   2. 遍历市场， 拿到所有Info中的tag, 存入列表
//  服务器主动发送， 不接受获取请求
function GetTagList() {
    console.log("GetMarketCount");
    // 获取市场数量
    m_MarketCount()
        .then(function (value) {
        var mdist = {};
        mdist['sum_count'] = 0;
        mdist['type_count'] = 0;
        var mCount = value;
        console.log("tag collecting");
        var _loop_1 = function (index) {
            setTimeout(function () {
                m_MarketsInfo(index, true)
                    .then(function (value) {
                    var tags = value.tags;
                    var slug = value.slug;
                    var marketId = value.marketId;
                    var categories = value.categories;
                    InfoDist[marketId] = value;
                    // 无tag的market存储
                    if (tags.length == 0) {
                        if (mdist.hasOwnProperty('null')) {
                            mdist['null'] += 1;
                        }
                        else {
                            mdist['null'] = 1;
                            mdist['type_count'] += 1;
                        }
                        GetSlug('null', slug, marketId, categories);
                    }
                    else {
                        for (var i = 0; i < tags.length; i++) {
                            if (mdist.hasOwnProperty(tags[i])) {
                                mdist[tags[i]] += 1;
                            }
                            else {
                                mdist[tags[i]] = 1;
                                mdist['type_count'] += 1;
                            }
                            GetSlug(tags[i], slug, marketId, categories);
                        }
                    }
                    mdist['sum_count'] += 1;
                    console.log("collect finish:" + index + '  already:' + mdist['sum_count'] + '  Sum:' + mCount);
                    //由于是异步操作只能通过每次检查计数判断是否读取完成
                    if (mdist['sum_count'] == mCount) {
                        SaveSlug();
                        console.log("tag collect finish");
                        setInterval(intervalFunc, 10000);
                        // console.log(mdist)
                        dist = mdist;
                    }
                })["catch"](function (value) {
                    var str = JSON.stringify(value.message);
                    dist_none.push(parseInt(str.split(" ")[4]));
                    console.log("market" + str.split(" ")[4] + " is not eixt");
                    mCount--;
                    // console.log(dist)
                });
            }, 1);
        };
        // 遍历每个market获取Info
        for (var index = 1; index <= mCount; index++) {
            _loop_1(index);
        }
    })["catch"](function (value) {
        console.log('ERROR:' + value);
    });
}
function SendTagList(socket) {
    socket.emit('TagList', {
        data: dist,
        slug: SlugDist,
        name: "TagList"
    });
}
function GetCount(socket, flag) {
    console.log("GetCount");
    m_MarketCount()
        .then(function (value) {
        if (flag) {
            socket.emit('MarketCount', {
                data: value,
                name: "MarketCount"
            });
        }
        else {
            io.emit('MarketCount', {
                data: value,
                name: "MarketCount"
            });
        }
    })["catch"](function (value) {
        console.log('ERROR:' + value);
    });
}
// 发送市场详情
function GetInfo(socket, id) {
    console.log("GetInfo");
    m_MarketsInfo(id, false)
        .then(function (value) {
        if (dist_none.includes(id)) {
            socket.emit('MarketInfo', {
                data: id,
                name: "MarketInfo"
            });
        }
        else {
            // console.log(value);
            socket.emit('MarketInfo', {
                data: value.toJSONString(),
                name: "MarketInfo"
            });
        }
    })["catch"](function (value) {
        console.log('ERROR:' + value);
    });
}
// 发送节点高度
function GetBlock(socket, flag) {
    console.log("GetBlock");
    m_BlockInfo()
        .then(function (value) {
        if (flag) {
            socket.emit('GetBlock', {
                data: value[0],
                name: "GetBlock"
            });
        }
        else {
            io.emit('GetBlock', {
                data: value[0],
                name: "GetBlock"
            });
        }
    })["catch"](function (value) {
        console.log('ERROR:' + value);
    });
}
//====================================================
SDKInit()
    .then(function (value) {
    var _this = this;
    InitSDK = value.models;
    console.log("Init finish");
    GetTagList();
    io.on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            ConnectSum += 1;
            console.log('===OnLine:' + ConnectSum + '===');
            SendTagList(socket);
            socket.on('GetCount', function (data) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    GetCount(socket, true);
                    return [2 /*return*/];
                });
            }); });
            socket.on('GetInfo', function (data) { return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    id = Number(data.id);
                    GetInfo(socket, id);
                    return [2 /*return*/];
                });
            }); });
            socket.on('GetBlock', function (data) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    GetBlock(socket, true);
                    return [2 /*return*/];
                });
            }); });
            socket.on('disconnect', function () {
                ConnectSum -= 1;
                console.log('[' + ConnectSum + '] one leave');
            });
            return [2 /*return*/];
        });
    }); });
    server.listen(port, function () {
        console.log('listening on %d...', port);
        console.log('open browser: localhost:%d', port);
    });
})["catch"](function (value) {
    console.log('ERROR:' + value);
});
