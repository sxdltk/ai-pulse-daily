/* AI 全景观察 · AI 平台优惠与福利（人工校订，定期核实）
 * 校订日期：2026-11-12
 * 说明：信息来自公开活动页、厂商公告与第三方汇总，不同渠道口径存在差异，
 *       额度、地域、截止时间均可能随时调整，领取前请以官方活动页为准。
 *       deadline 为 null 表示「无明确活动截止日 / 长期开放」，
 *       领取后的额度有效期写在 note 里（两者不是一回事）。
 */
window.AI_DEALS_DATA = {
  meta: {
    title: 'AI 平台优惠与福利',
    updated: '2026-11-12',
    disclaimer: '优惠信息为多源聚合，不同渠道口径可能不一致，且活动随时可能调整或提前结束；额度、地域限制、认证方式与截止时间请以各平台官方活动页为准。本页不构成购买建议。',
    references: [
      { name: 'AI 模型优惠速报 · 2026-11-11（国内平台专场）', url: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687' },
      { name: '免费 AI API 额度总表 · 2026-11-12', url: 'https://aitujian.cn/free-ai-api.html' },
      { name: '全网 AI 产品免费权益清单 · 2026-11-06', url: 'https://post.smzdm.com/p/a6z42x4n/' },
      { name: '移动云双 11 · 购 Token 智赋新应用', url: 'https://new.qq.com/rain/a/20261111A0C16O00' },
      { name: '学生 AI 优惠 2026 状态核对 · 2026-11-05', url: 'https://www.yesmiracle.net/post/20261105-student-ai-discounts-2026-status' },
      { name: 'AI 编程工具免费额度全清单 · 2026-10-19', url: 'https://yesmiracle.net/post/20261019-ai-coding-tools-free-tier-guide' },
      { name: 'AI 免费内容与权益速递 · 第 003 期', url: 'https://github.com/Lavie-purple/ai-free-content-digest/blob/main/AI%E5%85%8D%E8%B4%B9%E5%86%85%E5%AE%B9%E4%B8%8E%E6%9D%83%E7%9B%8A%E9%80%9F%E9%80%92-%E7%AC%AC003%E6%9C%9F-2026-09-15.md' }
    ]
  },

  deals: [
    /* ============ 国内 · 双 11 限时 ============ */
    {
      id: 'volc-agent-plan-year', platform: '火山方舟 · Agent Plan', region: '国内', type: '限时折扣',
      name: '个人版包年 5 折（今晚收官）', quota: '480 → 240 元 / 年',
      benefit: '个人版包年 5 折：Small 档 480 元降至 240 元（月均 20 元，含 2 万 AFP/月），Medium 档 2400 元降至 1200 元；新购、续费、升配均可参与，被邀新人再享 9.5 折。',
      deadline: '2026-11-12', audience: '个人用户 · 新购/续费/升配', how: '方舟控制台 → Agent Plan → 包年下单',
      url: 'https://console.volcengine.com/ark', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '官方口径为 11-12 24:00 截止，是本轮双 11 最紧的一档。第三个月起 Small 档回 40 元/月。', tags: ['豆包', '包年', '今晚截止']
    },
    {
      id: 'volc-1111-tokens', platform: '火山引擎 · 11.11 AI 智选', region: '国内', type: '免费额度',
      name: '实名后每日 2000 万+ Tokens 自动刷新', quota: '2000 万+ / 天',
      benefit: '新用户注册每模型送 50 万 Tokens（一次性）；个人实名后，Kimi-K3.1-Pro、DeepSeek-V4.1、GLM-5.3、Doubao-Seed-2.1 每个模型每天再送 200 万自动刷新，合计 2000 万+/天，协作奖励每日最高另赠 500 万。',
      deadline: '2026-11-30', audience: '新用户 · 需个人实名认证', how: '活动页实名 → 一键开通模型 → 创建 API Key，额度写入方舟控制台',
      url: 'https://www.volcengine.com/', source: 'https://rdonly.com/en/sheep/9761',
      note: '多个来源对截止日说法不一（11-10 / 11-30），活动页未标死日期，建议先领。必须在控制台手动开通模型才有额度；API Key 勿提交到公开仓库。', tags: ['豆包', 'DeepSeek', 'GLM', '每日刷新']
    },
    {
      id: 'ali-bailian-1111', platform: '阿里云百炼 · 千问 AI 双 11', region: '国内', type: '免费额度',
      name: '新用户 Qwen 等 70+ 模型免费额度', quota: '约 7000 万 Tokens',
      benefit: '双 11 期间新用户可领 Qwen 等 70+ 模型免费额度，官方口径约 7000 万 Tokens，适合先跑一轮真实场景再决定是否买套餐。',
      deadline: '2026-11-30', audience: '新用户 · 指定地域', how: '百炼控制台 → 活动专区 → 领取免费额度',
      url: 'https://bailian.console.aliyun.com/', source: 'https://post.smzdm.com/p/a6z42x4n/',
      note: '口径差异较大：另有来源称「单模型最高 100 万、90 天有效、仅部分地域提供」，且宣传页曾提到超 1 亿。地域限制（华北 2 北京 / 新加坡）务必在控制台确认。', tags: ['Qwen', '新户', '90 天']
    },
    {
      id: 'zhipu-autoclaw-1111', platform: '智谱 · AutoClaw', region: '国内', type: '免费额度',
      name: '双 11 第二周登录领 5000 积分', quota: '约 5000 积分',
      benefit: '11-09 起登录国内版即可领取约 5000 积分，每账号一次，仅客户端内使用。',
      deadline: '2026-11-15', audience: '国内版用户 · 每账号一次', how: '登录 AutoClaw 国内版客户端自动到账',
      url: 'https://bigmodel.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '额度在 11-15 23:59 同刻失效，上周同档已清零，不要攒着不用。', tags: ['智谱', '积分', '限时']
    },
    {
      id: 'ant-ling-free', platform: '蚂蚁百灵 · Ling-3.2-flash', region: '国内', type: '免费额度',
      name: '上线前两周 API 与对话页全免', quota: '不限量 · 两周',
      benefit: '11-05 起上线前两周 API 与对话页全部免费；560B 总参 / 25B 激活、1M 上下文，原生支持图像与视频输入。',
      deadline: '2026-11-19', audience: '全部用户', how: '开放平台直接调用，无需领券',
      url: 'https://www.antgroup.com/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '到期按官方价计费，适合短期压测；续用前先截好现价页。', tags: ['开源', '多模态', '限免']
    },
    {
      id: 'step-audio-free', platform: '阶跃星辰 · stepaudio-3', region: '国内', type: '免费额度',
      name: '语音全系限免', quota: '不限量 · 限免期',
      benefit: '语音模型全系限时免费，之后按新价计费，新价尚未公布。',
      deadline: '2026-11-17', audience: '全部用户', how: '开放平台直接调用',
      url: 'https://www.stepfun.com/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '限免至 11-17 11:59，官方未公布后续价格，要续用先留存现价页。', tags: ['语音', '限免']
    },
    {
      id: 'nscc-unlimited', platform: '国家超算互联网', region: '国内', type: '免费额度',
      name: '双 11 客户端旗舰模型词元不限量', quota: '不限量',
      benefit: '11-06 官宣：下载最新客户端即享旗舰模型词元不限量、AI 调用不受限，内置科学计算智能体，支持办公与飞书 / 钉钉协同。',
      deadline: '2026-11-30', audience: '全部用户 · 需下载客户端', how: '官网下载最新客户端登录后使用',
      url: 'https://www.scnet.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '同期还有文档智能解析限免、应用专区 0 元调用等子活动，具体以客户端内公告为准。', tags: ['不限量', '客户端', '双 11']
    },
    {
      id: 'nscc-sci-agent', platform: '国家超算互联网', region: '国内', type: '免费额度',
      name: '科学计算智能体新客领 1 亿词元', quota: '1 亿词元',
      benefit: '11-09 起新用户注册领 1 亿词元，限科学计算智能体使用（文献梳理 / 参数试算 / 结果解释）。',
      deadline: '2026-11-30', audience: '新注册用户', how: '注册后在客户端领取',
      url: 'https://www.scnet.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '与「不限量客户端」是两条独立活动，额度限定智能体场景，不能通用。', tags: ['新客', '科研', '1 亿']
    },
    {
      id: 'nscc-maas', platform: '国家超算互联网 · MaaS', region: '国内', type: '免费额度',
      name: 'MaaS 特惠专场延期至年底', quota: '1000 万词元',
      benefit: 'MaaS 特惠专场延期至 12-31，注册领 GLM-5.3-Flash 量包（1000 万词元，到账 30 天有效）。',
      deadline: '2026-12-31', audience: '新用户 · 实名申领', how: 'MaaS 专区注册领取',
      url: 'https://www.scnet.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '领取后 30 天内有效，与活动截止日 12-31 是两回事。', tags: ['GLM', '延期', '30 天']
    },
    {
      id: 'nscc-seckill', platform: '国家超算互联网 · 年终钜惠', region: '国内', type: '限时折扣',
      name: '新客 0.1 元秒杀 5000 万词元', quota: '0.1 元 / 5000 万',
      benefit: '新客首单 0.1 元秒杀 DeepSeek-V4.1-Flash-1017 或 GLM-5.3-Flash 各 5000 万词元（原价 20.5 / 17 元）；另有 Qwen3.8-Flash 1000 万、DeepSeek 2000 万 0.1 元档。',
      deadline: '2026-11-14', audience: '新客首单 · 每日 10 点限量', how: '活动页每日 10 点开抢，六选一',
      url: 'https://www.scnet.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '六选一非全拿；赠额耗尽后继续调用可能扣现金余额，务必设好用量提醒。另有来源称延期至 11-30，以页面为准。', tags: ['秒杀', '0.1 元', '限量']
    },
    {
      id: 'cmcc-1111-1yi', platform: '移动云 · Mobile Claw', region: '国内', type: '免费额度',
      name: '双 11 最高 1 亿 Token 免费领', quota: '最高 1 亿 Tokens',
      benefit: '实名注册领 2500 万，每月登录再领 1000 万（连续两个月），每日签到额外 100 万（连续两个月），三项叠加最高 1 亿；支持 DeepSeek-V4.1-Flash、GLM-5.3-Flash、GLM-5.3。',
      deadline: '2026-11-30', audience: '实名用户 · 新户', how: 'Mobile Claw 客户端实名注册后按页领取',
      url: 'https://ecloud.10086.cn/', source: 'https://new.qq.com/rain/a/20261111A0C16O00',
      note: '「最高 1 亿」需要连续两个月登录 + 每日签到全部完成，实际到手取决于是否坚持打卡。', tags: ['签到', '叠加', 'DeepSeek']
    },
    {
      id: 'cmcc-coding-plan', platform: '移动云 · Coding Plan', region: '国内', type: '限时折扣',
      name: '首购当月 7.9 元（原价 39.9）', quota: '7.9 元 / 首月',
      benefit: 'AI 编程订阅首购当月 7.9 元。轻享版最多 3500 万 Token/月（个人 / 学生），专业版最多 1.8 亿 Token/月；兼容主流 AI 编程工具，按抵扣系数统一计费。',
      deadline: '2026-11-30', audience: '首购用户', how: '移动云活动页下单 Coding Plan',
      url: 'https://ecloud.10086.cn/', source: 'https://new.qq.com/rain/a/20261111A0C16O00',
      note: '首月优惠后按原价续费，订阅前确认次月价格与取消方式。', tags: ['AI 编程', '首月', '7.9 元']
    },
    {
      id: 'cmcc-moma', platform: '移动云 · MoMA', region: '国内', type: '免费额度',
      name: '新用户 2500 万 Token', quota: '2500 万 Tokens',
      benefit: '新用户领取 2500 万 Token 免费额度，领取后 30 天有效，限流 3000/min。',
      deadline: '2026-12-31', audience: '新用户', how: '移动云 MoMA 页面领取',
      url: 'https://ecloud.10086.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '文档提示夜间 00-08 点仅按量享优惠，GLM-5.3 需白名单，部分模型暂停新订购。', tags: ['新户', '30 天']
    },
    {
      id: 'tencent-tokenhub', platform: '腾讯云 · TokenHub', region: '国内', type: '免费额度',
      name: '每模型各 100 万 Tokens（1 年有效）', quota: '100 万 / 每模型',
      benefit: 'TokenHub 全系模型每模型各赠 100 万 Tokens，DeepSeek / Kimi / GLM / 混元等同享，领取后 1 年有效，每模型限一次。',
      deadline: '2026-12-31', audience: '全部用户 · 每模型限一次', how: 'TokenHub 控制台逐模型领取',
      url: 'https://cloud.tencent.com/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '额度有效期 1 年是这批活动里最长的，适合慢慢试；混元 Lite 另有长期不限量档。', tags: ['混元', '1 年有效', '多模型']
    },
    {
      id: 'tencent-hy3', platform: '腾讯混元 · Hy3', region: '国内', type: '免费额度',
      name: '纯语言任务全天 0 积分限免', quota: '不限量 · 限免期',
      benefit: '纯语言任务全天 0 积分，限免窗口延长至 11-15。',
      deadline: '2026-11-15', audience: '全部用户', how: '混元入口直接使用',
      url: 'https://hunyuan.tencent.com/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '仅限纯语言任务，生图 / 视频仍单独计费。', tags: ['限免', '混元']
    },
    {
      id: 'tencent-hy4-edu', platform: '腾讯 WorkBuddy / CodeBuddy', region: '国内', type: '免费额度',
      name: 'Hy4 模型限时免费额度', quota: '一定额度 · 未公布',
      benefit: '11-04 至 11-15，WorkBuddy 与 CodeBuddy 提供一定额度免费使用 Hy4 模型；另有高校学生认证送积分的常驻活动。',
      deadline: '2026-11-15', audience: 'WorkBuddy / CodeBuddy 用户', how: '客户端内直接使用',
      url: 'https://www.workbuddy.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '官方未公布具体额度数值，以客户端内显示为准。', tags: ['Hy4', '限免', '客户端']
    },
    {
      id: 'sensetime-raccoon', platform: '商汤 · 小浣熊', region: '国内', type: '免费额度',
      name: '三端限免延长至 12-01', quota: '各 3000 积分 / 三端',
      benefit: '网页、桌面、移动三端各送 3000 积分（合计 9000），积分有效期 1 年；11-03 官宣限免窗口由原定日期延至 12-01。',
      deadline: '2026-12-01', audience: '全部用户', how: '三端分别登录领取',
      url: 'https://www.sensetime.com/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '另有「每日登录赠 300 积分、当日未登录当晚清零」的独立日赠规则。', tags: ['三端', '延长', '1 年有效']
    },
    {
      id: 'qiniu-conatus', platform: '七牛云 · Conatus', region: '国内', type: '免费额度',
      name: '每日 1 亿 Tokens（0 点重置）', quota: '1 亿 / 天',
      benefit: '每日 0 点自动重置 1 亿 Tokens 免费额度；历史充值满 100 元可升级至 10 亿且提现后仍有效；邀友双方各得 300 万。',
      deadline: '2026-11-30', audience: '全部用户', how: '登录后自动到账，无需领取',
      url: 'https://www.qiniu.com/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '额度每日清零，适合当天批量跑任务，不适合累积。', tags: ['每日重置', '邀请']
    },
    {
      id: 'xfyun-x26', platform: '讯飞星火 · Spark-X2.6', region: '国内', type: '免费额度',
      name: '实名领 10 亿 Tokens（31 天）', quota: '10 亿 / 31 天',
      benefit: '新用户实名认证领取 10 亿 Tokens，自开通日起 31 天有效。',
      deadline: null, audience: '实名新用户', how: '星火开放平台实名后领取',
      url: 'https://www.xfyun.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '领取页面有「自动续扣」勾选项，不需要续费务必取消；活动无明确截止日，但额度 31 天过期。', tags: ['实名', '31 天', '注意自动续费']
    },
    {
      id: 'meituan-longcat', platform: '美团 · LongCat', region: '国内', type: '免费额度',
      name: '注册送 1000 万 Tokens（30 天）', quota: '1000 万 / 30 天',
      benefit: '注册送 1000 万 Tokens，邀请码双方各加额度，老用户 500 万；Cache 命中免费，拼团返现最高 50%。同期 LongCat-2.5 权重开源（MIT 可商用）。',
      deadline: null, audience: '新用户 / 老用户', how: '开放平台注册领取',
      url: 'https://longcat.ai/', source: 'https://post.smzdm.com/p/a6z42x4n/',
      note: '额度领取后 30 天有效；开源权重自部署不计入 API 额度。', tags: ['注册送', 'Cache 免费', '开源']
    },

    /* ============ 国内 · 长期 / 永久免费 ============ */
    {
      id: 'zhipu-flash-free', platform: '智谱 BigModel', region: '国内', type: '永久免费',
      name: 'GLM Flash 系列输入输出全免费', quota: '不限量 · 永久',
      benefit: 'GLM-4.7-Flash、GLM-4-Flash、GLM-4.6V-Flash（视觉）等 Flash 档输入输出全免费，支持函数调用，128K 上下文；新用户另赠约 2000 万 Tokens。',
      deadline: null, audience: '全部开发者', how: '注册后直接调用，无需领券',
      url: 'https://bigmodel.cn/', source: 'https://www.yeyulingfeng.com/a/1159187.html',
      note: '国内最稳的长期免费通道之一，免费模型清单会变动，以控制台为准；并发与 QPS 有限制。', tags: ['GLM', '函数调用', '永久']
    },
    {
      id: 'zhipu-zcode', platform: '智谱 · ZCode', region: '国内', type: '免费额度',
      name: '每日 3 亿 Tokens 定时领', quota: '3 亿 / 天',
      benefit: 'GLM-5.3-Flash 每日额度：19 点领取，23 点至次日 9 点可用；另有 Start Plan 的 Flash 每日 300 万常驻额度。',
      deadline: null, audience: '全部用户', how: '每日 19 点在 ZCode 领取',
      url: 'https://bigmodel.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '使用窗口只有夜间 10 小时，适合跑批量任务；另有来源记 1 亿口径，以页面为准。', tags: ['每日领', '夜间时段', 'GLM']
    },
    {
      id: 'baidu-ernie-free', platform: '百度千帆', region: '国内', type: '永久免费',
      name: 'ERNIE-Speed / Lite 永久免费', quota: '不限量 · 永久',
      benefit: 'ERNIE-Speed、ERNIE-Lite、ERNIE-Tiny 永久免费调用（有限速）；双 11 另新用户每模型赠 100 万 Tokens（3 个月）。',
      deadline: null, audience: '实名用户', how: '千帆控制台开通后调用',
      url: 'https://cloud.baidu.com/', source: 'https://www.yeyulingfeng.com/a/1159187.html',
      note: '免费档需实名认证，且限速较低，适合摘要、分类、抽取、翻译等轻量任务。', tags: ['文心', '永久', '限速']
    },
    {
      id: 'xfyun-lite-free', platform: '讯飞星火 · Spark Lite', region: '国内', type: '永久免费',
      name: 'Spark Lite API 永久免费', quota: '不限量 · 永久',
      benefit: 'Spark Lite 永久免费 API，走 WebSocket，合规性好；星辰 MaaS 开源模型 0 元不限量。',
      deadline: null, audience: '实名开发者', how: '开放平台开通后调用',
      url: 'https://www.xfyun.cn/', source: 'https://www.yeyulingfeng.com/a/1159187.html',
      note: 'QPS 约 2，适合定时任务和批处理，不适合线上高并发业务。', tags: ['永久', 'WebSocket', '低 QPS']
    },
    {
      id: 'tencent-hunyuan-lite', platform: '腾讯混元 · Lite', region: '国内', type: '永久免费',
      name: 'Hunyuan-Lite 长期不限量', quota: '不限量 · 永久',
      benefit: '混元 Lite 长期免费不限量；首次开通另赠约 100 万 Tokens（1 年有效）；Hy-SimulMT 实时语音同传已开源可自部署。',
      deadline: null, audience: '腾讯云用户', how: '腾讯云控制台开通',
      url: 'https://cloud.tencent.com/', source: 'https://www.yeyulingfeng.com/a/1159187.html',
      note: '与 TokenHub 的每模型 100 万是两条独立权益，可叠加。', tags: ['混元', '永久', '可叠加']
    },
    {
      id: 'siliconflow-zero', platform: '硅基流动 SiliconFlow', region: '国内', type: '永久免费',
      name: '零价格模型长期免费', quota: '不限量 · 永久',
      benefit: 'embedding、OCR、语音、翻译、Kolors 等约 5 款零价格模型长期免费；新用户另有 14 元代金券（部分来源称 2000 万 Tokens）。',
      deadline: null, audience: '全部开发者', how: '注册后调用零价格模型',
      url: 'https://cloud.siliconflow.cn/', source: 'https://aitujian.cn/free-ai-api.html',
      note: '有资料称「对话类小模型免费已取消」，两个来源对不上；免费清单以官方模型页为准。', tags: ['embedding', 'OCR', '口径存疑']
    },
    {
      id: 'deepseek-web-free', platform: 'DeepSeek', region: '国内', type: '永久免费',
      name: '网页端 / App 对话完全免费', quota: '不限量 · 无会员制',
      benefit: '官方网页端与 App 对话完全免费，V4.1-Flash 等模型无消息上限、从无会员制；API 侧按量计费（闲时缓存命中价更低）。',
      deadline: null, audience: '全部用户', how: '直接打开网页 / App 使用',
      url: 'https://www.deepseek.com/', source: 'https://github.com/Lavie-purple/ai-free-content-digest/blob/main/AI%E5%85%8D%E8%B4%B9%E5%86%85%E5%AE%B9%E4%B8%8E%E6%9D%83%E7%9B%8A%E9%80%9F%E9%80%92-%E7%AC%AC003%E6%9C%9F-2026-09-15.md',
      note: '免费的是 C 端对话，不含 API 调用；K3.1-Pro 等开放权重模型需自行部署。', tags: ['无会员', 'C 端免费', 'API 另计']
    },
    {
      id: 'sensetime-tokenplan', platform: '商汤 SenseNova · Token Plan', region: '国内', type: '免费额度',
      name: '公测期完全免费', quota: '1500 次 / 5 小时 · 每模型',
      benefit: '公测阶段完全免费：单模型每 5 小时 1500 次调用，双积分池每周各 120 万积分，限速 60 RPM，提供 OpenAI 兼容接口；另有 7 款模型长期免费。',
      deadline: null, audience: '全部开发者', how: '申请 Token Plan Key 后调用',
      url: 'https://www.sensetime.com/', source: 'https://aitujian.cn/free-ai-api.html',
      note: '公测随时可能转收费，适合短期验证多模态与对话能力。', tags: ['公测', 'OpenAI 兼容', '多模态']
    },
    {
      id: 'modelscope-daily', platform: '魔搭 ModelScope', region: '国内', type: '邀请福利',
      name: '每日登录领 200 魔粒', quota: '200 魔粒 / 天',
      benefit: '每日登录领 200 魔粒，单模型约 500 次免费调用，覆盖大量开源模型。',
      deadline: null, audience: '全部用户', how: '每日登录魔搭领取',
      url: 'https://www.modelscope.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '部分魔粒有效期仅 1 天，当天领当天用，不能累积。', tags: ['每日领', '开源模型', '当天有效']
    },
    {
      id: 'moonshot-voucher', platform: 'Kimi 开放平台（月之暗面）', region: '国内', type: '免费额度',
      name: '新用户实名送 15 元代金券', quota: '15 元 / 3 个月',
      benefit: '新用户完成实名认证赠送 15 元代金券，有效期 3 个月，可抵扣 API 调用费用；网页 / App 端对话本身免费，长上下文能力强。',
      deadline: null, audience: '实名新用户', how: '开放平台实名后自动发放',
      url: 'https://platform.moonshot.cn/', source: 'https://aitujian.cn/free-ai-api.html',
      note: 'K3.1-Pro 已开放完整权重可自部署，但 API 调用仍按量计费。', tags: ['长上下文', '代金券', '3 个月']
    },
    {
      id: 'qiniu-ai-square', platform: '七牛云 AI 广场', region: '国内', type: '免费额度',
      name: '用即送 300 万全模型额度包', quota: '300 万 Tokens',
      benefit: '用即送 300 万全模型额度包，支持 OpenAI / Anthropic 双格式接口。',
      deadline: null, audience: '新用户', how: '注册并创建 Key 后到账',
      url: 'https://www.qiniu.com/', source: 'https://github.com/Lavie-purple/ai-free-content-digest/blob/main/AI%E5%85%8D%E8%B4%B9%E5%86%85%E5%AE%B9%E4%B8%8E%E6%9D%83%E7%9B%8A%E9%80%9F%E9%80%92-%E7%AC%AC003%E6%9C%9F-2026-09-15.md',
      note: '与 Conatus 每日 1 亿是不同产品线，额度不通用。', tags: ['全模型', '双格式']
    },
    {
      id: 'xiaomi-mimo', platform: '小米 MiMo', region: '国内', type: '免费额度',
      name: '新用户注册送免费体验额度', quota: '未公布',
      benefit: '新用户注册即送免费体验额度，覆盖 MiMo 推理模型；另有 MiMo Claw 每日 3–4 小时云端体验时长。',
      deadline: null, audience: '新用户', how: '开放平台注册领取',
      url: 'https://ai.xiaomi.com/', source: 'https://aitujian.cn/free-ai-api.html',
      note: '官方未公布具体额度数值，以平台内显示为准。', tags: ['推理', '新户', '云端体验']
    },
    {
      id: 'tencent-edgeone', platform: '腾讯云 EdgeOne Makers', region: '国内', type: '免费额度',
      name: '新账号送 50 万 Tokens（免绑卡）', quota: '50 万 Tokens',
      benefit: '新账号送 50 万 Tokens，免绑卡，内置 DeepSeek 与混元，同账号下项目共享额度。',
      deadline: null, audience: '新账号', how: '注册后自动到账',
      url: 'https://edgeone.ai/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '免绑卡是这类活动里少见的，适合零成本试水。', tags: ['免绑卡', '新账号']
    },
    {
      id: 'volc-seed-50w', platform: '火山方舟 · 豆包 Seed', region: '国内', type: '免费额度',
      name: '单模型 50 万 Tokens 基础额度', quota: '50 万 / 单模型',
      benefit: '每个模型额外提供 50 万 Tokens 基础免费额度；「安心体验模式」另有 50 万额度，超额自动暂停。',
      deadline: null, audience: '全部开发者', how: '控制台手动开通模型后生效',
      url: 'https://console.volcengine.com/ark', source: 'https://post.smzdm.com/p/a6z42x4n/',
      note: '安心体验模式关闭后不可再开；必须手动开通模型，否则调不通。', tags: ['豆包', '需手动开通']
    },

    /* ============ 已结束（保留作参考，防止过期教程误导） ============ */
    {
      id: 'moyu-1111', platform: '魔芋 AI', region: '国内', type: '邀请福利',
      name: '双 11 邀请 / 企业认证 / 签到福利', quota: '最高 2.7 亿',
      benefit: '邀请好友最高 1.6 亿、企业认证 1 亿、个人新客实名 1000 万、连续 11 天签到再领 1000 万，全任务合计最高 2.7 亿。',
      deadline: '2026-11-11', audience: '新客 / 老用户回归', how: '客户端内完成对应任务',
      url: 'https://www.moyu.ai/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '双 11 正日 24:00 已关窗；部分清单写个人新客 2000 万，口径不一。', tags: ['已结束', '邀请', '双 11']
    },
    {
      id: 'tiangong-1111', platform: '天工 SkyProduction', region: '国内', type: '免费额度',
      name: '双 11 年包会员最高 60 天免费', quota: '最高 60 天',
      benefit: 'Seedance2.5、Wan3.0、可灵 4.0、MiniMax H3 按规则 0 积分使用，年包会员最高赠 60 天。',
      deadline: '2026-11-11', audience: '会员用户', how: '活动页按规则使用',
      url: 'https://www.tiangong.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '11-11 24:00 关窗，入口已下线。', tags: ['已结束', '视频生成']
    },
    {
      id: 'libtv-1111', platform: 'LibTV', region: '国内', type: '免费额度',
      name: '万相 / 可灵 / MiniMax H3 30 天免费', quota: '30 天 · 0 积分',
      benefit: '双 11 期 Wan3.0、Kling4.0、MiniMax H3 等 3 款模型 0 积分无限使用，赠 30 天。',
      deadline: '2026-11-11', audience: '全部用户', how: '活动页领取',
      url: 'https://liblibai.tv/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '11-11 24:00 关窗。', tags: ['已结束', '视频生成']
    },
    {
      id: 'xfyun-1111-pack', platform: '讯飞星火', region: '国内', type: '免费额度',
      name: '双 11 免费包（个人 200 万 / 企业 500 万）', quota: '200 万 / 500 万',
      benefit: '双 11 期间个人 200 万、企业 500 万 Tokens 免费包，与 10 亿额度并行。',
      deadline: '2026-11-11', audience: '个人 / 企业用户', how: '活动页领取',
      url: 'https://www.xfyun.cn/', source: 'http://mp.weixin.qq.com/s?__biz=MzI0NzczMzYyMw==&mid=2247484648&idx=1&sn=da98831b58fda4f5ece34e6cb0889687',
      note: '双 11 活动已结束，但实名领 10 亿 Tokens 的常驻活动仍在。', tags: ['已结束', '双 11']
    },

    /* ============ 海外 · 学生与教育 ============ */
    {
      id: 'copilot-student', platform: 'GitHub Copilot Student', region: '海外', type: '学生教育',
      name: '验证学生身份即免费', quota: '$0 / 在读期间',
      benefit: 'GitHub Education 验证通过后免费使用 Copilot：无限代码补全、每月 GitHub AI Credits、有限的 chat 与 agent 用量（仅自动选模型）。同捆 Student Developer Pack 还含 GitHub Pro、180 核时/月 Codespaces、$100 Azure 额度。',
      deadline: null, audience: '在读学生 · 需学校邮箱 + 在读证明', how: 'github.com/education 提交验证',
      url: 'https://github.com/education/student-developer-pack', source: 'https://www.yesmiracle.net/post/20261105-student-ai-discounts-2026-status',
      note: '目前最稳的免费学生编程工具。常见失败原因是验证邮箱与注册工具邮箱不一致。', tags: ['学生', '免费', 'GitHub']
    },
    {
      id: 'google-ai-student', platform: 'Google AI Pro / AI Plus', region: '海外', type: '学生教育',
      name: '学生 12 个月免费（分地区两档）', quota: '12 个月 · $0',
      benefit: 'SheerID + 学校邮箱验证：美国学生得 12 个月 Google AI Pro（$19.99/月档），其他 140+ 市场得 12 个月 AI Plus（$4.99/月档）。',
      deadline: '2026-12-31', audience: '大学生 · 需 SheerID 验证 + 绑卡', how: '在 12-31 前完成兑换，验证入口见官方页',
      url: 'https://one.google.com/', source: 'https://www.yesmiracle.net/post/20261105-student-ai-discounts-2026-status',
      note: '需在 2026-12-31 前兑换；到期自动续费，记得提前取消。部分地区不适用（含加拿大、中国香港、中国澳门）。', tags: ['学生', '12 个月', '12-31 截止']
    },
    {
      id: 'jetbrains-student', platform: 'JetBrains Student Pack', region: '海外', type: '学生教育',
      name: '全系 IDE 免费（每年续期）', quota: '$0 / 每年续期',
      benefit: 'IntelliJ IDEA Ultimate、PyCharm、WebStorm、GoLand、PhpStorm 等全系 IDE 免费，含 JetBrains AI 选项，限非商业用途。',
      deadline: null, audience: '在读学生 · 学校邮箱 / ISIC / GitHub Student Pack', how: 'JetBrains 官网教育页申请，每年重新验证',
      url: 'https://www.jetbrains.com/community/education/', source: 'https://www.yesmiracle.net/post/20261105-student-ai-discounts-2026-status',
      note: '每年需重新验证在读身份；商业用途需购买商业授权。', tags: ['学生', 'IDE', '每年续期']
    },
    {
      id: 'codex-students', platform: 'OpenAI Codex for Students', region: '海外', type: '学生教育',
      name: '2500 credits（约 $100，12 个月）', quota: '2500 credits',
      benefit: '符合条件的美国、加拿大高校学生可领 2500 credits（约 $100），12 个月有效，用于 Codex 智能体任务。',
      deadline: null, audience: '美加高校学生 · SheerID + 大学邮箱', how: '官方学生页验证后发放',
      url: 'https://openai.com/', source: 'https://www.yesmiracle.net/post/20261105-student-ai-discounts-2026-status',
      note: '是额度而非订阅，用完即止；地区限制较严。', tags: ['Codex', '学生', '美加']
    },
    {
      id: 'kiro-student', platform: 'Kiro（AWS）', region: '海外', type: '学生教育',
      name: '1000 credits/月 × 12 个月', quota: '1000 credits / 月',
      benefit: '符合条件的院校学生验证后，连续 12 个月每月获 1000 credits，用于 Kiro 的规约驱动智能体编码。',
      deadline: null, audience: '指定院校学生 · 学生验证', how: 'Kiro 官网学生页验证',
      url: 'https://kiro.dev/', source: 'https://yesmiracle.net/post/20261019-ai-coding-tools-free-tier-guide',
      note: '需院校在 eligible 名单内；Kiro 另有 Free 档（每月 50 credits）。', tags: ['AWS', '学生', '12 个月']
    },
    {
      id: 'chatgpt-plus-student-ended', platform: 'ChatGPT Plus 学生优惠', region: '海外', type: '学生教育',
      name: '4 个月免费（已结束）', quota: '已结束',
      benefit: '曾提供 SheerID 验证的 4 个月 ChatGPT Plus 免费，需在 2026-10-31 前领取，之后自动按 $20/月续费。',
      deadline: '2026-10-31', audience: '已无法新领', how: '入口已关闭',
      url: 'https://openai.com/', source: 'https://www.yesmiracle.net/post/20261105-student-ai-discounts-2026-status',
      note: '中文圈仍有大量教程在教怎么领，现已失效；已领取的用户注意自动续费。', tags: ['已结束', '防误导', '自动续费']
    },
    {
      id: 'cursor-student-ended', platform: 'Cursor 学生免费 Pro 一年', region: '海外', type: '学生教育',
      name: '1 年 Pro 免费（已停止新注册）', quota: '已结束',
      benefit: '曾通过 SheerID 提供价值 $240 的 1 年 Pro 免费，2026-06-25 起停止新申请，且不再向新客户售卖 Pro 档。',
      deadline: '2026-06-25', audience: '已无法新领', how: '入口已关闭',
      url: 'https://cursor.com/students', source: 'https://whizi.io/resources/cursor-student-discount/',
      note: '现仅剩校园活动 credits（本科生）与研究生 / 研究者的 credits 申请表；旧教程均已失效。', tags: ['已结束', '防误导', 'Cursor']
    },

    /* ============ 海外 · 免费层 ============ */
    {
      id: 'google-aistudio', platform: 'Google AI Studio（Gemini API）', region: '海外', type: '永久免费',
      name: 'Flash 系列免费层，免绑卡', quota: '约 1500 RPD / 15 RPM / 1M TPM',
      benefit: 'Gemini Flash 系列提供免费调用额度（约 1500 请求/天、15 请求/分、100 万 TPM），1M 上下文、原生多模态、免绑卡；App 免费层还含 Nano Banana 2 出图与约 100 创意积分/月。',
      deadline: null, audience: '全部开发者', how: 'AI Studio 申请 API Key 即用',
      url: 'https://aistudio.google.com/', source: 'https://github.com/Lavie-purple/ai-free-content-digest/blob/main/AI%E5%85%8D%E8%B4%B9%E5%86%85%E5%AE%B9%E4%B8%8E%E6%9D%83%E7%9B%8A%E9%80%9F%E9%80%92-%E7%AC%AC003%E6%9C%9F-2026-09-15.md',
      note: '综合能力最强的海外免费档；免费层数据可能用于产品改进，敏感场景先看条款。旧 gemini-cli 教程已失效（2026-06-18 起由 Antigravity CLI 取代）。', tags: ['Gemini', '免绑卡', '1M 上下文']
    },
    {
      id: 'chatgpt-free', platform: 'ChatGPT Free', region: '海外', type: '永久免费',
      name: '文本不限量 + Deep Research 5 份/月', quota: '不限量（有速率上限）',
      benefit: '免费层文本对话不限量（有速率上限），含每月 5 份 Deep Research；Codex 在 ChatGPT Free 中亦有基础入口。',
      deadline: null, audience: '全部用户', how: '注册即用',
      url: 'https://chatgpt.com/', source: 'https://github.com/Lavie-purple/ai-free-content-digest/blob/main/AI%E5%85%8D%E8%B4%B9%E5%86%85%E5%AE%B9%E4%B8%8E%E6%9D%83%E7%9B%8A%E9%80%9F%E9%80%92-%E7%AC%AC003%E6%9C%9F-2026-09-15.md',
      note: '深度思考、出图 / 视频、长文件上传走单独额度，容易悄悄吃满。', tags: ['免费层', 'Deep Research']
    },
    {
      id: 'claude-free', platform: 'Claude Free', region: '海外', type: '永久免费',
      name: '免费层 15–40 条 / 5 小时', quota: '15–40 条 / 5h',
      benefit: '免费层每 5 小时约 15–40 条消息，适合长文写作与文档分析；Claude Code 不含在免费计划内，需订阅或按量 API。',
      deadline: null, audience: '全部用户', how: '注册即用',
      url: 'https://claude.ai/', source: 'https://github.com/Lavie-purple/ai-free-content-digest/blob/main/AI%E5%85%8D%E8%B4%B9%E5%86%85%E5%AE%B9%E4%B8%8E%E6%9D%83%E7%9B%8A%E9%80%9F%E9%80%92-%E7%AC%AC003%E6%9C%9F-2026-09-15.md',
      note: '常见误解：Claude Code 没有免费档，别把它和 Claude 网页免费层混为一谈。', tags: ['免费层', '长文', 'Claude Code 不含']
    },
    {
      id: 'groq-free', platform: 'Groq', region: '海外', type: '永久免费',
      name: '约 14,400 请求 / 天', quota: '≈14,400 RPD',
      benefit: '免费层约 14,400 请求/天，以推理速度见长，适合跑开源模型的低延迟验证。',
      deadline: null, audience: '全部开发者', how: '注册申请 API Key',
      url: 'https://groq.com/', source: 'https://github.com/Lavie-purple/ai-free-content-digest/blob/main/AI%E5%85%8D%E8%B4%B9%E5%86%85%E5%AE%B9%E4%B8%8E%E6%9D%83%E7%9B%8A%E9%80%9F%E9%80%92-%E7%AC%AC003%E6%9C%9F-2026-09-15.md',
      note: '免费层有模型与速率限制，具体以官方 rate limit 页为准。', tags: ['低延迟', '开源模型']
    },
    {
      id: 'copilot-free', platform: 'GitHub Copilot Free', region: '海外', type: '永久免费',
      name: '2000 次补全 / 月', quota: '2000 补全 / 月',
      benefit: '免费档每月 2000 次代码补全，外加有限的 chat 与 agent 用量；只能自动选模型，不能指定。Cursor Hobby、Devin Desktop Free、Kiro Free、Cline（自带 Key）也是同类免费起点。',
      deadline: null, audience: '全部开发者', how: 'GitHub 账号开通 Copilot Free',
      url: 'https://github.com/features/copilot', source: 'https://promoclock.co/en/blog/best-ai-coding-tools',
      note: '限制藏在备注小字里：免费档不支持手动选模型。学生应优先领 Copilot Student。', tags: ['编程', '免费档', '自动选模型']
    }
  ]
};
