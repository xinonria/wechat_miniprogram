<template>
	<view>
		<view class="goods-list">
			<block v-for="(item, i) in goodsList" :key="i">
				<my-goods :goods="item"></my-goods>
			</block>
		</view>
	</view>
</template>

<script>
import goods_listVue from './goods_list.vue';
	export default {
		data() {
			return {
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示数据上限
					pagesize: 10
				},
				
				goodsList: [],
				// 总数量
				total: 0,
				
				isLoading: false,
			};
		},
		
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('没有更多了')
			if (this.isLoading) return
		  // 让页码值自增 +1
		  this.queryObj.pagenum += 1
		  // 重新获取列表数据
		  this.getGoodsList()
		},
		
		onPullDownRefresh() {
			// 重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()
				
				cb && cb()
				
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				this.isLoading = false
			}
		}
	}
</script>

<style lang="scss">
</style>
