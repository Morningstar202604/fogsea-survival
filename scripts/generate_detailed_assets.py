#!/usr/bin/env python3
"""
Generate detailed SVG images for fogsea-survival
"""

import os

def generate_detailed_character(name, features, colors):
    """Generate a detailed character SVG"""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{colors['bg'][0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['bg'][1]};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{colors['body'][0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['body'][1]};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="3" stdDeviation="5" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="600" fill="url(#bgGrad)" rx="20"/>
  <!-- Body -->
  <ellipse cx="200" cy="400" rx="80" ry="120" fill="url(#bodyGrad)" stroke="{colors['body'][1]}" stroke-width="3" filter="url(#shadow)"/>
  <!-- Head -->
  <circle cx="200" cy="220" r="85" fill="{colors['skin']}" stroke="{colors['skin_dark']}" stroke-width="3" filter="url(#shadow)"/>
  <!-- Hair -->
  <path d="M115 220 Q115 120 200 120 Q285 120 285 220" fill="{colors['hair']}" stroke="{colors['hair_dark']}" stroke-width="3"/>
  <!-- Eyes -->
  <ellipse cx="170" cy="210" rx="18" ry="14" fill="#fff"/>
  <ellipse cx="230" cy="210" rx="18" ry="14" fill="#fff"/>
  <circle cx="170" cy="210" r="10" fill="{colors['eyes']}"/>
  <circle cx="230" cy="210" r="10" fill="{colors['eyes']}"/>
  <circle cx="170" cy="210" r="5" fill="#000"/>
  <circle cx="230" cy="210" r="5" fill="#000"/>
  <!-- Eyebrows -->
  <path d="M150 190 Q170 180 190 190" stroke="{colors['hair_dark']}" stroke-width="4" fill="none"/>
  <path d="M210 190 Q230 180 250 190" stroke="{colors['hair_dark']}" stroke-width="4" fill="none"/>
  <!-- Nose -->
  <path d="M195 230 Q200 240 205 230" stroke="{colors['skin_dark']}" stroke-width="2" fill="none"/>
  <!-- Mouth -->
  <path d="M180 260 Q200 280 220 260" stroke="{colors['mouth']}" stroke-width="3" fill="none"/>
  <!-- Features -->
  {features}
  <!-- Name plate -->
  <rect x="50" y="520" width="300" height="60" rx="10" fill="rgba(0,0,0,0.7)"/>
  <text x="200" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="#fff" font-weight="bold">{name}</text>
</svg>'''

def generate_detailed_monster(name, features, colors):
    """Generate a detailed monster SVG"""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:{colors['body'][0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['body'][1]};stop-opacity:1" />
    </radialGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="400" height="400" fill="{colors['bg']}" rx="20"/>
  <!-- Body -->
  <ellipse cx="200" cy="200" rx="150" ry="120" fill="url(#bodyGrad)" stroke="{colors['body'][1]}" stroke-width="4"/>
  <!-- Eyes -->
  <ellipse cx="150" cy="180" rx="30" ry="25" fill="{colors['eyes'][0]}"/>
  <ellipse cx="250" cy="180" rx="30" ry="25" fill="{colors['eyes'][0]}"/>
  <circle cx="150" cy="180" r="15" fill="{colors['eyes'][1]}"/>
  <circle cx="250" cy="180" r="15" fill="{colors['eyes'][1]}"/>
  <circle cx="150" cy="180" r="8" fill="#000"/>
  <circle cx="250" cy="180" r="8" fill="#000"/>
  <!-- Mouth -->
  <path d="M120 250 Q200 320 280 250" stroke="{colors['mouth']}" stroke-width="5" fill="none"/>
  <!-- Teeth -->
  <polygon points="140,250 150,280 160,250" fill="#fff"/>
  <polygon points="180,250 190,290 200,250" fill="#fff"/>
  <polygon points="220,250 230,280 240,250" fill="#fff"/>
  <polygon points="260,250 270,270 280,250" fill="#fff"/>
  <!-- Features -->
  {features}
  <!-- Name plate -->
  <rect x="50" y="340" width="300" height="50" rx="10" fill="rgba(0,0,0,0.7)"/>
  <text x="200" y="375" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#fff" font-weight="bold">{name}</text>
</svg>'''

def generate_detailed_item(name, item_type, colors):
    """Generate a detailed item SVG"""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="itemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors[1]};stop-opacity:1" />
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="200" height="200" fill="#1a1a2e" rx="20"/>
  <!-- Item shape -->
  <rect x="40" y="40" width="120" height="120" rx="15" fill="url(#itemGrad)" stroke="{colors[1]}" stroke-width="3" filter="url(#glow)"/>
  <!-- Item icon -->
  <circle cx="100" cy="90" r="30" fill="#fff" opacity="0.3"/>
  <!-- Item type -->
  <text x="100" y="140" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#fff">{item_type}</text>
  <!-- Name plate -->
  <rect x="10" y="170" width="180" height="25" rx="5" fill="rgba(0,0,0,0.7)"/>
  <text x="100" y="190" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#fff">{name}</text>
</svg>'''

def generate_detailed_background(name, colors):
    """Generate a detailed background SVG"""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{colors[0]};stop-opacity:1" />
      <stop offset="50%" style="stop-color:{colors[1]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors[2]};stop-opacity:1" />
    </linearGradient>
    <filter id="fog" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="20"/>
    </filter>
  </defs>
  <!-- Sky -->
  <rect width="1600" height="900" fill="url(#skyGrad)"/>
  <!-- Mountains -->
  <polygon points="0,600 200,400 400,600" fill="{colors[1]}" opacity="0.6"/>
  <polygon points="300,600 500,350 700,600" fill="{colors[1]}" opacity="0.7"/>
  <polygon points="600,600 800,300 1000,600" fill="{colors[1]}" opacity="0.8"/>
  <polygon points="900,600 1100,380 1300,600" fill="{colors[1]}" opacity="0.6"/>
  <polygon points="1200,600 1400,420 1600,600" fill="{colors[1]}" opacity="0.7"/>
  <!-- Ground -->
  <rect y="600" width="1600" height="300" fill="{colors[2]}" opacity="0.8"/>
  <!-- Fog effect -->
  <ellipse cx="400" cy="500" rx="300" ry="100" fill="#fff" opacity="0.2" filter="url(#fog)"/>
  <ellipse cx="1200" cy="550" rx="400" ry="120" fill="#fff" opacity="0.15" filter="url(#fog)"/>
  <!-- Name plate -->
  <rect x="400" y="800" width="800" height="80" rx="20" fill="rgba(0,0,0,0.7)"/>
  <text x="800" y="855" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" fill="#fff" font-weight="bold">{name}</text>
</svg>'''

# Character data
characters = [
    {
        "id": "player",
        "name": "Player",
        "colors": {
            "bg": ["#2d3748", "#1a202c"],
            "body": ["#4a5568", "#2d3748"],
            "skin": "#f5deb3",
            "skin_dark": "#daa520",
            "hair": "#1a1a2e",
            "hair_dark": "#16213e",
            "eyes": "#4a5568",
            "mouth": "#8b4513"
        },
        "features": '<line x1="250" y1="190" x2="270" y2="250" stroke="#8b0000" stroke-width="4"/>'
    },
    {
        "id": "duoduo",
        "name": "Duo Duo",
        "colors": {
            "bg": ["#fce4ec", "#f8bbd0"],
            "body": ["#e91e63", "#c2185b"],
            "skin": "#ffe4c4",
            "skin_dark": "#ffdab9",
            "hair": "#8b4513",
            "hair_dark": "#5d3a1a",
            "eyes": "#4169e1",
            "mouth": "#ff69b4"
        },
        "features": '<ellipse cx="160" cy="240" rx="15" ry="8" fill="#ffb6c1" opacity="0.6"/><ellipse cx="240" cy="240" rx="15" ry="8" fill="#ffb6c1" opacity="0.6"/>'
    },
    {
        "id": "laok",
        "name": "Old K",
        "colors": {
            "bg": ["#2f4f4f", "#1e3a3a"],
            "body": ["#2f4f4f", "#1e3a3a"],
            "skin": "#d2691e",
            "skin_dark": "#8b4513",
            "hair": "#1a1a1a",
            "hair_dark": "#000",
            "eyes": "#2f4f4f",
            "mouth": "#8b4513"
        },
        "features": '<path d="M140 280 Q200 350 260 280" fill="#1a1a1a" stroke="#000" stroke-width="3"/>'
    },
    {
        "id": "doc",
        "name": "Dr. Lin",
        "colors": {
            "bg": ["#e3f2fd", "#bbdefb"],
            "body": ["#fff", "#f0f0f0"],
            "skin": "#ffe4c4",
            "skin_dark": "#ffdab9",
            "hair": "#2f2f2f",
            "hair_dark": "#1a1a1a",
            "eyes": "#2f4f4f",
            "mouth": "#8b4513"
        },
        "features": '<circle cx="170" cy="210" r="20" fill="none" stroke="#333" stroke-width="3"/><circle cx="230" cy="210" r="20" fill="none" stroke="#333" stroke-width="3"/><line x1="190" y1="210" x2="210" y2="210" stroke="#333" stroke-width="3"/><rect x="180" y="370" width="40" height="10" fill="#e53e3e"/><rect x="195" y="355" width="10" height="40" fill="#e53e3e"/>'
    },
    {
        "id": "rat",
        "name": "Rat King",
        "colors": {
            "bg": ["#5d4037", "#3e2723"],
            "body": ["#8b7355", "#6d5a43"],
            "skin": "#d2b48c",
            "skin_dark": "#a0855b",
            "hair": "#8b7355",
            "hair_dark": "#6d5a43",
            "eyes": "#ff0000",
            "mouth": "#8b4513"
        },
        "features": '<path d="M130 180 L120 140 L160 160" fill="#d2b48c" stroke="#a0855b" stroke-width="2"/><path d="M270 180 L280 140 L240 160" fill="#d2b48c" stroke="#a0855b" stroke-width="2"/><ellipse cx="200" cy="150" rx="40" ry="15" fill="#ffd700" stroke="#daa520" stroke-width="2"/>'
    },
    {
        "id": "rescue",
        "name": "Rescue Team",
        "colors": {
            "bg": ["#1b5e20", "#0a3010"],
            "body": ["#2e7d32", "#1b5e20"],
            "skin": "#ffe4c4",
            "skin_dark": "#ffdab9",
            "hair": "#1a1a1a",
            "hair_dark": "#000",
            "eyes": "#2e7d32",
            "mouth": "#8b4513"
        },
        "features": '<path d="M160 140 Q200 120 240 140 L240 170 Q200 160 160 170 Z" fill="#2e7d32" stroke="#1b5e20" stroke-width="2"/><rect x="150" y="140" width="100" height="30" fill="#2e7d32" stroke="#1b5e20" stroke-width="2"/>'
    },
    {
        "id": "crystal",
        "name": "Crystal Voice",
        "colors": {
            "bg": ["#4a148c", "#311b92"],
            "body": ["#9c27b0", "#7b1fa2"],
            "skin": "#e1bee7",
            "skin_dark": "#ce93d8",
            "hair": "#9c27b0",
            "hair_dark": "#7b1fa2",
            "eyes": "#fff",
            "mouth": "#ce93d8"
        },
        "features": '<ellipse cx="200" cy="200" rx="60" ry="60" fill="#9c27b0" opacity="0.5" filter="url(#glow)"/><circle cx="200" cy="200" r="30" fill="#e1bee7" opacity="0.7"/>'
    }
]

# Monster data
monsters = [
    {
        "id": "wild_dog",
        "name": "Wild Dog",
        "colors": {
            "bg": "#2d2d2d",
            "body": ["#8b4513", "#654321"],
            "eyes": ["#ff0000", "#8b0000"],
            "mouth": "#000"
        },
        "features": '<path d="M120 160 L100 120 L140 140" fill="#8b4513" stroke="#654321" stroke-width="2"/><path d="M280 160 L300 120 L260 140" fill="#8b4513" stroke="#654321" stroke-width="2"/><path d="M180 300 Q200 350 220 300" fill="none" stroke="#8b4513" stroke-width="8"/>'
    },
    {
        "id": "shadow_wolf",
        "name": "Shadow Wolf",
        "colors": {
            "bg": "#1a1a2e",
            "body": ["#16213e", "#0f0f23"],
            "eyes": ["#ff0000", "#8b0000"],
            "mouth": "#000"
        },
        "features": '<ellipse cx="200" cy="200" rx="100" ry="80" fill="#16213e" opacity="0.5"/><path d="M100 200 Q50 150 100 100" fill="none" stroke="#16213e" stroke-width="10"/><path d="M300 200 Q350 150 300 100" fill="none" stroke="#16213e" stroke-width="10"/>'
    },
    {
        "id": "fog_beast",
        "name": "Fog Beast",
        "colors": {
            "bg": "#4a5568",
            "body": ["#718096", "#4a5568"],
            "eyes": ["#00ff00", "#008000"],
            "mouth": "#2d3748"
        },
        "features": '<ellipse cx="200" cy="200" rx="120" ry="100" fill="#718096" opacity="0.3"/><circle cx="150" cy="180" r="40" fill="#4a5568" opacity="0.5"/><circle cx="250" cy="180" r="40" fill="#4a5568" opacity="0.5"/>'
    },
    {
        "id": "crystal_golem",
        "name": "Crystal Golem",
        "colors": {
            "bg": "#4a148c",
            "body": ["#9c27b0", "#7b1fa2"],
            "eyes": ["#e1bee7", "#ce93d8"],
            "mouth": "#4a148c"
        },
        "features": '<polygon points="100,200 150,100 200,200" fill="#9c27b0" opacity="0.6"/><polygon points="200,200 250,100 300,200" fill="#9c27b0" opacity="0.6"/><polygon points="150,300 200,200 250,300" fill="#9c27b0" opacity="0.6"/>'
    },
    {
        "id": "ancient_guardian",
        "name": "Ancient Guardian",
        "colors": {
            "bg": "#b8860b",
            "body": ["#daa520", "#b8860b"],
            "eyes": ["#00ff00", "#008000"],
            "mouth": "#8b6914"
        },
        "features": '<rect x="100" y="150" width="200" height="150" fill="#daa520" opacity="0.3" rx="10"/><circle cx="150" cy="200" r="20" fill="#00ff00" opacity="0.5"/><circle cx="250" cy="200" r="20" fill="#00ff00" opacity="0.5"/>'
    }
]

# Item data
items = [
    {"id": "wooden_sword", "name": "Wooden Sword", "type": "Weapon", "colors": ["#deb887", "#d2691e"]},
    {"id": "iron_sword", "name": "Iron Sword", "type": "Weapon", "colors": ["#c0c0c0", "#808080"]},
    {"id": "crystal_blade", "name": "Crystal Blade", "type": "Weapon", "colors": ["#9c27b0", "#7b1fa2"]},
    {"id": "leather_armor", "name": "Leather Armor", "type": "Armor", "colors": ["#8b4513", "#654321"]},
    {"id": "iron_armor", "name": "Iron Armor", "type": "Armor", "colors": ["#808080", "#696969"]},
    {"id": "crystal_robe", "name": "Crystal Robe", "type": "Armor", "colors": ["#9370db", "#7b68ee"]},
    {"id": "health_potion", "name": "Health Potion", "type": "Consumable", "colors": ["#ff0000", "#8b0000"]},
    {"id": "mana_potion", "name": "Mana Potion", "type": "Consumable", "colors": ["#0000ff", "#00008b"]},
    {"id": "stamina_potion", "name": "Stamina Potion", "type": "Consumable", "colors": ["#00ff00", "#008000"]},
    {"id": "teleport_scroll", "name": "Teleport Scroll", "type": "Scroll", "colors": ["#ffd700", "#daa520"]},
    {"id": "fire_scroll", "name": "Fire Scroll", "type": "Scroll", "colors": ["#ff4500", "#cc3700"]},
    {"id": "ice_scroll", "name": "Ice Scroll", "type": "Scroll", "colors": ["#00bfff", "#0099cc"]},
    {"id": "lightning_scroll", "name": "Lightning Scroll", "type": "Scroll", "colors": ["#ffff00", "#cccc00"]},
    {"id": "healing_herb", "name": "Healing Herb", "type": "Material", "colors": ["#228b22", "#006400"]},
    {"id": "magic_crystal", "name": "Magic Crystal", "type": "Material", "colors": ["#9c27b0", "#7b1fa2"]},
    {"id": "ancient_relic", "name": "Ancient Relic", "type": "Special", "colors": ["#b8860b", "#8b6914"]},
    {"id": "mysterious_compass", "name": "Mysterious Compass", "type": "Special", "colors": ["#4169e1", "#1e90ff"]},
    {"id": "survival_kit", "name": "Survival Kit", "type": "Tool", "colors": ["#8b4513", "#654321"]},
    {"id": "campfire_kit", "name": "Campfire Kit", "type": "Tool", "colors": ["#ff4500", "#cc3700"]},
    {"id": "fishing_rod", "name": "Fishing Rod", "type": "Tool", "colors": ["#8b4513", "#654321"]}
]

# Background data
backgrounds = [
    {"id": "forest", "name": "Misty Forest", "colors": ["#228b22", "#006400", "#2e8b57"]},
    {"id": "ruins", "name": "Ruined City", "colors": ["#696969", "#808080", "#a9a9a9"]},
    {"id": "cave", "name": "Underground Cave", "colors": ["#2f2f2f", "#1a1a1a", "#4a4a4a"]},
    {"id": "camp", "name": "Refugee Camp", "colors": ["#8b4513", "#d2691e", "#deb887"]},
    {"id": "tower", "name": "Signal Tower", "colors": ["#4682b4", "#5f9ea0", "#87ceeb"]},
    {"id": "temple", "name": "Ancient Temple", "colors": ["#b8860b", "#daa520", "#ffd700"]},
    {"id": "swamp", "name": "Swamp Zone", "colors": ["#556b2f", "#6b8e23", "#9acd32"]},
    {"id": "mountain", "name": "Snow Mountain", "colors": ["#f0f8ff", "#e6e6fa", "#fffafa"]},
    {"id": "desert", "name": "Desert Gobi", "colors": ["#daa520", "#f4a460", "#ffdab9"]},
    {"id": "ocean", "name": "Deep Sea Ruins", "colors": ["#000080", "#0000cd", "#1e90ff"]}
]

def main():
    base_path = "D:/opencode/fogsea-survival/apps/web/public/images"
    
    # Generate character SVGs
    for char in characters:
        svg_content = generate_detailed_character(char['name'], char['features'], char['colors'])
        filepath = os.path.join(base_path, "characters", f"{char['id']}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated character: {char['id']}")
    
    # Generate monster SVGs
    for monster in monsters:
        svg_content = generate_detailed_monster(monster['name'], monster['features'], monster['colors'])
        filepath = os.path.join(base_path, "monsters", f"{monster['id']}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated monster: {monster['id']}")
    
    # Generate item SVGs
    for item in items:
        svg_content = generate_detailed_item(item['name'], item['type'], item['colors'])
        filepath = os.path.join(base_path, "items", f"{item['id']}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated item: {item['id']}")
    
    # Generate background SVGs
    for bg in backgrounds:
        svg_content = generate_detailed_background(bg['name'], bg['colors'])
        filepath = os.path.join(base_path, "backgrounds", f"{bg['id']}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated background: {bg['id']}")
    
    print(f"\nTotal detailed assets generated:")
    print(f"  Characters: {len(characters)}")
    print(f"  Monsters: {len(monsters)}")
    print(f"  Items: {len(items)}")
    print(f"  Backgrounds: {len(backgrounds)}")
    print(f"  Total: {len(characters) + len(monsters) + len(items) + len(backgrounds)}")

if __name__ == "__main__":
    main()