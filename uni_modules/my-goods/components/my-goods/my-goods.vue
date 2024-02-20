<template>
	<view class="goods-item" @click="gotoDetail(goods)">
		<!-- 左侧图片 -->
		<view class="goods-item-left">
			<img :src="goods.goods_small_logo || defaultPic" class="goods-pic" />
		</view>
		<!-- 右侧信息 -->
		<view class="goods-item-right">
			<view class="goods-item-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},

		data() {
			return {
				// 默认空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			}
		},
		
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		
		methods: {
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>
<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.goods-name {
				font-size: 13px;
			}

			.goods-price {
				font-size: 16px;
				color: #C00000;
			}
		}
	}
</style>