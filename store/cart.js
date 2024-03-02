export default {
	namespaced: true,
	
	state: () => ({
		    // 每个商品的信息对象，都包含如下 6 个属性：
		    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
				
				cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations: {
		addToCart(state, goods) {
			const findRes = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (!findRes) {
				state.cart.push(goods)
			}
			else {
				findRes.goods_count += 1
			}
			
			this.commit('m_cart/saveToStorage')
		},
		
		updateGoodsState(state, goods) {
			const findRes = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (findRes) {
				findRes.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		
		updateGoodsCount(state, goods) {
			const findRes = state.cart.find((x) => x.goods_id === goods.goods_id)
			if (findRes) {
				findRes.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		
		removeGoodsById(state, goods) {
			state.cart = state.cart.filter((x) => x.goods_id !== goods.goods_id)
			this.commit('m_cart/saveToStorage')
		},
		
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		
	},
	
	getters: {
		total(state) {
			let c = 0
			state.cart.forEach(goods => c+=goods.goods_count)
			return c
		}
	}
}