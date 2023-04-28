<template>

	<view class="charts-box">
		<!-- 车流量变化趋势 -->
		<view class="charts-column">
			<qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
		</view>
	</view>

</template>

<script>
	export default {
		name: "charttrafficvolume",
		data() {
			return {


				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableScroll: false,
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					}
				},
			};
		},
		props: ["Trafficvolumelist"],
		onReady() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月",
							"12月"
						],
						series: [{
							name: "车流量变化趋势",
							data: [0],
							//  this.Trafficvolumelist
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},

		}
	}
</script>

<style>
	.charts-box {
		width: 100%;
		padding: 0 15px 15px 15px;
		background-color: #eee;
		box-sizing: border-box;
	}

	.charts-column {
		background-color: #fff;
		border-radius: 5px;
		padding: 15px 5px 5px 5px;
	}
</style>