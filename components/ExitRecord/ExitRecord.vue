<template>
	<!-- 车场概况组件 -->
	<view class="ExitRecord">
		<view class="ExitRecord-item" v-for="(item,index) in caralllist" :key="index" @click="clickinfo(item)">
			<image class="ExitRecord-left" src="../../static/swiper/img3.jpg" mode="widthFix"></image>
			<view class="ExitRecord-right">
				<view class="right-top">
					<view class="top-left">
						<!-- 车牌 -->
						{{item.carscan}}
					</view>
					<view class="cheweihao">
						<!-- 位置 -->
						{{item.location}}
					</view>
					<view class="top-right">
						{{item.person_id=="0"?"临时车":item.person_id}}
					</view>
				</view>
				<view class="right-bottom">
					<view class="left-title">
						<view class="bottom-top">
							<view class="time">
								{{item.time}}
								<view>
									<!-- "视频触发","地感触发","手动触发","手动抓图","手工录入" -->
									<text>{{item.triggertype==0?'视频触发':item.triggertype==1?'地感触发':item.triggertype==2?'手动触发':item.triggertype==3?'手动抓图':'手工录入'}}</text>
								</view>
							</view>
						</view>
						<view class="bottom-bottom">
							<view class="cartypeimg">
								{{item.io=="0"?'进场':'出场'}}
							</view>
							<view class="cartypeed">
								{{item.release=="1"?"已放行":"未放行"}}
							</view>
						</view>
					</view>
					<view class="btnbox">
						{{item.cartype==0?"未知车牌":item.cartype==1?"蓝牌小汽车":item.cartype==2?'黑牌小汽车':item.cartype==3?'单排黄牌'
							:item.cartype==4?'双排黄牌':item.cartype==5?'警车车牌':item.cartype==6?'武警车牌':item.cartype==7?'个性化车牌'
							:item.cartype==8?'单排军车牌':item.cartype==9?'双排军车牌':item.cartype==10?'使馆车牌':item.cartype==11?'香港车牌'
							:item.cartype==12?'农用车牌':item.cartype==13?'澳门牌':item.cartype==14?'厂内牌':item.cartype==15?'民航牌'
							:item.cartype==16?'领事馆车牌':item.cartype==17?'新能源车牌':'应急车牌'}}
					</view>
					<button class="right-btn">
						<!--车身颜色["未知","蓝色","黄色","白色","黑色","绿色"] -->
						{{item.carcolor==0?'未知':item.carcolor==1?'蓝色':item.carcolor==2?'黄色':item.carcolor==3?'白色':item.carcolor==4?'黑色':'绿色'}}</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "ExitRecord",
		data() {
			return {

			};
		},
		props: ['caralllist'],
		methods: {
			clickinfo(item) {
				console.log(item.id);
				this.$emit("infos", item.id)
			}
		}
	}
</script>

<style lang="scss">
	.ExitRecord {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		background-color: #eee;

		.ExitRecord-item {
			width: 100%;
			background-color: #fff;
			border-radius: 5px;
			overflow: hidden;
			display: flex;
			margin-bottom: 15px;

			.ExitRecord-left {
				width: 120px;
				margin: 5px 10px 5px 5px;

			}

			.ExitRecord-right {
				// background-color: red;
				flex: 1;
				padding: 5px;
				display: flex;
				flex-direction: column;

				.right-top {
					// background-color: blue;
					display: flex;
					justify-content: space-between;
					font-weight: 900;
					font-size: 18px;

					.top-left {}

					.cheweihao {
						font-weight: 500;
						font-size: 12px;
					}

					.top-right {
						font-weight: 500;
						font-size: 12px;
						color: #f00;
					}
				}

				.right-bottom {
					width: 100%;
					display: flex;
					justify-content: space-between;
					position: relative;

					.left-title {
						font-size: 12px;
						flex: 1;
						display: flex;
						justify-content: space-between;
						// background-color: #f60;
						padding: 5px;

						.bottom-bottom {
							width: 70px;
						}

					}

					.btnbox {
						width: 50px;
						height: 30px;
					}

					.right-btn {
						margin: 0;
						padding: 0;
						width: 50px;
						height: 30px;
						font-size: 12px;
						position: absolute;
						right: 0;
						bottom: 5px;
						background-color: #198754;
						color: #fff;
					}
				}
			}
		}
	}
</style>