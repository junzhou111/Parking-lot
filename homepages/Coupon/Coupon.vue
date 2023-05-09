<template>
	<!-- 优惠券 -->
	<view class="Coupon">
		<!-- 搜索框 -->
		<view class="inputbox">
			<view class="input">
				<u--input adjustPosition placeholder="搜索" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399" v-model="searchvalue"></u--input>
			</view>
			<view class="inputbtn">
				<button class="bt" @click="newaddshow=true">新增</button>
				<button class="bt" @click="search">搜索</button>
				<button class="bt" @click="reset">重置</button>
			</view>
		</view>
		<!-- 弹出筛选层 -->
		<u-popup :show="newaddshow" @close="newaddclose" @open="newaddopen" mode="top">
			<view class="fromview">
				<scroll-view scroll-y="true">
					<view class="scrollbox">
						<!-- 商家名称 -->
						<input class="calendarinput" type="text" v-model="MerchantName" @input="changeValue"
							placeholder="商家名称">
						<scroll-view scroll-y="true">
							<view class="MerchantNamebox">
								<view class="MerchantNamebox-item" v-for="(item,index) in MerchantNamelist" :key="index"
									@click="changeMerchantName(item)">
									<text>{{item.name}}</text>
									<text>{{item.type==0?'业主/车主':item.type==1?'家属':item.type==2?'租户':item.type==3?'工作人员':'APP注册用户'}}</text>
								</view>
							</view>
						</scroll-view>
						<!-- 优惠券类型 -->
						<u-action-sheet :actions="CouponType.list" @select="CouponTypeClick" :title="CouponType.title"
							cancelText="取消" @close="CouponType.show=false" :show="CouponType.show"></u-action-sheet>
						<view class="calendarinput" @click="CouponType.show=true">
							<text v-text="CouponType.value"></text>
							<u-icon size="20" name="arrow-down"></u-icon>
						</view>
						<!-- 添加生效时间 -->
						<u-datetime-picker @close="startshow=false" ref="datetimePicker" :show="startshow"
							v-model="startvalue" mode="datetime" @cancel="startshow=false"
							@confirm="startconfirm"></u-datetime-picker>
						<!-- <u-calendar :show="startshow" mode="single" @confirm="startconfirm"
							@close="startshow=false"></u-calendar> -->
						<view class="calendarinput" @click="startshow = true">
							<text>生效时间</text>
							<u-icon size="25" name="calendar"></u-icon>
						</view>
						<!-- 添加失效时间 -->
						<u-datetime-picker @close="endshow=false" ref="enddatetimePicker" :show="endshow"
							v-model="endvalue" mode="datetime" @cancel="endshow=false"
							@confirm="endconfirm"></u-datetime-picker>
						<!-- <u-calendar :show="endshow" mode="single" @confirm="endconfirm"
							@close="endshow=false"></u-calendar> -->
						<view class="calendarinput" @click="endshow = true">
							<text>失效时间</text>
							<u-icon size="25" name="calendar"></u-icon>
						</view>
						<!-- 限制类型 -->
						<u-action-sheet :actions="Restrictiontype.list" @select="RestrictiontypeClick"
							:title="Restrictiontype.title" cancelText="取消" @close="Restrictiontype.show=false"
							:show="Restrictiontype.show"></u-action-sheet>
						<view class="calendarinput" @click="Restrictiontype.show=true">
							<text v-text="Restrictiontype.value"></text>
							<u-icon size="20" name="arrow-down"></u-icon>
						</view>
						<!-- 优惠券名称 -->
						<input class="calendarinput" type="text" v-model="CouponName" placeholder="优惠券名称">
						<!-- 优惠值-->
						<input class="calendarinput" type="text" v-model="Discountvalue" placeholder="优惠值">
						<!-- 是否反复可使用 -->
						<u-action-sheet :actions="recovery.list" @select="recoveryClick" :title="recovery.title"
							cancelText="取消" @close="recovery.show=false" :show="recovery.show"></u-action-sheet>
						<view class="calendarinput" @click="recovery.show=true">
							<text v-text="recovery.value"></text>
							<u-icon size="20" name="arrow-down"></u-icon>
						</view>
						<!-- 商家发放有效时长设置 -->
						<u-action-sheet :actions="Effectiveduration.list" @select="EffectivedurationClick"
							:title="Effectiveduration.title" cancelText="取消" @close="Effectiveduration.show=false"
							:show="Effectiveduration.show"></u-action-sheet>
						<view class="calendarinput" @click="Effectiveduration.show=true">
							<text v-text="Effectiveduration.value"></text>
							<u-icon size="20" name="arrow-down"></u-icon>
						</view>
						<!-- 固定时间 -->
						<input v-if="Effectiveduration.type==1" class="calendarinput" type="text" v-model="timevalue"
							placeholder="固定时间(小时/单位)">
						<!-- 优惠券数量 -->
						<input class="calendarinput" type="text" v-model="Couponnumber" placeholder="优惠券数量">
						<!-- 确认按钮 -->
						<button class="confirmbtn" @click="confirm">确认</button>

					</view>
				</scroll-view>
			</view>
		</u-popup>
		<!-- 优惠券列表 -->
		<view class="CouponList">
			<view class="CouponList-item" v-for="(item,index) in coupondata" :key="index">
				<view class="header">
					<view class="Merchantname">
						商家名称：{{item.p_name}}
					</view>
					<view class="Couponname">
						优惠券名称：{{item.name}}
					</view>

				</view>
				<view class="neck">
					<view class="Couponprice">
						优惠值：{{item.discounts_rules}}
					</view>
					<view class="repeattype">
						是否重复使用：
					</view>
				</view>
				<view class="time">
					<view class="statetime">
						<text>{{item.start_effective_time}}---{{item.end_effective_time}}</text>
					</view>

				</view>
				<view class="allnumber">
					<view class="number">
						发放数量：{{item.amount}}
					</view>
					<view class="invalidnumber">
						无效数量：
					</view>
				</view>
				<view class="attributenumber">
					<view class="Usednumber">
						已使用数量：
					</view>
					<view class="notusednumber">
						未使用数量：
					</view>
				</view>
				<view class="footer">
					<view class="Coupontype">
						优惠券类型：{{item.discounts_type=="0"?'免费':item.discounts_type=="1"?'定值':item.discounts_type=="2"?'打折':'金额充值'}}
					</view>
					<view class="type">
						状态：
					</view>
				</view>
				<view class="btns">
					<text>编辑</text>
					<text>发放</text>
					<text>发放记录</text>
					<text v-if="item.time_type!=0" @click="changecode(id)">二维码</text>
					<text @click="del(item.id)">删除</text>
				</view>


			</view>
		</view>
	</view>
</template>

<script>
	import {
		couponlist
	} from "@/api/index.js"
	import {
		debounce
	} from "@/utils/utils.js"
	export default {
		data() {
			return {
				//  弹出筛选层
				show: false,
				// 新增弹出层
				newaddshow: false,
				// 商家名称
				MerchantName: "",
				// 搜索到的商家名称
				MerchantNamelist: [],
				// 商家id
				MerchantNameitem: {},
				// 优惠券类型
				CouponType: {
					title: '优惠券类型',
					list: [{
						name: '免费金额',
						type: "1"
					}, {
						name: '打折',
						type: "2"
					}, {
						name: '免费',
						type: "0"
					}, {
						name: '金额充值',
						type: "3"
					}, ],
					show: false,
					value: '优惠券类型',
					type: ''
				},
				// 添加生效时间
				startshow: false,
				// 添加生效时间value
				startvalue: "生效时间",
				// 添加失效时间
				endshow: false,
				// 添加失效时间value
				endvalue: "失效时间",
				// 限制类型
				Restrictiontype: {
					title: '限制类型',
					list: [{
						name: '不限制发放',
						type: "0"
					}, {
						name: '每日限制发放',
						type: "1"
					}, {
						name: '与发放商家车位相同',
						type: "2"
					}, {
						name: '金额充值',
						type: "3"
					}],
					show: false,
					value: '限制类型',
					type: ''
				},
				// 优惠券名称
				CouponName: "",
				// 优惠值
				Discountvalue: "",
				// 是否反复可使用
				recovery: {
					title: '是否反复可使用',
					list: [{
							name: '是',
							type: "1"
						},
						{
							name: '否',
							type: "0"
						}
					],
					show: false,
					value: '是否反复可使用',
					type: ''
				},
				// 商家发放有效时长设置
				Effectiveduration: {
					title: '商家发放有效时长设置',
					list: [{
							name: '商家手动设置',
							type: "0"
						}, {
							name: '固定时长',
							type: "1"
						},
						{
							name: '当天有效',
							type: "2"
						}
					],
					show: false,
					value: '有效时长',
					type: ""
				},
				// 固定小时
				timevalue: '0',
				// 优惠券数量
				Couponnumber: '',
				// 优惠券全部数据
				coupondata: [],
				// 搜索内容
				searchvalue: ''


			};
		},
		methods: {
			// 	  弹出筛选层
			newaddopen() {
				// console.log('open');
			},
			newaddclose() {
				this.newaddshow = false
				// console.log('close');
			},
			// 优惠券类型
			CouponTypeClick(index) {
				console.log("优惠券类型", index);
				this.CouponType.value = index.name
				this.CouponType.type = index.type
			},

			// 添加生效时间的返回值
			startconfirm(e) {
				console.log("添加生效时间的返回值", e);
				this.startshow = false
			},
			// 添加失效时间的返回值
			endconfirm(e) {
				console.log("添加失效时间的返回值", e);
				this.endshow = false
			},
			// 限制类型
			RestrictiontypeClick(index) {
				console.log("限制类型", index);
				this.Restrictiontype.value = index.name
				this.Restrictiontype.type = index.type
			},
			// 是否反复可使用
			recoveryClick(index) {
				console.log("是否反复可使用", index);
				this.recovery.value = index.name
				this.recovery.type = index.type

			},
			// 商家发放有效时长设置
			EffectivedurationClick(index) {
				console.log("商家发放有效时长设置", index);
				this.Effectiveduration.value = index.name
				this.Effectiveduration.type = index.type
			},
			// 添加商家名称
			changeValue: debounce(function() {
				console.log(this.MerchantName, "MerchantName");
				this.getMerchantName(this.MerchantName)
			}, 1000),
			// 点击商家名称回填input框
			changeMerchantName(item) {
				console.log(item, 'item');
				this.MerchantName = item.name
				this.MerchantNameitem = item
			},
			// 搜索按钮
			search() {
				this.getcouponlist(this.searchvalue)
			},
			// 重置按钮
			reset() {
				this.searchvalue = ''
				this.getcouponlist()
			},
			// 删除按钮
			async del(id) {
				const form = {
					"requestType": "DelCoupons",
					"data": {
						"id": id
					},
				}
				const res = await couponlist(form)
				console.log("form", form);
				console.log("删除优惠券api", res.data.data);
				this.getcouponlist()
			},
			// 静态二维码
			changecode() {
				
			},
















			// 点击确认按钮添加优惠券
			confirm() {
				this.addcoupon()
				this.newaddshow = false
				// 清空所有内容
				this.MerchantNameitem = ''
				this.MerchantName = ''
				this.MerchantNamelist = []
				this.CouponType.value = '优惠券类型'
				this.CouponType.type = ''
				this.startvalue = '生效时间'
				this.endvalue = '失效时间'
				this.Restrictiontype.value = '限制类型'
				this.Restrictiontype.type = ''
				this.CouponName = ''
				this.Discountvalue = ''
				this.recovery.value = '是否反复可使用'
				this.recovery.type = ''
				this.Effectiveduration.value = '有效时长'
				this.Effectiveduration.type = ''
				this.timevalue = '0'
				this.Couponnumber = ''
			},
			// 调用添加优惠券api
			async addcoupon() {
				// 生效时间戳处理
				var time = new Date(this.startvalue);
				var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
				var M = time.getMonth() +
					1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一var d = time.getDate();// getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
				var d = time.getDate();
				var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
				var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
				var s = time.getSeconds();
				if (M <= 9) {
					M = '0' + M
				}
				if (d <= 9) {
					d = '0' + d
				}
				if (h <= 9) {
					h = '0' + h
				}
				if (m <= 9) {
					m = '0' + m
				}
				if (s <= 9) {
					s = '0' + s
				}

				console.log("时间", y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s);
				var a = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
				// 失效时间戳处理
				var times = new Date(this.endvalue);
				var yy = times.getFullYear(); //getFullYear方法以四位数字返回年份
				var MM = times.getMonth() +
					1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一var d = time.getDate();// getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
				var dd = times.getDate();
				var hh = times.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
				var mm = times.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
				var ss = times.getSeconds();
				if (MM <= 9) {
					MM = '0' + MM
				}
				if (dd <= 9) {
					dd = '0' + dd
				}
				if (hh <= 9) {
					hh = '0' + hh
				}
				if (mm <= 9) {
					mm = '0' + mm
				}
				if (ss <= 9) {
					ss = '0' + ss
				}

				console.log("时间", yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss);
				var b = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
				const form = {
					"requestType": "AddCoupons",
					"data": {
						"person_id": this.MerchantNameitem.id, //商家id
						"type": this.Restrictiontype.type, //类型(0不限制 1限制每天几张 2关联车位 3金额充值)
						"value": 0, //值
						"name": this.CouponName, //优惠券名称
						"start_effective_time": a, //时间
						"end_effective_time": b, //时间
						"time_type": this.Effectiveduration.type, //时间有效类型(0不限制 1限制有效 2当天有效)
						"time_value": this.timevalue, //值（小时）固定时间
						"discounts_rules": this.Discountvalue, //优惠值
						"discounts_type": this.CouponType.type, //0免费 1定值 免费金额 2打折 3金额充值
						"num": "1",
						"re_use": this.recovery.type, //重复使用(0否 1是)
					},
				}
				const res = await couponlist(form)
				console.log("添加优惠券api", res.data.data);
				console.log("form", form);
				this.getcouponlist()
			},
			// 获取商家名称
			async getMerchantName(MerchantName) {
				const form = {
					"requestType": "GetPerson",
					"data": {
						"word": MerchantName
					},
				}
				const res = await couponlist(form)
				console.log("获取商家名称", res.data.data);
				if (res.data.data == undefined) {
					this.MerchantNamelist = ''
				}
				if (res.data.data != undefined) {
					this.MerchantNamelist = res.data.data
				}
			},
			// 获取优惠券列表全部数据
			async getcouponlist(searchvalue) {
				const form = {
					"requestType": "couponsList",
					"data": {
						"pgt": "30",
						"word": searchvalue == undefined ? 'all' : searchvalue == "" ? 'all' : searchvalue,
						"ind": 0
					},
				}
				const res = await couponlist(form)
				console.log(form, 'form');
				console.log("优惠券全部列表", res.data.data);
				if (res.data.data == undefined) {
					this.coupondata = ''
				}
				if (res.data.data != undefined) {
					this.coupondata = res.data.data
				}

			},
		},
		onLoad() {
			// this.$refs.datetimePicker.setFormatter(this.formatter)
			// this.$refs.enddatetimePicker.setFormatter(this.formatter)

			this.getcouponlist()
		}

	}
</script>

<style lang="scss">
	.Coupon {
		width: 100%;
		background-color: #eee;
		overflow: hidden;

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

		.CouponList {
			padding: 15px;

			.CouponList-item {
				background-color: #fff;
				border-radius: 5px;
				padding: 15px;
				margin-bottom: 15px;

				.header {
					display: flex;
					justify-content: space-between;

					.Merchantname {
						width: 50%;
					}

					.Couponname {
						width: 50%;
					}

				}

				.neck {
					display: flex;
					justify-content: space-between;

					.Couponprice {
						width: 50%;
					}

					.repeattype {
						width: 50%;
					}
				}

				.time {

					.statetime {
						text {
							font-size: 13px;
						}
					}

					.endtime {}
				}

				.allnumber {
					display: flex;
					justify-content: space-between;

					.number {
						width: 50%;
					}

					.invalidnumber {
						width: 50%;
					}
				}

				.attributenumber {
					display: flex;
					justify-content: space-between;

					.Usednumber {
						width: 50%;
					}

					.notusednumber {
						width: 50%;
					}
				}

				.footer {
					display: flex;
					justify-content: space-between;

					.Coupontype {
						width: 50%;
					}

					.type {
						width: 50%;
					}
				}
			}
		}
	}

	.scrollbox {
		height: 60vh;
	}

	.MerchantNamebox {
		height: 100px;
		padding: 0 10px;

		.MerchantNamebox-item {
			height: 30px;
			display: flex;
			justify-content: space-between;

		}
	}

	.btns {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;

		text {
			background-color: #0d6efd;
			color: #fff;
			padding: 0 5px;
			height: 25px;
			line-height: 25px;
			border-radius: 5px;
		}
	}
</style>