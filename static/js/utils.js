export default{
	isPhone:function(num){
		var reg=/^1[34578]\d{9}$/;
		return reg.test(num);
	},
	formatDate:function(x,y){
		if (!(x instanceof Date)) {
	        var date = new Date();
	        date.setTime(x * 1000);
	        x = date;
	    }
	    var z = {
	        y: x.getFullYear(),
	        M: x.getMonth() + 1,
	        d: x.getDate(),
	        h: x.getHours(),
	        m: x.getMinutes(),
	        s: x.getSeconds()
	    };
	    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
	        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
	    });
	},
	inWeixin:function(){
		var ua = navigator.userAgent.toLowerCase();
    	return ua.indexOf('micromessenger') != -1;
	},
	getCookie: function (name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
			return decodeURI(arr[2]);
		else
			return null;
	},
	setCookie: function (name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
	},
	clearCookie: function (name) { //删除指定cookie
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getCookie(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	},
	deleteCookie: function () { //删除所有cookie
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys) {
			for (var i = keys.length; i--;)
				document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
		}
	},
	GetQueryString: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
}
