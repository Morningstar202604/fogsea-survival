import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix unused 'day' parameters - prefix with _
    content = re.sub(r'(\w+)\(id: string, state: GameState, day: number\)', r'\1(id: string, state: GameState, _day: number)', content)
    content = re.sub(r'(\w+)\(id: string, day: number\)', r'\1(id: string, _day: number)', content)
    content = re.sub(r'(\w+)\(state: GameState, day: number\)', r'\1(state: GameState, _day: number)', content)
    content = re.sub(r'(\w+)\(day: number\)', r'\1(_day: number)', content)
    
    # Fix unused 'context' parameters
    content = re.sub(r'(\w+)\(state: GameState, context: NarrativeContext\)', r'\1(state: GameState, _context: NarrativeContext)', content)
    
    # Fix unused 'choice' and 'state' in generateSuccessText/generateFailureText
    content = re.sub(r'generateSuccessText\(choice: NarrativeChoice, state: GameState\)', 'generateSuccessText(choice: NarrativeChoice, _state: GameState)', content)
    content = re.sub(r'generateFailureText\(\s*choice: NarrativeChoice,\s*state: GameState,', 'generateFailureText(\n    choice: NarrativeChoice,\n    _state: GameState,', content)
    
    # Fix unused 'type' and 'state' in createScene methods
    content = re.sub(r'generateSceneTitle\(type: NarrativeSceneType\)', 'generateSceneTitle(_type: NarrativeSceneType)', content)
    content = re.sub(r'generateSceneText\(type: NarrativeSceneType, state: GameState\)', 'generateSceneText(_type: NarrativeSceneType, _state: GameState)', content)
    content = re.sub(r'generateChoices\(type: NarrativeSceneType, state: GameState\)', 'generateChoices(_type: NarrativeSceneType, _state: GameState)', content)
    content = re.sub(r'generateEnvironment\(type: NarrativeSceneType, state: GameState\)', 'generateEnvironment(_type: NarrativeSceneType, _state: GameState)', content)
    
    # Fix unused 'skill' in skillBonuses
    content = content.replace("for (const [skill, bonus] of Object.entries(choice.skillBonuses)) {", "for (const [_skill, bonus] of Object.entries(choice.skillBonuses)) {")
    
    # Fix itemCount to amount in EventCost
    content = content.replace("itemCount: ", "amount: ")
    
    # Fix 'safety' resource to use a valid resource key
    content = content.replace("resource: 'safety' as ResourceKey", "resource: 'warmth' as ResourceKey")
    
    # Fix unused 'scores' and 'state' in strategy.ts
    content = content.replace("private calculateOverallEfficiency(scores: StrategyScore[]): number {", "private calculateOverallEfficiency(_scores: StrategyScore[]): number {")
    content = content.replace("private generatePhaseAdvice(\n    phase: GamePhase,\n    analysis: StrategyAnalysis,\n    state: GameState\n  ): string[] {", "private generatePhaseAdvice(\n    phase: GamePhase,\n    analysis: StrategyAnalysis,\n    _state: GameState\n  ): string[] {")
    content = content.replace("private suggestNextActions(analysis: StrategyAnalysis, state: GameState): string[] {", "private suggestNextActions(analysis: StrategyAnalysis, _state: GameState): string[] {")
    
    # Fix strategy.ts rng and initializeStrategyScores
    content = content.replace("private rng: Rng;\n\n  constructor(seed: number) {\n    this.rng = new Rng(seed);\n  }", "private _rng: Rng;\n\n  constructor(seed: number) {\n    this._rng = new Rng(seed);\n  }")
    content = content.replace("private initializeStrategyScores(): void {\n    for (const archetype of Object.values(StrategyArchetype)) {\n      this.strategyScores.set(archetype, 0);\n    }\n  }", "// initializeStrategyScores removed - not used")
    
    # Fix the iterator issue in strategy.ts
    content = content.replace("for (const impact of decision.impact) {", "for (const impact of decision.impact as StrategicImpact[]) {")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Fixed {filepath}")

# Fix all files
fix_file('D:/opencode/fogsea-survival/packages/core/src/narrative.ts')
fix_file('D:/opencode/fogsea-survival/packages/core/src/aiEvents.ts')
fix_file('D:/opencode/fogsea-survival/packages/core/src/strategy.ts')

print("All files fixed!")
