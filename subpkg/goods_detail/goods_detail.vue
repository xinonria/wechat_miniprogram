<template>
	<view v-if="goodsInfo.goods_name" class="goods-detail-container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
				<img :src="item.pics_big" @click="preview(i)" />
			</swiper-item>
		</swiper>

		<view class="goods-info-box">
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<view class="goods-info-body">
				<view class="goods-name">{{goodsInfo.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="grey"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递: 免运费
			</view>
		</view>
		
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
		
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: {},
				
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				}, {
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]
			};
		},

		onLoad(options) {
			const goodsId = options.goods_id
			this.getGoodsDetail(goodsId)
		},

		methods: {
			async getGoodsDetail(id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					'goods_id': id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goodsInfo = res.message
			},

			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab	({
						url: '/pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #C00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-around;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border: 1px solid #efefef;
				color: grey;
			}
		}

		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: grey;
		}
	}
	
	.goods-detail-container {
		// 防止被底下导航栏遮挡
		padding-bottom: 50px;
	}
	
	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>