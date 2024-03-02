<template>
	<view class="goods-item">
		<!-- 左侧图片 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<img :src="goods.goods_small_logo || defaultPic" class="goods-pic" @click="gotoDetail(goods)"/>
		</view>
		<!-- 右侧信息 -->
		<view class="goods-item-right">
			<view class="goods-item-name" @click="gotoDetail(goods)">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price" @click="gotoDetail(goods)">￥{{goods.goods_price | tofixed}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler" v-if="showNum"></uni-number-box>
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
			},
			
			showRadio: {
				type: Boolean,
				default: false
			},
			
			showNum: {
				type: Boolean,
				default: false
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
			},
			
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			
			numChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
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
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-around;

			.goods-name {
				font-size: 13px;
			}
			
			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.goods-price {
				font-size: 16px;
				color: #C00000;
			}
		}
	}
</style>