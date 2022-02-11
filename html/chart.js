//获取对象a的通信句柄
var socket = a.socket;
function emitBlock() {
    socket.emit('GetBlock', {
        time: new Date()	//消息发送时间
    }, function (a) {	//回调函数
        //发送成功
    });
}
function emitMarketCount() {
    socket.emit('GetCount', {
        time: new Date()	//消息发送时间
    }, function (a) {	//回调函数
        //发送成功
    });
}
function emitMarketInfo(mid) {
    socket.emit('GetInfo', {
        id: mid	//消息发送时间
    }, function (a) {	//回调函数
        //发送成功
    });
}
function changeid(data) {
    var work = data.getAttribute("data-change-type");
    var curid = CurID;
    var curCount = MarCount;
    
    if (work == "back" && curid >= MinCount) {
        console.log("back")
        curid -= 1;
        JumpTo(curid)
    }
    if (work == "next" && curid < curCount ) {
        console.log("next")
        curid += 1;
        JumpTo(curid)
    }
    console.log(curid)
    
}
function Jumpid(){
    var j = document.getElementById("id_input").value
    JumpTo(j)
}

function JumpTo(id) {
    myChart.showLoading();
    if(id > 0){
        emitMarketInfo(id)
    }else{
        SetDefaultChart(g_info)
        SetChartTitle(0)
    }
}
//页面加载
$(function () {
    myChart.showLoading();
    emitBlock()
    emitMarketCount()
    // emitMarketInfo(-1)
})
window.onresize = function(){
    myChart.resize();

}
// // 十秒钟重新获取数据一次
// setInterval(emitBlock, 10000);
// setInterval(emitMarketCount, 10000);
