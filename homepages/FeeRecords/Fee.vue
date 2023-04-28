<template>
	<view>
		<view class="item">

			<view> 临时车收费记录:</view>
			<view> 凭证号：{{list.title}}</view>
			<view> 订单编号：{{list.order_number}}</view>
			<view> 支付单号：{{list.pay_order_number}}</view>
			<view>
				支付场景：{{list.pay_suorce=='0'?'掌上社区app':list.pay_suorce=='1'?'实时扫码付款':list.pay_suorce=='2'?'聚合收款码':'其他自收'}}
			</view>
			<view> 支付方式：{{list.pay_type=='0'?'现场当面收款':list.pay_type=='1'?'微信支付':list.pay_type=='2'?'支付宝支付':'其他支付'}}
			</view>
			<view> 创建时间：{{list.pay_createtime}}</view>
			<view> 支付时间：{{list.pay_achievetime}}</view>
			<view> 支付状态：{{list.pay_state=="0"?'待支付':list.pay_state=="1"?'已支付':list.pay_state=='3'?'支付取消':'未知状态'}}</view>
			<view> 实收金额：{{list.money}}</view>









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
				list: []
			}
		},
		onLoad(index) {
			console.log(index);
			this.getalllist(index)
		},
		methods: {
			async getalllist(index) {
				const form = {
					"requestType": "GetCarTempPaylist",
					"data": {
						"ind": 0,
						"pgt": "30",
						"word": "all",
						"stk": "all",
						"stt": "all",
						"paytype": "all",
						"paystate": "all",
						"date1": "all",
						"date2": "all",
						"pay_suorce": "all",
					},
				}
				const res = await getTemporaryvehicle(form)
				console.log("所有数据", res.data.data);
				this.list = (res.data.data[index.index])
				console.log("list", res.data.data[index.index]);

			},
		}
	}
</script>

<style>

</style>