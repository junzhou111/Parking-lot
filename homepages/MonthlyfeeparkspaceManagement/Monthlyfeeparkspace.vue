<template>
	<view>
		<view>车牌号：{{dateinfo.carscan}} </view>
		<view>车型： </view>
		<view>车位： </view>
		<view>开始日期： </view>
		<view>结束日期： </view>
		<view>联系人：{{dateinfo.name}} </view>
		<view>手机号：{{dateinfo.phone}} </view>
		<view>身份证号：{{dateinfo.idcard}} </view>
		<view>状态： </view>
		<view>创建时间：{{dateinfo.time}} </view>
	</view>
</template>

<script>
	import {
		getMonthlycar
	} from "../../api/index.js"
	export default {
		data() {
			return {
				dateinfo: ''
			};
		},
		onLoad: function(id) {
			console.log(id);
			this.getinfo(id)
		},
		methods: {
			// 新增月费车位区域数据
			async getinfo(id) {
				const form = {
					"requestType": "GetCarMfeeInfo",
					"data": {
						"id": id.id,
					},
				}
				const res = await getMonthlycar(form)
				console.log("月费车位详情页", res.data.data[0]);
				this.dateinfo = res.data.data[0]
			},
		}
	}
</script>

<style lang="scss">

</style>