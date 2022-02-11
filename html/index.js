//获取对象a的通信句柄
var socket = a.socket;
var MarCount = 0;
var MinCount = 1;
var CurID = 0;
var myNewChart;
var g_info;
var myChart = echarts.init(document.getElementById('pieChart'));

function ChartOption(colorList, mdata, dataList, nameList){
    var datasets = {
        title: {
            text: mdata.slug,
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            top: '10%'
          },
        series: [
            {
                color: colorList,
                name: mdata.slug,
                type: 'pie',
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}:{c}  ({d}%)"
                },
                label : {
                    normal : {
                        formatter: '{b}:{c}' + '\n\r' + '({d}%)',
                        show: false,
                    },
                    emphasis: {
                        show: true,
                    }
                },
                emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                radius: '55%',
                center: ['50%', '50%'],
                data: dataList
            }
        ]
    }
    return datasets;
}

function generateCharts(dist) {
    myChart.hideLoading();
    myChart.setOption(dist)
}
function SetAvater(img) {
    $('#marketavater').attr("src", img);
}
function SetChartTitle(data) {
    document.getElementById("market_id").innerHTML = 'MarketId: '+ data
    CurID = data;
    document.getElementById("id_input").value = data;
}
function SetChartTags(data) {
    document.getElementById("markettags").innerHTML = '';
    for (let index = 0; index < data.length; index++) {
        console.log("tag: "+ data[index])
        document.getElementById("markettags").innerHTML += '<span class="card-title">'+ data[index] +'</span>'
    }
    
}
function TransToCharts(mdata) {
    var avater = null;
    var datasets = {};
    var dataList = [];
    var colorList = [];
    var nameList = [];
    if(mdata.categories != null){
        var care = mdata.categories
        for (let index = 0; index < care.length; index++) {
            dataList.push({value: 1, name:care[index].name});
            colorList.push(care[index].color);
            nameList.push(care[index].name);
        }
        datasets = ChartOption(colorList, mdata, dataList, nameList);
    }
    avater = mdata.img;
    generateCharts(datasets);
    SetAvater(avater);
    SetChartTitle(mdata.marketId);
    SetChartTags(mdata.tags)
}
function buildColor(){
    var color="#"+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,"0");
    return color;
}
//
function SetDefaultChart(data) {
    var nameList = [];
    var datasets = {};

    var dataList = [];
    var colorList = [];
    for(var key in data){
        var mname = key;
        var count = data[key];
        if (mname != 'sum_count' && mname != 'type_count'){
            dataList.push({value: count, name:mname});
            colorList.push(buildColor());
            nameList.push(mname);
        }
        datasets = ChartOption(colorList, {slug:"Tag List"}, dataList, nameList);
    }

    generateCharts(datasets);
    SetAvater('./src/Logo/logo.jpg');
    SetChartTags(['ALL OF TAGS'])
    SetChartTitle('0')
}

// 在slug字符串中插入 categoriesData
function categoriesData(data, key, num) {
    var categories = data[key]['categories'][num];
    console.log('categories');
    console.log(categories);
    console.log(data[key]['marketId'][num]);
    var subsubbody = '';

    if(categories != null){
        for (let index = 0; index < categories.length; index++){
            subsubbody += '<div class="card mb-1 collapsed-card">\
                    <div class="card-header" style="background-color: #e6e1c548"> \
                        <a href="#" class="card-title" onclick="JumpTo('+ data[key]['marketId'][num]+')" style="color:'+ categories[index].color +'">'+ categories[index].name +'</a>\
                    </div></div>'
        }
    }else{
        subsubbody += '<div class="card mb-1 collapsed-card">\
        <div class="card-header" > \
            <a href="#" class="card-title">None</a>\
        </div></div>'
    }

    return subsubbody;
}

function slugData(data, key) {
    console.log("key="+ key)
    var slug = data[key].slug;
    console.log(slug)
    var subbody = '';
    for (let index = 0; index < slug.length; index++) {
        // slug[index] = slug[index].replace(/'/g, '`')
        slug[index] = slug[index].replace(/</g, '< ')

        subbody += '<div class="card mb-1 collapsed-card">\
                <div class="card-header" style="background-color: #adb5bd48"> \
                    <h3 class="card-title">'+ slug[index] +'</h3>\
                    <div class="card-tools">\
                        <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-plus"></i></button>\
                    </div>\
                </div>\
                <div class="card-body" style="padding:3px;">\
                    '+categoriesData(data, key, index)+'\
                </div>\
            </div>'
    }
    console.log(slug)
    return subbody;
}

socket.on('connect', (skt) => {
	console.log("connect");
});


socket.on('MarketCount', (data) => {
	var res = data.data;
    console.log(data.name)
    console.log(res)
    document.getElementById("marketCount").innerHTML = res;
    MarCount = res;
});

socket.on('MarketInfo', (data) => {
	var res = data.data;
    console.log(data.name)
    console.log(JSON.parse(res))
    // var alllist = data.all;
    TransToCharts(JSON.parse(res))

});
socket.on('GetBlock', (data) => {
	var res = data.data;
    console.log(data.name)
    console.log(res)
    document.getElementById("BlockSum").innerHTML = res.number;
});
socket.on('TagList', (data) => {
	var res = data.data;
    g_info = res;
    var slug_res = data.slug;
    SetDefaultChart(res)
    console.log(data.name)
    console.log(res)
    console.log(slug_res)
    var taglist = Object.keys(res).sort(function(a, b) {return res[b] - res[a]});
    console.log(taglist)
    document.getElementById("tag_header").innerHTML = '<h3 class="card-title">Tag List <span class="badge bg-primary">'+ res['type_count']+'</span></h3>';
    
    document.getElementById("tag_list").innerHTML = '';
    for (let index = 0; index < taglist.length; index++)
    {
        if (taglist[index] != 'sum_count' && taglist[index] != 'type_count'&& taglist[index] != 'null') {
            console.log("reskey = "+ taglist[index])
            document.getElementById("tag_list").innerHTML += '<div class="card mb-1 collapsed-card">\
                <div class="card-header" > \
                    <h3 class="card-title">\
                    '+ taglist[index] +' <span class="badge bg-primary">'+res[taglist[index]] +'</span>\
                    </h3>\
                    <div class="card-tools">\
                        <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-plus"></i></button>\
                    </div>\
                </div>\
                <div class="card-body" style="padding:2px;">\
                    '+slugData(slug_res, taglist[index])+'\
                </div>\
            </div>'
        }
    }
    document.getElementById("tag_list").innerHTML += '<div class="card mb-1 collapsed-card">\
                <div class="card-header" > \
                    <h3 class="card-title">\
                    '+ 'null' +' <span class="badge bg-primary">'+res['null'] +'</span>\
                    </h3>\
                    <div class="card-tools">\
                        <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-plus"></i></button>\
                    </div>\
                </div>\
                <div class="card-body" style="padding:2px;">\
                    '+slugData(slug_res, 'null')+'\
                </div>\
            </div>'
    // document.getElementById("BlockSum").innerHTML = res.number;
});
