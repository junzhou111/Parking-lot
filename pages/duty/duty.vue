<template>
	<view class="duty">
		<view class="duty-item">
			<view class="duty-box-img">
				<image class="img" src="../../static/img.jpg" mode="widthFix"></image>
			</view>
			<view class="duty-box-title">
				<view class="title-plate">
					云·A2L50H
				</view>
				<view class="title-price">
					（0.60元）
				</view>
				<view class="title-time">
					16:33:45
				</view>
				<view class="title-colorplate">
					蓝牌
				</view>
				<view class="btns">
					<view class="btn-item" v-for="(item,index) in btns" :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btns: [{
						name: "手动录入",
						type: "ManualEntry"
					},
					{
						name: "车牌纠正",
						type: "LicensePlateCorrection"
					},
					{
						name: "遥控开闸",
						type: "RemoteOpen"
					},
					{
						name: "手动抓拍",
						type: "ManualCapture"
					},
					{
						name: "环境相机",
						type: "EnvironmentalCamera"
					}
				]
			};
		}
	}
</script>


<style lang="scss">
	.duty {
		width: 100%;

		.duty-item {
			width: 95%;
			margin: 0 auto;
			border: #acacac 1px solid;
			border-radius: 5px;
			overflow: hidden;

			.duty-box-img {
				width: 100%;

				.img {
					width: 100%;
				}
			}

			.duty-box-title {
				width: 100%;
				padding: 4px 8px 10px;
				box-sizing: border-box;

				.title-plate {
					font-size: 18px;
					display: inline;
					color: #4169e1;
					font-weight: 900
				}

				.title-price {
					font-size: 18px;
					display: inline;
					color: #ff0000;
					font-weight: 900
				}

				.title-time {
					display: inline;
					margin: 0 10px;
				}

				.title-colorplate {
					display: inline-block;
					background-color: royalblue;
					padding: 2px 3px;
					border-radius: 3px;
					color: white;
					margin: 0 10px;
				}
				.btns {
					width: 100%; 
					background-color: #0d6efd;
					margin: 5px 0 0 0;
					font-size: 15px;
					display: flex;
					border-radius: 5px;
					.btn-item {
						width: 20%;
						text-align: center;
						color: white;
						padding: 10px 15px; 
						
					}
					
				}
			}
			
		}
	}
</style>