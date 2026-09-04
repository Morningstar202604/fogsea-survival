import re

# Read the file
with open('D:/opencode/fogsea-survival/packages/core/src/content/extraContent.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all event entries and add missing fields
# Pattern: { id: 'xxx', name: 'xxx', weight: N, description: 'xxx', choices:
# Replace with: { id: 'xxx', name: 'xxx', weight: N, minDay: 1, maxTriggers: 99, text: 'xxx', description: 'xxx', choices:

def add_fields(match):
    full = match.group(0)
    # Check if minDay already exists
    if 'minDay' in full:
        return full
    # Add minDay and maxTriggers after weight
    full = re.sub(r'weight:\s*(\d+),', r'weight: \1, minDay: 1, maxTriggers: 99,', full)
    # Add text field (same as description)
    full = re.sub(r"description:\s*'([^']*)',", r"text: '\1', description: '\1',", full)
    return full

# Match event entries
pattern = r"\{\s*id:\s*'[^']*',\s*name:\s*'[^']*',\s*weight:\s*\d+,\s*description:\s*'[^']*',\s*choices:"
new_content = re.sub(pattern, add_fields, content)

with open('D:/opencode/fogsea-survival/packages/core/src/content/extraContent.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done!")
