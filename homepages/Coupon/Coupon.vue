<template>
	<!-- 优惠券 -->
	<view class="Coupon">
		<!-- 搜索框 -->
		<view class="inputbox">
			<view class="input">
				<u--input adjustPosition placeholder="搜索" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399"></u--input>
			</view>
			<view class="inputbtn">
				<button class="bt" @click="newaddshow=true">新增</button>
				<button class="bt">搜索</button>
				<button class="bt">重置</button>
			</view>
		</view>
		<!-- 弹出筛选层 -->
		<u-popup :show="newaddshow" @close="newaddclose" @open="newaddopen" mode="top">
			<view class="fromview">
				<!-- 商家名称 -->
				<input class="calendarinput" type="text" v-model="MerchantName" placeholder="商家名称">
				<!-- 优惠券类型 -->
				<u-action-sheet :actions="CouponType.list" @select="CouponTypeClick" :title="CouponType.title"
					cancelText="取消" @close="CouponType.show=false" :show="CouponType.show"></u-action-sheet>
				<view class="calendarinput" @click="CouponType.show=true">
					<text v-text="CouponType.value"></text>
					<u-icon size="20" name="arrow-down"></u-icon>
				</view>
				<!-- 添加生效时间 -->
				<u-calendar :show="startshow" mode="single" @confirm="startconfirm"
					@close="startshow=false"></u-calendar>
				<view class="calendarinput" @click="startshow = true">
					<text v-text="startvalue"></text>
					<u-icon size="25" name="calendar"></u-icon>
				</view>
				<!-- 添加失效时间 -->
				<u-calendar :show="endshow" mode="single" @confirm="endconfirm" @close="endshow=false"></u-calendar>
				<view class="calendarinput" @click="endshow = true">
					<text v-text="endvalue"></text>
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
				<u-action-sheet :actions="recovery.list" @select="recoveryClick" :title="recovery.title" cancelText="取消"
					@close="recovery.show=false" :show="recovery.show"></u-action-sheet>
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
				<!-- 优惠券数量 -->
				<input class="calendarinput" type="text" v-model="Couponnumber" placeholder="优惠券数量">


				<!-- 确认按钮 -->
				<button class="confirmbtn">确认</button>
			</view>
		</u-popup>
		<!-- 优惠券列表 -->
		<view class="CouponList">
			<view class="CouponList-item">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//  弹出筛选层
				show: false,
				// 新增弹出层
				newaddshow: false,
				// 商家名称
				MerchantName: "",
				// 优惠券类型
				CouponType: {
					title: '优惠券类型',
					list: [{
							name: '打折',
							type: ""
						},
						{
							name: '免费',
							type: ""
						}
					],
					show: false,
					value: '优惠券类型'
				},
				// 添加生效时间
				startshow: false,
				// 添加生效时间value
				startvalue: '生效时间',
				// 添加失效时间
				endshow: false,
				// 添加失效时间value
				endvalue: '失效时间',
				// 限制类型
				Restrictiontype: {
					title: '限制类型',
					list: [{
							name: '每日限制发放',
							type: ""
						},
						{
							name: '金额充值',
							type: ""
						}
					],
					show: false,
					value: '限制类型'
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
							type: ""
						},
						{
							name: '否',
							type: ""
						}
					],
					show: false,
					value: '是否反复可使用'
				},
				// 商家发放有效时长设置
				Effectiveduration: {
					title: '有效时长',
					list: [{
							name: '固定时长',
							type: ""
						},
						{
							name: '当天有效',
							type: ""
						}
					],
					show: false,
					value: '有效时长'
				},
				// 优惠券数量
				Couponnumber:''


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
			},
			// 添加生效时间的返回值
			startconfirm(e) {
				console.log("添加生效时间的返回值", e);
				this.startshow = false
				this.startvalue = e
			},
			// 添加生效时间的返回值
			endconfirm(e) {
				console.log("添加生效时间的返回值", e);
				this.endshow = false
				this.endvalue = e
			},
			// 限制类型
			RestrictiontypeClick(index) {
				console.log("限制类型", index);
				this.Restrictiontype.value = index.name
			},
			// 是否反复可使用
			recoveryClick(index) {
				console.log("是否反复可使用", index);
				this.recovery.value = index.name
			},
			// 是否反复可使用
			EffectivedurationClick(index) {
				console.log("是否反复可使用", index);
				this.Effectiveduration.value = index.name
			},
		}

	}
</script>

<style lang="scss">
	.Coupon {
		width: 100%;
		background-color: #eee;
		height: 100vh;
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
	}
</style>