<template>
	<view>
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<view class="cart-item">
			<uni-swipe-action>
				<block v-for="(item, i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swiperActionClickHandler(item)">
						<my-goods :goods="item" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler"
							@num-change="numChangeHandler" />
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		mixins: [badgeMix],

		computed: {
			...mapState('m_cart', ['cart'])
		},

		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},

		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),

			radioChangeHandler(goods) {
				this.updateGoodsState(goods)
			},

			numChangeHandler(goods) {
				this.updateGoodsCount(goods)
			},
			
			swiperActionClickHandler(goods) {
				this.removeGoodsById(goods)
			},
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}
</style>