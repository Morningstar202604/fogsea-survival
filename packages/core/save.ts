/** 存档/读取系统
 * 使用 localStorage 持久化游戏状态
 * 接口简洁，供 engine 和 Vue 组件调用
 */

/** 将游戏状态序列化并存入 localStorage */
export function saveGame(state: GameState): string {
  const data = {
    ...state,
    resources: { ...state.resources }, // 浅拷贝确保可序列化
  }
  localStorage.setItem('fogsea_save', JSON.stringify(data))
  return JSON.stringify(data) // 返回副本供前端展示或日志
}

/** 从 localStorage 读取并反序列化游戏状态 */
export function loadGame(): GameState | null {
  const data = localStorage.getItem('fogsea_save')
  if (!data) return null
  try {
    const parsed = JSON.parse(data) as GameState
    // 基本校验：必须有 day 和 resources
    if (typeof parsed.day !== 'number' || !parsed.resources) return null
    return parsed
  } catch {
    // JSON 解析失败，视为损坏的存档
    return null
  }
}

/** 删除当前存档 */
export function deleteSave(): void {
  localStorage.removeItem('fogsea_save')
}

/** 检查是否有已保存的游戏 */
export function hasSave(): boolean {
  return localStorage.getItem('fogsea_save') !== null
}