<template>
	<!-- 场内车辆管理 -->
	<view class="sitemanagement">
		<!-- 弹出层筛选框 -->
		<u-popup :show="show" @close="show = false" @open="open" mode="top">
			<view class="fromview">
				<!-- 日历表单 筛选时间-->
				<u-calendar :show="calendarshow" mode="range" @confirm="confirm"
					@close="calendarshow = false"></u-calendar>
				<view class="calendarinput" @click="calendarshow = true">
					<text v-text="calendarvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 车辆类型 -->
				<u-picker :show="car.show" :columns="car.list" @cancel="car.show=false" @close="car.show = false"
					@confirm="selectClick"></u-picker>
				<!-- <u-action-sheet :actions="car.list" @select="selectClick" :title="car.title" cancelText="取消"
					@close="car.show=false" :show="car.show">
				</u-action-sheet> -->
				<view class="calendarinput" @click="car.show = true">
					<text v-text="car.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 位置 -->
				<u-picker :show="position.show" :columns="position.list" @cancel="position.show=false"
					@close="position.show = false" @confirm="selectposition"></u-picker>
				<!-- <u-action-sheet :actions="position.list" @select="selectposition" :title="position.title"
					@close="position.show=false" :show="position.show">
				</u-action-sheet> -->
				<view class="calendarinput" @click="position.show = true">
					<text v-text="position.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
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
				<button class="bt" @click="show = true">筛选</button>
				<button class="bt">搜索</button>
				<button class="bt" @click="resettbtn">重置</button>
			</view>
		</view>

		<!-- 车辆信息 -->
		<view class="cardetails">
			<view class="cardetails-item" v-for="(item , index) in carinformation" :key="index">
				<img class="cardetailsimg" src="@/static/mr.png" alt="" @click="info(item)"></img>

				<view class="cardetails-message">
					<view class="cardetails-title">

						{{item.carscan}}<text class="cardetails-type">
							{{item.cartype==0?"未知车牌":item.cartype==1?"蓝牌小汽车":item.cartype==2?'黑牌小汽车':item.cartype==3?'单排黄牌'
							:item.cartype==4?'双排黄牌':item.cartype==5?'警车车牌':item.cartype==6?'武警车牌':item.cartype==7?'个性化车牌'
							:item.cartype==8?'单排军车牌':item.cartype==9?'双排军车牌':item.cartype==10?'使馆车牌':item.cartype==11?'香港车牌'
							:item.cartype==12?'农用车牌':item.cartype==13?'澳门牌':item.cartype==14?'厂内牌':item.cartype==15?'民航牌'
							:item.cartype==16?'领事馆车牌':item.cartype==17?'新能源车牌':'应急车牌'}}
						</text>
					</view>
					<view class="cardetails-time">
						<text class="time">{{item.time}}</text>

					</view>

					<view class="cardetails-icon">
						<button class="cardetails-delete" @click="delitem(item)">删除</button>
						<button class="cardetails-remove" @click="Remove(item)">移出</button>
					</view>
					<view class="cardetails-btn">
						<input class="cardetails-inp" type="text" v-model="correctinp" placeholder="纠正后车牌">
						<view class="cardetails-click" @click="correct(item)">
							纠正
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		Vehiclemanagement,
		carlist,
		Carfactoryoverview
	} from "@/api/index.js";
	export default {
		data() {
			return {
				// 弹出层状态
				show: false,
				// 筛选时间
				calendarshow: false,
				calendarvalue: '年/月/日',
				// 开始时间
				StartTime: 'all',
				// 结束时间
				Stoptime: 'all',
				//  车辆类型
				car: {
					title: '车辆类型',
					list: [
						["未知车牌", "蓝牌小汽车", "黑牌小汽车", "单排黄牌", "双排黄牌", "警车车牌", "武警车牌", "个性化车牌", "单排军车牌", "双排军车牌", "使馆车牌",
							"香港车牌", "农用车牌", "澳门牌", "厂内牌", "民航牌", "领事馆车牌", "新能源车牌", "应急车牌"
						]
					],
					show: false,
					value: '车辆类型',
					index: 'all'
				},
				// 位置数据
				position: {
					title: '位置',
					list: [
						[]
					],
					show: false,
					value: "位置",
					location_type: 'all',
					location_id: 'all'
				},
				// 车场位置数据0
				Parking: [],
				// 区域位置数据1
				region: [],
				// 车辆信息
				carinformation: [],
				// 用户信息、
				userinfo: '',
				// 纠正车牌
				correctinp: '',

			};
		},
		onLoad() {
			this.getVehiclemanagement()
			this.getposition()
			this.getcarlist()
			this.getCarfactoryoverview()
		},
		methods: {
			// 弹出层
			open() {
				// console.log('open');
			},
			// 点击确认时间范围返回值
			confirm(e) {
				console.log("日历组件返回值", e);
				this.StartTime = e[0]
				this.Stoptime = e[e.length - 1]
				this.calendarvalue = e[0] + "----" + e[e.length - 1]
				this.calendarshow = false
			},
			// 选择车辆类型返回的信息
			selectClick(index) {
				this.car.value = index.value[0];
				this.car.index = index.indexs[0]
				console.log(index, "index");
				console.log(this.car.index);
				this.car.show = false
			},
			// 点击确定返回位置信息
			selectposition(index) {
				console.log("返回位置信息", index.value[0]);
				console.log(this.Parking.length);
				for (var i = 0; i < this.Parking.length; i++) {
					// console.log("this.Parking[i] ", this.Parking[i]);
					// console.log("this.Parking[i].name", this.Parking[i].name);
					if (this.Parking[i].name == index.value[0]) {
						this.position.location_type = '0'
					}
				}
				for (var j = 0; j < this.region.length; j++) {
					if (this.region[j].name == index.value[0]) {
						this.position.location_type = '1'
					}
				}
				console.log("location_type", this.position.location_type);
				this.Parking.forEach((item) => {
					if (item.name == index.value[0]) {
						this.position.location_id = item.id
					}
				})
				this.region.forEach((item) => {
					if (item.name == index.value[0]) {
						this.position.location_id = item.id
					}
				})
				console.log('id', this.position.location_id);
				this.position.show = false
			},
			// 点击确认按查询
			confirmbtn() {
				this.getcarlist()
				this.show = false
			},

			// 点击重置
			resettbtn() {
				this.StartTime = "all"
				this.Stoptime = 'all'
				this.position.location_type = "all"
				this.position.location_id = "all"
				this.car.index = "all"
				this.car.value = '车辆类型'
				this.getcarlist()
			},
			// 获取用户信息
			async getCarfactoryoverview() {
				const form = {
					"requestType": "GetProInfo",
					"data": {},
				}
				const res = await Carfactoryoverview(form)
				// console.log("获取用户信息", res.data.data[0].code);
				this.userinfo = res.data.data
			},
			// 获取车场出入口位置信息
			async getVehiclemanagement() {
				const form = {
					"requestType": "GetParkChannelAll",
					"data": {}
				}
				const res = await Vehiclemanagement(form)
				console.log("获取车场出入口位置信息", res.data.data);
				this.Parking = res.data.data

				let arr = res.data.data
				for (var i = 0; i <= arr.length - 1; i++) {
					// console.log(arr[i].name, 'arr');
					this.position.list[0].push(arr[i].name)
				}
				console.log("position.list", this.position.list);
				console.log("Parking", this.Parking);
			},
			// 获取区域出入口位置信息
			async getposition() {
				const form = {
					"requestType": "GetParkAreaChannelAll",
					"data": {}
				}
				const res = await Vehiclemanagement(form)
				console.log("获取区域出入口位置信息", res.data.data);
				this.region = res.data.data
				let arrs = res.data.data
				for (var i = 0; i <= arrs.length - 1; i++) {
					// console.log(arrs[i].name, 'arrs');
					this.position.list[0].push(arrs[i].name)
				}
				console.log("position.list", this.position.list);
				console.log("region", this.region);
			},
			// 查询全部数据
			async getcarlist() {
				const form = {
					"requestType": "GetCarIo",
					"data": {
						"io": "0",
						"person_id": "all",
						"cartype": this.car.index,
						"carcolor": "all",
						"release": 1,
						"isout": 0,
						"location_type": this.position.location_type,
						"location_id": this.position.location_id,
						"word": "all",
						"stk": "all",
						"stt": "all",
						"ind": 0,
						"pgt": "30",
						"date1": this.StartTime,
						"date2": this.Stoptime
					},
				}
				const res = await carlist(form)
				console.log("获取全部车辆信息", res.data.data);
				if (res.data.data == undefined) {
					this.carinformation = ''
				} else if (res.data.data != undefined) {
					this.carinformation = res.data.data
				}
			},
			// 点击删除
			async delitem(item) {
				console.log(item);
				this.delapi(item)
			},
			// 删除

			async delapi(item) {
				const form = {
					"requestType": "DelCarIo",
					"data": {
						id: item.id,
						lid: item.lid,
					},
				}
				const res = await carlist(form)
				console.log("删除车辆信息", res);
			},
			// 移出
			async Remove(item) {
				console.log(item);
				const form = {
					"requestType": "isOut",
					"data": {
						id: item.id,
						lid: item.lid,
					},
				}
				const res = await carlist(form)
				console.log("移出车辆信息", res);
			},

			// 纠正车牌
			async correct(item) {
				const form = {
					"requestType": "UpCarScan",
					"data": {
						'carscan': this.correctinp, //车牌
						'id': item.id, //车场id
						'lid': item.lid, //项目本地id
					},
				}
				const res = await carlist(form)
				console.log("纠正车牌", res.data.data);
			},
			// 点击详情
			async info(item) {
				console.log(item.id);
				let itemid = item.id
				uni.navigateTo({
					url: "./SiteManainfo?id=" + itemid
				})

			}

		}
	}
</script>

<style lang="scss">
	.sitemanagement {
		margin: 0;
		padding: 0;
		background-color: #eee;


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

		.cardetails {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 15px 15px 15px;
			box-sizing: border-box;

			.cardetails-item {
				width: 48%;
				border: 1px solid #eee;
				border-radius: 5px;
				background-color: #fff;
				overflow: hidden;
				margin-bottom: 10px;

				.cardetailsimg {
					width: 100%;
					height: 80px;
				}

				.cardetails-message {
					width: 100%;
					padding: 5px 10px 10px 10px;
					box-sizing: border-box;

					.cardetails-title {
						font-size: 18px;

						.cardetails-type {
							font-size: 12px;
							color: red;
						}
					}

					.cardetails-time {
						font-size: 12px;
						padding: 5px 0;

						.time {}
					}

					.cardetails-icon {
						display: flex;
						justify-content: space-between;

						.cardetails-delete {
							height: 30px;
							line-height: 30px;
							background-color: red;
							color: #fff;
						}

						.cardetails-remove {
							height: 30px;
							line-height: 30px;
							background-color: green;
							color: #fff;
						}
					}

					.cardetails-btn {
						width: 100%;
						height: 30px;
						border: 1px solid #c7c7c7;
						margin-top: 5px;
						display: flex;
						justify-content: space-between;
						border-radius: 5px;
						overflow: hidden;

						.cardetails-inp {
							height: 30px;
							line-height: 30px;
							padding: 0 0 0 10px;
						}

						.cardetails-click {
							width: 70px;
							text-align: center;
							background-color: #198754;
							color: white;
							height: 30px;
							line-height: 30px;
						}
					}
				}
			}
		}


	}
</style>