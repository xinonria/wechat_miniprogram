<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-contanier">
			<!-- 左侧滑动条 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
				<block v-for="(item, i) in cateList" :key="i">
					<view :class="['left-scroll-view-item', i === active? 'active':'']" @click="changeActive(i)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动条 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
					<!-- 二级分类 -->
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<!-- 三级品牌分类 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<img :src="item3.cat_icon"/>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				// 可使用窗口高度
				wh: 0,
				// 选中的索引
				active: 0,
				// 滚动条重置
				scrollTop: 0,
				// 分类数据列表
				cateList: [],
				// 二级分类列表
				cateLevel2: []
			};
		},

		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},

		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.cateList = res.message
				this.cateLevel2 = this.cateList[0].children
			},
			
			changeActive(index) {
				this.active = index
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop = this.scrollTop? 0:1
			},
			
			gotoGoodsList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-contanier {
		display: flex;

		.left-scroll-view {
			width: 120px;
		}

		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				background-color: #ffffff;
				position: relative;

				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
		
		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}
	}
	
	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;
		
		.cate-lv3-item {
			width: 33.33%;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			image {
				height: 60px;
				width: 60px;
			}
			
			text {
				font-size: 12px;
			}
		}
	}
</style>