<template>

	<view class="masking-out" >
		<view class="masking-out-box" v-for="(ite,ind) in item" :key="ind">
			<view><text>入场、出场时间</text>{{item[0].time}} </view>
			<view><text>进出类型</text>{{item[0].io}} </view>
			<view><text>位置</text> {{item[0].location_type}}</view>
			<view><text>用户名称</text> {{item[0].person_id}}</view>
			<view><text>车牌</text> {{item[0].carscan}}</view>
			<view><text>车型</text>{{item[0].cartype}} </view>
			<view><text>车身颜色</text>{{item[0].carcolor}} </view>
			<view><text>车牌识别图片</text>item[0].pic_max </view>
			<view><text>入场图片</text>item[0].pic_min </view>
			<view><text>订单编号</text> {{item[0].order_number}}</view>
			<view><text>免费时常</text>{{item[0].freetime}} </view>
			<view><text>触发方式</text>{{item[0].triggertype}} </view>
			<view><text>是否放行</text>{{item[0].release}} </view>
			<view><text>是否已出场</text> {{item[0].isout}}</view>
		</view>
	</view>

</template>

<script>
	import {
		carlist
	} from "@/api/index.js";
	export default {
		data() {
			return {
				item: []
			};
		},
		onLoad: function(id) {
			console.log(id);
			this.infos(id)
		},
		methods: {
			async infos(id) {
				const form = {
					"requestType": "GetCarIoInfo",
					"data": {
						'id': id.id,
					},
				}
				const res = await carlist(form)
				console.log("点击获取详情", res.data.data);
				this.item = res.data.data
			}
		}
	}
</script>

<style lang="scss">

</style>