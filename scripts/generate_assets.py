#!/usr/bin/env python3
"""
Generate game assets (SVG images) for fogsea-survival
"""

import os

# Character definitions
characters = {
    "rat": {
        "name": "鼠王",
        "body_color": "#8b7355",
        "head_color": "#d2b48c",
        "features": "large ears, whiskers, crown"
    },
    "rescue": {
        "name": "救援队",
        "body_color": "#2e7d32",
        "head_color": "#ffe4c4",
        "features": "military uniform, helmet"
    },
    "crystal": {
        "name": "结晶之声",
        "body_color": "#9c27b0",
        "head_color": "#e1bee7",
        "features": "glowing, ethereal"
    }
}

# Monster definitions
monsters = {
    "wild_dog": {"name": "野狗", "color": "#8b4513", "size": "medium"},
    "mutated_rat": {"name": "变异鼠", "color": "#696969", "size": "small"},
    "shadow_wolf": {"name": "影狼", "color": "#1a1a2e", "size": "large"},
    "fog_beast": {"name": "迷雾兽", "color": "#4a5568", "size": "huge"},
    "crystal_golem": {"name": "结晶傀儡", "color": "#9c27b0", "size": "large"},
    "ancient_guardian": {"name": "古代守卫", "color": "#b8860b", "size": "huge"},
    "mist_serpent": {"name": "迷雾蛇", "color": "#2e8b57", "size": "large"},
    "bone_revenant": {"name": "骸骨亡灵", "color": "#f5f5dc", "size": "medium"},
    "void_stalker": {"name": "虚空跟踪者", "color": "#483d8b", "size": "large"},
    "flame_spirit": {"name": "火焰精灵", "color": "#ff4500", "size": "medium"}
}

# Item definitions
items = {
    "wooden_sword": {"name": "木剑", "color": "#deb887", "type": "weapon"},
    "iron_sword": {"name": "铁剑", "color": "#c0c0c0", "type": "weapon"},
    "crystal_blade": {"name": "结晶之刃", "color": "#9c27b0", "type": "weapon"},
    "leather_armor": {"name": "皮甲", "color": "#8b4513", "type": "armor"},
    "iron_armor": {"name": "铁甲", "color": "#808080", "type": "armor"},
    "crystal_robe": {"name": "结晶长袍", "color": "#9370db", "type": "armor"},
    "health_potion": {"name": "生命药水", "color": "#ff0000", "type": "consumable"},
    "mana_potion": {"name": "魔力药水", "color": "#0000ff", "type": "consumable"},
    "stamina_potion": {"name": "体力药水", "color": "#00ff00", "type": "consumable"},
    "teleport_scroll": {"name": "传送卷轴", "color": "#ffd700", "type": "scroll"},
    "fire_scroll": {"name": "火焰卷轴", "color": "#ff4500", "type": "scroll"},
    "ice_scroll": {"name": "冰霜卷轴", "color": "#00bfff", "type": "scroll"},
    "lightning_scroll": {"name": "闪电卷轴", "color": "#ffff00", "type": "scroll"},
    "healing_herb": {"name": "治愈草药", "color": "#228b22", "type": "material"},
    "magic_crystal": {"name": "魔法水晶", "color": "#9c27b0", "type": "material"},
    "ancient_relic": {"name": "古代遗物", "color": "#b8860b", "type": "special"},
    "mysterious_compass": {"name": "神秘罗盘", "color": "#4169e1", "type": "special"},
    "survival_kit": {"name": "生存工具包", "color": "#8b4513", "type": "tool"},
    "campfire_kit": {"name": "营火工具包", "color": "#ff4500", "type": "tool"},
    "fishing_rod": {"name": "钓鱼竿", "color": "#8b4513", "type": "tool"}
}

# Background definitions
backgrounds = {
    "forest": {"name": "迷雾森林", "colors": ["#228b22", "#006400", "#2e8b57"]},
    "ruins": {"name": "废墟城市", "colors": ["#696969", "#808080", "#a9a9a9"]},
    "cave": {"name": "地下洞穴", "colors": ["#2f2f2f", "#1a1a1a", "#4a4a4a"]},
    "camp": {"name": "避难所营地", "colors": ["#8b4513", "#d2691e", "#deb887"]},
    "tower": {"name": "信号塔", "colors": ["#4682b4", "#5f9ea0", "#87ceeb"]},
    "temple": {"name": "古代神殿", "colors": ["#b8860b", "#daa520", "#ffd700"]},
    "swamp": {"name": "沼泽地带", "colors": ["#556b2f", "#6b8e23", "#9acd32"]},
    "mountain": {"name": "雪山之巅", "colors": ["#f0f8ff", "#e6e6fa", "#fffafa"]},
    "desert": {"name": "荒漠戈壁", "colors": ["#daa520", "#f4a460", "#ffdab9"]},
    "ocean": {"name": "深海遗迹", "colors": ["#000080", "#0000cd", "#1e90ff"]}
}

def generate_character_svg(char_id, char_data):
    """Generate SVG for a character"""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300">
  <defs>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{char_data['body_color']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{char_data['body_color']};stop-opacity:0.8" />
    </linearGradient>
  </defs>
  <!-- Body -->
  <ellipse cx="100" cy="220" rx="45" ry="60" fill="url(#bodyGrad)" stroke="{char_data['body_color']}" stroke-width="2"/>
  <!-- Head -->
  <circle cx="100" cy="120" r="45" fill="{char_data['head_color']}" stroke="{char_data['body_color']}" stroke-width="2"/>
  <!-- Eyes -->
  <ellipse cx="85" cy="115" rx="8" ry="6" fill="{char_data['body_color']}"/>
  <ellipse cx="115" cy="115" rx="8" ry="6" fill="{char_data['body_color']}"/>
  <!-- Mouth -->
  <path d="M90 135 Q100 145 110 135" stroke="{char_data['body_color']}" stroke-width="2" fill="none"/>
  <!-- Name label -->
  <text x="100" y="295" text-anchor="middle" font-family="Arial" font-size="14" fill="{char_data['body_color']}">{char_data['name']}</text>
</svg>'''

def generate_monster_svg(monster_id, monster_data):
    """Generate SVG for a monster"""
    size_map = {"small": 30, "medium": 40, "large": 50, "huge": 60}
    size = size_map.get(monster_data['size'], 40)
    
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:{monster_data['color']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{monster_data['color']};stop-opacity:0.6" />
    </radialGradient>
  </defs>
  <!-- Body -->
  <ellipse cx="100" cy="100" rx="{size}" ry="{size * 0.8}" fill="url(#bodyGrad)" stroke="{monster_data['color']}" stroke-width="3"/>
  <!-- Eyes -->
  <ellipse cx="85" cy="90" rx="10" ry="8" fill="#ff0000"/>
  <ellipse cx="115" cy="90" rx="10" ry="8" fill="#ff0000"/>
  <circle cx="85" cy="90" r="4" fill="#000"/>
  <circle cx="115" cy="90" r="4" fill="#000"/>
  <!-- Mouth -->
  <path d="M75 115 Q100 140 125 115" stroke="#000" stroke-width="3" fill="none"/>
  <!-- Teeth -->
  <line x1="80" y1="115" x2="85" y2="125" stroke="#fff" stroke-width="2"/>
  <line x1="95" y1="115" x2="100" y2="125" stroke="#fff" stroke-width="2"/>
  <line x1="105" y1="115" x2="110" y2="125" stroke="#fff" stroke-width="2"/>
  <line x1="120" y1="115" x2="115" y2="125" stroke="#fff" stroke-width="2"/>
  <!-- Name label -->
  <text x="100" y="190" text-anchor="middle" font-family="Arial" font-size="12" fill="{monster_data['color']}">{monster_data['name']}</text>
</svg>'''

def generate_item_svg(item_id, item_data):
    """Generate SVG for an item"""
    type_colors = {
        "weapon": "#c0c0c0",
        "armor": "#808080",
        "consumable": "#ff6347",
        "scroll": "#ffd700",
        "material": "#9370db",
        "special": "#ff69b4",
        "tool": "#8b4513"
    }
    color = type_colors.get(item_data['type'], item_data['color'])
    
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="itemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{item_data['color']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{color};stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Item shape -->
  <rect x="20" y="20" width="60" height="60" rx="10" fill="url(#itemGrad)" stroke="{color}" stroke-width="2"/>
  <!-- Item icon -->
  <circle cx="50" cy="50" r="15" fill="#fff" opacity="0.3"/>
  <!-- Name label -->
  <text x="50" y="95" text-anchor="middle" font-family="Arial" font-size="10" fill="{color}">{item_data['name']}</text>
</svg>'''

def generate_background_svg(bg_id, bg_data):
    """Generate SVG for a background"""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{bg_data['colors'][0]};stop-opacity:1" />
      <stop offset="50%" style="stop-color:{bg_data['colors'][1]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{bg_data['colors'][2]};stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Sky -->
  <rect width="800" height="600" fill="url(#skyGrad)"/>
  <!-- Ground -->
  <rect y="400" width="800" height="200" fill="{bg_data['colors'][2]}" opacity="0.8"/>
  <!-- Mountains/Trees -->
  <polygon points="0,400 100,300 200,400" fill="{bg_data['colors'][1]}" opacity="0.6"/>
  <polygon points="150,400 250,280 350,400" fill="{bg_data['colors'][1]}" opacity="0.7"/>
  <polygon points="300,400 400,250 500,400" fill="{bg_data['colors'][1]}" opacity="0.8"/>
  <polygon points="450,400 550,290 650,400" fill="{bg_data['colors'][1]}" opacity="0.6"/>
  <polygon points="600,400 700,310 800,400" fill="{bg_data['colors'][1]}" opacity="0.7"/>
  <!-- Mist effect -->
  <ellipse cx="200" cy="350" rx="150" ry="50" fill="#fff" opacity="0.2"/>
  <ellipse cx="600" cy="380" rx="200" ry="60" fill="#fff" opacity="0.15"/>
  <!-- Name label -->
  <text x="400" y="550" text-anchor="middle" font-family="Arial" font-size="24" fill="#fff" stroke="#000" stroke-width="2">{bg_data['name']}</text>
</svg>'''

def main():
    base_path = "D:/opencode/fogsea-survival/apps/web/public/images"
    
    # Generate character SVGs
    for char_id, char_data in characters.items():
        svg_content = generate_character_svg(char_id, char_data)
        filepath = os.path.join(base_path, "characters", f"{char_id}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated character: {char_id}")
    
    # Generate monster SVGs
    for monster_id, monster_data in monsters.items():
        svg_content = generate_monster_svg(monster_id, monster_data)
        filepath = os.path.join(base_path, "monsters", f"{monster_id}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated monster: {monster_id}")
    
    # Generate item SVGs
    for item_id, item_data in items.items():
        svg_content = generate_item_svg(item_id, item_data)
        filepath = os.path.join(base_path, "items", f"{item_id}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated item: {item_id}")
    
    # Generate background SVGs
    for bg_id, bg_data in backgrounds.items():
        svg_content = generate_background_svg(bg_id, bg_data)
        filepath = os.path.join(base_path, "backgrounds", f"{bg_id}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated background: {bg_id}")
    
    print(f"\nTotal assets generated:")
    print(f"  Characters: {len(characters)}")
    print(f"  Monsters: {len(monsters)}")
    print(f"  Items: {len(items)}")
    print(f"  Backgrounds: {len(backgrounds)}")
    print(f"  Total: {len(characters) + len(monsters) + len(items) + len(backgrounds)}")

if __name__ == "__main__":
    main()