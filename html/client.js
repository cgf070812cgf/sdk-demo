// 创建类
function App() {
	var doc = document;	//获取网页元素
	this.$input = doc.querySelector('#Count');		// 获取输入框
	this.$sendBtn = doc.querySelector('#Get');	//获取发送键
	this.$sendBtn1 = doc.querySelector('#Get1');	//获取发送键
	this.$sendBtn3 = doc.querySelector('#Get3');	//获取发送键
	this.socket = io();	//获取socket
}


//输入内容转义   
//TODO 没太搞懂它转义了什么
App.prototype.strEscape = function (str) {
	var div = document.createElement('div');
	if (div.innerText) {
		div.innerText = str;
	} else {
		div.textContent = str;//Support firefox
	}
	return div.innerHTML;
};
App.prototype.sendMsg = function () {

	
	this.socket.emit('GetCount', {
		time: new Date()	//消息发送时间
	}, function (a) {	//回调函数
		//发送成功
	});
};
App.prototype.sendMsg1 = function () {

	
	this.socket.emit('GetInfo', {
		time: new Date()	//消息发送时间
	}, function (a) {	//回调函数
		//发送成功
	});
};

App.prototype.sendMsg3 = function () {

	
	this.socket.emit('GetBlock', {
		time: new Date()	//消息发送时间
	}, function (a) {	//回调函数
		//发送成功
	});
};
//创建对象a
window.a = new App();