<template>
	<div class="laika">
		<!-- <div v-if="welcome != 'false'" class="welcome"> -->
		<div v-if="welcome == true" class="welcome">
			<div class="logo"></div>
			<h1>欢迎来到来卡商城</h1>
  	</div>
		<div v-if="welcome !== true && isLogin !== 'true'" class="login">
			<div class="logo"></div>
			<div class="login-phone">
				<input type="number" placeholder="请输入手机号码"  v-model="phone" />
			</div>
			<div class="login-code">
				<input type="number" placeholder="请输入短信验证码" v-model="code" />
				<div class="code" @click="getCode" :class="{'z-active': time > 0}">{{timeShow}}</div>
			</div>
			<div class='login-dialog-tip'>{{tip}}</div>
			<div class='login-dialog-btn' @click="register">进入商城</div>
			<div class="login-dialog-agreement">
				登录注册即表示同意
				<router-link to="agreement">
					《来卡世界服务协议》
				</router-link>
			</div>
		</div>
	</div>
	
</template>

<script>
import { Toast,MessageBox } from "mint-ui";
export default{
	data (){
		return{
				phone: localStorage.getItem("phone") || '',
				code: '',
				tip: '',
				time: 0,
				timer: null,
				// welcome:sessionStorage.getItem('welcome') == null ? 'true':'false',
				welcome:true,
				isLogin:localStorage.getItem('isBindPhone'),
      }
  },
  created(){
    if (this.$route.path == '/' || this.$route.path == '/home' ) {
      $('body').css('height','0');
    }
  },
  destroyed() {
    //路由销毁之后恢复body高度
   $('body').css('height','100%');
  },
	mounted(){
		var that = this ;
		document.title = "来卡商城";
		console.log(this.$utils.GetQueryString('encyptData'));
		//获取平台传递过来的转卖数据,保存在本地
		if (that.$utils.GetQueryString('encyptData') !== null ) {
			sessionStorage.setItem('encyptData',this.$utils.GetQueryString('encyptData'))
			sessionStorage.setItem('sign',this.$utils.GetQueryString('sign'))
			var pingtaiUrl = 'http://t.m.buycardlife.com/'
			if(document.domain=="m.buycardlife.com"){
				pingtaiUrl = 'http://m.buycardlife.com/'
			}
			if(document.domain=="pre.m.buycardlife.com"){
				pingtaiUrl = 'http://pre.m.buycardlife.com/'
			}
			window.location.href = pingtaiUrl ;
		}
		setTimeout(function() {
			that.welcome = false;
			if (that.isLogin !== "true") {
				document.title = "登录";
			}else {
				if (sessionStorage.getItem('encyptData') == null || sessionStorage.getItem('encyptData') == "null") {
					that.$router.push({path:'/center',query:{}})
				}else {
					that.$router.push({path:'/exchange',query:{}})
				}
			}
		}, 2000);
	},
	computed: {
		timeShow: function () {
			if (this.time <= 0) {
				return '获取验证码';
			} else {
				var time = this.time;
				time = String(time);
				time = time.length < 2 ? '0' + time : time;
				return '重新获取' + time;
			}
		}
  },
	methods: {
		register: function () {
			if (!(/^1[34578]\d{9}$/.test(this.phone))) {
				this.tip = '输入正确的手机号码';
				return false;
			}
			if ($.trim(this.code) == '') {
				this.tip = '输入验证码';
				return false;
			}
			this.tip = '';
			var that = this;
			this.$post('/api/user/loginByPhone',{
				code: this.code,
				phone: this.phone,
				inviteCode: '',
				shareId:''
			}).then(response => {
				console.log(response);
				console.log('登录成功');
        localStorage.setItem("isBindPhone","true");
        localStorage.setItem("phone",that.phone);
        if (sessionStorage.getItem('encyptData') == null || sessionStorage.getItem('encyptData') == "null") {
          that.$router.push({path:'/center',query:{}})
        }else {
          that.$router.push({path:'/exchange',query:{}})
        }
			}).catch(err => {
				console.log(err);
			})
		},
		getCode: function () {
			var that = this;
			if (!(/^1[34578]\d{9}$/.test(that.phone))) {
				that.tip = '输入正确的手机号码';
				return false;
			}
			if (that.time > 0) {
					return;
			}
			this.$api.getData({
				url: '/Api/common/getSMSCode',
				type: 'GET',
				data: {
					codeType: "phoneLogin", 
					phone: that.phone
				},
				success: function (payload) {
					console.log(payload)
					that.time = 60;
					that.timer = setInterval(function () {
						if (that.time == 0) {
							clearInterval(that.timer);
							return false;
						}
						that.time--;
					}, 1000)
				},
				fail: function (code, message) {
					console.log(message);
					that.tip = message;
				},
				error: function (err) {
					console.log(err);
				}
			})
		},
	}
}
</script>

<style lang="less">
.login {
	padding: 0 .55rem;
	.logo {
		width: 1.56rem;
		height: 1.56rem;
		background-image: url(../../static/images/logo.png);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-top: 1.67rem;
		margin-bottom: 1rem;
	}
	h1 {
    color: #6a6a68;
    font-size: .4rem;
    text-align: center;
    padding-top: .5rem;
  }
	.login-phone,
	.login-code {
		width: 6.4rem;
		height: 1rem;
		border-radius: .08rem;
		border: solid 1px #e5e5e5;
		line-height: 1rem;
		padding: 0 .3rem;
		input {
			font-size: .3rem;
		}
	}
	.login-code {
		position: relative;
		margin-top: .3rem;
		.code {
			position: absolute;
			right: .3rem;
			top: 34%;
			text-align: center;
			border-radius: .1rem;
			font-size: .3rem;
			color: #ff7b02;
			cursor: pointer;
		}
		.code.z-active {
			color: #BBBBBB;
		}
	}
	.login-dialog-tip {
		padding: .2rem;
		font-size: .3rem;
		color: red;
	}
	.login-dialog-btn {
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		font-size: .35rem;
		color: #fff;
		background-color: #ff7b02;
		background-size: 100% 100%;
		border-radius: .08rem;
		cursor: pointer;
		margin-top: .2rem;
	}
	.login-dialog-agreement {
		color: #999999;
		font-size: .28rem;
		padding-top: .2rem;
		text-align: center;
		a {
			color: #ff7b02;
			font-size: .28rem;
		}
	}
}
.welcome {
  .logo {
		width: 1.56rem;
		height: 1.56rem;
    background-image: url(../../static/images/logo.png);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
    margin-top: 2.67rem;
	}
  h1 {
    color: #6a6a68;
    font-size: .4rem;
    text-align: center;
    padding-top: .5rem;
  }
}

</style>