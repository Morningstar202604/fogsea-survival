<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';

const g = useGame();

const marketInfo = computed(() => {
  const st = g.state;
  if (!st || !st.market) return null;
  
  return {
    merchants: st.market.merchants || [],
    prices: st.market.prices || {},
    playerGold: st.resources.gold?.current || 0,
  };
});

function buyItem(itemId: string, merchantId: string) {
  g.buyFromMarket?.(itemId, merchantId);
}

function sellItem(itemId: string) {
  g.sellToMarket?.(itemId);
}
</script>

<template>
  <div v-if="marketInfo" class="market-panel">
    <h3 class="panel-title">交易市场</h3>
    
    <div class="gold-info">
      <span class="label">持有金币:</span>
      <span class="value">{{ marketInfo.playerGold }}</span>
    </div>

    <!-- 商人列表 -->
    <div v-if="marketInfo.merchants.length > 0" class="merchants-section">
      <h4 class="section-title">商人</h4>
      <div class="merchant-list">
        <div v-for="merchant in marketInfo.merchants" :key="merchant.id" class="merchant-card">
          <div class="merchant-header">
            <span class="merchant-name">{{ merchant.name }}</span>
            <span class="merchant-type">{{ merchant.type === 'traveling' ? '行商' : '固定摊位' }}</span>
          </div>
          
          <div v-if="merchant.inventory && merchant.inventory.length > 0" class="inventory">
            <h5 class="inventory-title">出售物品</h5>
            <div class="item-grid">
              <div v-for="item in merchant.inventory" :key="item.itemId" class="item-card">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-price">💰 {{ item.price }}</div>
                <button 
                  class="buy-btn"
                  @click="buyItem(item.itemId, merchant.id)"
                  :disabled="marketInfo.playerGold < item.price"
                >
                  购买
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 动态价格信息 -->
    <div v-if="Object.keys(marketInfo.prices).length > 0" class="prices-section">
      <h4 class="section-title">市场参考价</h4>
      <div class="price-list">
        <div v-for="(price, itemId) in marketInfo.prices" :key="itemId" class="price-item">
          <span class="item-label">{{ itemId }}</span>
          <span class="price-value">{{ price }} 金币</span>
        </div>
      </div>
    </div>

    <div v-if="!marketInfo.merchants || marketInfo.merchants.length === 0" class="empty-state">
      当前没有商人，探索时可能会遇到行商。
    </div>
  </div>
</template>

<style scoped>
.market-panel {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.panel-title {
  margin: 0;
  font-size: 1rem;
  color: #e4e9f2;
  font-weight: 600;
}

.gold-info {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(201, 160, 106, 0.08);
  border-radius: 6px;
  font-size: 0.85rem;
}

.gold-info .label {
  color: #8b95a7;
}

.gold-info .value {
  color: #c9a06a;
  font-weight: 700;
}

.merchants-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.section-title {
  margin: 0;
  font-size: 0.9rem;
  color: #aeb7c7;
  font-weight: 600;
}

.merchant-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.merchant-card {
  padding: 0.7rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.merchant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.merchant-name {
  font-size: 0.95rem;
  color: #e4e9f2;
  font-weight: 600;
}

.merchant-type {
  font-size: 0.78rem;
  color: #7aa2c9;
  padding: 0.2rem 0.5rem;
  background: rgba(122, 162, 201, 0.12);
  border-radius: 4px;
}

.inventory {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.inventory-title {
  margin: 0;
  font-size: 0.82rem;
  color: #8b95a7;
  font-weight: 600;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.item-card {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.item-name {
  font-size: 0.82rem;
  color: #cdd6e4;
}

.item-price {
  font-size: 0.8rem;
  color: #c9a06a;
  font-weight: 600;
}

.buy-btn {
  padding: 0.3rem;
  background: #4f9d6f;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 0.78rem;
  transition: background 0.15s ease;
}

.buy-btn:hover:not(:disabled) {
  background: #5ab87e;
}

.buy-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.prices-section {
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
}

.price-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.price-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
}

.item-label {
  color: #8b95a7;
}

.price-value {
  color: #c9a06a;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 1rem;
  color: #566072;
  font-size: 0.85rem;
  font-style: italic;
}
</style>
