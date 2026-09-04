/**
 * 额外内容扩展包
 * 新增物品、怪物、场景、事件
 */
import type { RandomEventDef } from '../types.js';
export declare const EXTRA_ITEMS: {
    wooden_bow: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    iron_bow: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    crystal_bow: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    wooden_staff: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    iron_staff: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    crystal_staff: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    wooden_dagger: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    iron_dagger: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    crystal_dagger: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    wooden_hammer: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    iron_hammer: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    crystal_hammer: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        attack: number;
    };
    wooden_shield: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    iron_shield: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    crystal_shield: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    leather_helmet: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    iron_helmet: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    crystal_helmet: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    leather_boots: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    iron_boots: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    crystal_boots: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    leather_gloves: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    iron_gloves: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    crystal_gloves: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    wooden_ring: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    iron_ring: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    crystal_ring: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    wooden_necklace: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    iron_necklace: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    crystal_necklace: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        defense: number;
    };
    small_health_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    medium_health_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    large_health_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    small_mana_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    medium_mana_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    large_mana_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    small_stamina_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    medium_stamina_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    large_stamina_potion: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    antidote: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    bandage: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    herb_poultice: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    blessed_water: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    phoenix_down: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    ether: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    elixir: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    tent: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    campfire_kit: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    torch: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    lantern: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    rope: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    grapple: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    lockpick: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    bomb: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    smoke_bomb: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    flash_bomb: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    poison_bomb: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    fire_bomb: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    ice_bomb: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    lightning_bomb: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    teleport_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    fire_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    ice_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    lightning_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    heal_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    protect_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    haste_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    invisibility_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    identify_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    map_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    return_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    blessing_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    curse_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    summon_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    portal_scroll: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    iron_ore: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    copper_ore: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    silver_ore: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    gold_ore: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    crystal_shard: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    dark_crystal: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    light_crystal: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    ancient_wood: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    dragon_scale: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    phoenix_feather: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    unicorn_horn: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    demon_core: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    angel_feather: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    spirit_essence: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    void_crystal: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    time_crystal: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    space_crystal: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    life_crystal: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    death_crystal: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    ancient_compass: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    magic_mirror: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    time_hourglass: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    soul_gem: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    world_tree_seed: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    dragon_egg: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    phoenix_egg: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    unicorn_egg: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    grimoire: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    ancient_tablet: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    mystery_box: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    lucky_charm: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    protection_amulet: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    strength_ring: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    agility_boots: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    intelligence_tome: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    health_amulet: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    mana_pendant: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    stamina_belt: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
    };
    dried_meat: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    bread: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    cheese: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    apple: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    cooked_fish: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    stew: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    roasted_meat: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    feast: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    soup: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    salad: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    omelette: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    pancake: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    pie: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    cake: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    cookie: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    candy: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    chocolate: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    honey: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    milk: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    wine: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    beer: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    tea: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    coffee: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    juice: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    water_bottle: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    coconut_water: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    energy_drink: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    protein_bar: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    vitamin_pill: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    super_food: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
    legendary_feast: {
        id: string;
        name: string;
        description: string;
        category: string;
        basePrice: number;
        stackable: boolean;
        maxStack: number;
    };
};
export declare const EXTRA_MONSTERS: {
    giant_spider: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    venomous_snake: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    wild_boar: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    crow: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    slime: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    bat_swarm: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    skeleton_warrior: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    zombie: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    ghost: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    goblin: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    ogre: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    troll: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    minotaur: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    medusa: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    chimera: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    basilisk: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    wyvern: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    cyclops: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    harpy: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    centaur: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    dragon_wyrmling: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    elder_lich: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    vampire_lord: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    demon_lord: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    angel_guardian: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    ancient_dragon: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    chaos_god: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    death_knight: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    shadow_dragon: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    frost_giant: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    fire_lord: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    mist_king: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    crystal_emperor: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    void_lord: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    time_emperor: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
    world_destroyer: {
        id: string;
        name: string;
        description: string;
        level: number;
        hp: number;
        attack: number;
        defense: number;
        agility: number;
        lootTable: {
            itemId: string;
            minCount: number;
            maxCount: number;
            dropChance: number;
        }[];
        xpReward: number;
    };
};
export declare const EXTRA_SCENES: {
    awakening_ruins: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        })[];
    };
    explore_ruins: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        }[];
    };
    follow_sound: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: ({
                kind: string;
                flag: string;
                resource?: undefined;
                delta?: undefined;
            } | {
                kind: string;
                resource: string;
                delta: number;
                flag?: undefined;
            })[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: ({
                kind: string;
                flag: string;
                item?: undefined;
                amount?: undefined;
            } | {
                kind: string;
                item: string;
                amount: number;
                flag?: undefined;
            })[];
            next: string;
        })[];
    };
    meet_survivor: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    old_zhou_quest: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    dangerous_path: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                difficulty: number;
                onFail: string;
                onSuccess: string;
            }[];
            next: string;
        })[];
    };
    encounter_wolves: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                monster: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                difficulty: number;
                onFail: string;
                onSuccess: string;
            }[];
            next: string;
        })[];
    };
    after_wolf_fight: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    wolf_bite: {
        id: string;
        text: string;
        effects: {
            kind: string;
            resource: string;
            delta: number;
        }[];
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                monster: string;
            }[];
            next: string;
        }[];
    };
    escape_wolves: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    safe_passage: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    leave_ruins: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    continue_journey: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    find_camp: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                resource: string;
                delta: number;
            }[];
            next: string;
        }[];
    };
    camp_night: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                resource: string;
                delta: number;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        })[];
    };
    next_morning: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    night_event: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                difficulty: number;
                onFail: string;
                onSuccess: string;
            }[];
            next: string;
        }[];
    };
    explore_forest: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                difficulty: number;
                onFail: string;
                onSuccess: string;
            }[];
            next: string;
        })[];
    };
    forest_path: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    deep_forest: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                difficulty: number;
                onFail: string;
                onSuccess: string;
            }[];
            next: string;
        })[];
    };
    abandoned_house: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        })[];
    };
    diary_content: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        }[];
    };
    forest_clearing: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    meet_duoduo: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    duoduo_trust: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    duoduo_joins: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    duoduo_info: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    go_to_shelter: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    meet_mysterious_person: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                monster: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                difficulty: number;
                onFail: string;
                onSuccess: string;
            }[];
            next: string;
        })[];
    };
    mysterious_identity: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    old_k_quest: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    old_k_training: {
        id: string;
        text: string;
        effects: ({
            kind: string;
            flag: string;
            resource?: undefined;
            delta?: undefined;
        } | {
            kind: string;
            resource: string;
            delta: number;
            flag?: undefined;
        })[];
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    continue_with_old_k: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    tree_secret: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    ancient_knowledge: {
        id: string;
        text: string;
        effects: ({
            kind: string;
            flag: string;
            resource?: undefined;
            delta?: undefined;
        } | {
            kind: string;
            resource: string;
            delta: number;
            flag?: undefined;
        })[];
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    leave_forest: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
    reach_safe_zone: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    survivor_camp: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    camp_life: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        }[];
    };
    trade_with_survivors: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        }[];
    };
    find_food: {
        id: string;
        text: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                difficulty: number;
                onFail: string;
                onSuccess: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        })[];
    };
    find_food_complete: {
        id: string;
        text: string;
        choices: {
            id: string;
            text: string;
            effects: never[];
            next: string;
        }[];
    };
};
export declare const EXTRA_EVENTS: {
    merchant_visit: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    monster_attack_extra: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                monster: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        })[];
    };
    mysterious_stranger: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                monster: string;
            }[];
            next: string;
        })[];
    };
    weather_event_extra: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                resource: string;
                delta: number;
            }[];
            next: string;
        })[];
    };
    treasure_hunt_extra: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    survivor_in_need: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    festival_event: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: ({
                kind: string;
                resource: string;
                delta: number;
                flag?: undefined;
            } | {
                kind: string;
                flag: string;
                resource?: undefined;
                delta?: undefined;
            })[];
            next: string;
        }[];
    };
    training_event: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    trade_caravan: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    mysterious_artifact: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    camp_fire_night_extra: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: ({
                kind: string;
                resource: string;
                delta: number;
                flag?: undefined;
            } | {
                kind: string;
                flag: string;
                resource?: undefined;
                delta?: undefined;
            })[];
            next: string;
        }[];
    };
    illness_outbreak: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: ({
                kind: string;
                flag: string;
                resource?: undefined;
                delta?: undefined;
            } | {
                kind: string;
                resource: string;
                delta: number;
                flag?: undefined;
            })[];
            next: string;
        }[];
    };
    raid_event: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                monster: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        })[];
    };
    mysterious_light: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    ancient_runes: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    crystal_cave_extra: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        })[];
    };
    abandoned_mine: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    mysterious_sound: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    ancient_battlefield_extra: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        }[];
    };
    magical_spring: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                resource: string;
                delta: number;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        })[];
    };
    mysterious_trader: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    ancient_library: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: ({
                kind: string;
                flag: string;
                resource?: undefined;
                delta?: undefined;
            } | {
                kind: string;
                resource: string;
                delta: number;
                flag?: undefined;
            })[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                item: string;
                amount: number;
            }[];
            next: string;
        })[];
    };
    mysterious_portal: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    ancient_guardian_extra: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                monster: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        })[];
    };
    crystal_storm: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: ({
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        } | {
            id: string;
            text: string;
            effects: ({
                kind: string;
                item: string;
                amount: number;
                resource?: undefined;
                delta?: undefined;
            } | {
                kind: string;
                resource: string;
                delta: number;
                item?: undefined;
                amount?: undefined;
            })[];
            next: string;
        })[];
    };
    ancient_prophecy: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
    mysterious_echo: {
        id: string;
        name: string;
        weight: number;
        minDay: number;
        maxTriggers: number;
        text: string;
        description: string;
        choices: {
            id: string;
            text: string;
            effects: {
                kind: string;
                flag: string;
            }[];
            next: string;
        }[];
    };
};
export declare function getExtraItem(id: string): {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
};
export declare function getExtraMonster(id: string): {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
};
export declare function getExtraScene(id: string): {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: ({
            kind: string;
            flag: string;
            resource?: undefined;
            delta?: undefined;
        } | {
            kind: string;
            resource: string;
            delta: number;
            flag?: undefined;
        })[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: ({
            kind: string;
            flag: string;
            item?: undefined;
            amount?: undefined;
        } | {
            kind: string;
            item: string;
            amount: number;
            flag?: undefined;
        })[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    effects: {
        kind: string;
        resource: string;
        delta: number;
    }[];
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            resource: string;
            delta: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            resource: string;
            delta: number;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    effects: {
        kind: string;
        flag: string;
    }[];
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    effects: ({
        kind: string;
        flag: string;
        resource?: undefined;
        delta?: undefined;
    } | {
        kind: string;
        resource: string;
        delta: number;
        flag?: undefined;
    })[];
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    effects: ({
        kind: string;
        flag: string;
        resource?: undefined;
        delta?: undefined;
    } | {
        kind: string;
        resource: string;
        delta: number;
        flag?: undefined;
    })[];
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
};
export declare function getExtraEvent(id: string): {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            resource: string;
            delta: number;
        }[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: ({
            kind: string;
            resource: string;
            delta: number;
            flag?: undefined;
        } | {
            kind: string;
            flag: string;
            resource?: undefined;
            delta?: undefined;
        })[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: ({
            kind: string;
            resource: string;
            delta: number;
            flag?: undefined;
        } | {
            kind: string;
            flag: string;
            resource?: undefined;
            delta?: undefined;
        })[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: ({
            kind: string;
            flag: string;
            resource?: undefined;
            delta?: undefined;
        } | {
            kind: string;
            resource: string;
            delta: number;
            flag?: undefined;
        })[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            resource: string;
            delta: number;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: ({
            kind: string;
            flag: string;
            resource?: undefined;
            delta?: undefined;
        } | {
            kind: string;
            resource: string;
            delta: number;
            flag?: undefined;
        })[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: ({
            kind: string;
            item: string;
            amount: number;
            resource?: undefined;
            delta?: undefined;
        } | {
            kind: string;
            resource: string;
            delta: number;
            item?: undefined;
            amount?: undefined;
        })[];
        next: string;
    })[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    name: string;
    weight: number;
    minDay: number;
    maxTriggers: number;
    text: string;
    description: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
};
export declare function getAllExtraItems(): ({
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    attack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    defense: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
} | {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    stackable: boolean;
    maxStack: number;
})[];
export declare function getAllExtraMonsters(): ({
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
} | {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: {
        itemId: string;
        minCount: number;
        maxCount: number;
        dropChance: number;
    }[];
    xpReward: number;
})[];
export declare function getAllExtraScenes(): ({
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: ({
            kind: string;
            flag: string;
            resource?: undefined;
            delta?: undefined;
        } | {
            kind: string;
            resource: string;
            delta: number;
            flag?: undefined;
        })[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: ({
            kind: string;
            flag: string;
            item?: undefined;
            amount?: undefined;
        } | {
            kind: string;
            item: string;
            amount: number;
            flag?: undefined;
        })[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    effects: {
        kind: string;
        resource: string;
        delta: number;
    }[];
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            resource: string;
            delta: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            resource: string;
            delta: number;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    effects: {
        kind: string;
        flag: string;
    }[];
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            monster: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    effects: ({
        kind: string;
        flag: string;
        resource?: undefined;
        delta?: undefined;
    } | {
        kind: string;
        resource: string;
        delta: number;
        flag?: undefined;
    })[];
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    effects: ({
        kind: string;
        flag: string;
        resource?: undefined;
        delta?: undefined;
    } | {
        kind: string;
        resource: string;
        delta: number;
        flag?: undefined;
    })[];
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            flag: string;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    }[];
} | {
    id: string;
    text: string;
    choices: ({
        id: string;
        text: string;
        effects: {
            kind: string;
            difficulty: number;
            onFail: string;
            onSuccess: string;
        }[];
        next: string;
    } | {
        id: string;
        text: string;
        effects: {
            kind: string;
            item: string;
            amount: number;
        }[];
        next: string;
    })[];
} | {
    id: string;
    text: string;
    choices: {
        id: string;
        text: string;
        effects: never[];
        next: string;
    }[];
})[];
export declare function getAllExtraEvents(): RandomEventDef[];
//# sourceMappingURL=extraContent.d.ts.map