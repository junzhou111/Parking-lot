<template>
	<!-- 月费车位管理 -->
	<view class="MonthlyfeeparkspaceManagement">
		<!-- 弹出筛选层 -->
		<u-popup :show="show" @close="close" @open="open" mode="top">
			<view class="fromview">
				<!-- 筛选开始时间 -->
				<u-calendar :show="startrangeshow" mode="single" @confirm="startrangeconfirm"
					@close="close"></u-calendar>
				<view class="calendarinput" @click="startrangeshow = true">
					<text v-text="startrangevalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 筛选结束时间 -->
				<u-calendar :show="endrangeshow" mode="single" @confirm="endrangeconfirm" @close="close"></u-calendar>
				<view class="calendarinput" @click="endrangeshow = true">
					<text v-text="endrangevalue"> </text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 确认按钮 -->
				<button class="confirmbtn">确认</button>
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
				<button class="bt" @click="addlistbtn">新增</button>
				<button class="bt">搜索</button>
				<button class="bt">重置</button>
			</view>
		</view>

		<!-- 添加弹出层 -->
		<u-popup :show="editshow" @close="editclose" @open="editopen" mode="top">
			<view class="fromviews">
				<scroll-view scroll-y="true">
					<view class="RemoteOpening">
						<view class="RemoteOpening-headerleft">
							<view class="parks">
								停车场
							</view>
							<view class="parkslist" v-for="(item,index) in Park" :key="index">
								{{item.name}}
							</view>
							<view class="parkinglot">
								车场车位
							</view>
							<view class="parkinglotlist" v-for="(item,index) in parklot" :key="index">
								{{item.name}}
							</view>
						</view>
						<view class="RemoteOpening-headerright">
							<view class="regions">
								区域
							</view>
							<view class="regionslist" v-for="(item,index) in region" :key="index">
								{{item.name}}
							</view>
							<view class="regionsparklot">
								区域车位
							</view>
							<view class="regionsparklotlist" v-for="(item,index) in regiondata" :key="index">
								{{item.name}}
							</view>
						</view>



					</view>
				</scroll-view>



				<!-- 确认按钮 -->
				<button class="confirmbtn">确认</button>
			</view>
		</u-popup>

		<!-- 全部数据 -->
		<view class="MonthlyfeeparkList">
			<view class="Monthlyfeeparklist-item" v-for="(item,index) in Monthlylist" :key="index">
				<view class="itemheader">
					<view class="platenumber">
						{{item.carscan}}
					</view>
					<view class="create">
						{{item.time}}
					</view>
				</view>
				<view class="item-information">
					<view class="contacts">
						{{item.name}}
					</view>
					<view class="phone">
						{{item.phone}}
					</view>
					<view class="ID">
						{{item.idcard}}
					</view>
				</view>
				<view class="time">
					<view class="start-time">
						{{item.start}}-----{{item.end}}
						<!-- <text class="end-time"> 结束时间 </text> -->
					</view>

				</view>
				<view class="item-state">
					<view class="park">
						{{item.space}}
					</view>
					<view class="state">
						{{item.state=='0'?'禁用':'启用'}}
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMonthlycar,
		getaddMonthlycar,
	} from "@/api/index.js"
	export default {
		data() {
			return {
				//  弹出筛选层
				show: false,
				// 新增弹出层
				editshow: false,
				// 筛选开始时间
				startrangeshow: false,
				startrangevalue: '开始时间',
				// 筛选结束时间
				endrangeshow: false,
				endrangevalue: '结束时间',

				// 全部数据
				Monthlylist: [],
				// 添加月费列表所有车场
				Park: [],
				// 添加所有车场内车位
				parklot: [],
				// 添加区域列表
				region: [],
				// 添加区域车位
				regiondata: [],


			};
		},
		methods: {
			//弹出筛选层
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			// 筛选开始时间
			startrangeconfirm(e) {
				console.log("筛选开始时间的返回值", e);
				this.startrangeshow = false
				this.startrangevalue = e
			},
			// 筛选结束时间返回值
			endrangeconfirm(e) {
				console.log("筛选结束时间返回值", e);
				this.endrangeshow = false
				this.endrangevalue = e
			},
			//弹出添加层
			editopen() {
				// console.log('open');
			},
			editclose() {
				this.editshow = false
				// console.log('close');
			},
			// 点击新增按钮
			addlistbtn() {
				this.editshow = true
				this.getaddlist()
				this.getaddparklist()
				this.getaddregionlist()
			},








			// 获取全部数据
			async getlist() {
				const form = {
					"requestType": "GetCarMfee",
					"data": {
						'word': "all",
						'stk': "all",
						'stt': "all",
						'ind': 0,
						'date1': "all",
						'date2': "all",
						'pgt': "30"
					},
				}
				const res = await getMonthlycar(form)
				console.log("月费车位管理", res.data.data);
				if (res.data.data == undefined) {
					this.Monthlylist = ''
				} else if (res.data.data != undefined) {
					this.Monthlylist = res.data.data
				}
			},
			// 新增月费车位
			async getaddlist() {
				const form = {
					"requestType": "GetPark",
					"data": {},
				}
				const res = await getaddMonthlycar(form)
				console.log("新增月费车位所有车场", res.data.data);
				if (res.data.data == undefined) {
					this.Park = ''
				} else if (res.data.data != undefined) {
					this.Park = res.data.data
				}
			},
			// 新增月费车位所有车场内车位
			async getaddparklist() {
				const form = {
					"requestType": "GetParkAreaSpace",
					"data": {
						"ismainpark": 1,
						"park_area_id": "61"
					},
				}
				const res = await getaddMonthlycar(form)
				console.log("新增月费车位所有车场内车位", res.data.data);
				if (res.data.data == undefined) {
					this.parklot = ''
				} else if (res.data.data != undefined) {
					this.parklot = res.data.data
				}
			},
			// 新增月费车位区域列表
			async getaddregionlist() {
				const form = {
					"requestType": "GetParkArea",
					"data": {
						"park_id": "61"
					},
				}
				const res = await getaddMonthlycar(form)
				console.log("新增月费车位区域列表", res.data.data);
				if (res.data.data == undefined) {
					this.region = ''
				} else if (res.data.data != undefined) {
					this.region = res.data.data
				}
			},
			// 新增月费车位区域数据
			async getaddregiondata() {
				const form = {
					"requestType": "GetParkAreaSpace",
					"data": {
						"ismainpark": 0,
						"park_area_id": "9"
					},
				}
				const res = await getaddMonthlycar(form)
				console.log("新增月费车位区域数据", res.data.data);
				if (res.data.data == undefined) {
					this.regiondata = ''
				} else if (res.data.data != undefined) {
					this.regiondata = res.data.data
				}
			},
		},
		onLoad() {
			this.getlist()
		},
	}
</script>

<style lang="scss">
	.MonthlyfeeparkspaceManagement {
		background-color: #eee;

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

		.MonthlyfeeparkList {
			padding-bottom: 30px;

			.Monthlyfeeparklist-item {
				margin: 15px;
				padding: 20px;
				box-sizing: border-box;
				border-radius: 5px;
				background-color: #fff;

				.itemheader {
					display: flex;
					justify-content: space-between;
					height: 25px;
					line-height: 25px;

					.platenumber {
						font-size: 25px;
					}

					.create {}
				}

				.item-information {
					display: flex;
					justify-content: space-between;
					height: 25px;
					line-height: 25px;

					.contacts {
						font-size: 15px;
					}

					.phone {
						font-size: 15px;
						color: #55aaff;
					}

					.ID {
						font-size: 15px;
					}
				}

				.time {
					height: 25px;
					line-height: 25px;
					font-size: 13px;

					.start-time {}

					.end-time {}
				}

				.item-state {
					display: flex;
					justify-content: space-between;
					height: 25px;
					line-height: 25px;

					.park {}

					.state {}
				}
			}
		}
	}

	.fromviews {
		width: 100%;
	}

	.RemoteOpening {
		width: 70%;
		height: 60vh;
		display: flex;
		justify-content: space-between;

		.RemoteOpening-headerleft {
			width: 50%;

			.parks {
				background-color: #393939;
				color: #fff;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}

			.parkslist {
				background-color: #f4f4f4;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}

			.parkinglot {
				background-color: #393939;
				color: #fff;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;


			}

			.parkinglotlist {
				background-color: #f4f4f4;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;


			}
		}

		.RemoteOpening-headerright {
			width: 50%;

			.regions {
				background-color: #393939;
				color: #fff;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}

			.regionslist {
				background-color: #f4f4f4;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}

			.regionsparklot {
				background-color: #393939;
				color: #fff;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}

			.regionsparklotlist {
				background-color: #f4f4f4;
				padding: 3px 10px;
				border-radius: 5px 5px 0 0;
				margin: 0 10px 5px 10px;

			}
		}

	}
</style>