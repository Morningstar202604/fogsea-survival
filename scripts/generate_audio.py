#!/usr/bin/env python3
"""
Generate sound effect placeholder files for fogsea-survival
"""

import os

# BGM definitions
bgm_tracks = {
    "main_theme": {"name": "主菜单音乐", "duration": "3:45", "mood": "epic"},
    "forest_explore": {"name": "森林探索", "duration": "4:20", "mood": "mysterious"},
    "ruins_explore": {"name": "废墟探索", "duration": "3:55", "mood": "tense"},
    "cave_explore": {"name": "洞穴探索", "duration": "4:10", "mood": "dark"},
    "combat_normal": {"name": "普通战斗", "duration": "2:30", "mood": "intense"},
    "combat_boss": {"name": "BOSS战斗", "duration": "3:15", "mood": "epic"},
    "peaceful": {"name": "和平时光", "duration": "5:00", "mood": "calm"},
    "danger": {"name": "危险临近", "duration": "2:45", "mood": "suspense"},
    "sad": {"name": "悲伤时刻", "duration": "4:30", "mood": "sad"},
    "victory": {"name": "胜利音乐", "duration": "2:00", "mood": "triumphant"},
    "defeat": {"name": "失败音乐", "duration": "3:00", "mood": "melancholy"},
    "night": {"name": "夜晚氛围", "duration": "6:00", "mood": "eerie"},
    "rain": {"name": "雨天氛围", "duration": "5:30", "mood": "peaceful"},
    "storm": {"name": "暴风雨", "duration": "4:45", "mood": "intense"},
    "mysterious": {"name": "神秘事件", "duration": "3:30", "mood": "mysterious"},
    "exploration": {"name": "探索音乐", "duration": "4:00", "mood": "adventure"},
    "base": {"name": "基地音乐", "duration": "5:15", "mood": "safe"},
    "trade": {"name": "交易音乐", "duration": "3:45", "mood": "neutral"},
    "quest_complete": {"name": "任务完成", "duration": "1:30", "mood": "triumphant"},
    "level_up": {"name": "升级音乐", "duration": "1:45", "mood": "celebration"}
}

# Sound effects definitions
sound_effects = {
    "hit": {"name": "打击音效", "duration": "0:01"},
    "slash": {"name": "挥砍音效", "duration": "0:01"},
    "magic": {"name": "魔法音效", "duration": "0:02"},
    "heal": {"name": "治疗音效", "duration": "0:02"},
    "pickup": {"name": "拾取音效", "duration": "0:01"},
    "drop": {"name": "丢弃音效", "duration": "0:01"},
    "open_door": {"name": "开门音效", "duration": "0:01"},
    "footstep": {"name": "脚步音效", "duration": "0:01"},
    "monster_growl": {"name": "怪物咆哮", "duration": "0:02"},
    "monster_death": {"name": "怪物死亡", "duration": "0:01"},
    "player_hurt": {"name": "玩家受伤", "duration": "0:01"},
    "player_death": {"name": "玩家死亡", "duration": "0:02"},
    "level_up": {"name": "升级音效", "duration": "0:02"},
    "achievement": {"name": "成就音效", "duration": "0:01"},
    "quest_complete": {"name": "任务完成", "duration": "0:02"},
    "ui_click": {"name": "UI点击", "duration": "0:00"},
    "ui_hover": {"name": "UI悬停", "duration": "0:00"},
    "ui_back": {"name": "UI返回", "duration": "0:00"},
    "coin": {"name": "金币音效", "duration": "0:01"},
    "lock": {"name": "锁音效", "duration": "0:01"},
    "unlock": {"name": "解锁音效", "duration": "0:01"},
    "water_splash": {"name": "水花音效", "duration": "0:01"},
    "fire_burn": {"name": "火焰燃烧", "duration": "0:02"},
    "wind": {"name": "风声", "duration": "0:02"},
    "thunder": {"name": "雷声", "duration": "0:01"},
    "rain": {"name": "雨声", "duration": "0:02"},
    "bird": {"name": "鸟叫声", "duration": "0:01"},
    "owl": {"name": "猫头鹰叫", "duration": "0:01"},
    "wolf_howl": {"name": "狼嚎", "duration": "0:02"},
    "cricket": {"name": "蟋蟀声", "duration": "0:01"},
    "door_creak": {"name": "门吱呀声", "duration": "0:01"},
    "chest_open": {"name": "宝箱打开", "duration": "0:01"},
    "potion_drink": {"name": "喝药水", "duration": "0:01"},
    "scroll_use": {"name": "使用卷轴", "duration": "0:01"},
    "sword_clash": {"name": "剑碰撞", "duration": "0:01"},
    "arrow_shoot": {"name": "射箭音效", "duration": "0:01"},
    "shield_block": {"name": "盾牌格挡", "duration": "0:01"},
    "critical_hit": {"name": "暴击音效", "duration": "0:01"},
    "dodge": {"name": "闪避音效", "duration": "0:01"},
    "buff_apply": {"name": "增益施加", "duration": "0:01"},
    "debuff_apply": {"name": "减益施加", "duration": "0:01"}
}

def generate_placeholder_audio(track_id, track_data, is_bgm=True):
    """Generate a placeholder audio file (just a text file describing the sound)"""
    if is_bgm:
        return f'''# BGM: {track_data['name']}
# ID: {track_id}
# Duration: {track_data['duration']}
# Mood: {track_data['mood']}
# Description: 这是{track_data['name']}的占位文件
# 实际音频文件需要替换此文件
'''
    else:
        return f'''# Sound Effect: {track_data['name']}
# ID: {track_id}
# Duration: {track_data['duration']}
# Description: 这是{track_data['name']}的占位文件
# 实际音频文件需要替换此文件
'''

def main():
    base_path = "D:/opencode/fogsea-survival/apps/web/public/sounds"
    
    # Generate BGM placeholders
    for track_id, track_data in bgm_tracks.items():
        content = generate_placeholder_audio(track_id, track_data, is_bgm=True)
        filepath = os.path.join(base_path, "bgm", f"{track_id}.txt")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated BGM: {track_id}")
    
    # Generate sound effect placeholders
    for effect_id, effect_data in sound_effects.items():
        content = generate_placeholder_audio(effect_id, effect_data, is_bgm=False)
        filepath = os.path.join(base_path, "effects", f"{effect_id}.txt")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated effect: {effect_id}")
    
    print(f"\nTotal audio placeholders generated:")
    print(f"  BGM tracks: {len(bgm_tracks)}")
    print(f"  Sound effects: {len(sound_effects)}")
    print(f"  Total: {len(bgm_tracks) + len(sound_effects)}")

if __name__ == "__main__":
    main()