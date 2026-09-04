/**
 * 额外内容扩展包
 * 新增物品、怪物、场景、事件
 */
// ============================================================
// 一、新增物品（100+）
// ============================================================
export const EXTRA_ITEMS = {
    // === 武器类 ===
    wooden_bow: { id: 'wooden_bow', name: '木弓', description: '简易的弓箭', category: 'weapon', basePrice: 35, stackable: false, attack: 12 },
    iron_bow: { id: 'iron_bow', name: '铁弓', description: '坚固的铁弓', category: 'weapon', basePrice: 80, stackable: false, attack: 20 },
    crystal_bow: { id: 'crystal_bow', name: '结晶弓', description: '蕴含魔力的弓', category: 'weapon', basePrice: 180, stackable: false, attack: 30 },
    wooden_staff: { id: 'wooden_staff', name: '木杖', description: '简易的法杖', category: 'weapon', basePrice: 30, stackable: false, attack: 8 },
    iron_staff: { id: 'iron_staff', name: '铁杖', description: '坚固的法杖', category: 'weapon', basePrice: 75, stackable: false, attack: 15 },
    crystal_staff: { id: 'crystal_staff', name: '结晶法杖', description: '强大的法杖', category: 'weapon', basePrice: 200, stackable: false, attack: 25 },
    wooden_dagger: { id: 'wooden_dagger', name: '木匕首', description: '简易的匕首', category: 'weapon', basePrice: 20, stackable: false, attack: 8 },
    iron_dagger: { id: 'iron_dagger', name: '铁匕首', description: '锋利的匕首', category: 'weapon', basePrice: 60, stackable: false, attack: 15 },
    crystal_dagger: { id: 'crystal_dagger', name: '结晶匕首', description: '魔力匕首', category: 'weapon', basePrice: 150, stackable: false, attack: 22 },
    wooden_hammer: { id: 'wooden_hammer', name: '木锤', description: '简易的锤子', category: 'weapon', basePrice: 25, stackable: false, attack: 10 },
    iron_hammer: { id: 'iron_hammer', name: '铁锤', description: '沉重的铁锤', category: 'weapon', basePrice: 90, stackable: false, attack: 22 },
    crystal_hammer: { id: 'crystal_hammer', name: '结晶战锤', description: '强大的战锤', category: 'weapon', basePrice: 220, stackable: false, attack: 32 },
    wooden_shield: { id: 'wooden_shield', name: '木盾', description: '简易的盾牌', category: 'equipment', basePrice: 30, stackable: false, defense: 5 },
    iron_shield: { id: 'iron_shield', name: '铁盾', description: '坚固的铁盾', category: 'equipment', basePrice: 100, stackable: false, defense: 12 },
    crystal_shield: { id: 'crystal_shield', name: '结晶盾', description: '魔力盾牌', category: 'equipment', basePrice: 250, stackable: false, defense: 20 },
    leather_helmet: { id: 'leather_helmet', name: '皮盔', description: '简易的头盔', category: 'equipment', basePrice: 25, stackable: false, defense: 3 },
    iron_helmet: { id: 'iron_helmet', name: '铁盔', description: '坚固的头盔', category: 'equipment', basePrice: 80, stackable: false, defense: 8 },
    crystal_helmet: { id: 'crystal_helmet', name: '结晶头盔', description: '魔力头盔', category: 'equipment', basePrice: 180, stackable: false, defense: 15 },
    leather_boots: { id: 'leather_boots', name: '皮靴', description: '简易的靴子', category: 'equipment', basePrice: 20, stackable: false, defense: 2 },
    iron_boots: { id: 'iron_boots', name: '铁靴', description: '坚固的靴子', category: 'equipment', basePrice: 70, stackable: false, defense: 6 },
    crystal_boots: { id: 'crystal_boots', name: '结晶靴', description: '魔力靴子', category: 'equipment', basePrice: 160, stackable: false, defense: 12 },
    leather_gloves: { id: 'leather_gloves', name: '皮手套', description: '简易的手套', category: 'equipment', basePrice: 15, stackable: false, defense: 2 },
    iron_gloves: { id: 'iron_gloves', name: '铁手套', description: '坚固的手套', category: 'equipment', basePrice: 60, stackable: false, defense: 5 },
    crystal_gloves: { id: 'crystal_gloves', name: '结晶手套', description: '魔力手套', category: 'equipment', basePrice: 140, stackable: false, defense: 10 },
    wooden_ring: { id: 'wooden_ring', name: '木戒指', description: '简易的戒指', category: 'equipment', basePrice: 10, stackable: false, defense: 1 },
    iron_ring: { id: 'iron_ring', name: '铁戒指', description: '坚固的戒指', category: 'equipment', basePrice: 50, stackable: false, defense: 3 },
    crystal_ring: { id: 'crystal_ring', name: '结晶戒指', description: '魔力戒指', category: 'equipment', basePrice: 120, stackable: false, defense: 7 },
    wooden_necklace: { id: 'wooden_necklace', name: '木项链', description: '简易的项链', category: 'equipment', basePrice: 12, stackable: false, defense: 1 },
    iron_necklace: { id: 'iron_necklace', name: '铁项链', description: '坚固的项链', category: 'equipment', basePrice: 55, stackable: false, defense: 4 },
    crystal_necklace: { id: 'crystal_necklace', name: '结晶项链', description: '魔力项链', category: 'equipment', basePrice: 130, stackable: false, defense: 8 },
    // === 消耗品 ===
    small_health_potion: { id: 'small_health_potion', name: '小生命药水', description: '恢复20点生命', category: 'consumable', basePrice: 15, stackable: true, maxStack: 50 },
    medium_health_potion: { id: 'medium_health_potion', name: '中生命药水', description: '恢复50点生命', category: 'consumable', basePrice: 40, stackable: true, maxStack: 50 },
    large_health_potion: { id: 'large_health_potion', name: '大生命药水', description: '恢复100点生命', category: 'consumable', basePrice: 80, stackable: true, maxStack: 50 },
    small_mana_potion: { id: 'small_mana_potion', name: '小魔力药水', description: '恢复20点魔力', category: 'consumable', basePrice: 15, stackable: true, maxStack: 50 },
    medium_mana_potion: { id: 'medium_mana_potion', name: '中魔力药水', description: '恢复50点魔力', category: 'consumable', basePrice: 40, stackable: true, maxStack: 50 },
    large_mana_potion: { id: 'large_mana_potion', name: '大魔力药水', description: '恢复100点魔力', category: 'consumable', basePrice: 80, stackable: true, maxStack: 50 },
    small_stamina_potion: { id: 'small_stamina_potion', name: '小体力药水', description: '恢复20点体力', category: 'consumable', basePrice: 12, stackable: true, maxStack: 50 },
    medium_stamina_potion: { id: 'medium_stamina_potion', name: '中体力药水', description: '恢复50点体力', category: 'consumable', basePrice: 35, stackable: true, maxStack: 50 },
    large_stamina_potion: { id: 'large_stamina_potion', name: '大体力药水', description: '恢复100点体力', category: 'consumable', basePrice: 70, stackable: true, maxStack: 50 },
    antidote: { id: 'antidote', name: '解毒药', description: '解除中毒状态', category: 'consumable', basePrice: 20, stackable: true, maxStack: 30 },
    bandage: { id: 'bandage', name: '绷带', description: '恢复10点生命', category: 'consumable', basePrice: 8, stackable: true, maxStack: 100 },
    herb_poultice: { id: 'herb_poultice', name: '草药膏', description: '恢复15点生命', category: 'consumable', basePrice: 12, stackable: true, maxStack: 50 },
    blessed_water: { id: 'blessed_water', name: '圣水', description: '恢复30点生命，解除诅咒', category: 'consumable', basePrice: 30, stackable: true, maxStack: 20 },
    phoenix_down: { id: 'phoenix_down', name: '凤凰之羽', description: '复活死亡的同伴', category: 'consumable', basePrice: 200, stackable: true, maxStack: 5 },
    ether: { id: 'ether', name: '以太', description: '恢复30点魔力', category: 'consumable', basePrice: 25, stackable: true, maxStack: 30 },
    elixir: { id: 'elixir', name: '万灵药', description: '恢复全部生命和魔力', category: 'consumable', basePrice: 500, stackable: true, maxStack: 3 },
    tent: { id: 'tent', name: '帐篷', description: '可以在野外休息恢复', category: 'consumable', basePrice: 50, stackable: true, maxStack: 10 },
    campfire_kit: { id: 'campfire_kit', name: '营火工具包', description: '可以生火取暖', category: 'consumable', basePrice: 25, stackable: true, maxStack: 20 },
    torch: { id: 'torch', name: '火把', description: '照亮黑暗区域', category: 'consumable', basePrice: 10, stackable: true, maxStack: 50 },
    lantern: { id: 'lantern', name: '提灯', description: '持续照亮区域', category: 'consumable', basePrice: 40, stackable: true, maxStack: 10 },
    rope: { id: 'rope', name: '绳索', description: '用于攀爬和捆绑', category: 'consumable', basePrice: 15, stackable: true, maxStack: 30 },
    grapple: { id: 'grapple', name: '抓钩', description: '用于攀爬高处', category: 'consumable', basePrice: 35, stackable: true, maxStack: 10 },
    lockpick: { id: 'lockpick', name: '开锁器', description: '用于开锁', category: 'consumable', basePrice: 20, stackable: true, maxStack: 30 },
    bomb: { id: 'bomb', name: '炸弹', description: '造成范围伤害', category: 'consumable', basePrice: 60, stackable: true, maxStack: 10 },
    smoke_bomb: { id: 'smoke_bomb', name: '烟雾弹', description: '逃跑时使用', category: 'consumable', basePrice: 30, stackable: true, maxStack: 15 },
    flash_bomb: { id: 'flash_bomb', name: '闪光弹', description: '致盲敌人', category: 'consumable', basePrice: 40, stackable: true, maxStack: 10 },
    poison_bomb: { id: 'poison_bomb', name: '毒气弹', description: '使敌人中毒', category: 'consumable', basePrice: 50, stackable: true, maxStack: 10 },
    fire_bomb: { id: 'fire_bomb', name: '火焰弹', description: '造成火焰伤害', category: 'consumable', basePrice: 55, stackable: true, maxStack: 10 },
    ice_bomb: { id: 'ice_bomb', name: '冰冻弹', description: '冰冻敌人', category: 'consumable', basePrice: 55, stackable: true, maxStack: 10 },
    lightning_bomb: { id: 'lightning_bomb', name: '雷电弹', description: '造成雷电伤害', category: 'consumable', basePrice: 55, stackable: true, maxStack: 10 },
    // === 卷轴 ===
    teleport_scroll: { id: 'teleport_scroll', name: '传送卷轴', description: '传送到安全地点', category: 'scroll', basePrice: 100, stackable: true, maxStack: 10 },
    fire_scroll: { id: 'fire_scroll', name: '火焰卷轴', description: '造成火焰伤害', category: 'scroll', basePrice: 80, stackable: true, maxStack: 10 },
    ice_scroll: { id: 'ice_scroll', name: '冰霜卷轴', description: '冰冻敌人', category: 'scroll', basePrice: 80, stackable: true, maxStack: 10 },
    lightning_scroll: { id: 'lightning_scroll', name: '闪电卷轴', description: '造成雷电伤害', category: 'scroll', basePrice: 80, stackable: true, maxStack: 10 },
    heal_scroll: { id: 'heal_scroll', name: '治疗卷轴', description: '恢复生命值', category: 'scroll', basePrice: 60, stackable: true, maxStack: 10 },
    protect_scroll: { id: 'protect_scroll', name: '防护卷轴', description: '增加防御力', category: 'scroll', basePrice: 70, stackable: true, maxStack: 10 },
    haste_scroll: { id: 'haste_scroll', name: '加速卷轴', description: '增加速度', category: 'scroll', basePrice: 75, stackable: true, maxStack: 10 },
    invisibility_scroll: { id: 'invisibility_scroll', name: '隐身卷轴', description: '隐身一段时间', category: 'scroll', basePrice: 120, stackable: true, maxStack: 5 },
    identify_scroll: { id: 'identify_scroll', name: '鉴定卷轴', description: '鉴定未知物品', category: 'scroll', basePrice: 40, stackable: true, maxStack: 20 },
    map_scroll: { id: 'map_scroll', name: '地图卷轴', description: '显示周围地图', category: 'scroll', basePrice: 50, stackable: true, maxStack: 10 },
    return_scroll: { id: 'return_scroll', name: '回城卷轴', description: '返回基地', category: 'scroll', basePrice: 90, stackable: true, maxStack: 10 },
    blessing_scroll: { id: 'blessing_scroll', name: '祝福卷轴', description: '获得祝福状态', category: 'scroll', basePrice: 110, stackable: true, maxStack: 5 },
    curse_scroll: { id: 'curse_scroll', name: '诅咒卷轴', description: '对敌人施加诅咒', category: 'scroll', basePrice: 95, stackable: true, maxStack: 10 },
    summon_scroll: { id: 'summon_scroll', name: '召唤卷轴', description: '召唤生物助战', category: 'scroll', basePrice: 150, stackable: true, maxStack: 5 },
    portal_scroll: { id: 'portal_scroll', name: '传送门卷轴', description: '开启传送门', category: 'scroll', basePrice: 200, stackable: true, maxStack: 3 },
    // === 材料 ===
    iron_ore: { id: 'iron_ore', name: '铁矿石', description: '可以冶炼成铁', category: 'material', basePrice: 8, stackable: true, maxStack: 999 },
    copper_ore: { id: 'copper_ore', name: '铜矿石', description: '可以冶炼成铜', category: 'material', basePrice: 6, stackable: true, maxStack: 999 },
    silver_ore: { id: 'silver_ore', name: '银矿石', description: '可以冶炼成银', category: 'material', basePrice: 12, stackable: true, maxStack: 999 },
    gold_ore: { id: 'gold_ore', name: '金矿石', description: '可以冶炼成金', category: 'material', basePrice: 20, stackable: true, maxStack: 999 },
    crystal_shard: { id: 'crystal_shard', name: '水晶碎片', description: '制作魔法装备的材料', category: 'material', basePrice: 15, stackable: true, maxStack: 999 },
    dark_crystal: { id: 'dark_crystal', name: '黑暗水晶', description: '蕴含黑暗力量', category: 'material', basePrice: 25, stackable: true, maxStack: 999 },
    light_crystal: { id: 'light_crystal', name: '光明水晶', description: '蕴含光明力量', category: 'material', basePrice: 25, stackable: true, maxStack: 999 },
    ancient_wood: { id: 'ancient_wood', name: '古木', description: '古老的木材', category: 'material', basePrice: 18, stackable: true, maxStack: 999 },
    dragon_scale: { id: 'dragon_scale', name: '龙鳞', description: '龙的鳞片', category: 'material', basePrice: 100, stackable: true, maxStack: 99 },
    phoenix_feather: { id: 'phoenix_feather', name: '凤凰羽毛', description: '凤凰的羽毛', category: 'material', basePrice: 120, stackable: true, maxStack: 99 },
    unicorn_horn: { id: 'unicorn_horn', name: '独角兽角', description: '独角兽的角', category: 'material', basePrice: 150, stackable: true, maxStack: 99 },
    demon_core: { id: 'demon_core', name: '恶魔核心', description: '恶魔的力量核心', category: 'material', basePrice: 80, stackable: true, maxStack: 99 },
    angel_feather: { id: 'angel_feather', name: '天使羽毛', description: '天使的羽毛', category: 'material', basePrice: 90, stackable: true, maxStack: 99 },
    spirit_essence: { id: 'spirit_essence', name: '精灵精华', description: '精灵的力量精华', category: 'material', basePrice: 70, stackable: true, maxStack: 99 },
    void_crystal: { id: 'void_crystal', name: '虚空水晶', description: '蕴含虚空力量', category: 'material', basePrice: 110, stackable: true, maxStack: 99 },
    time_crystal: { id: 'time_crystal', name: '时间水晶', description: '蕴含时间力量', category: 'material', basePrice: 130, stackable: true, maxStack: 99 },
    space_crystal: { id: 'space_crystal', name: '空间水晶', description: '蕴含空间力量', category: 'material', basePrice: 140, stackable: true, maxStack: 99 },
    life_crystal: { id: 'life_crystal', name: '生命水晶', description: '蕴含生命力量', category: 'material', basePrice: 160, stackable: true, maxStack: 99 },
    death_crystal: { id: 'death_crystal', name: '死亡水晶', description: '蕴含死亡力量', category: 'material', basePrice: 170, stackable: true, maxStack: 99 },
    // === 特殊物品 ===
    ancient_compass: { id: 'ancient_compass', name: '古代罗盘', description: '指向隐藏宝藏', category: 'special', basePrice: 200, stackable: false },
    magic_mirror: { id: 'magic_mirror', name: '魔法镜', description: '可以查看过去和未来', category: 'special', basePrice: 300, stackable: false },
    time_hourglass: { id: 'time_hourglass', name: '时间沙漏', description: '可以回溯时间', category: 'special', basePrice: 500, stackable: false },
    soul_gem: { id: 'soul_gem', name: '灵魂宝石', description: '封印灵魂的宝石', category: 'special', basePrice: 400, stackable: false },
    world_tree_seed: { id: 'world_tree_seed', name: '世界树种子', description: '可以种植世界树', category: 'special', basePrice: 600, stackable: false },
    dragon_egg: { id: 'dragon_egg', name: '龙蛋', description: '可以孵化龙', category: 'special', basePrice: 800, stackable: false },
    phoenix_egg: { id: 'phoenix_egg', name: '凤凰蛋', description: '可以孵化凤凰', category: 'special', basePrice: 800, stackable: false },
    unicorn_egg: { id: 'unicorn_egg', name: '独角兽蛋', description: '可以孵化独角兽', category: 'special', basePrice: 700, stackable: false },
    grimoire: { id: 'grimoire', name: '魔导书', description: '记载强大魔法的书', category: 'special', basePrice: 350, stackable: false },
    ancient_tablet: { id: 'ancient_tablet', name: '古代石板', description: '记载古代知识', category: 'special', basePrice: 250, stackable: false },
    mystery_box: { id: 'mystery_box', name: '神秘宝箱', description: '随机开出物品', category: 'special', basePrice: 100, stackable: true, maxStack: 10 },
    lucky_charm: { id: 'lucky_charm', name: '幸运符', description: '增加幸运值', category: 'special', basePrice: 150, stackable: false },
    protection_amulet: { id: 'protection_amulet', name: '保护护符', description: '提供保护', category: 'special', basePrice: 180, stackable: false },
    strength_ring: { id: 'strength_ring', name: '力量戒指', description: '增加力量', category: 'special', basePrice: 120, stackable: false },
    agility_boots: { id: 'agility_boots', name: '敏捷靴', description: '增加敏捷', category: 'special', basePrice: 130, stackable: false },
    intelligence_tome: { id: 'intelligence_tome', name: '智力典籍', description: '增加智力', category: 'special', basePrice: 140, stackable: false },
    health_amulet: { id: 'health_amulet', name: '生命护符', description: '增加生命上限', category: 'special', basePrice: 160, stackable: false },
    mana_pendant: { id: 'mana_pendant', name: '魔力吊坠', description: '增加魔力上限', category: 'special', basePrice: 170, stackable: false },
    stamina_belt: { id: 'stamina_belt', name: '体力腰带', description: '增加体力上限', category: 'special', basePrice: 150, stackable: false },
    // === 食物 ===
    dried_meat: { id: 'dried_meat', name: '肉干', description: '恢复10点饱腹度', category: 'food', basePrice: 5, stackable: true, maxStack: 100 },
    bread: { id: 'bread', name: '面包', description: '恢复15点饱腹度', category: 'food', basePrice: 8, stackable: true, maxStack: 100 },
    cheese: { id: 'cheese', name: '奶酪', description: '恢复20点饱腹度', category: 'food', basePrice: 12, stackable: true, maxStack: 100 },
    apple: { id: 'apple', name: '苹果', description: '恢复8点饱腹度', category: 'food', basePrice: 3, stackable: true, maxStack: 100 },
    cooked_fish: { id: 'cooked_fish', name: '烤鱼', description: '恢复25点饱腹度', category: 'food', basePrice: 15, stackable: true, maxStack: 100 },
    stew: { id: 'stew', name: '炖菜', description: '恢复30点饱腹度', category: 'food', basePrice: 20, stackable: true, maxStack: 100 },
    roasted_meat: { id: 'roasted_meat', name: '烤肉', description: '恢复35点饱腹度', category: 'food', basePrice: 25, stackable: true, maxStack: 100 },
    feast: { id: 'feast', name: '盛宴', description: '恢复50点饱腹度', category: 'food', basePrice: 50, stackable: true, maxStack: 10 },
    soup: { id: 'soup', name: '汤', description: '恢复20点饱腹度和10点生命', category: 'food', basePrice: 18, stackable: true, maxStack: 50 },
    salad: { id: 'salad', name: '沙拉', description: '恢复15点饱腹度和5点生命', category: 'food', basePrice: 10, stackable: true, maxStack: 50 },
    omelette: { id: 'omelette', name: '煎蛋', description: '恢复12点饱腹度', category: 'food', basePrice: 7, stackable: true, maxStack: 100 },
    pancake: { id: 'pancake', name: '煎饼', description: '恢复18点饱腹度', category: 'food', basePrice: 11, stackable: true, maxStack: 100 },
    pie: { id: 'pie', name: '派', description: '恢复22点饱腹度', category: 'food', basePrice: 16, stackable: true, maxStack: 50 },
    cake: { id: 'cake', name: '蛋糕', description: '恢复40点饱腹度', category: 'food', basePrice: 35, stackable: true, maxStack: 20 },
    cookie: { id: 'cookie', name: '饼干', description: '恢复8点饱腹度', category: 'food', basePrice: 4, stackable: true, maxStack: 100 },
    candy: { id: 'candy', name: '糖果', description: '恢复5点饱腹度，增加心情', category: 'food', basePrice: 3, stackable: true, maxStack: 100 },
    chocolate: { id: 'chocolate', name: '巧克力', description: '恢复10点饱腹度，增加心情', category: 'food', basePrice: 6, stackable: true, maxStack: 100 },
    honey: { id: 'honey', name: '蜂蜜', description: '恢复15点饱腹度，治愈效果', category: 'food', basePrice: 10, stackable: true, maxStack: 100 },
    milk: { id: 'milk', name: '牛奶', description: '恢复12点饱腹度，增加防御', category: 'food', basePrice: 8, stackable: true, maxStack: 50 },
    wine: { id: 'wine', name: '葡萄酒', description: '恢复20点饱腹度，增加攻击', category: 'food', basePrice: 25, stackable: true, maxStack: 30 },
    beer: { id: 'beer', name: '啤酒', description: '恢复15点饱腹度，增加体力', category: 'food', basePrice: 12, stackable: true, maxStack: 50 },
    tea: { id: 'tea', name: '茶', description: '恢复10点饱腹度，增加智力', category: 'food', basePrice: 8, stackable: true, maxStack: 100 },
    coffee: { id: 'coffee', name: '咖啡', description: '恢复8点饱腹度，增加速度', category: 'food', basePrice: 7, stackable: true, maxStack: 100 },
    juice: { id: 'juice', name: '果汁', description: '恢复10点饱腹度，恢复魔力', category: 'food', basePrice: 6, stackable: true, maxStack: 100 },
    water_bottle: { id: 'water_bottle', name: '瓶装水', description: '恢复15点水分', category: 'food', basePrice: 5, stackable: true, maxStack: 100 },
    coconut_water: { id: 'coconut_water', name: '椰子水', description: '恢复20点水分', category: 'food', basePrice: 8, stackable: true, maxStack: 50 },
    energy_drink: { id: 'energy_drink', name: '能量饮料', description: '恢复25点体力', category: 'food', basePrice: 15, stackable: true, maxStack: 30 },
    protein_bar: { id: 'protein_bar', name: '蛋白棒', description: '恢复15点体力，增加力量', category: 'food', basePrice: 12, stackable: true, maxStack: 50 },
    vitamin_pill: { id: 'vitamin_pill', name: '维生素片', description: '增加所有属性', category: 'food', basePrice: 20, stackable: true, maxStack: 30 },
    super_food: { id: 'super_food', name: '超级食物', description: '恢复全部状态', category: 'food', basePrice: 100, stackable: true, maxStack: 10 },
    legendary_feast: { id: 'legendary_feast', name: '传说盛宴', description: '恢复全部状态，增加所有属性', category: 'food', basePrice: 300, stackable: true, maxStack: 3 }
};
// ============================================================
// 二、新增怪物（50+）
// ============================================================
export const EXTRA_MONSTERS = {
    // === 低级怪物（Lv.1-5）===
    giant_spider: { id: 'giant_spider', name: '巨型蜘蛛', description: '会吐丝的巨型蜘蛛', level: 2, hp: 40, attack: 12, defense: 5, agility: 25, lootTable: [{ itemId: 'spider_silk', minCount: 1, maxCount: 3, dropChance: 0.7 }, { itemId: 'poison_fang', minCount: 1, maxCount: 1, dropChance: 0.3 }], xpReward: 25 },
    venomous_snake: { id: 'venomous_snake', name: '毒蛇', description: '会喷毒液的蛇', level: 2, hp: 30, attack: 15, defense: 3, agility: 35, lootTable: [{ itemId: 'snake_venom', minCount: 1, maxCount: 2, dropChance: 0.8 }, { itemId: 'snake_skin', minCount: 1, maxCount: 1, dropChance: 0.5 }], xpReward: 20 },
    wild_boar: { id: 'wild_boar', name: '野猪', description: '凶猛的野猪', level: 3, hp: 60, attack: 18, defense: 10, agility: 15, lootTable: [{ itemId: 'boar_tusk', minCount: 1, maxCount: 2, dropChance: 0.6 }, { itemId: 'raw_meat', minCount: 2, maxCount: 4, dropChance: 0.9 }], xpReward: 30 },
    crow: { id: 'crow', name: '乌鸦', description: '会啄人的乌鸦群', level: 1, hp: 15, attack: 8, defense: 2, agility: 40, lootTable: [{ itemId: 'feather', minCount: 1, maxCount: 3, dropChance: 0.8 }], xpReward: 10 },
    slime: { id: 'slime', name: '史莱姆', description: '会分裂的史莱姆', level: 2, hp: 25, attack: 6, defense: 8, agility: 10, lootTable: [{ itemId: 'slime_jelly', minCount: 1, maxCount: 2, dropChance: 0.9 }], xpReward: 15 },
    bat_swarm: { id: 'bat_swarm', name: '蝙蝠群', description: '成群的蝙蝠', level: 1, hp: 20, attack: 10, defense: 2, agility: 45, lootTable: [{ itemId: 'bat_wing', minCount: 1, maxCount: 2, dropChance: 0.7 }], xpReward: 12 },
    skeleton_warrior: { id: 'skeleton_warrior', name: '骷髅战士', description: '拿着剑的骷髅', level: 4, hp: 50, attack: 20, defense: 15, agility: 12, lootTable: [{ itemId: 'bone', minCount: 2, maxCount: 4, dropChance: 0.8 }, { itemId: 'rusty_sword', minCount: 1, maxCount: 1, dropChance: 0.2 }], xpReward: 35 },
    zombie: { id: 'zombie', name: '僵尸', description: '缓慢但坚韧的僵尸', level: 3, hp: 70, attack: 14, defense: 5, agility: 5, lootTable: [{ itemId: 'rotten_flesh', minCount: 1, maxCount: 3, dropChance: 0.9 }, { itemId: 'zombie_brain', minCount: 1, maxCount: 1, dropChance: 0.1 }], xpReward: 25 },
    ghost: { id: 'ghost', name: '幽灵', description: '会穿越墙壁的幽灵', level: 5, hp: 40, attack: 22, defense: 20, agility: 30, lootTable: [{ itemId: 'ectoplasm', minCount: 1, maxCount: 2, dropChance: 0.7 }, { itemId: 'ghost_essence', minCount: 1, maxCount: 1, dropChance: 0.3 }], xpReward: 40 },
    goblin: { id: 'goblin', name: '哥布林', description: '狡猾的哥布林', level: 3, hp: 45, attack: 16, defense: 8, agility: 28, lootTable: [{ itemId: 'goblin_ear', minCount: 1, maxCount: 1, dropChance: 0.6 }, { itemId: 'stolen_gold', minCount: 5, maxCount: 15, dropChance: 0.8 }], xpReward: 28 },
    // === 中级怪物（Lv.6-10）===
    ogre: { id: 'ogre', name: '食人魔', description: '巨大的食人魔', level: 7, hp: 150, attack: 35, defense: 20, agility: 8, lootTable: [{ itemId: 'ogre_bone', minCount: 2, maxCount: 4, dropChance: 0.7 }, { itemId: 'ogre_club', minCount: 1, maxCount: 1, dropChance: 0.2 }], xpReward: 80 },
    troll: { id: 'troll', name: '巨魔', description: '会再生的巨魔', level: 8, hp: 200, attack: 40, defense: 25, agility: 6, lootTable: [{ itemId: 'troll_blood', minCount: 1, maxCount: 3, dropChance: 0.8 }, { itemId: 'troll_hide', minCount: 1, maxCount: 2, dropChance: 0.5 }], xpReward: 100 },
    minotaur: { id: 'minotaur', name: '牛头人', description: '会冲撞的牛头人', level: 8, hp: 180, attack: 45, defense: 30, agility: 12, lootTable: [{ itemId: 'minotaur_horn', minCount: 1, maxCount: 2, dropChance: 0.6 }, { itemId: 'minotaur_axe', minCount: 1, maxCount: 1, dropChance: 0.15 }], xpReward: 95 },
    medusa: { id: 'medusa', name: '美杜莎', description: '会石化凝视的美杜莎', level: 9, hp: 160, attack: 30, defense: 15, agility: 20, lootTable: [{ itemId: 'medusa_scale', minCount: 1, maxCount: 3, dropChance: 0.7 }, { itemId: 'petrified_eye', minCount: 1, maxCount: 1, dropChance: 0.2 }], xpReward: 110 },
    chimera: { id: 'chimera', name: '奇美拉', description: '三头怪物', level: 10, hp: 250, attack: 50, defense: 35, agility: 18, lootTable: [{ itemId: 'chimera_fang', minCount: 1, maxCount: 3, dropChance: 0.6 }, { itemId: 'chimera_wing', minCount: 1, maxCount: 2, dropChance: 0.4 }], xpReward: 130 },
    basilisk: { id: 'basilisk', name: '蛇怪', description: '会石化的蛇怪', level: 9, hp: 170, attack: 38, defense: 22, agility: 15, lootTable: [{ itemId: 'basilisk_scale', minCount: 1, maxCount: 3, dropChance: 0.7 }, { itemId: 'basilisk_eye', minCount: 1, maxCount: 1, dropChance: 0.25 }], xpReward: 105 },
    wyvern: { id: 'wyvern', name: '飞龙', description: '会飞的龙', level: 10, hp: 220, attack: 48, defense: 28, agility: 25, lootTable: [{ itemId: 'wyvern_scale', minCount: 1, maxCount: 3, dropChance: 0.6 }, { itemId: 'wyvern_wing', minCount: 1, maxCount: 2, dropChance: 0.3 }], xpReward: 125 },
    cyclops: { id: 'cyclops', name: '独眼巨人', description: '巨大的独眼巨人', level: 8, hp: 200, attack: 42, defense: 20, agility: 10, lootTable: [{ itemId: 'cyclops_eye', minCount: 1, maxCount: 1, dropChance: 0.5 }, { itemId: 'cyclops_club', minCount: 1, maxCount: 1, dropChance: 0.2 }], xpReward: 90 },
    harpy: { id: 'harpy', name: '鹰身女妖', description: '会飞的鹰身女妖', level: 7, hp: 100, attack: 28, defense: 12, agility: 40, lootTable: [{ itemId: 'harpy_feather', minCount: 1, maxCount: 3, dropChance: 0.8 }, { itemId: 'harpy_claw', minCount: 1, maxCount: 2, dropChance: 0.5 }], xpReward: 75 },
    centaur: { id: 'centaur', name: '半人马', description: '会射箭的半人马', level: 7, hp: 120, attack: 32, defense: 15, agility: 30, lootTable: [{ itemId: 'centaur_arrow', minCount: 3, maxCount: 6, dropChance: 0.8 }, { itemId: 'centaur_bow', minCount: 1, maxCount: 1, dropChance: 0.2 }], xpReward: 70 },
    // === 高级怪物（Lv.11-15）===
    dragon_wyrmling: { id: 'dragon_wyrmling', name: '幼龙', description: '年轻的龙', level: 12, hp: 400, attack: 70, defense: 50, agility: 30, lootTable: [{ itemId: 'dragon_scale', minCount: 2, maxCount: 5, dropChance: 0.7 }, { itemId: 'dragon_tooth', minCount: 1, maxCount: 3, dropChance: 0.5 }], xpReward: 200 },
    elder_lich: { id: 'elder_lich', name: '远古巫妖', description: '强大的巫妖', level: 14, hp: 350, attack: 80, defense: 40, agility: 25, lootTable: [{ itemId: 'lich_phylactery', minCount: 1, maxCount: 1, dropChance: 0.3 }, { itemId: 'dark_crystal', minCount: 3, maxCount: 6, dropChance: 0.8 }], xpReward: 250 },
    vampire_lord: { id: 'vampire_lord', name: '吸血鬼领主', description: '强大的吸血鬼', level: 13, hp: 320, attack: 75, defense: 45, agility: 35, lootTable: [{ itemId: 'vampire_fang', minCount: 1, maxCount: 3, dropChance: 0.7 }, { itemId: 'blood_gem', minCount: 1, maxCount: 2, dropChance: 0.4 }], xpReward: 230 },
    demon_lord: { id: 'demon_lord', name: '恶魔领主', description: '强大的恶魔', level: 15, hp: 500, attack: 90, defense: 55, agility: 30, lootTable: [{ itemId: 'demon_core', minCount: 1, maxCount: 3, dropChance: 0.6 }, { itemId: 'demon_horn', minCount: 1, maxCount: 2, dropChance: 0.4 }], xpReward: 300 },
    angel_guardian: { id: 'angel_guardian', name: '天使守卫', description: '强大的天使', level: 15, hp: 450, attack: 85, defense: 60, agility: 35, lootTable: [{ itemId: 'angel_feather', minCount: 1, maxCount: 3, dropChance: 0.7 }, { itemId: 'holy_light', minCount: 1, maxCount: 2, dropChance: 0.5 }], xpReward: 280 },
    ancient_dragon: { id: 'ancient_dragon', name: '远古巨龙', description: '远古的巨龙', level: 18, hp: 1000, attack: 150, defense: 100, agility: 25, lootTable: [{ itemId: 'dragon_scale', minCount: 5, maxCount: 10, dropChance: 0.9 }, { itemId: 'dragon_heart', minCount: 1, maxCount: 1, dropChance: 0.5 }], xpReward: 500 },
    chaos_god: { id: 'chaos_god', name: '混沌之神', description: '混沌的化身', level: 20, hp: 2000, attack: 200, defense: 150, agility: 40, lootTable: [{ itemId: 'chaos_crystal', minCount: 1, maxCount: 5, dropChance: 1.0 }, { itemId: 'chaos_core', minCount: 1, maxCount: 1, dropChance: 0.8 }], xpReward: 1000 },
    death_knight: { id: 'death_knight', name: '死亡骑士', description: '强大的死亡骑士', level: 14, hp: 380, attack: 82, defense: 48, agility: 28, lootTable: [{ itemId: 'death_knight_sword', minCount: 1, maxCount: 1, dropChance: 0.2 }, { itemId: 'death_crystal', minCount: 1, maxCount: 3, dropChance: 0.6 }], xpReward: 240 },
    shadow_dragon: { id: 'shadow_dragon', name: '暗影龙', description: '暗影中的龙', level: 16, hp: 600, attack: 110, defense: 70, agility: 35, lootTable: [{ itemId: 'shadow_scale', minCount: 2, maxCount: 5, dropChance: 0.8 }, { itemId: 'shadow_essence', minCount: 1, maxCount: 3, dropChance: 0.5 }], xpReward: 350 },
    frost_giant: { id: 'frost_giant', name: '冰霜巨人', description: '冰霜中的巨人', level: 13, hp: 350, attack: 65, defense: 55, agility: 15, lootTable: [{ itemId: 'frost_core', minCount: 1, maxCount: 3, dropChance: 0.7 }, { itemId: 'frost_giant_bone', minCount: 2, maxCount: 4, dropChance: 0.8 }], xpReward: 220 },
    fire_lord: { id: 'fire_lord', name: '火焰领主', description: '火焰的化身', level: 14, hp: 380, attack: 88, defense: 35, agility: 30, lootTable: [{ itemId: 'fire_core', minCount: 1, maxCount: 3, dropChance: 0.8 }, { itemId: 'fire_crystal', minCount: 1, maxCount: 2, dropChance: 0.5 }], xpReward: 250 },
    // === BOSS怪物 ===
    mist_king: { id: 'mist_king', name: '迷雾之王', description: '迷雾的统治者', level: 12, hp: 800, attack: 60, defense: 40, agility: 20, lootTable: [{ itemId: 'mist_core', minCount: 1, maxCount: 1, dropChance: 1.0 }, { itemId: 'mysterious_crystal', minCount: 5, maxCount: 10, dropChance: 1.0 }], xpReward: 300 },
    crystal_emperor: { id: 'crystal_emperor', name: '结晶皇帝', description: '结晶的统治者', level: 15, hp: 1200, attack: 95, defense: 70, agility: 25, lootTable: [{ itemId: 'golden_crystal', minCount: 3, maxCount: 6, dropChance: 1.0 }, { itemId: 'emperor_crown', minCount: 1, maxCount: 1, dropChance: 0.8 }], xpReward: 500 },
    void_lord: { id: 'void_lord', name: '虚空领主', description: '虚空的统治者', level: 18, hp: 1500, attack: 120, defense: 80, agility: 30, lootTable: [{ itemId: 'void_crystal', minCount: 3, maxCount: 6, dropChance: 1.0 }, { itemId: 'void_core', minCount: 1, maxCount: 1, dropChance: 0.9 }], xpReward: 700 },
    time_emperor: { id: 'time_emperor', name: '时间皇帝', description: '时间的统治者', level: 20, hp: 2000, attack: 150, defense: 100, agility: 40, lootTable: [{ itemId: 'time_crystal', minCount: 3, maxCount: 6, dropChance: 1.0 }, { itemId: 'time_core', minCount: 1, maxCount: 1, dropChance: 0.95 }], xpReward: 1000 },
    world_destroyer: { id: 'world_destroyer', name: '世界毁灭者', description: '毁灭世界的怪物', level: 25, hp: 5000, attack: 300, defense: 200, agility: 50, lootTable: [{ itemId: 'world_core', minCount: 1, maxCount: 1, dropChance: 1.0 }, { itemId: 'legendary_crystal', minCount: 5, maxCount: 10, dropChance: 1.0 }], xpReward: 5000 }
};
// ============================================================
// 三、新增场景（50+）
// ============================================================
export const EXTRA_SCENES = {
    // === 序章场景 ===
    awakening_ruins: { id: 'awakening_ruins', text: '你在一片废墟中醒来，周围散落着各种碎片。远处传来奇怪的声音。', choices: [
            { id: 'search_ruins', text: '搜索废墟', effects: [{ kind: 'item', item: 'bandage', amount: 2 }, { kind: 'item', item: 'torch', amount: 1 }], next: 'explore_ruins' },
            { id: 'listen_sounds', text: '仔细听声音', effects: [{ kind: 'flag', flag: 'heard_mysterious_sound' }], next: 'follow_sound' },
            { id: 'find_shelter', text: '寻找庇护所', effects: [{ kind: 'flag', flag: 'found_shelter' }], next: 'find_camp' }
        ] },
    explore_ruins: { id: 'explore_ruins', text: '你小心翼翼地探索废墟，发现了一个旧背包，里面有一些基础物资。', choices: [
            { id: 'take_supplies', text: '拿走物资', effects: [{ kind: 'item', item: 'dried_meat', amount: 3 }, { kind: 'item', item: 'water_bottle', amount: 2 }], next: 'leave_ruins' },
            { id: 'leave_it', text: '离开', effects: [], next: 'leave_ruins' }
        ] },
    follow_sound: { id: 'follow_sound', text: '你跟着声音走去，发现了一个受伤的人倒在路边。', choices: [
            { id: 'help_person', text: '帮助他', effects: [{ kind: 'flag', flag: 'helped_wounded' }, { kind: 'resource', resource: 'health', delta: -10 }], next: 'meet_survivor' },
            { id: 'ignore_person', text: '无视他', effects: [{ kind: 'flag', flag: 'ignored_wounded' }], next: 'continue_journey' },
            { id: 'rob_person', text: '搜刮他', effects: [{ kind: 'flag', flag: 'robbed_wounded' }, { kind: 'item', item: 'bandage', amount: 3 }, { kind: 'item', item: 'dried_meat', amount: 2 }], next: 'continue_journey' }
        ] },
    meet_survivor: { id: 'meet_survivor', text: '你帮助了那个人，他感激地说："谢谢你！我叫老周，是个幸存者。你需要帮助吗？"', choices: [
            { id: 'ask_for_help', text: '请求帮助', effects: [{ kind: 'flag', flag: 'got_old_zhou_help' }], next: 'old_zhou_quest' },
            { id: 'go_alone', text: '独自前进', effects: [], next: 'continue_journey' }
        ] },
    old_zhou_quest: { id: 'old_zhou_quest', text: '老周说："我知道一个安全的地方，跟我来。但路上可能会有危险。"', choices: [
            { id: 'follow_zhou', text: '跟随老周', effects: [{ kind: 'flag', flag: 'following_old_zhou' }], next: 'dangerous_path' },
            { id: 'decline', text: '婉拒', effects: [], next: 'continue_journey' }
        ] },
    dangerous_path: { id: 'dangerous_path', text: '你们走在一条危险的路上，突然听到草丛中有动静。', choices: [
            { id: 'prepare_fight', text: '准备战斗', effects: [{ kind: 'flag', flag: 'prepared_for_fight' }], next: 'encounter_wolves' },
            { id: 'sneak_past', text: '悄悄绕过去', effects: [{ kind: 'roll', difficulty: 60, onFail: 'encounter_wolves', onSuccess: 'safe_passage' }], next: '' }
        ] },
    encounter_wolves: { id: 'encounter_wolves', text: '一群野狗从草丛中冲出来！', choices: [
            { id: 'fight_wolves', text: '战斗', effects: [{ kind: 'combat', monster: 'wild_dog' }], next: 'after_wolf_fight' },
            { id: 'flee_wolves', text: '逃跑', effects: [{ kind: 'roll', difficulty: 50, onFail: 'wolf_bite', onSuccess: 'escape_wolves' }], next: '' }
        ] },
    after_wolf_fight: { id: 'after_wolf_fight', text: '你成功击退了野狗。老周说："干得不错！我们快走吧。"', choices: [
            { id: 'continue_with_zhou', text: '继续前进', effects: [], next: 'reach_safe_zone' }
        ] },
    wolf_bite: { id: 'wolf_bite', text: '一只野狗咬了你一口！', effects: [{ kind: 'resource', resource: 'health', delta: -15 }], choices: [
            { id: 'fight_back', text: '反击', effects: [{ kind: 'combat', monster: 'wild_dog' }], next: 'after_wolf_fight' }
        ] },
    escape_wolves: { id: 'escape_wolves', text: '你成功逃脱了野狗的追击。', choices: [
            { id: 'find_camp', text: '寻找庇护所', effects: [], next: 'find_camp' }
        ] },
    safe_passage: { id: 'safe_passage', text: '你悄悄绕过了危险区域，安全到达了目的地。', choices: [
            { id: 'reach_camp', text: '到达庇护所', effects: [], next: 'reach_safe_zone' }
        ] },
    leave_ruins: { id: 'leave_ruins', text: '你离开了废墟，继续前进。', choices: [
            { id: 'explore_area', text: '探索周围区域', effects: [], next: 'explore_forest' },
            { id: 'find_shelter', text: '寻找庇护所', effects: [], next: 'find_camp' }
        ] },
    continue_journey: { id: 'continue_journey', text: '你继续前进，不知道前方等待着什么。', choices: [
            { id: 'explore_area', text: '探索周围区域', effects: [], next: 'explore_forest' },
            { id: 'find_shelter', text: '寻找庇护所', effects: [], next: 'find_camp' }
        ] },
    find_camp: { id: 'find_camp', text: '你找到了一个可以暂时休息的地方。', choices: [
            { id: 'rest', text: '休息', effects: [{ kind: 'resource', resource: 'health', delta: 10 }, { kind: 'resource', resource: 'sanity', delta: 5 }], next: 'camp_night' },
            { id: 'explore', text: '探索周围', effects: [], next: 'explore_forest' }
        ] },
    camp_night: { id: 'camp_night', text: '夜幕降临，你在营地里休息。远处传来奇怪的声音。', choices: [
            { id: 'sleep', text: '睡觉', effects: [{ kind: 'resource', resource: 'health', delta: 20 }, { kind: 'resource', resource: 'sanity', delta: 10 }], next: 'next_morning' },
            { id: 'stay_awake', text: '保持清醒', effects: [{ kind: 'flag', flag: 'stayed_awake_night' }], next: 'night_event' }
        ] },
    next_morning: { id: 'next_morning', text: '新的一天开始了。你感觉精神焕发。', choices: [
            { id: 'explore_forest', text: '探索森林', effects: [], next: 'explore_forest' },
            { id: 'find_food', text: '寻找食物', effects: [], next: 'find_food' }
        ] },
    night_event: { id: 'night_event', text: '你听到附近有脚步声越来越近...', choices: [
            { id: 'hide', text: '躲起来', effects: [{ kind: 'roll', difficulty: 70, onFail: 'discover_by_enemy', onSuccess: 'enemy_pass_by' }], next: '' },
            { id: 'confront', text: '上前查看', effects: [], next: 'meet_mysterious_person' }
        ] },
    explore_forest: { id: 'explore_forest', text: '你走进了一片迷雾森林，树木茂密，视线受阻。', choices: [
            { id: 'follow_path', text: '沿着小路走', effects: [], next: 'forest_path' },
            { id: 'go_deeper', text: '深入森林', effects: [{ kind: 'flag', flag: 'entered_deep_forest' }], next: 'deep_forest' },
            { id: 'climb_tree', text: '爬上树观察', effects: [{ kind: 'roll', difficulty: 60, onFail: 'fall_from_tree', onSuccess: 'see_overview' }], next: '' }
        ] },
    forest_path: { id: 'forest_path', text: '你沿着小路走，发现了一个废弃的小屋。', choices: [
            { id: 'enter_house', text: '进入小屋', effects: [], next: 'abandoned_house' },
            { id: 'keep_walking', text: '继续走', effects: [], next: 'forest_clearing' }
        ] },
    deep_forest: { id: 'deep_forest', text: '你深入森林，发现了一棵巨大的古树，树干上刻着奇怪的符号。', choices: [
            { id: 'examine_symbols', text: '检查符号', effects: [{ kind: 'flag', flag: 'examined_tree_symbols' }], next: 'tree_secret' },
            { id: 'touch_tree', text: '触摸古树', effects: [{ kind: 'roll', difficulty: 50, onFail: 'tree_curse', onSuccess: 'tree_blessing' }], next: '' }
        ] },
    abandoned_house: { id: 'abandoned_house', text: '你进入小屋，发现里面有一些物资和一本日记。', choices: [
            { id: 'search_house', text: '搜索小屋', effects: [{ kind: 'item', item: 'bandage', amount: 2 }, { kind: 'item', item: 'dried_meat', amount: 3 }], next: 'read_diary' },
            { id: 'read_diary', text: '阅读日记', effects: [{ kind: 'flag', flag: 'read_diary' }], next: 'diary_content' }
        ] },
    diary_content: { id: 'diary_content', text: '日记记载了一个幸存者的故事，提到了一个安全的避难所和一些危险区域。', choices: [
            { id: 'take_diary', text: '带走日记', effects: [{ kind: 'item', item: 'ancient_scroll', amount: 1 }], next: 'leave_house' },
            { id: 'leave_diary', text: '留下日记', effects: [], next: 'leave_house' }
        ] },
    forest_clearing: { id: 'forest_clearing', text: '你来到了一片空地，中间有一个小湖。湖边坐着一个女孩。', choices: [
            { id: 'approach_girl', text: '接近女孩', effects: [], next: 'meet_duoduo' },
            { id: 'observe', text: '观察', effects: [{ kind: 'flag', flag: 'observed_duoduo' }], next: 'observe_duoduo' }
        ] },
    meet_duoduo: { id: 'meet_duoduo', text: '女孩看到你，警惕地站起来。"你是谁？"', choices: [
            { id: 'introduce_friendly', text: '友好介绍', effects: [{ kind: 'flag', flag: 'friendly_to_duoduo' }], next: 'duoduo_trust' },
            { id: 'introduce_neutral', text: '简单介绍', effects: [], next: 'duoduo_neutral' },
            { id: 'ignore_girl', text: '无视她', effects: [{ kind: 'flag', flag: 'ignored_duoduo' }], next: 'leave_clearing' }
        ] },
    duoduo_trust: { id: 'duoduo_trust', text: '女孩放松了警惕。"我叫朵朵。你...你也是一个人吗？"', choices: [
            { id: 'invite_duoduo', text: '邀请她同行', effects: [{ kind: 'flag', flag: 'invited_duoduo' }], next: 'duoduo_joins' },
            { id: 'ask_about_area', text: '询问区域情况', effects: [{ kind: 'flag', flag: 'asked_duoduo_info' }], next: 'duoduo_info' }
        ] },
    duoduo_joins: { id: 'duoduo_joins', text: '朵朵同意和你一起走。"好的，我跟你走。但你要保护我！"', effects: [{ kind: 'flag', flag: 'companion_duoduo' }], choices: [
            { id: 'continue', text: '继续前进', effects: [], next: 'explore_with_duoduo' }
        ] },
    duoduo_info: { id: 'duoduo_info', text: '朵朵说："我知道附近有一个避难所，但路上有怪物。你要去吗？"', choices: [
            { id: 'go_to_shelter', text: '去避难所', effects: [{ kind: 'flag', flag: 'know_shelter_location' }], next: 'go_to_shelter' },
            { id: 'stay_here', text: '留在这里', effects: [], next: 'stay_with_duoduo' }
        ] },
    go_to_shelter: { id: 'go_to_shelter', text: '朵朵带你前往避难所。路上你们聊了很多。', choices: [
            { id: 'reach_shelter', text: '到达避难所', effects: [], next: 'reach_safe_zone' }
        ] },
    meet_mysterious_person: { id: 'meet_mysterious_person', text: '你发现了一个神秘的人影。他穿着黑色斗篷，看不清脸。', choices: [
            { id: 'ask_identity', text: '询问身份', effects: [], next: 'mysterious_identity' },
            { id: 'attack', text: '攻击', effects: [{ kind: 'combat', monster: 'shadow_wolf' }], next: 'after_mysterious_fight' },
            { id: 'flee', text: '逃跑', effects: [{ kind: 'roll', difficulty: 60, onFail: 'caught_by_mysterious', onSuccess: 'escape_mysterious' }], next: '' }
        ] },
    mysterious_identity: { id: 'mysterious_identity', text: '"我是老K。"他摘下斗篷，露出一张饱经风霜的脸。"你看起来需要帮助。"', choices: [
            { id: 'accept_help', text: '接受帮助', effects: [{ kind: 'flag', flag: 'met_old_k' }], next: 'old_k_quest' },
            { id: 'decline_help', text: '婉拒', effects: [], next: 'continue_journey' }
        ] },
    old_k_quest: { id: 'old_k_quest', text: '老K说："我正在收集情报。你愿意帮我吗？我可以教你一些生存技巧。"', choices: [
            { id: 'help_old_k', text: '帮助老K', effects: [{ kind: 'flag', flag: 'helping_old_k' }], next: 'old_k_training' },
            { id: 'decline', text: '婉拒', effects: [], next: 'continue_journey' }
        ] },
    old_k_training: { id: 'old_k_training', text: '老K教你如何在迷雾中生存，如何战斗，如何寻找资源。', effects: [{ kind: 'flag', flag: 'completed_old_k_training' }, { kind: 'resource', resource: 'sanity', delta: 10 }], choices: [
            { id: 'thank_old_k', text: '感谢老K', effects: [], next: 'continue_with_old_k' }
        ] },
    continue_with_old_k: { id: 'continue_with_old_k', text: '老K说："我们继续前进吧。前面可能有更多危险。"', choices: [
            { id: 'explore_together', text: '一起探索', effects: [], next: 'explore_with_old_k' }
        ] },
    tree_secret: { id: 'tree_secret', text: '你发现古树上的符号是一种古老的文字，记载着迷雾的秘密。', choices: [
            { id: 'study_symbols', text: '研究符号', effects: [{ kind: 'flag', flag: 'studied_ancient_symbols' }], next: 'ancient_knowledge' },
            { id: 'leave', text: '离开', effects: [], next: 'leave_forest' }
        ] },
    ancient_knowledge: { id: 'ancient_knowledge', text: '你学会了古老的知识，感觉智慧有所提升。', effects: [{ kind: 'flag', flag: 'learned_ancient_knowledge' }, { kind: 'resource', resource: 'sanity', delta: 15 }], choices: [
            { id: 'continue', text: '继续', effects: [], next: 'leave_forest' }
        ] },
    leave_forest: { id: 'leave_forest', text: '你离开了森林，继续前进。', choices: [
            { id: 'find_camp', text: '寻找庇护所', effects: [], next: 'find_camp' },
            { id: 'keep_exploring', text: '继续探索', effects: [], next: 'explore_ruins' }
        ] },
    reach_safe_zone: { id: 'reach_safe_zone', text: '你到达了一个相对安全的区域。这里有其他幸存者。', choices: [
            { id: 'meet_survivors', text: '与其他幸存者交流', effects: [{ kind: 'flag', flag: 'met_survivors' }], next: 'survivor_camp' },
            { id: 'find_own_place', text: '寻找自己的地方', effects: [], next: 'find_own_camp' }
        ] },
    survivor_camp: { id: 'survivor_camp', text: '你来到了一个幸存者营地。这里有食物、水和基本的庇护所。', choices: [
            { id: 'join_camp', text: '加入营地', effects: [{ kind: 'flag', flag: 'joined_survivor_camp' }], next: 'camp_life' },
            { id: 'trade_with_survivors', text: '与幸存者交易', effects: [], next: 'trade_with_survivors' }
        ] },
    camp_life: { id: 'camp_life', text: '你在营地里安顿下来。每天需要完成一些任务来换取食物和庇护。', choices: [
            { id: 'do_tasks', text: '完成任务', effects: [{ kind: 'item', item: 'dried_meat', amount: 2 }, { kind: 'item', item: 'water_bottle', amount: 1 }], next: 'camp_daily' },
            { id: 'explore_camp', text: '探索营地', effects: [], next: 'explore_camp' }
        ] },
    trade_with_survivors: { id: 'trade_with_survivors', text: '你与营地里的幸存者交易，获得了一些有用的物品。', choices: [
            { id: 'trade_resources', text: '交易资源', effects: [{ kind: 'item', item: 'iron_ore', amount: 5 }], next: 'camp_life' },
            { id: 'trade_equipment', text: '交易装备', effects: [{ kind: 'item', item: 'wooden_sword', amount: 1 }], next: 'camp_life' }
        ] },
    find_food: { id: 'find_food', text: '你决定去寻找食物。附近有一片森林和一条小河。', choices: [
            { id: 'hunt', text: '去打猎', effects: [{ kind: 'roll', difficulty: 60, onFail: 'hunt_fail', onSuccess: 'hunt_success' }], next: '' },
            { id: 'fish', text: '去钓鱼', effects: [{ kind: 'roll', difficulty: 50, onFail: 'fish_fail', onSuccess: 'fish_success' }], next: '' },
            { id: 'forage', text: '采集野果', effects: [{ kind: 'item', item: 'apple', amount: 3 }], next: 'find_food_complete' }
        ] },
    find_food_complete: { id: 'find_food_complete', text: '你找到了一些食物。', choices: [
            { id: 'return_camp', text: '返回营地', effects: [], next: 'camp_night' }
        ] }
};
// ============================================================
// 四、新增事件（30+）
// ============================================================
export const EXTRA_EVENTS = {
    // === 随机事件 ===
    merchant_visit: { id: 'merchant_visit', name: '商人来访', weight: 10, minDay: 1, maxTriggers: 99, text: '一个流浪商人来到了你的营地，他带着各种稀有物品。', description: '一个流浪商人来到了你的营地，他带着各种稀有物品。', choices: [
            { id: 'trade_with_merchant', text: '与商人交易', effects: [{ kind: 'flag', flag: 'traded_with_merchant' }], next: '__return__' },
            { id: 'ignore_merchant', text: '无视商人', effects: [], next: '__return__' }
        ] },
    monster_attack_extra: { id: 'monster_attack_extra', name: '怪物袭击', weight: 8, minDay: 1, maxTriggers: 99, text: '一群怪物袭击了你的营地！', description: '一群怪物袭击了你的营地！', choices: [
            { id: 'defend_camp', text: '保卫营地', effects: [{ kind: 'combat', monster: 'wild_dog' }], next: '__return__' },
            { id: 'flee_camp', text: '逃离营地', effects: [{ kind: 'flag', flag: 'fled_from_attack' }], next: '__return__' }
        ] },
    mysterious_stranger: { id: 'mysterious_stranger', name: '神秘陌生人', weight: 6, minDay: 1, maxTriggers: 99, text: '一个神秘的陌生人出现在你的营地，他似乎知道很多秘密。', description: '一个神秘的陌生人出现在你的营地，他似乎知道很多秘密。', choices: [
            { id: 'talk_to_stranger', text: '与陌生人交谈', effects: [{ kind: 'flag', flag: 'talked_to_stranger' }], next: '__return__' },
            { id: 'attack_stranger', text: '攻击陌生人', effects: [{ kind: 'combat', monster: 'shadow_wolf' }], next: '__return__' }
        ] },
    weather_event_extra: { id: 'weather_event_extra', name: '天气变化', weight: 15, minDay: 1, maxTriggers: 99, text: '天气突然变化，下起了大雨。', description: '天气突然变化，下起了大雨。', choices: [
            { id: 'find_shelter', text: '寻找庇护所', effects: [{ kind: 'flag', flag: 'found_shelter_from_rain' }], next: '__return__' },
            { id: 'endure_rain', text: '忍受雨水', effects: [{ kind: 'resource', resource: 'health', delta: -5 }, { kind: 'resource', resource: 'sanity', delta: -5 }], next: '__return__' }
        ] },
    treasure_hunt_extra: { id: 'treasure_hunt_extra', name: '宝藏狩猎', weight: 5, minDay: 1, maxTriggers: 99, text: '你发现了一张藏宝图，指向附近的宝藏。', description: '你发现了一张藏宝图，指向附近的宝藏。', choices: [
            { id: 'follow_map', text: '跟随地图', effects: [{ kind: 'flag', flag: 'following_treasure_map' }], next: '__return__' },
            { id: 'ignore_map', text: '无视地图', effects: [], next: '__return__' }
        ] },
    survivor_in_need: { id: 'survivor_in_need', name: '幸存者求助', weight: 7, minDay: 1, maxTriggers: 99, text: '一个幸存者向你求助，他说他的朋友被困住了。', description: '一个幸存者向你求助，他说他的朋友被困住了。', choices: [
            { id: 'help_survivor', text: '帮助他', effects: [{ kind: 'flag', flag: 'helped_survivor_in_need' }], next: '__return__' },
            { id: 'ignore_survivor', text: '无视他', effects: [{ kind: 'flag', flag: 'ignored_survivor_in_need' }], next: '__return__' }
        ] },
    festival_event: { id: 'festival_event', name: '节日庆典', weight: 4, minDay: 1, maxTriggers: 99, text: '营地里正在举行节日庆典，大家都很开心。', description: '营地里正在举行节日庆典，大家都很开心。', choices: [
            { id: 'join_festival', text: '参加庆典', effects: [{ kind: 'resource', resource: 'sanity', delta: 20 }, { kind: 'flag', flag: 'joined_festival' }], next: '__return__' },
            { id: 'skip_festival', text: '跳过庆典', effects: [], next: '__return__' }
        ] },
    training_event: { id: 'training_event', name: '训练机会', weight: 6, minDay: 1, maxTriggers: 99, text: '一个经验丰富的幸存者愿意教你战斗技巧。', description: '一个经验丰富的幸存者愿意教你战斗技巧。', choices: [
            { id: 'accept_training', text: '接受训练', effects: [{ kind: 'flag', flag: 'completed_combat_training' }], next: '__return__' },
            { id: 'decline_training', text: '婉拒训练', effects: [], next: '__return__' }
        ] },
    trade_caravan: { id: 'trade_caravan', name: '贸易商队', weight: 5, minDay: 1, maxTriggers: 99, text: '一个贸易商队经过你的营地，他们带着各种商品。', description: '一个贸易商队经过你的营地，他们带着各种商品。', choices: [
            { id: 'trade_with_caravan', text: '与商队交易', effects: [{ kind: 'flag', flag: 'traded_with_caravan' }], next: '__return__' },
            { id: 'ignore_caravan', text: '无视商队', effects: [], next: '__return__' }
        ] },
    mysterious_artifact: { id: 'mysterious_artifact', name: '神秘文物', weight: 3, minDay: 1, maxTriggers: 99, text: '你发现了一个神秘的文物，它散发着奇怪的光芒。', description: '你发现了一个神秘的文物，它散发着奇怪的光芒。', choices: [
            { id: 'examine_artifact', text: '检查文物', effects: [{ kind: 'flag', flag: 'examined_artifact' }], next: '__return__' },
            { id: 'ignore_artifact', text: '无视文物', effects: [], next: '__return__' }
        ] },
    camp_fire_night_extra: { id: 'camp_fire_night_extra', name: '篝火之夜', weight: 8, minDay: 1, maxTriggers: 99, text: '大家围坐在篝火旁，分享彼此的故事。', description: '大家围坐在篝火旁，分享彼此的故事。', choices: [
            { id: 'share_story', text: '分享故事', effects: [{ kind: 'resource', resource: 'sanity', delta: 15 }, { kind: 'flag', flag: 'shared_story' }], next: '__return__' },
            { id: 'listen_story', text: '聆听故事', effects: [{ kind: 'resource', resource: 'sanity', delta: 10 }], next: '__return__' }
        ] },
    illness_outbreak: { id: 'illness_outbreak', name: '疾病爆发', weight: 5, minDay: 1, maxTriggers: 99, text: '营地里爆发了疾病，很多人都病倒了。', description: '营地里爆发了疾病，很多人都病倒了。', choices: [
            { id: 'help_sick', text: '帮助病人', effects: [{ kind: 'flag', flag: 'helped_sick_people' }, { kind: 'resource', resource: 'health', delta: -10 }], next: '__return__' },
            { id: 'avoid_sick', text: '避开病人', effects: [{ kind: 'flag', flag: 'avoided_sick_people' }], next: '__return__' }
        ] },
    raid_event: { id: 'raid_event', name: '掠夺者袭击', weight: 6, minDay: 1, maxTriggers: 99, text: '一群掠夺者袭击了你的营地！', description: '一群掠夺者袭击了你的营地！', choices: [
            { id: 'fight_raid', text: '战斗', effects: [{ kind: 'combat', monster: 'wild_dog' }], next: '__return__' },
            { id: 'negotiate_raid', text: '谈判', effects: [{ kind: 'flag', flag: 'negotiated_with_raiders' }], next: '__return__' }
        ] },
    mysterious_light: { id: 'mysterious_light', name: '神秘光芒', weight: 4, minDay: 1, maxTriggers: 99, text: '你在夜晚看到了一道神秘的光芒，它似乎在引导你。', description: '你在夜晚看到了一道神秘的光芒，它似乎在引导你。', choices: [
            { id: 'follow_light', text: '跟随光芒', effects: [{ kind: 'flag', flag: 'followed_mysterious_light' }], next: '__return__' },
            { id: 'ignore_light', text: '无视光芒', effects: [], next: '__return__' }
        ] },
    ancient_runes: { id: 'ancient_runes', name: '古代符文', weight: 4, minDay: 1, maxTriggers: 99, text: '你发现了一块刻有古代符文的石板。', description: '你发现了一块刻有古代符文的石板。', choices: [
            { id: 'study_runes', text: '研究符文', effects: [{ kind: 'flag', flag: 'studied_ancient_runes' }], next: '__return__' },
            { id: 'ignore_runes', text: '无视符文', effects: [], next: '__return__' }
        ] },
    crystal_cave_extra: { id: 'crystal_cave_extra', name: '水晶洞穴', weight: 3, minDay: 1, maxTriggers: 99, text: '你发现了一个充满水晶的洞穴，它们散发着美丽的光芒。', description: '你发现了一个充满水晶的洞穴，它们散发着美丽的光芒。', choices: [
            { id: 'collect_crystals', text: '收集水晶', effects: [{ kind: 'item', item: 'crystal_shard', amount: 5 }], next: '__return__' },
            { id: 'explore_cave', text: '探索洞穴', effects: [{ kind: 'flag', flag: 'explored_crystal_cave' }], next: '__return__' }
        ] },
    abandoned_mine: { id: 'abandoned_mine', name: '废弃矿坑', weight: 4, minDay: 1, maxTriggers: 99, text: '你发现了一个废弃的矿坑，里面可能有有用的矿石。', description: '你发现了一个废弃的矿坑，里面可能有有用的矿石。', choices: [
            { id: 'enter_mine', text: '进入矿坑', effects: [{ kind: 'flag', flag: 'entered_abandoned_mine' }], next: '__return__' },
            { id: 'ignore_mine', text: '无视矿坑', effects: [], next: '__return__' }
        ] },
    mysterious_sound: { id: 'mysterious_sound', name: '神秘声音', weight: 5, minDay: 1, maxTriggers: 99, text: '你听到了一阵神秘的声音，它似乎在呼唤你。', description: '你听到了一阵神秘的声音，它似乎在呼唤你。', choices: [
            { id: 'investigate_sound', text: '调查声音', effects: [{ kind: 'flag', flag: 'investigated_mysterious_sound' }], next: '__return__' },
            { id: 'ignore_sound', text: '无视声音', effects: [], next: '__return__' }
        ] },
    ancient_battlefield_extra: { id: 'ancient_battlefield_extra', name: '古代战场', weight: 3, minDay: 1, maxTriggers: 99, text: '你发现了一个古代战场，到处都是残骸和遗物。', description: '你发现了一个古代战场，到处都是残骸和遗物。', choices: [
            { id: 'search_battlefield', text: '搜索战场', effects: [{ kind: 'item', item: 'ancient_relic', amount: 1 }], next: '__return__' },
            { id: 'leave_battlefield', text: '离开战场', effects: [], next: '__return__' }
        ] },
    magical_spring: { id: 'magical_spring', name: '魔法泉水', weight: 3, minDay: 1, maxTriggers: 99, text: '你发现了一处魔法泉水，它散发着治愈的光芒。', description: '你发现了一处魔法泉水，它散发着治愈的光芒。', choices: [
            { id: 'drink_water', text: '喝泉水', effects: [{ kind: 'resource', resource: 'health', delta: 30 }, { kind: 'resource', resource: 'sanity', delta: 20 }], next: '__return__' },
            { id: 'collect_water', text: '收集泉水', effects: [{ kind: 'item', item: 'blessed_water', amount: 3 }], next: '__return__' }
        ] },
    mysterious_trader: { id: 'mysterious_trader', name: '神秘商人', weight: 4, minDay: 1, maxTriggers: 99, text: '一个神秘的商人出现了，他愿意用稀有物品交换你的东西。', description: '一个神秘的商人出现了，他愿意用稀有物品交换你的东西。', choices: [
            { id: 'trade_rare', text: '交易稀有物品', effects: [{ kind: 'flag', flag: 'traded_with_mysterious_trader' }], next: '__return__' },
            { id: 'decline_trade', text: '婉拒交易', effects: [], next: '__return__' }
        ] },
    ancient_library: { id: 'ancient_library', name: '古代图书馆', weight: 3, minDay: 1, maxTriggers: 99, text: '你发现了一个古代图书馆，里面充满了书籍和知识。', description: '你发现了一个古代图书馆，里面充满了书籍和知识。', choices: [
            { id: 'read_books', text: '阅读书籍', effects: [{ kind: 'flag', flag: 'read_ancient_books' }, { kind: 'resource', resource: 'sanity', delta: 15 }], next: '__return__' },
            { id: 'search_library', text: '搜索图书馆', effects: [{ kind: 'item', item: 'scroll', amount: 2 }], next: '__return__' }
        ] },
    mysterious_portal: { id: 'mysterious_portal', name: '神秘传送门', weight: 2, minDay: 1, maxTriggers: 99, text: '你发现了一个神秘的传送门，它通向未知的地方。', description: '你发现了一个神秘的传送门，它通向未知的地方。', choices: [
            { id: 'enter_portal', text: '进入传送门', effects: [{ kind: 'flag', flag: 'entered_mysterious_portal' }], next: '__return__' },
            { id: 'ignore_portal', text: '无视传送门', effects: [], next: '__return__' }
        ] },
    ancient_guardian_extra: { id: 'ancient_guardian_extra', name: '古代守卫', weight: 3, minDay: 1, maxTriggers: 99, text: '一个古代守卫出现了，它守护着这片区域。', description: '一个古代守卫出现了，它守护着这片区域。', choices: [
            { id: 'fight_guardian', text: '战斗', effects: [{ kind: 'combat', monster: 'crystal_golem' }], next: '__return__' },
            { id: 'negotiate_guardian', text: '谈判', effects: [{ kind: 'flag', flag: 'negotiated_with_guardian' }], next: '__return__' }
        ] },
    crystal_storm: { id: 'crystal_storm', name: '水晶风暴', weight: 3, minDay: 1, maxTriggers: 99, text: '一场水晶风暴席卷了这片区域，到处都是飞舞的水晶碎片。', description: '一场水晶风暴席卷了这片区域，到处都是飞舞的水晶碎片。', choices: [
            { id: 'seek_shelter', text: '寻找庇护所', effects: [{ kind: 'flag', flag: 'sheltered_from_storm' }], next: '__return__' },
            { id: 'collect_crystals_storm', text: '收集水晶', effects: [{ kind: 'item', item: 'crystal_shard', amount: 10 }, { kind: 'resource', resource: 'health', delta: -15 }], next: '__return__' }
        ] },
    ancient_prophecy: { id: 'ancient_prophecy', name: '古代预言', weight: 2, minDay: 1, maxTriggers: 99, text: '你发现了一块古代石板，上面刻着一个预言。', description: '你发现了一块古代石板，上面刻着一个预言。', choices: [
            { id: 'read_prophecy', text: '阅读预言', effects: [{ kind: 'flag', flag: 'read_ancient_prophecy' }], next: '__return__' },
            { id: 'ignore_prophecy', text: '无视预言', effects: [], next: '__return__' }
        ] },
    mysterious_echo: { id: 'mysterious_echo', name: '神秘回声', weight: 4, minDay: 1, maxTriggers: 99, text: '你听到了一阵神秘的回声，它似乎在告诉你什么。', description: '你听到了一阵神秘的回声，它似乎在告诉你什么。', choices: [
            { id: 'listen_echo', text: '聆听回声', effects: [{ kind: 'flag', flag: 'listened_to_mysterious_echo' }], next: '__return__' },
            { id: 'ignore_echo', text: '无视回声', effects: [], next: '__return__' }
        ] }
};
// ============================================================
// 五、导出函数
// ============================================================
export function getExtraItem(id) {
    return EXTRA_ITEMS[id] ?? null;
}
export function getExtraMonster(id) {
    return EXTRA_MONSTERS[id] ?? null;
}
export function getExtraScene(id) {
    return EXTRA_SCENES[id] ?? null;
}
export function getExtraEvent(id) {
    return EXTRA_EVENTS[id] ?? null;
}
export function getAllExtraItems() {
    return Object.values(EXTRA_ITEMS);
}
export function getAllExtraMonsters() {
    return Object.values(EXTRA_MONSTERS);
}
export function getAllExtraScenes() {
    return Object.values(EXTRA_SCENES);
}
export function getAllExtraEvents() {
    return Object.values(EXTRA_EVENTS);
}
//# sourceMappingURL=extraContent.js.map