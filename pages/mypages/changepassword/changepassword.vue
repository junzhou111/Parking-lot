<template>
	<view class="login">
		<view class="login-title">
			<view>
				修改密码
			</view>
		</view>
		<view class="login-input" v-show="!ForgotPassword">
			<input class="userinput" v-model="username" type="text" placeholder="请输入账号">
			<input class="userinput" v-model="send" type="text" placeholder="请输入验证码" @click="Sendcode">
			<input class="passinput" v-model="password" type="password" placeholder="请输入密码">
			<input class="passinput" v-model="againpassword" type="password" placeholder="再次确认密码">
		</view>
		<view class="login-btn">
			<button class="btn" @click="ChangePassword">{{ForgotPassword?"登录":"修改密码" }}</button>
		</view>


	</view>
</template>

<script>
	import {
		ChangePasswordAPI,
		Sendverificationcode
	} from '@/api/index.js'
	export default {
		data() {
			return {
				// 账号
				username: "",
				// 验证吗
				send: "",
				// 密码
				password: '',
				// 再次获取密码
				againpassword: '',
			};
		},
		methods: {
			// 发送验证码
			async Sendcode() {
				const form = {
					"requestType": "ForgetGetCode",
					data: {
						phone: this.username,
					}
				}
				const res = await Sendverificationcode(form)
				console.log(res);
			},
			// 修改密码
			async ChangePassword() {
				const form = {
					"requestType": "Forget",
					data: {
						phone: this.username,
						code: this.send,
						psd: this.password,
					}
				}
				const res = await ChangePasswordAPI(form)
				console.log("修改密码", res);

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

	}
</style>