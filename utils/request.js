import {baseUrl} from "../config/index"

export const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: "加载中"
		})
		uni.request({
			url: baseUrl + options.url,
			method: options.method || 'post',
			header: {
				'Cookie': uni.getStorageSync('cookieKey') ? uni.getStorageSync('cookieKey') :uni.clearStorageSync()
			},
			data: options.data || {},
			success: (res) => {
				const data = res.data
				// if(res.data.data.status==1){
				// 	uni.redirectTo({
				// 		url:"/pages/login/login"
				// 	})
				// }
				resolve(res)
			},
			fail: (err) => {
				console.log('请求失败');
				reject(rej)
			},
			complete: () => {
				// console.log("请求结束");
				uni.hideLoading({
					success: (res) => {}
				})
			}

		})
	})
}