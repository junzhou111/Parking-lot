<template>

	<view>
		<!-- 营收统计 -->
		<view class="charts-box">
			<view class=".charts-column">
				<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "chartrevenue",
		data() {
			return {
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					dataLabel: false,
					dataPointShape: false,
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2,
						data: [{
							min: 0,
							max: 150
						}]
					},
					extra: {
						line: {
							type: "curve",
							width: 2,
							activeType: "hollow",
							linearType: "custom"
						}
					}
				},
			}
		},
		props: ['revenued', 'revenueing'],
		onReady() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
						series: [{
								name: "去年",
								data: [15, 45, 15, 45, 15, 45]
							},
							{
								name: "今年",
								data: [55, 85, 55, 85, 55, 85]
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	};
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		padding: 0 15px 15px 15px;
		box-sizing: border-box;
		background-color: #eee
	}

	.charts-column {
		background-color: #fff;
		border-radius: 5px;
		padding: 15px 5px 5px 5px;
	}
</style>