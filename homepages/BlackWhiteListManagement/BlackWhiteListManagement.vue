<template>
	<!-- 黑白名单 -->
	<view class="BlackWhiteListManagement">
		<!-- 弹出筛选层 -->
		<u-popup :show="show" @close="show=false" @open="show=true" mode="top">
			<view class="fromview">
				<!-- 黑白名单 -->
				<u-action-sheet :actions="BlackWhiteList.list" @select="BlackWhiteListClick"
					:title="BlackWhiteList.title" cancelText="取消" @close="BlackWhiteList.show=false"
					:show="BlackWhiteList.show"></u-action-sheet>
				<view class="calendarinput" @click="BlackWhiteList.show=true">
					<text v-text="BlackWhiteList.value"></text>
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
				<button class="bt" @click="show=true">筛选</button>
				<button class="bt" @click="addbtn">新增</button>
				<button class="bt">搜索</button>
				<button class="bt" @click="reset">重置</button>
			</view>
		</view>

		<!-- 添加编辑筛选层 -->
		<u-popup :show="editshow" @close="closeedit" @open="editshow=true" mode="top">
			<view class="fromview">
				<!-- 黑白名单 -->
				<u-action-sheet :actions="BlackWhiteLists.list" @select="BlackWhiteListsClick"
					:title="BlackWhiteLists.title" cancelText="取消" @close="BlackWhiteLists.show=false"
					:show="BlackWhiteLists.show"></u-action-sheet>
				<view class="calendarinput" @click="BlackWhiteLists.show=true">
					<text v-text="BlackWhiteLists.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 编辑生效时间 -->
				<u-calendar :show="startrangeshow" mode="single" @confirm="startrangeconfirm"
					@close="startrangeshow=false"></u-calendar>
				<view class="calendarinput" @click="startrangeshow = true">
					<text v-text="startrangevalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 编辑失效时间 -->
				<u-calendar :show="endrangeshow" mode="single" @confirm="endrangeconfirm"
					@close="endrangeshow=false"></u-calendar>
				<view class="calendarinput" @click="endrangeshow = true">
					<text v-text="endrangevalue"> </text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 车牌号 @confirm点击完成 -->
				<u-keyboard ref="uKeyboard" mode="car" @change="valChange" @backspace="backspace"
					:show="car.carbrandshow" @close="carcloseclick" @cancel="car.carbrandshow = false"
					@confirm="carconfirm"></u-keyboard>
				<view class="calendarinput" @click=" carbrandshowclick">
					<input type="text" v-model="car.carbrandvalue" placeholder="车牌">
				</view>
				<!-- 备注 -->
				<view class="calendarinput">
					<input type="text" v-model="notes" placeholder="备注">
				</view>
				<!-- 确认按钮 -->
				<button class="confirmbtn" @click="addconfirmbtn">确认</button>
			</view>
		</u-popup>
		<!-- 黑白名单 -->
		<view class="BlackWhiteList">
			<view class="BlackWhiteList-item" v-for="(item,index) in whitelist" :key="index">
				<view class="header">
					<text class="names">{{item.carscan}}</text>
					<text class="times">{{item.time}}</text>
				</view>
				<view class="item-top">
					<text class="ids">备注：{{item.remarks}} </text>
					<text class="phone"></text>
				</view>
				<view class="item-center">

					<text class="validity">{{item.start}}-----{{item.end}}</text>
				</view>
				<view class="item-bottom">
					<text class="namelist">{{item.type==0?"黑名单":"白名单"}}</text>
					<text class="notes"></text>
				</view>
				<view class="item-btn">
					<button class="editbtn" @click="editbtn(index)">编辑</button>
					<button class="delbtn" @click="delbtn(item)">删除</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Obtainlist
	} from "@/api/index.js"
	export default {
		data() {
			return {
				//  弹出筛选层
				show: false,
				// 黑白名单
				BlackWhiteList: {
					title: '黑白名单',
					list: [{
							name: '黑名单',
							type: "0"
						},
						{
							name: '白名单',
							type: "1"
						}
					],
					show: false,
					value: '黑白名单',
					type: "all"
				},
				// 弹出添加层
				editshow: false,
				BlackWhiteLists: {
					title: '黑白名单',
					list: [{
							name: '黑名单',
							type: "0"
						},
						{
							name: '白名单',
							type: "1"
						}
					],
					show: false,
					value: '黑白名单',
					type: "all"
				},
				// 添加生效时间 
				startrangeshow: false,
				startrangevalue: '生效时间',
				// 添加失效时间
				endrangeshow: false,
				endrangevalue: '失效时间',
				// 车牌弹出层
				car: {
					carbrandvalue: '',
					carbrandshow: false,
				},
				// 备注
				notes: '',
				// 黑白名单全部数据
				whitelist: [],
				// 编辑列表暂存
				editlist: {},

				// 判断当前是添加还是编辑
				// 0=添加  1=编辑
				types: 0
			};
		},
		methods: {
			// 筛选黑白名单
			BlackWhiteListClick(index) {
				console.log("黑白名单返回的数据", index);
				this.BlackWhiteList.value = index.name
				this.BlackWhiteList.type = index.type
			},
			// 点击确认开始筛选
			confirmbtn() {
				this.getconfirmlist()
				this.show = false
			},
			// 筛选后的全部数据
			async getconfirmlist() {
				const form = {
					"requestType": "GetCarWhitelist",
					"data": {
						'ind': -1,
						'ty': this.BlackWhiteList.type,
						'pgt': -1,
						'word': "all",
						'stk': "all",
						'stt': "all"
					},
				}
				const res = await Obtainlist(form)
				console.log("筛选黑白名单管理", res.data.data);
				this.whitelist = res.data.data
			},
			closeedit() {
				this.editshow = false
				this.car.carbrandvalue = ''
				this.BlackWhiteLists.type = 'all'
				this.startrangevalue = '生效时间'
				this.endrangevalue = "失效时间"
				this.notes = ""
			},
			// 点击添加按钮
			addbtn() {
				this.editshow = true
				// 将弹窗的状态改为添加
				this.types = 0
			},
			// 添加黑白名单返回的数据
			BlackWhiteListsClick(index) {
				console.log("添加黑白名单返回的数据", index);
				this.BlackWhiteLists.value = index.name
				this.BlackWhiteLists.type = index.type
			},
			// 添加生效时间的返回值
			startrangeconfirm(e) {
				console.log("添加生效时间的返回值", e);
				this.startrangeshow = false
				this.startrangevalue = e
			},

			// 添加失效时间返回值
			endrangeconfirm(e) {
				console.log("添加失效时间返回值", e);
				this.endrangeshow = false
				this.endrangevalue = e
			},
			// 点击车牌
			carbrandshowclick() {
				this.car.carbrandshow = true
				uni.hideKeyboard()
			},
			// 点击空白处关闭车牌键盘
			carcloseclick() {
				this.car.carbrandshow = false
				uni.hideKeyboard()
			},
			// 车牌点击监听
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.car.carbrandvalue += val;
				// console.log(this.car.carbrandvalue);
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.car.carbrandvalue.length) this.car.carbrandvalue = this.car.carbrandvalue.substr(0, this.car
					.carbrandvalue.length - 1);
				// console.log(this.car.carbrandvalue);
			},
			// 车牌点击确认
			carconfirm() {
				// 如果符合规范关闭键盘
				if (this.car.carbrandvalue.length == 7 || this.car.carbrandvalue.length == 8) {
					this.car.carbrandshow = false
				} else {
					// 不符合不能关闭键盘
					uni.showLoading({
						title: '车牌格式错误',
					})
					setTimeout(function() {
						uni.hideLoading()
					}, 2000)
				}
			},
			// 点击确认添加黑白名单
			addconfirmbtn() {
				// 当types为0时为添加
				if (this.types == 0) {
					// 调用添加接口
					this.getaddlist()
					// 将弹窗内容清空
					this.car.carbrandvalue = ''
					this.BlackWhiteLists.type = 'all'
					this.BlackWhiteLists.value = "黑白名单"
					this.startrangevalue = '生效时间'
					this.endrangevalue = "失效时间"
					this.notes = ""
					this.editshow = false
					// 当types == 1 为编辑
				} else if (this.types == 1) {
					// 调用编辑接口
					this.editfunction()
					// 将弹窗内容清空
					this.car.carbrandvalue = ''
					this.BlackWhiteLists.type = 'all'
					this.BlackWhiteLists.value = "黑白名单"
					this.startrangevalue = '生效时间'
					this.endrangevalue = "失效时间"
					this.notes = ""
					this.editshow = false
				}
			},
			// 添加接口
			async getaddlist() {
				const form = {
					"requestType": "AddCarWhitelist",
					"data": {
						"carscan": this.car.carbrandvalue, //车牌
						"ty": this.BlackWhiteLists.type,
						"start": this.startrangevalue[0], //有效时间（起）
						"end": this.endrangevalue[0], //有效时间（止）
						"remarks": this.notes, //备注
					}
				}
				const res = await Obtainlist(form)
				console.log("添加黑白名单", res.data.data);
				// 调用重新渲染
				this.getlist()
			},
			// 编辑功能回显数据
			editbtn(index) {
				// 当前按钮为添加
				this.types = 1
				this.editlist = this.whitelist[index]
				console.log(this.editlist, "editlist");
				this.editshow = true
				this.car.carbrandvalue = this.editlist.carscan //车牌
				if (this.editlist.type == 0) { //黑白名单类型
					this.BlackWhiteLists.value = "黑名单"
					this.BlackWhiteLists.type = 0
				} else if (this.editlist.type == 1) {
					this.BlackWhiteLists.value = "白名单"
					this.BlackWhiteLists.type = 1
				}
				this.startrangevalue = this.editlist.start //开始时间
				this.endrangevalue = this.editlist.end //开始时间
				this.notes = this.editlist.remarks //备注
			},
			// 点击确认按钮调用编辑接口修改数据
			async editfunction() {
				this.editshow = false
				const form = {
					"requestType": "UpCarWhitelist",
					"data": {
						"carscan": this.car.carbrandvalue,
						"ty": this.BlackWhiteLists.type,
						"start": this.startrangevalue,
						"end": this.endrangevalue,
						"remarks": this.notes,
						"id": this.editlist.id
					},
				}
				const res = await Obtainlist(form)
				console.log("编辑接口调用", res);
				console.log("form", form);
				// 调用重新渲染
				this.getlist()
			},
			// 删除按钮
			delbtn(item) {
				console.log("点击删除按钮", item.id);
				this.delapi(item.id)

			},
			// 删除接口
			async delapi(id) {
				const form = {
					"requestType": "DelCarWhitelist",
					"data": {
						"id": id,
					},
				}
				const res = await Obtainlist(form)
				console.log("黑白名单管理", res.data.data);
				this.getlist()
			},
			// 重置按钮、
			reset() {
				this.BlackWhiteList.value = "黑白名单"
				this.BlackWhiteList.type = "all"
				this.getlist()
			},
			// 打开黑白名单页面加载全部数据
			async getlist() {
				const form = {
					"requestType": "GetCarWhitelist",
					"data": {
						'ind': -1,
						'ty': "all",
						'pgt': -1,
						'word': "all",
						'stk': "all",
						'stt': "all"
					},
				}
				const res = await Obtainlist(form)
				console.log("黑白名单管理", res.data.data);
				if (res.data.data == undefined) {
					this.whitelist = ''
				} else if (res.data.data != undefined) {
					this.whitelist = res.data.data
				}
			},
		},
		onLoad() {
			this.getlist()
		},
	}
</script>

<style lang="scss">
	.BlackWhiteListManagement {
		width: 100%;
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

		.BlackWhiteList {
			.BlackWhiteList-item {
				margin: 15px;
				padding: 20px;
				box-sizing: border-box;
				border-radius: 5px;

				background-color: #fff;

				.header {
					display: flex;
					justify-content: space-between;

					.names {
						font-weight: 900;
						font-size: 20px;
					}

					.times {
						display: inline-block;
						height: 30px;
						line-height: 30px;
					}
				}

				.item-top {
					display: flex;
					justify-content: space-between;

					.ids {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
					}

					.phone {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
					}
				}

				.item-center {
					.validity {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
					}

				}

				.item-bottom {
					display: flex;
					justify-content: space-between;

					.namelist {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
						width: 50px;
					}

					.notes {
						font-size: 15px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
						flex: 1;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.item-btn {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.editbtn {
						margin: 0;
						width: 48%;
					}

					.delbtn {
						margin: 0;
						width: 48%;
					}
				}
			}
		}
	}
</style>