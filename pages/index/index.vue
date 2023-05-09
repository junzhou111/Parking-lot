<template>
	<view class="index">
		<!-- 轮播图 -->
		<swiper class="swiper" previous-margin="30px" next-margin="30px" :indicator-dots="true" :interval="4000"
			autoplay="true" easing-function="easeInOutCubic" :duration="800" circular="true">
			<swiper-item class="swiper-item">
				<image class="swiperimg"
					src="https://images.weserv.nl/?url=https://up.enterdesk.com/edpic_source/84/f7/fc/84f7fcc08f21419a860dbedde45fe233.jpg">
				</image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image class="swiperimg"
					src="https://images.weserv.nl/?url=https://up.enterdesk.com/edpic_source/55/55/1a/55551aae5ca1c38abfa33a6d5a76febb.jpg">
				</image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image class="swiperimg"
					src="https://images.weserv.nl/?url=https://up.enterdesk.com/edpic_source/e2/54/eb/e254ebc4876b2d66bc48af9fb579607f.jpg">
				</image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image class="swiperimg"
					src="https://images.weserv.nl/?url=https://up.enterdesk.com/edpic_source/9c/8b/ab/9c8babff05868d2836947aea484bb238.jpg">
				</image>
			</swiper-item>
		</swiper>
		<!-- 分类模块 -->
		<view class="assort-list">
			<view class="assort-item" v-for="(item,index) in menu" :key="index">
				<view class="item-title" @click="handelinfo(index)">
					<view class="icon iconfont" v-html="item.icon">
					</view>
					<view class="bottom-title">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- 车场概况 -->
		<!-- 信息模块 -->
		<Overviewpark :datalist="datalist"></Overviewpark>
		<!-- 车流量 -->
		<charttrafficvolume :Trafficvolumelist="Trafficvolumelist"></charttrafficvolume>
		<!-- 营收统计 -->
		<chartevenue :revenueing="revenueing" :revenued="revenued"></chartevenue>
		<!-- 出厂记录 -->
		<ExitRecord :carrecord="carrecord"></ExitRecord>
	</view>
</template>

<script>
	import Overviewpark from "@/pages/OverViewPark/OverViewPark.vue"
	import charttrafficvolume from "../../components/charttrafficvolume/charttrafficvolume.vue"
	import chartevenue from "../../components/chartrevenue/chartrevenue.vue"
	import ExitRecord from "../../components/ExitRecord/ExitRecord.vue"

	import {
		Carfactoryoverview,
		parkinglot,
		menu
	} from "@/api/index.js";
	export default {
		data() {
			return {
				// 跳转路由暂存 
				titlerouters: "",
				// 车位营收数据
				datalist: {},
				//车流量
				Trafficvolumelist: {},
				// 去年的营收统计
				revenued: {},
				//今年的营收统计
				revenueing: {},
				//进出记录
				carrecord: {},
				// 菜单
				menu: []
			}
		},
		components: {
			Overviewpark,
			charttrafficvolume,
			chartevenue,
			ExitRecord
		},
		onLoad() {
			this.getCarfactoryoverview()
			this.getparkinglot()
			this.getrevenued()
			this.getTrafficvolume()
			this.getrevenueing()
			this.getcarrecord()
			this.getmenu()
		},
		methods: {
			// 路由模块跳转
			handelinfo(index) {
				var titlerouters = this.menu[index].key
				var urls = "/homepages/"
				uni.navigateTo({
					url: urls + titlerouters + "/" + titlerouters
				})
			},
			async getCarfactoryoverview() {
				const form = {
					'requestType': 'GetProInfo',
					data: {},
				}
				const res = await Carfactoryoverview(form)
				console.log("车厂概况", res);
			},
			async getparkinglot() {
				const form = {
					'requestType': 'getbar',
					data: {},
				}
				const res = await parkinglot(form)
				console.log("车位营收设备流量", res.data.data);
				this.datalist = res.data.data
			},
			async getTrafficvolume() {
				const form = {
					'requestType': 'getRecent',
					data: {},
				}
				const res = await parkinglot(form)
				console.log("车流量变化", res.data.data);
				this.Trafficvolumelist = res.data.data
			},
			async getrevenueing() {
				const form = {
					'requestType': 'getThis',
					data: {},
				}
				const res = await parkinglot(form)
				console.log("今年的营收统计", res.data.data);
				this.revenueing = res.data.data
			},
			async getrevenued() {
				const form = {
					'requestType': 'getLast',
					data: {},
				}
				const res = await parkinglot(form)
				console.log("去年的营收统计", res.data.data);
				var list = res.data.data
				var arr = []
				for (var i = 0; i <= list.length; i++) {
					// console.log("list", list[i]);
					for (const key in list[i]) {
						// console.log(list[i][key], "listkey")
						arr.push(list[i][key])
						// console.log(arr, "arr")
					}
				}
				this.revenued = arr
			},
			async getcarrecord() {
				const form = {
					'requestType': 'getCarTrend',
					data: {},
				}
				const res = await parkinglot(form)
				console.log("进出记录", res.data.data);
				this.carrecord = res.data.data
			},
			async getmenu() {
				const form = {
					"requestType": "getMenu",
					"data": {
						"rank": "0",
					}
				}
				const res = await menu(form)
				console.log("获取菜单", res.data.data);
				this.menu = res.data.data
			},





		}
	}
</script>

<style lang="scss">
	.index {
		.swiper {
			width: 100%;

			.swiper-item {
				width: 100%;
				display: flex;
				align-items: center;

				.swiperimg {
					width: 95%;
					height: 150px;
					margin: 0 auto;
					border-radius: 5px;
					overflow: hidden;
				}
			}
		}

		.assort-list {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.assort-item {
				width: 25%;

				.item-title {
					width: 100%;
					background-color: #fff;
					display: flex;
					flex-direction: column;
					text-align: center;
					font-size: 13px;
					padding: 10px 6px;
					box-sizing: border-box;

					.icon {
						font-size: 25px;
						margin: 5px 0;
					}

					.bottom-title {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

				}
			}
		}
	}
</style>