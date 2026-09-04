/**
 * v4.0 扩展内容包 - 大幅增加游戏深度和广度
 * 目标：增加APK体积，提供更丰富的游戏体验
 */

import type { RandomEventDef } from '../types.js';

// ============================================================
// 一、新增随机事件（event choices next 必须为 __return__ 或结局 id）
// ============================================================

export const NEW_RANDOM_EVENTS: RandomEventDef[] = [
  {
    id: 'evt_sudden_fog',
    weight: 8,
    minDay: 1,
    maxTriggers: 99,
    text: '突然，浓雾从四面八方涌来，能见度急剧下降。',
    choices: [
      { id: 'wait_it_out', text: '等待雾散', effects: [{ kind: 'resource', resource: 'sanity', delta: -2 }], next: '__return__' },
      { id: 'navigate_carefully', text: '小心前进', effects: [{ kind: 'flag', flag: 'navigated_through_fog' }], next: '__return__' },
      { id: 'find_shelter', text: '寻找掩体', effects: [{ kind: 'flag', flag: 'found_fog_shelter' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_acid_rain',
    weight: 5,
    minDay: 10,
    maxTriggers: 99,
    text: '天空中开始下起酸雨，皮肤接触到雨水的地方感到刺痛。',
    choices: [
      { id: 'cover_up', text: '遮盖身体', effects: [{ kind: 'resource', resource: 'health', delta: -5 }], next: '__return__' },
      { id: 'find_cover', text: '寻找遮蔽', effects: [{ kind: 'flag', flag: 'found_acid_rain_cover' }], next: '__return__' },
      { id: 'collect_acid', text: '收集酸雨', effects: [{ kind: 'item', item: 'acid_rain_sample', amount: 1 }], next: '__return__' },
    ],
  },
  {
    id: 'evt_wild_dog_pack',
    weight: 7,
    minDay: 5,
    maxTriggers: 99,
    text: '一群野狗从灌木丛中冲出，围着你狂吠。',
    choices: [
      { id: 'fight_dogs', text: '与野狗搏斗', effects: [{ kind: 'resource', resource: 'health', delta: -10 }, { kind: 'flag', flag: 'fought_wild_dogs' }], next: '__return__' },
      { id: 'throw_food', text: '扔食物引开', effects: [{ kind: 'item', item: 'dried_meat', amount: -2 }], next: '__return__' },
      { id: 'climb_tree', text: '爬树躲避', effects: [{ kind: 'flag', flag: 'escaped_dogs_climbing' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_giant_spider',
    weight: 4,
    minDay: 15,
    maxTriggers: 99,
    text: '一只巨大的蜘蛛从天花板上垂下来，挡住了你的去路。',
    choices: [
      { id: 'attack_spider', text: '攻击蜘蛛', effects: [{ kind: 'resource', resource: 'health', delta: -15 }, { kind: 'flag', flag: 'killed_giant_spider' }], next: '__return__' },
      { id: 'sneak_past', text: '悄悄溜过', effects: [{ kind: 'flag', flag: 'sneaked_past_spider' }], next: '__return__' },
      { id: 'use_fire', text: '用火攻击', effects: [{ kind: 'item', item: 'torch', amount: -1 }, { kind: 'flag', flag: 'burned_giant_spider' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_hidden_cache',
    weight: 6,
    minDay: 3,
    maxTriggers: 99,
    text: '你发现了一个隐藏的物资cache，里面有一些有用的东西。',
    choices: [
      { id: 'take_all', text: '全部拿走', effects: [{ kind: 'item', item: 'canned_food', amount: 3 }, { kind: 'item', item: 'water_bottle', amount: 2 }], next: '__return__' },
      { id: 'take_some', text: '只拿需要的', effects: [{ kind: 'item', item: 'canned_food', amount: 1 }, { kind: 'item', item: 'water_bottle', amount: 1 }], next: '__return__' },
      { id: 'mark_location', text: '标记位置', effects: [{ kind: 'flag', flag: 'marked_cache_location' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_abandoned_vehicle',
    weight: 5,
    minDay: 7,
    maxTriggers: 99,
    text: '你发现了一辆被遗弃的汽车，车门半开着。',
    choices: [
      { id: 'search_car', text: '搜寻车辆', effects: [{ kind: 'flag', flag: 'searched_abandoned_car' }], next: '__return__' },
      { id: 'hotwire', text: '尝试启动', effects: [{ kind: 'flag', flag: 'tried_hotwire_car' }], next: '__return__' },
      { id: 'take_parts', text: '拆卸零件', effects: [{ kind: 'item', item: 'scrap_metal', amount: 3 }], next: '__return__' },
    ],
  },
  {
    id: 'evt_wandering_trader',
    weight: 6,
    minDay: 2,
    maxTriggers: 99,
    text: '一个背着大包的商人从远处走来，似乎愿意交易。',
    choices: [
      { id: 'trade_food', text: '用食物交易', effects: [{ kind: 'item', item: 'canned_food', amount: -3 }, { kind: 'item', item: 'rare_herb', amount: 2 }], next: '__return__' },
      { id: 'trade_info', text: '用信息交易', effects: [{ kind: 'flag', flag: 'traded_info_with_merchant' }], next: '__return__' },
      { id: 'decline_trade', text: '拒绝交易', effects: [], next: '__return__' },
    ],
  },
  {
    id: 'evt_lost_child',
    weight: 3,
    minDay: 5,
    maxTriggers: 99,
    text: '你听到一个孩子的哭声。循声找去，发现一个迷路的孩子。',
    choices: [
      { id: 'help_child', text: '帮助孩子', effects: [{ kind: 'flag', flag: 'helped_lost_child' }], next: '__return__' },
      { id: 'give_food', text: '给孩子食物', effects: [{ kind: 'item', item: 'canned_food', amount: -2 }, { kind: 'flag', flag: 'fed_lost_child' }], next: '__return__' },
      { id: 'ignore_child', text: '假装没看见', effects: [{ kind: 'flag', flag: 'ignored_lost_child' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_glowing_runes',
    weight: 5,
    minDay: 10,
    maxTriggers: 99,
    text: '地面上出现了发光的符文，组成了一个神秘的图案。',
    choices: [
      { id: 'study_pattern', text: '研究图案', effects: [{ kind: 'flag', flag: 'studied_glowing_runes' }], next: '__return__' },
      { id: 'touch_rune', text: '触摸符文', effects: [{ kind: 'flag', flag: 'touched_glowing_rune' }], next: '__return__' },
      { id: 'avoid_runes', text: '避开', effects: [], next: '__return__' },
    ],
  },
  {
    id: 'evt_time_anomaly',
    weight: 2,
    minDay: 20,
    maxTriggers: 99,
    text: '你感到时间似乎停滞了。周围的一切都变得异常缓慢。',
    choices: [
      { id: 'embrace', text: '拥抱这种感觉', effects: [{ kind: 'flag', flag: 'experienced_time_anomaly' }], next: '__return__' },
      { id: 'resist', text: '抵抗异常', effects: [{ kind: 'resource', resource: 'sanity', delta: -8 }], next: '__return__' },
      { id: 'observe_time', text: '观察变化', effects: [{ kind: 'flag', flag: 'observed_time_anomaly' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_earthquake',
    weight: 3,
    minDay: 15,
    maxTriggers: 99,
    text: '地面开始剧烈震动，建筑物摇摇欲坠。',
    choices: [
      { id: 'take_cover', text: '寻找掩护', effects: [{ kind: 'resource', resource: 'health', delta: -10 }, { kind: 'flag', flag: 'survived_earthquake' }], next: '__return__' },
      { id: 'evacuate', text: '紧急撤离', effects: [{ kind: 'flag', flag: 'evacuated_earthquake' }], next: '__return__' },
      { id: 'brace', text: '稳住身体', effects: [{ kind: 'resource', resource: 'health', delta: -15 }, { kind: 'flag', flag: 'braced_earthquake' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_flash_flood',
    weight: 3,
    minDay: 20,
    maxTriggers: 99,
    text: '洪水突然从上游涌来，水位迅速上涨。',
    choices: [
      { id: 'climb_high', text: '爬到高处', effects: [{ kind: 'flag', flag: 'climbed_high_flood' }], next: '__return__' },
      { id: 'swim', text: '游泳逃生', effects: [{ kind: 'resource', resource: 'health', delta: -10 }, { kind: 'flag', flag: 'swam_flood_escape' }], next: '__return__' },
      { id: 'grab_floating', text: '抓住漂浮物', effects: [{ kind: 'flag', flag: 'grabbed_flood_float' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_nightmare',
    weight: 6,
    minDay: 1,
    maxTriggers: 99,
    text: '你做了一个可怕的噩梦，醒来时浑身冷汗。',
    choices: [
      { id: 'shake_off', text: '努力清醒', effects: [{ kind: 'resource', resource: 'sanity', delta: -3 }], next: '__return__' },
      { id: 'journal', text: '记录梦境', effects: [{ kind: 'flag', flag: 'recorded_nightmare' }], next: '__return__' },
      { id: 'meditate', text: '冥想平复', effects: [{ kind: 'flag', flag: 'meditated_nightmare' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_paranoia',
    weight: 5,
    minDay: 10,
    maxTriggers: 99,
    text: '你总觉得有人在监视你，这种感觉越来越强烈。',
    choices: [
      { id: 'check_surroundings', text: '仔细检查周围', effects: [{ kind: 'flag', flag: 'checked_surroundings_paranoia' }], next: '__return__' },
      { id: 'confront_paranoia', text: '大声质问', effects: [{ kind: 'flag', flag: 'confronted_paranoia' }], next: '__return__' },
      { id: 'ignore_paranoia', text: '忽略感觉', effects: [{ kind: 'flag', flag: 'ignored_paranoia' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_crafting_breakthrough',
    weight: 4,
    minDay: 5,
    maxTriggers: 99,
    text: '你在尝试制作时突然有了新的灵感。',
    choices: [
      { id: 'experiment', text: '实验新想法', effects: [{ kind: 'flag', flag: 'crafting_breakthrough' }], next: '__return__' },
      { id: 'improve_recipe', text: '改进配方', effects: [{ kind: 'item', item: 'improved_tool', amount: 1 }], next: '__return__' },
      { id: 'share_knowledge', text: '分享知识', effects: [{ kind: 'flag', flag: 'shared_crafting_knowledge' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_combat_instinct',
    weight: 4,
    minDay: 3,
    maxTriggers: 99,
    text: '在危机时刻，你的战斗本能觉醒了。',
    choices: [
      { id: 'train_combat', text: '立即训练', effects: [{ kind: 'flag', flag: 'trained_combat_instinct' }], next: '__return__' },
      { id: 'spar_combat', text: '寻找对手切磋', effects: [{ kind: 'flag', flag: 'sparring_session' }], next: '__return__' },
      { id: 'meditate_combat', text: '冥想战斗', effects: [{ kind: 'flag', flag: 'meditated_on_combat' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_polluted_water',
    weight: 5,
    minDay: 5,
    maxTriggers: 99,
    text: '你发现了一处水源，但水看起来被污染了。',
    choices: [
      { id: 'drink_anyway', text: '不管了喝吧', effects: [{ kind: 'resource', resource: 'health', delta: -10 }], next: '__return__' },
      { id: 'purify', text: '尝试净化', effects: [{ kind: 'flag', flag: 'purified_water_source' }], next: '__return__' },
      { id: 'skip_water', text: '继续寻找', effects: [{ kind: 'flag', flag: 'skipped_polluted_water' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_strange_plant',
    weight: 4,
    minDay: 8,
    maxTriggers: 99,
    text: '你发现了一株从未见过的植物，它散发着微弱的光芒。',
    choices: [
      { id: 'harvest_plant', text: '采集植物', effects: [{ kind: 'item', item: 'glowing_plant', amount: 1 }], next: '__return__' },
      { id: 'study_plant', text: '研究植物', effects: [{ kind: 'flag', flag: 'studied_glowing_plant' }], next: '__return__' },
      { id: 'leave_plant', text: '不打扰它', effects: [{ kind: 'flag', flag: 'left_glowing_plant_alone' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_old_photograph',
    weight: 5, minDay: 3, maxTriggers: 99,
    text: '你在废墟中发现了一张泛黄的老照片，照片上是一个幸福的家庭。',
    choices: [
      { id: 'keep_photo', text: '保留照片', effects: [{ kind: 'flag', flag: 'kept_old_photograph' }], next: '__return__' },
      { id: 'leave_photo', text: '放回原处', effects: [{ kind: 'flag', flag: 'left_old_photograph' }], next: '__return__' },
      { id: 'burn_photo', text: '烧掉照片', effects: [{ kind: 'flag', flag: 'burned_old_photograph' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_distant_light',
    weight: 4, minDay: 5, maxTriggers: 99,
    text: '你看到远处有微弱的灯光闪烁。',
    choices: [
      { id: 'investigate_light', text: '前往调查', effects: [{ kind: 'flag', flag: 'investigated_distant_light' }], next: '__return__' },
      { id: 'ignore_light', text: '忽略灯光', effects: [{ kind: 'flag', flag: 'ignored_distant_light' }], next: '__return__' },
      { id: 'signal_light', text: '用灯光回应', effects: [{ kind: 'flag', flag: 'signaled_distant_light' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_mysterious_sound',
    weight: 5, minDay: 2, maxTriggers: 99,
    text: '你听到了一种奇怪的音乐声，像是从四面八方传来的。',
    choices: [
      { id: 'follow_sound', text: '跟随音乐', effects: [{ kind: 'flag', flag: 'followed_mysterious_sound' }], next: '__return__' },
      { id: 'cover_ears', text: '捂住耳朵', effects: [{ kind: 'flag', flag: 'covered_mysterious_sound' }], next: '__return__' },
      { id: 'record_sound', text: '记录声音', effects: [{ kind: 'flag', flag: 'recorded_mysterious_sound' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_mirage',
    weight: 3, minDay: 10, maxTriggers: 99,
    text: '你看到了远处有一座城市，但走近后发现什么都没有。',
    choices: [
      { id: 'chase_mirage', text: '追逐海市蜃楼', effects: [{ kind: 'resource', resource: 'energy', delta: -5 }, { kind: 'flag', flag: 'chased_mirage' }], next: '__return__' },
      { id: 'ignore_mirage', text: '不去理会', effects: [{ kind: 'flag', flag: 'ignored_mirage' }], next: '__return__' },
      { id: 'study_mirage', text: '研究现象', effects: [{ kind: 'flag', flag: 'studied_mirage' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_time_capsule',
    weight: 2, minDay: 15, maxTriggers: 99,
    text: '你发现了一个时间胶囊，里面装着一些旧时代的物品。',
    choices: [
      { id: 'open_capsule', text: '打开胶囊', effects: [{ kind: 'flag', flag: 'opened_time_capsule' }, { kind: 'item', item: 'canned_food', amount: 2 }], next: '__return__' },
      { id: 'bury_capsule', text: '重新埋好', effects: [{ kind: 'flag', flag: 'buried_time_capsule' }], next: '__return__' },
      { id: 'take_capsule', text: '带走胶囊', effects: [{ kind: 'flag', flag: 'took_time_capsule' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_spirit_visit',
    weight: 2, minDay: 20, maxTriggers: 99,
    text: '深夜，你感觉到有人站在你的床边。睁开眼却什么也看不到。',
    choices: [
      { id: 'talk_spirit', text: '与灵体交谈', effects: [{ kind: 'flag', flag: 'talked_to_spirit' }], next: '__return__' },
      { id: 'banish_spirit', text: '驱逐灵体', effects: [{ kind: 'flag', flag: 'banished_spirit' }], next: '__return__' },
      { id: 'flee_spirit', text: '逃离现场', effects: [{ kind: 'flag', flag: 'fled_from_spirit' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_forgotten_memory',
    weight: 4, minDay: 8, maxTriggers: 99,
    text: '你突然回忆起了一段被遗忘的记忆。',
    choices: [
      { id: 'embrace_memory', text: '拥抱记忆', effects: [{ kind: 'flag', flag: 'embraced_forgotten_memory' }], next: '__return__' },
      { id: 'suppress_memory', text: '压制记忆', effects: [{ kind: 'flag', flag: 'suppressed_forgotten_memory' }], next: '__return__' },
      { id: 'journal_memory', text: '记录记忆', effects: [{ kind: 'flag', flag: 'journaled_forgotten_memory' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_coincidence',
    weight: 5, minDay: 3, maxTriggers: 99,
    text: '你遇到了一连串不可思议的巧合事件。',
    choices: [
      { id: 'believe_fate', text: '相信命运', effects: [{ kind: 'flag', flag: 'believed_in_fate' }], next: '__return__' },
      { id: 'dismiss_coincidence', text: '认为是巧合', effects: [{ kind: 'flag', flag: 'dismissed_coincidence' }], next: '__return__' },
      { id: 'investigate_coincidence', text: '调查原因', effects: [{ kind: 'flag', flag: 'investigated_coincidence' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_whisper_warning',
    weight: 3, minDay: 12, maxTriggers: 99,
    text: '你听到了低语声在耳边响起，似乎在警告你什么。',
    choices: [
      { id: 'listen_whisper', text: '仔细倾听', effects: [{ kind: 'flag', flag: 'listened_to_whisper' }], next: '__return__' },
      { id: 'ignore_whisper', text: '忽略低语', effects: [{ kind: 'flag', flag: 'ignored_whisper' }], next: '__return__' },
      { id: 'respond_whisper', text: '回应低语', effects: [{ kind: 'flag', flag: 'responded_to_whisper' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_shadow_figure',
    weight: 3, minDay: 15, maxTriggers: 99,
    text: '你看到一个黑影在角落里移动，但当你转头时却消失了。',
    choices: [
      { id: 'chase_shadow', text: '追逐黑影', effects: [{ kind: 'flag', flag: 'chased_shadow_figure' }], next: '__return__' },
      { id: 'observe_shadow', text: '静静观察', effects: [{ kind: 'flag', flag: 'observed_shadow_figure' }], next: '__return__' },
      { id: 'ignore_shadow', text: '假装没看到', effects: [{ kind: 'flag', flag: 'ignored_shadow_figure' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_echo_footsteps',
    weight: 4, minDay: 5, maxTriggers: 99,
    text: '你听到了自己的脚步声在回荡，但似乎有什么东西在模仿你。',
    choices: [
      { id: 'stop_walking', text: '停下脚步', effects: [{ kind: 'flag', flag: 'stopped_echo_footsteps' }], next: '__return__' },
      { id: 'run_from_echo', text: '加速奔跑', effects: [{ kind: 'flag', flag: 'ran_from_echo' }], next: '__return__' },
      { id: 'call_out', text: '大声呼喊', effects: [{ kind: 'flag', flag: 'called_out_echo' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_mysterious_map',
    weight: 2, minDay: 10, maxTriggers: 99,
    text: '你发现了一张神秘的地图，上面标记着一个未知的位置。',
    choices: [
      { id: 'follow_map', text: '按照地图前进', effects: [{ kind: 'flag', flag: 'followed_mysterious_map' }], next: '__return__' },
      { id: 'study_map', text: '研究地图', effects: [{ kind: 'flag', flag: 'studied_mysterious_map' }], next: '__return__' },
      { id: 'hide_map', text: '隐藏地图', effects: [{ kind: 'flag', flag: 'hid_mysterious_map' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_night_vision',
    weight: 3, minDay: 8, maxTriggers: 99,
    text: '你发现自己突然能在黑暗中看清东西了。',
    choices: [
      { id: 'test_vision', text: '测试夜视能力', effects: [{ kind: 'flag', flag: 'tested_night_vision' }], next: '__return__' },
      { id: 'use_vision', text: '利用夜视探索', effects: [{ kind: 'flag', flag: 'used_night_vision' }], next: '__return__' },
      { id: 'fear_vision', text: '对这种变化感到恐惧', effects: [{ kind: 'flag', flag: 'feared_night_vision' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_food_poisoning',
    weight: 4, minDay: 5, maxTriggers: 99,
    text: '你吃了不干净的食物，开始感到不适。',
    choices: [
      { id: 'treat_self', text: '自我治疗', effects: [{ kind: 'resource', resource: 'health', delta: -8 }], next: '__return__' },
      { id: 'find_medicine', text: '寻找药物', effects: [{ kind: 'flag', flag: 'found_food_poisoning_medicine' }], next: '__return__' },
      { id: 'endure', text: '忍受不适', effects: [{ kind: 'resource', resource: 'health', delta: -12 }, { kind: 'flag', flag: 'endured_food_poisoning' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_equipment_break',
    weight: 4, minDay: 8, maxTriggers: 99,
    text: '你的装备突然损坏了。',
    choices: [
      { id: 'repair_equipment', text: '修理装备', effects: [{ kind: 'flag', flag: 'repaired_broken_equipment' }], next: '__return__' },
      { id: 'improvise', text: '临时凑合', effects: [{ kind: 'flag', flag: 'improvised_without_equipment' }], next: '__return__' },
      { id: 'find_replacement', text: '寻找替代品', effects: [{ kind: 'flag', flag: 'found_equipment_replacement' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_unexpected_ally',
    weight: 2, minDay: 10, maxTriggers: 99,
    text: '一个意想不到的人出现在你面前，提出帮助。',
    choices: [
      { id: 'accept_help', text: '接受帮助', effects: [{ kind: 'flag', flag: 'accepted_unexpected_ally' }], next: '__return__' },
      { id: 'decline_help', text: '婉拒帮助', effects: [{ kind: 'flag', flag: 'declined_unexpected_ally' }], next: '__return__' },
      { id: 'test_ally', text: '测试对方意图', effects: [{ kind: 'flag', flag: 'tested_unexpected_ally' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_deja_vu',
    weight: 5, minDay: 3, maxTriggers: 99,
    text: '你有一种强烈的既视感，似乎经历过完全相同的事情。',
    choices: [
      { id: 'explore_deja_vu', text: '探索这种感觉', effects: [{ kind: 'flag', flag: 'explored_deja_vu' }], next: '__return__' },
      { id: 'ignore_deja_vu', text: '忽略感觉', effects: [{ kind: 'flag', flag: 'ignored_deja_vu' }], next: '__return__' },
      { id: 'document_deja_vu', text: '记录下来', effects: [{ kind: 'flag', flag: 'documented_deja_vu' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_treasure_hunt',
    weight: 2, minDay: 15, maxTriggers: 99,
    text: '你发现了一些线索，指向一个隐藏的宝藏。',
    choices: [
      { id: 'hunt_treasure', text: '追寻宝藏', effects: [{ kind: 'flag', flag: 'hunted_treasure' }], next: '__return__' },
      { id: 'ignore_treasure', text: '忽略线索', effects: [{ kind: 'flag', flag: 'ignored_treasure_hunt' }], next: '__return__' },
      { id: 'share_treasure', text: '分享信息', effects: [{ kind: 'flag', flag: 'shared_treasure_info' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_hidden_passage',
    weight: 3, minDay: 10, maxTriggers: 99,
    text: '你发现了一个隐藏的通道。',
    choices: [
      { id: 'explore_passage', text: '探索通道', effects: [{ kind: 'flag', flag: 'explored_hidden_passage' }], next: '__return__' },
      { id: 'mark_passage', text: '标记位置', effects: [{ kind: 'flag', flag: 'marked_hidden_passage' }], next: '__return__' },
      { id: 'seal_passage', text: '封住通道', effects: [{ kind: 'flag', flag: 'sealed_hidden_passage' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_ancient_artifact',
    weight: 1, minDay: 25, maxTriggers: 99,
    text: '你发现了一件古代遗物，散发着神秘的光芒。',
    choices: [
      { id: 'take_artifact', text: '带走遗物', effects: [{ kind: 'flag', flag: 'took_ancient_artifact' }], next: '__return__' },
      { id: 'study_artifact', text: '研究遗物', effects: [{ kind: 'flag', flag: 'studied_ancient_artifact' }], next: '__return__' },
      { id: 'leave_artifact', text: '留下遗物', effects: [{ kind: 'flag', flag: 'left_ancient_artifact' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_time_loop',
    weight: 1, minDay: 30, maxTriggers: 99,
    text: '你感觉时间似乎在重复。',
    choices: [
      { id: 'break_loop', text: '尝试打破循环', effects: [{ kind: 'flag', flag: 'attempted_break_time_loop' }], next: '__return__' },
      { id: 'observe_loop', text: '观察循环', effects: [{ kind: 'flag', flag: 'observed_time_loop' }], next: '__return__' },
      { id: 'exploit_loop', text: '利用循环', effects: [{ kind: 'flag', flag: 'exploited_time_loop' }], next: '__return__' },
    ],
  },
  {
    id: 'evt_nightmare_creature',
    weight: 2, minDay: 20, maxTriggers: 99,
    text: '你看到了一个只存在于噩梦中的生物。',
    choices: [
      { id: 'face_creature', text: '面对生物', effects: [{ kind: 'flag', flag: 'faced_nightmare_creature' }], next: '__return__' },
      { id: 'run_creature', text: '逃跑', effects: [{ kind: 'flag', flag: 'ran_from_nightmare_creature' }], next: '__return__' },
      { id: 'communicate_creature', text: '尝试沟通', effects: [{ kind: 'flag', flag: 'communicated_with_creature' }], next: '__return__' },
    ],
  },
];
