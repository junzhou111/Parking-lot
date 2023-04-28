<template>
	<!-- 临时车收费记录 -->
	<view class="FeeRecords">
		<!-- 弹出筛选层 -->
		<u-popup :show="show" @close="close" @open="open" mode="top">
			<view class="fromview">
				<!-- 支付状态 -->
				<u-action-sheet :actions="state.list" @select="stateClick" :title="state.title" cancelText="取消"
					@close="state.show=false" :show="state.show"></u-action-sheet>
				<view class="calendarinput" @click="state.show=true">
					<text v-text="state.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>

				<!-- 支付来源 -->
				<u-action-sheet :actions="payment.list" @select="paymentClick" :title="payment.title" cancelText="取消"
					@close="payment.show=false" :show="payment.show"></u-action-sheet>
				<view class="calendarinput" @click="payment.show=true">
					<text v-text="payment.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 支付场景 -->
				<u-action-sheet :actions="scene.list" @select="sceneClick" :title="scene.title" cancelText="取消"
					@close="scene.show=false" :show="scene.show"></u-action-sheet>
				<view class="calendarinput" @click="scene.show=true">
					<text v-text="scene.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 表单日历 -->
				<u-calendar :show="calendarshow" mode="range" @confirm="confirm" @close="close"></u-calendar>
				<view class="calendarinput" @click="calendarshow = true">
					<text v-text="calendarvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="confirmbtn">确认</button>
			</view>
		</u-popup>
		<!-- 搜索框 -->
		<view class="inputbox">
			<view class="input">
				<u--input adjustPosition placeholder="搜索" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399"></u--input>
			</view>
			<view class="inputbtn">
				<button class="bt" @click="show=true">筛选</button>
				<button class="bt">搜索</button>
				<button class="bt" @click="resetbtn">重置</button>
			</view>
		</view>

		<!-- 收款记录列表 -->
		<view class="Record-List">
			<view class="allmoney">总额:{{allmoney}}</view>
			<view class="Record-List-item" v-for="(item,index) in alllist" :key="index" @click="Jumpdetails(index)">
				<view class="item-left">
					<view class="item-left-title">
						{{item.title}}
					</view>
					<view class="item-left-time">
						<text
							class="suorce">{{item.pay_suorce=='0'?'掌上社区app':item.pay_suorce=='1'?'实时扫码付款':item.pay_suorce=='2'?'聚合收款码':'其他自收'}}</text>
						<text class="time">{{item.pay_createtime}}</text>
					</view>
				</view>
				<view class="item-right">
					<view class="item-right-money">
						￥{{item.money}}
					</view>
					<view class="item-right-paymented">
						{{item.pay_state=="0"?'待支付':item.pay_state=="1"?'已支付':item.pay_state=='3'?'支付取消':'未知状态'}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTemporaryvehicle
	} from "@/api/index.js"
	export default {
		data() {
			return {
				//  弹出筛选层  
				show: false,
				// 支付状态
				state: {
					title: '支付状态',
					list: [{
						name: '待支付',
						type: "0"
					}, {
						name: '已支付',
						type: "1"
					}, {
						name: '支付取消',
						type: "2"
					}, {
						name: '未知状态',
						type: "3"
					}],
					show: false,
					value: '支付状态',
					type: 'all'
				},
				// 支付方式
				payment: {
					title: '支付方式',
					list: [{
							name: '现场当面收款',
							type: "0"
						},
						{
							name: '微信支付',
							type: "1"
						},
						{
							name: '支付宝支付',
							type: "2"
						},
						{
							name: '其他支付',
							type: "3"
						}
					],
					show: false,
					value: '支付方式',
					type: 'all',
				},
				// 支付场景   scene
				scene: {
					title: '支付场景',
					list: [{
							name: '掌上社区app',
							type: "0"
						},
						{
							name: '实时扫码付款',
							type: "1"
						}, {
							name: '聚合收款码',
							type: "2"
						}, {
							name: '其他自收',
							type: "3"
						}
					],
					show: false,
					value: '支付场景',
					type: 'all'
				},
				// 日历表单
				calendarshow: false,
				calendarvalue: '年/月/日',
				// 日历开始时间
				StartTime: 'all',
				// 日历结束时间
				Stoptime: 'all',


				//总金额
				allmoney: "",
				// 所有数据
				alllist: []

			};
		},
		methods: {
			// 	  弹出筛选层 
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			// 支付状态
			stateClick(index) {
				console.log("支付状态返回的数据", index);
				this.state.value = index.name
				this.state.type = index.type
			},
			// 支付方式
			paymentClick(index) {
				console.log("支付方式返回的数据", index);
				this.payment.value = index.name
				this.payment.type = index.type
			},
			// 支付场景
			sceneClick(index) {
				console.log("支付场景返回的数据", index);
				this.scene.value = index.name
				this.scene.type = index.type
			},

			// 日历表单
			confirm(e) {
				console.log("日历组件返回值", e);
				this.StartTime = e[0]
				this.Stoptime = e[e.length - 1]
				console.log("time", this.StartTime, this.Stoptime);
				this.calendarvalue = this.StartTime + '---' + this.Stoptime
				this.calendarshow = false
			},
			// 点击按钮开始筛选
			confirmbtn() {
				this.getalllist()
				this.show = false

			},
			// 点击重置按钮
			resetbtn() {
				this.state.value = '支付状态'
				this.state.type = 'all'
				this.payment.value = '支付方式'
				this.payment.type = 'all'
				this.scene.value = '支付场景'
				this.scene.type = 'all'
				this.StartTime = 'all'
				this.Stoptime = 'all'
				this.calendarvalue = "年/月/日"
				this.getalllist()
			},
			// 跳转详情
			Jumpdetails(index) {
				console.log(index);
				uni.navigateTo({
					url: "./Fee?index=" + index
				})
			},

			// 总金额接口
			async getallmoney() {
				const form = {
					"requestType": "GetCarTempPaylistIndex",
					"data": {
						"pgt": "30",
						"word": "all",
						"paytype": "all",
						"paystate": "all",
						"date1": "all",
						"date2": "all",
						"pay_suorce": "all"
					},
				}
				const res = await getTemporaryvehicle(form)
				console.log("总金额", res.data.data);
				this.allmoney = res.data.data.allmoney
			},
			//所有数据
			async getalllist() {
				const form = {
					"requestType": "GetCarTempPaylist",
					"data": {
						"ind": 0,
						"pgt": "30",
						"word": "all",
						"stk": "all",
						"stt": "all",
						"paytype": this.payment.type,
						"paystate": this.state.type,
						"date1": this.StartTime,
						"date2": this.Stoptime,
						"pay_suorce": this.scene.type
					},
				}
				const res = await getTemporaryvehicle(form)
				console.log("所有数据", res.data.data);
				console.log("form", form);
				if (res.data.data == undefined) {
					this.alllist = ''
				} else {
					this.alllist = res.data.data
				}

			},
		},
		onLoad() {
			this.getallmoney()
			this.getalllist()
		},
	}
</script>

<style lang="scss">
	.FeeRecords {
		width: 100%;
		background-color: #eee;
		padding: 0 0 20px 0;


		.inputbox {
			margin: 15px;
			padding: 20px;
			background-color: #fff;
			box-sizing: border-box;
			border-radius: 5px;

			.input {
				width: 100%;
			}

			.inputbtn {
				display: flex;
				justify-content: space-between;

				.bt {
					margin: 20px 0 0;
				}
			}
		}



		.fromview {
			margin: 0 auto;
			width: 250px;

			.calendarinput {
				width: 250px;
				height: 40px;
				line-height: 18px;
				margin: 10px 10px 10px 0;
				padding: 10px;
				box-sizing: border-box;
				border: 1px solid #eee;
				display: flex;
				justify-content: space-between;
			}

			.confirmbtn {
				margin: 0 0 20px 0;
			}

		}

		.Record-List {
			background-color: #fff;

			margin: 0 15px;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 5px;

			.Record-List-item {
				width: 100%;
				// background-color: red;
				border-bottom: #eee 1px solid;
				padding: 10px;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				.item-left {
					.item-left-title {
						font-size: 18px;
					}

					.item-left-time {
						height: 20px;
						line-height: 30px;
					}
				}

				.item-right {
					.item-right-money {
						font-size: 18px;
						color: red;
					}

					.item-right-paymented {
						text-align: right;
						height: 20px;
						line-height: 30px;
					}
				}
			}
		}
	}

	.allmoney {
		background-color: #eee;
		padding: 8px 10px;
		margin-bottom: 10px;
		border-radius: 5px;
	}

	.suorce {
		display: inline-block;
		width: 80px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.time {
		display: inline-block;
		width: 110px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>