<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancel-button="none" :focus="true"></uni-search-bar>
		</view>
		
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResult.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResult" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrow-right" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" class="history-item" v-for="(item, i) in historys" :key="i" @click="gotoHistory(item)"></uni-tag>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器timer id
				timer: null,
				// 搜索关键词
				kw: '',
				// 搜索建议
				searchResult: [],
				// 搜索历史
				historyList: []
			};
		},
		
		computed: {
			historys() {
				return [...this.historyList].reverse()
			}
		},
		
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('history_kw') || [])
		},
		
		methods: {
			input(e) {
				clearTimeout(this.timer);
				// 500 ms内没有触发input事件,把e赋值到kw中
				this.timer = setTimeout(() => {
					this.kw = e.trim()
					this.getSearchRes()
				}, 500)
			},
			
			async getSearchRes() {
				if (this.kw === '') {
					this.searchResult = []
					return
				}
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
				this.saveSearchHistory();
			},
			
			saveSearchHistory() {
				// 去重数据
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('history_kw', JSON.stringify(this.historyList))
			},
			
			gotoHistory(name) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + name
				})
			},
			
			cleanHistory() {
				this.historyList = []
				uni.setStorageSync('history_kw', '[]')
			},
			
			gotoDetail(goods_id) {
				console.log(goods_id)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	
	.sugg-list {
		padding: 0 5px;
		
		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
				flex-grow: 1;
			}
		}
	}
	
	.history-box {
		padding: 0 5px;
		
		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border: 1px solid #efefef;
		}
		
		.history-list {
			display: flex;
			flex-wrap: wrap;
			
			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>