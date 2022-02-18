// import SDK from "./packages/sdk";
import SDK from "@zeitgeistpm/sdk"
// import types from "@zeitgeistpm/sdk/dist/types";
import { ApiPromise, WsProvider } from "@polkadot/api";

//=================================================================

var InitSDK;
var ConnectSum = 0;
var dist = {};
var InfoDist = {};
var SlugDist = {};
var mSlugDist = {};
var dist_none = [];
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 6603;	//服务器端口
app.use(express.static(__dirname + '/html'));

const ZTGNET = "wss://bsr.zeitgeist.pm";
// const ZTGNET = "wss://bp-rpc.zeitgeist.pm";
// wss://bsr.zeitgeist.pm
// wss://bp-rpc.zeitgeist.pm
type Options = {
    endpoint: string;
    graphQlEndpoint: string;
    // statuses: types.MarketStatusText[];
    // ordering: types.MarketsOrdering;
    // orderBy: types.MarketsOrderBy;
    pageNumber: number;
    pageSize: number;
    creator?: string;
    oracle?: string;
};
var opts: Options = {
    endpoint: ZTGNET,
    graphQlEndpoint: "https://processor.zeitgeist.pm/graphql",
    // statuses: ["Active"],
    // orderBy: "newest",
    // ordering: "desc",
    pageSize: 10,
    pageNumber: 1
};

let {
    endpoint,
    graphQlEndpoint,
    // statuses,
    // ordering,
    // orderBy,
    pageNumber,
    pageSize,
    creator,
    oracle,
} = opts;
var provider = new WsProvider("wss://bp-rpc.zeitgeist.pm");

//======================================================

async function SDKInit() {
    console.log("start")
    let res = await SDK.initialize(ZTGNET, { graphQlEndpoint });
    return res;
}



async function m_MarketCount() {
    let res = await InitSDK.getMarketCount();
    console.log(res);
    return res;
}
async function m_MarketsInfo(id: number, flag: boolean) {
    let res;
    if (flag) {
        res = await InitSDK.fetchMarketData(id);
    } else {
        // ~~~~~~~~~~~~~~~~~~~~
        if (dist_none.includes(id)) {
            res = id
        }
        else {
            res = InfoDist[id];
        }

    }

    return res;
}
async function m_BlockInfo() {
    let api = await ApiPromise.create({ provider });

    let blockNumber = await Promise.all([
        api.rpc.chain.getHeader(),
    ]);

    return blockNumber;
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

        return
    }

    if (slug == null) {
        slug = 'null'
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
    console.log(SlugDist)
}
//定时任务
function intervalFunc() {
    if (ConnectSum > 0) {
        console.log('===Flush data===')
        GetCount(1, false);
        GetBlock(1, false);
        console.log('===Flush done===')
    }

}
//=====================
//  获取tag列表 1. 拿到市场总数   2. 遍历市场， 拿到所有Info中的tag, 存入列表
//  服务器主动发送， 不接受获取请求
function GetTagList() {
    console.log("GetMarketCount")
    // 获取市场数量
    m_MarketCount()
        .then(function (value) {
            let mdist = {};
            mdist['sum_count'] = 0;
            mdist['type_count'] = 0;
            let mCount = value;
            console.log("tag collecting")
            // 遍历每个market获取Info
            for (let index = 1; index <= mCount; index++) {
                setTimeout(function () {
                    m_MarketsInfo(index, true)
                        .then(function (value) {
                            let tags = value.tags;
                            let slug = value.slug;
                            let marketId = value.marketId;
                            let categories = value.categories;
                            InfoDist[marketId] = value;
                            // 无tag的market存储
                            if (tags.length == 0) {
                                if (mdist.hasOwnProperty('null')) {
                                    mdist['null'] += 1;
                                } else {
                                    mdist['null'] = 1;
                                    mdist['type_count'] += 1;
                                }
                                GetSlug('null', slug, marketId, categories)
                            } else {
                                for (let i = 0; i < tags.length; i++) {
                                    if (mdist.hasOwnProperty(tags[i])) {
                                        mdist[tags[i]] += 1;
                                    } else {
                                        mdist[tags[i]] = 1;
                                        mdist['type_count'] += 1;
                                    }
                                    GetSlug(tags[i], slug, marketId, categories)
                                }
                            }
                            mdist['sum_count'] += 1;
                            console.log("collect finish:" + index + '  already:' + mdist['sum_count'] + '  Sum:' + mCount);
                            //由于是异步操作只能通过每次检查计数判断是否读取完成
                            if (mdist['sum_count'] == mCount) {
                                SaveSlug()
                                console.log("tag collect finish")
                                setInterval(intervalFunc, 10000);
                                // console.log(mdist)
                                dist = mdist
                            }
                        })
                        .catch(function (value) {
                            let str = JSON.stringify(value.message);
                            dist_none.push(parseInt(str.split(" ")[4]))
                            console.log("market " + str.split(" ")[4] + " is not eixt")
                            mCount--;
                            // console.log(dist)
                        })
                }, 1)
            }

        })
        .catch(function (value) {
            console.log('ERROR:' + value);
        })
}
function SendTagList(socket) {
    socket.emit('TagList', {
        data: dist,
        slug: SlugDist,
        name: "TagList"
    });
}

function GetCount(socket, flag) {
    console.log("GetCount")
    m_MarketCount()
        .then(function (value) {
            if (flag) {
                socket.emit('MarketCount', {			//发送给当前通信的客户端
                    data: value,
                    name: "MarketCount"
                });
            } else {
                io.emit('MarketCount', {			//发送给当前通信的客户端
                    data: value,
                    name: "MarketCount"
                });
            }

        })
        .catch(function (value) {
            console.log('ERROR:' + value);
        })
}

// 发送市场详情
function GetInfo(socket, id) {
    console.log("GetInfo")
    m_MarketsInfo(id, false)
        .then(function (value) {
            if (dist_none.includes(id)) {

                socket.emit('MarketInfo', {			//发送给当前通信的客户端
                    data: id,
                    name: "MarketInfo",
                })
            }

            else {
                // console.log(value);

                socket.emit('MarketInfo', {			//发送给当前通信的客户端
                    data: value.toJSONString(),
                    name: "MarketInfo"
                });
            }

        })
        .catch(function (value) {
            console.log('ERROR:' + value);
        })
}
// 发送节点高度
function GetBlock(socket, flag) {
    console.log("GetBlock")
    m_BlockInfo()
        .then(function (value) {
            if (flag) {
                socket.emit('GetBlock', {			//发送给当前通信的客户端
                    data: value[0],
                    name: "GetBlock"
                });
            } else {
                io.emit('GetBlock', {			//发送给当前通信的客户端
                    data: value[0],
                    name: "GetBlock"
                });
            }
        })
        .catch(function (value) {
            console.log('ERROR:' + value);
        })
}
//====================================================
SDKInit()
    .then(function (value) {
        InitSDK = value.models;
        console.log("Init finish")
        GetTagList();


        io.on('connection', async (socket) => {
            ConnectSum += 1;
            console.log('===OnLine:' + ConnectSum + '===')

            SendTagList(socket);
            socket.on('GetCount', async (data) => {
                GetCount(socket, true);
            });
            socket.on('GetInfo', async (data) => {
                // console.log(data)
                let id = Number(data.id);
                GetInfo(socket, id);
            });
            socket.on('GetBlock', async (data) => {
                GetBlock(socket, true);
            });
            socket.on('disconnect', function () {
                ConnectSum -= 1;
                console.log('[' + ConnectSum + '] one leave');

            });
        });

        server.listen(port, () => {
            console.log('listening on %d...', port);
            console.log('open browser: localhost:%d', port)
        });
    })
    .catch(function (value) {
        console.log('ERROR:' + value);
    })

