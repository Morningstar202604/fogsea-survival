# Git 远程仓库推送指南

## ⚠️ 当前问题

远程仓库配置了OAuth2 token认证，但该token可能已过期或权限不足：

```
origin	https://oauth2:fcTJQhDVVBoWjuxxN9BvaQSs@gitcode.com/badhope/quanmin-survival.git
```

## 🔧 解决方案

### 方案1：更新OAuth2 Token（推荐）

1. **获取新的Personal Access Token**
   - 访问 GitCode: https://gitcode.com
   - 进入 Settings → Developer Settings → Personal access tokens
   - 生成新token，勾选以下权限：
     - `repo` (完整仓库访问)
     - `write:packages` (包写入)

2. **更新远程URL**
   ```bash
   git remote set-url origin https://oauth2:YOUR_NEW_TOKEN@gitcode.com/badhope/quanmin-survival.git
   ```

3. **推送到远程**
   ```bash
   git push origin main
   ```

### 方案2：使用SSH密钥（更安全）

1. **生成SSH密钥**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **添加公钥到GitCode**
   - 复制 `~/.ssh/id_ed25519.pub` 的内容
   - 访问 GitCode → Settings → SSH Keys
   - 粘贴公钥并保存

3. **更改远程URL为SSH**
   ```bash
   git remote set-url origin git@gitcode.com:badhope/quanmin-survival.git
   ```

4. **测试连接**
   ```bash
   ssh -T git@gitcode.com
   ```

5. **推送**
   ```bash
   git push origin main
   ```

### 方案3：临时使用用户名密码

```bash
# 清除缓存的凭据
git config --global --unset credential.helper

# 推送时会提示输入用户名和密码
git push origin main
```

## 📝 推送前检查清单

- [ ] 所有更改已提交 (`git status` 应该干净)
- [ ] 本地测试通过 (`pnpm test`)
- [ ] 构建成功 (`pnpm build`)
- [ ] 远程URL正确 (`git remote -v`)
- [ ] Token/密钥有效

## 🚀 推送命令

```bash
# 推送到main分支
git push origin main

# 如果需要强制推送（谨慎使用！）
git push origin main --force

# 推送所有分支
git push origin --all

# 推送标签
git push origin --tags
```

## ⚡ 常见问题

### Q: 推送被拒绝（non-fast-forward）
```bash
# 先拉取远程更改
git pull origin main --rebase

# 解决冲突后再次推送
git push origin main
```

### Q: Token权限不足
- 确保token有 `repo` 权限
- 检查仓库是否是private（需要额外权限）

### Q: SSH连接失败
```bash
# 测试SSH连接
ssh -vT git@gitcode.com

# 检查SSH密钥是否正确添加
cat ~/.ssh/id_ed25519.pub
```

## 🔐 安全建议

1. **不要硬编码Token**
   - ❌ `https://oauth2:TOKEN@...`
   - ✅ 使用环境变量或credential helper

2. **使用Credential Helper**
   ```bash
   # Windows
   git config --global credential.helper manager-core

   # macOS
   git config --global credential.helper osxkeychain

   # Linux
   git config --global credential.helper cache
   ```

3. **定期轮换Token**
   - 每3个月更换一次
   - 发现泄露立即撤销

## 📞 需要帮助？

如果以上方案都无法解决，请：
1. 检查GitCode服务状态
2. 联系仓库管理员确认权限
3. 查看GitCode官方文档

---

**最后更新**: 2026-08-29
**仓库**: quanmin-survival v2.0
