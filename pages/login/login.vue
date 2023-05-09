<template>
	<view class="login">
		<view class="login-title">
			<view>
				您好，
			</view>
			<view>
				欢迎登录智慧社区管理平台
			</view>
		</view>
		<view class="login-input" v-show="ForgotPassword">
			<input class="userinput" v-model="data.username" type="text" placeholder="请输入账号">
			<input class="passinput" v-model="data.password" type="password" placeholder="请输入密码">
		</view>
		<view class="login-input" v-show="!ForgotPassword">
			<input class="userinput" type="text" placeholder="请输入账号">
			<input class="userinput" type="text" placeholder="请输入验证码">
			<input class="passinput" type="password" placeholder="请输入密码">
			<input class="passinput" type="password" placeholder="再次确认密码">
		</view>
		<view class="login-btn">
			<button class="btn" @click="logininfo">{{ForgotPassword?"登录":"修改密码" }}</button>
		</view>
		<view class="login-footer" @click="handelforgotpassword">
			{{ForgotPassword?"忘记密码":"去登录" }}
		</view>

	</view>
</template>

<script>
	import {
		login
	} from '@/api/index.js'
	export default {
		data() {
			return {
				// 判断当前是登录还是找回密码
				ForgotPassword: true,
				// 登陆时的input内容

				data: {
					username: '13193477772',
					password: '123456',
				}

			};
		},
		methods: {
			handelforgotpassword() {
				this.ForgotPassword = !this.ForgotPassword

			},

			// 登录接口的调用
			async logininfo() {
				this.info()

			},
			//登录接口
			info() {
				const form = {
					"requestType": "SignIn",
					data: {
						phone: this.data.username,
						psd: this.data.password,
						isSimulate: 0
					}
				}
				uni.request({
					url: "http://nat.ynawe.com:10001/CommunityCloud/_comapplet_SignIn",
					method: 'POST',
					data: form,
					success: (res) => {
						if (res.data.status == 0) {
							console.log("登陆成功", res);
							uni.setStorageSync("cookieKey", res.cookies[0])
							uni.switchTab({
								url: "/pages/index/index"
							})
						}else {
						}

					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		height: 100%;

		.login-title {
			width: 80%;
			margin: 0 auto;
			font-size: 24px;
			padding: 50px 0;

		}

		.login-input {
			width: 80%;
			margin: 0 auto;

			.userinput {
				height: 50px;
				border-bottom: 1px solid #eee;
			}

			.passinput {
				height: 50px;
				border-bottom: 1px solid #eee;
			}
		}

		.login-btn {
			width: 80%;
			margin: 20px auto;

			.btn {
				background-color: #0055ff;
				color: white;
			}

		}

		.login-footer {
			text-align: center;
		}
	}
</style>