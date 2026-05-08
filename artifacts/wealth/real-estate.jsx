// @ts-nocheck
import React, { createContext, useContext, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Home,
  LineChart,
  MapPin,
  Scale,
  ShieldAlert,
  TimerReset
} from 'lucide-react'
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine
} from 'recharts'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Card({ className = '', children, ...rest }) {
  return (
    <div
      className={cx(
        'rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

function CardContent({ className = '', children, ...rest }) {
  return (
    <div className={cx('p-6', className)} {...rest}>
      {children}
    </div>
  )
}

function Button({ variant = 'default', className = '', children, ...rest }) {
  const variants = {
    default:
      'bg-slate-950 text-white hover:bg-slate-800 focus-visible:ring-slate-700',
    outline:
      'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-300',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-200'
  }
  return (
    <button
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant] ?? variants.default,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

function Badge({ variant = 'default', className = '', children, ...rest }) {
  const variants = {
    default: 'bg-slate-900 text-white border-transparent',
    secondary: 'bg-slate-100 text-slate-700 border-transparent',
    outline: 'border border-slate-300 text-slate-700 bg-transparent'
  }
  return (
    <span
      className={cx(
        'inline-flex items-center border px-2.5 py-0.5 text-xs font-medium leading-5',
        variants[variant] ?? variants.default,
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}

/** @type {React.Context<any>} */
const TabsContext = createContext(null)

function Tabs({
  defaultValue,
  value,
  onValueChange,
  className = '',
  children
}) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value !== undefined ? value : internal
  const setCurrent = (next) => {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }
  return (
    <TabsContext.Provider value={{ value: current, setValue: setCurrent }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

function TabsList({ className = '', children }) {
  return (
    <div role="tablist" className={cx('inline-flex', className)}>
      {children}
    </div>
  )
}

function TabsTrigger({ value, className = '', children }) {
  const ctx = useContext(TabsContext)
  const active = ctx?.value === value
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={() => ctx?.setValue(value)}
      className={cx(
        'inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-all focus:outline-none',
        active
          ? 'bg-slate-950 text-white shadow-sm'
          : 'text-slate-600 hover:text-slate-900',
        className
      )}
    >
      {children}
    </button>
  )
}

function TabsContent({ value, className = '', children }) {
  const ctx = useContext(TabsContext)
  if (ctx?.value !== value) return null
  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  )
}

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
}

const valuationCards = [
  {
    title: '合理首挂区间',
    value: '368–388 万',
    desc: '适合试探市场，但不宜长期高挂。',
    icon: CircleDollarSign
  },
  {
    title: '稳妥成交区间',
    value: '355–375 万',
    desc: '当前更接近真实可成交价格带。',
    icon: CheckCircle2
  },
  {
    title: '快出建议首挂',
    value: '372–382 万',
    desc: '预留约 3%–5% 议价空间。',
    icon: TimerReset
  },
  {
    title: '原始总成本',
    value: '380 万',
    desc: '住宅 350 万 + 车位 30 万。',
    icon: Home
  }
]

const comps = [
  { name: '低层南向精装含车位', area: 92.61, price: 370, unit: 39953 },
  { name: '南向带子母车位', area: 92.94, price: 360, unit: 38735 },
  { name: '南北精装近地铁', area: 90.51, price: 369, unit: 40769 },
  { name: '架空层/低楼层', area: 92.62, price: 335, unit: 36170 },
  { name: '南向边套精装地暖', area: 92.14, price: 368, unit: 39940 },
  { name: '低层精装含车位高挂', area: 91.28, price: 400, unit: 43800 },
  { name: '低楼层南北', area: 93.38, price: 348, unit: 37270 }
]

const houseForecast = [
  { year: '当前', base: 365, optimistic: 365, pessimistic: 365 },
  { year: '1年', base: 358, optimistic: 376, pessimistic: 334 },
  { year: '3年', base: 366, optimistic: 416, pessimistic: 318 },
  { year: '5年', base: 391, optimistic: 462, pessimistic: 320 },
  { year: '10年', base: 459, optimistic: 586, pessimistic: 348 }
]

const cityForecast = [
  { year: '1年', center: '约 3.03 万/㎡', view: '横盘或弱修复' },
  { year: '3年', center: '约 3.15 万/㎡', view: '缓慢修复' },
  { year: '5年', center: '约 3.32 万/㎡', view: '低斜率上行' },
  { year: '10年', center: '约 3.88 万/㎡', view: '取决于人口与产业吸附力' }
]

const decisionRules = [
  {
    title: '如果第一目标是卖掉',
    result: '现在可以卖，且应抓住成交窗口。',
    detail:
      '建议先挂 378 万左右；14 天内带看和询价弱，就下修到 368–372 万；底价守在 355–365 万。',
    icon: CheckCircle2
  },
  {
    title: '如果第一目标是卖贵',
    result: '现在不是最佳卖价时点。',
    detail:
      '1–3 年内明显高于当前成交中枢的概率不高；若想重新站上成本线，更偏向 5 年以上周期。',
    icon: CalendarClock
  },
  {
    title: '最终判断',
    result: '不是最好价格点，但可能是未来 12 个月较好的成交点。',
    detail: '量在修复，价仍承压。成交窗口与价格窗口已经分离。',
    icon: Scale
  }
]

const risks = [
  {
    label: '解限与增挂',
    level: '高',
    desc: '天空之城进入解限/增挂阶段，同类房源供应上升。'
  },
  {
    label: '板块新供地',
    level: '中高',
    desc: '未来科技城与云城仍有新增涉宅地供应。'
  },
  {
    label: '高库存博弈',
    level: '高',
    desc: '杭州二手房库存仍高，买方议价权强。'
  },
  {
    label: '税费与佣金',
    level: '中',
    desc: '实际到手价可能低于成交价 4–20 万以上。'
  },
  {
    label: '轨交兑现',
    level: '利好',
    desc: '12 号线若按期兑现，对中长期通达性有加分。'
  },
  {
    label: '城市基本面',
    level: '利好',
    desc: '杭州人口、产业、收入韧性仍是长期支撑。'
  }
]

const netTable = [
  {
    deal: '355万',
    full: '约351.5万',
    notOnly: '约347.9万',
    lessTwo: '约337.3万'
  },
  {
    deal: '365万',
    full: '约361.4万',
    notOnly: '约357.7万',
    lessTwo: '约346.8万'
  },
  {
    deal: '375万',
    full: '约371.3万',
    notOnly: '约367.5万',
    lessTwo: '约356.3万'
  },
  {
    deal: '385万',
    full: '约381.2万',
    notOnly: '约377.3万',
    lessTwo: '约365.8万'
  }
]

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-sm font-medium text-slate-500">{eyebrow}</div>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          {desc}
        </p>
      ) : null}
    </div>
  )
}

function MetricCard({ item, index }) {
  const Icon = item.icon
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.06 }}
    >
      <Card className="h-full rounded-3xl border-slate-200 bg-white/85 shadow-sm backdrop-blur">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <Icon className="h-5 w-5" />
            </div>
            <Badge variant="secondary" className="rounded-full">
              核心
            </Badge>
          </div>
          <div className="text-sm text-slate-500">{item.title}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {item.value}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-lg">
      <div className="mb-2 font-medium text-slate-900">{label}</div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          className="flex items-center justify-between gap-4 text-slate-600"
        >
          <span>{p.name}</span>
          <span className="font-medium text-slate-900">{p.value} 万</span>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [mode, setMode] = useState('sell')

  const currentPosition = useMemo(() => {
    if (mode === 'sell')
      return '建议把成交确定性放在第一位，避免高挂拖成陈列品。'
    return '可以继续持有，但要接受 3–5 年的不确定波动和机会成本。'
  }, [mode])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f8fafc,#eef2ff_35%,#f8fafc_70%)] text-slate-900">
      <header className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-950 p-2 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">天空之城·星之里</div>
              <div className="text-xs text-slate-500">
                92㎡ + 车位｜出售决策看板
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={mode === 'sell' ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => setMode('sell')}
            >
              我要卖掉
            </Button>
            <Button
              variant={mode === 'price' ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => setMode('price')}
            >
              我要卖贵
            </Button>
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-7 shadow-sm backdrop-blur md:p-10">
            <Badge className="mb-5 rounded-full">核心结论</Badge>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              现在不是最佳卖价时点，但可能是较好的成交窗口。
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              当前市场特征是“量修复、价承压”。如果目标是尽快回笼资金、换仓或降低继续下跌风险，现在可以卖；如果目标是尽量覆盖
              380 万总成本和税佣成本，则需要更长周期等待修复。
            </p>
            <div className="mt-8 rounded-3xl bg-slate-950 p-5 text-white">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0" />
                <div>
                  <div className="text-sm text-slate-300">当前策略倾向</div>
                  <div className="mt-1 text-xl font-semibold">
                    {currentPosition}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="rounded-[2rem] border-slate-200 bg-white/85 shadow-sm backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">资产定位</span>
                </div>
                <div className="text-2xl font-semibold">
                  次新、轨交、改善型自住资产
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  优势是五常站上盖、配套已兑现、城市基本面仍强；压力是同类房源增挂、二手库存高、买方议价权强。
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border-slate-200 bg-white/85 shadow-sm backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <ShieldAlert className="h-4 w-4" />
                  <span className="text-sm">最重要风险</span>
                </div>
                <div className="text-2xl font-semibold">
                  高挂超过市场带宽 5% 以上，会显著拉长去化周期。
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  对买方市场里的次新房源，时间越长越容易被标记为“卖不动”，后续议价更被动。
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <section className="mb-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {valuationCards.map((item, index) => (
            <MetricCard key={item.title} item={item} index={index} />
          ))}
        </section>

        <Tabs defaultValue="price" className="mb-16">
          <TabsList className="mb-8 grid h-auto w-full grid-cols-2 rounded-2xl bg-white/70 p-1 md:w-[520px] md:grid-cols-4">
            <TabsTrigger value="price" className="rounded-xl">
              价格判断
            </TabsTrigger>
            <TabsTrigger value="forecast" className="rounded-xl">
              走势预测
            </TabsTrigger>
            <TabsTrigger value="decision" className="rounded-xl">
              出售策略
            </TabsTrigger>
            <TabsTrigger value="risk" className="rounded-xl">
              风险变量
            </TabsTrigger>
          </TabsList>

          <TabsContent value="price">
            <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="rounded-[2rem] border-slate-200 bg-white/85 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <SectionTitle
                    eyebrow="估值逻辑"
                    title="不要看小区均价，要看同面积段真实带宽"
                    desc="90–93㎡产品的主流挂牌带宽已更接近 335–400 万，能快速消化的甜蜜区集中在 355–375 万。"
                  />
                  <div className="space-y-4">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <div className="text-sm text-slate-500">当前判断</div>
                      <div className="mt-1 text-2xl font-semibold">
                        成交中枢约 365 万
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        若楼层、装修、车位位置更优，可向上沿靠；若低楼层、临路、税费不友好，则更可能落在下半区。
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <div className="text-sm text-slate-500">车位估值</div>
                      <div className="mt-1 text-2xl font-semibold">
                        普通位约 18–25 万
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        弱市里车位通常难以按原购入价完整兑现，优位或子母位可向
                        25–30 万靠。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-slate-200 bg-white/85 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm text-slate-500">可比样本</div>
                      <h3 className="text-xl font-semibold">挂牌总价分布</h3>
                    </div>
                    <Badge variant="outline" className="rounded-full">
                      单位：万元
                    </Badge>
                  </div>
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comps}
                        margin={{ top: 20, right: 10, left: -20, bottom: 55 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-28}
                          textAnchor="end"
                          interval={0}
                          height={80}
                          tick={{ fontSize: 11 }}
                        />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value} 万`, '挂牌总价']}
                          labelStyle={{ color: '#0f172a' }}
                        />
                        <ReferenceLine
                          y={365}
                          label="成交中枢"
                          strokeDasharray="4 4"
                        />
                        <Bar
                          dataKey="price"
                          name="挂牌总价"
                          radius={[10, 10, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="forecast">
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="rounded-[2rem] border-slate-200 bg-white/85 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <SectionTitle
                    eyebrow="未来 1 / 3 / 5 / 10 年"
                    title="你的房源价格路径推演"
                    desc="以当前较合理成交带 355–375 万为起点，分为基准、乐观、悲观三种路径。"
                  />
                  <div className="h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RLineChart
                        data={houseForecast}
                        margin={{ top: 10, right: 20, left: -15, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis domain={[280, 620]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="base"
                          name="基准"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="optimistic"
                          name="乐观"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="pessimistic"
                          name="悲观"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                        <ReferenceLine
                          y={380}
                          label="原始成本"
                          strokeDasharray="5 5"
                        />
                      </RLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-slate-200 bg-white/85 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <SectionTitle
                    eyebrow="杭州整体"
                    title="不是暴涨，而是低斜率修复"
                  />
                  <div className="space-y-3">
                    {cityForecast.map((row) => (
                      <div
                        key={row.year}
                        className="flex items-center justify-between rounded-3xl bg-slate-50 p-4"
                      >
                        <div>
                          <div className="font-semibold text-slate-950">
                            {row.year}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {row.view}
                          </div>
                        </div>
                        <div className="text-right text-lg font-semibold">
                          {row.center}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <LineChart className="h-4 w-4" />
                      概率加权中枢
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      你的房源：1年约 358 万，3年约 366 万，5年约 391 万，10年约
                      459 万。真正重新站上成本线以上，更偏向 5 年以上。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="decision">
            <section className="grid gap-6 lg:grid-cols-3">
              {decisionRules.map((rule, index) => {
                const Icon = rule.icon
                return (
                  <motion.div
                    key={rule.title}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.08 }}
                  >
                    <Card className="h-full rounded-[2rem] border-slate-200 bg-white/85 shadow-sm">
                      <CardContent className="p-6">
                        <div className="mb-5 rounded-2xl bg-slate-100 p-3 text-slate-700 w-fit">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-sm text-slate-500">
                          {rule.title}
                        </div>
                        <h3 className="mt-2 text-2xl font-semibold leading-snug">
                          {rule.result}
                        </h3>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                          {rule.detail}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </section>

            <Card className="mt-6 rounded-[2rem] border-slate-200 bg-white/85 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <SectionTitle
                  eyebrow="执行纪律"
                  title="两段式定价，不要恋战"
                  desc="市场当前更奖励“价格清晰、调整果断”的卖家。"
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="text-sm text-slate-500">第一阶段</div>
                    <div className="mt-2 text-2xl font-semibold">
                      挂 378 万左右
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      观察前 14 天带看量、收藏量、经纪人真实反馈。
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="text-sm text-slate-500">第二阶段</div>
                    <div className="mt-2 text-2xl font-semibold">
                      调至 368–372 万
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      如果询价弱，快速进入更有竞争力的价格带。
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <div className="text-sm text-slate-500">底线区间</div>
                    <div className="mt-2 text-2xl font-semibold">
                      守 355–365 万
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      低于此区间，除非你有强烈资金需求，否则不必急卖。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="rounded-[2rem] border-slate-200 bg-white/85 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <SectionTitle
                    eyebrow="影响价格的变量"
                    title="真正决定价格的不是社区均价"
                    desc="价格由具体房况、买方预算天花板、板块供应节奏共同决定。"
                  />
                  <div className="grid gap-3">
                    {risks.map((risk) => (
                      <div
                        key={risk.label}
                        className="rounded-3xl bg-slate-50 p-4"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="font-semibold">{risk.label}</div>
                          <Badge
                            variant={
                              risk.level === '利好' ? 'default' : 'secondary'
                            }
                            className="rounded-full"
                          >
                            {risk.level}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {risk.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-slate-200 bg-white/85 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <SectionTitle
                    eyebrow="到手价敏感性"
                    title="成交价不等于到手价"
                    desc="下面为简化测算，佣金按 1% 估算，不同税务身份会明显改变实际结果。"
                  />
                  <div className="overflow-hidden rounded-3xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-100 text-slate-600">
                        <tr>
                          <th className="p-4 font-medium">成交价</th>
                          <th className="p-4 font-medium">满二且满五唯一</th>
                          <th className="p-4 font-medium">满二但非唯一</th>
                          <th className="p-4 font-medium">未满二</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {netTable.map((row) => (
                          <tr key={row.deal}>
                            <td className="p-4 font-semibold">{row.deal}</td>
                            <td className="p-4">{row.full}</td>
                            <td className="p-4">{row.notOnly}</td>
                            <td className="p-4">{row.lessTwo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <ArrowDownRight className="h-4 w-4" />
                        折价因素
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        低楼层、临路、装修一般、税费不友好、车位位置差。
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <ArrowUpRight className="h-4 w-4" />
                        溢价因素
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        中高楼层、无遮挡、边套、升级装修、优位或子母车位。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>

        <section className="rounded-[2rem] bg-slate-950 p-7 text-white md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-3 text-sm text-slate-400">一句话结论</div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                想卖掉：现在卖。想卖贵：再等等。
              </h2>
            </div>
            <div className="text-sm leading-7 text-slate-300">
              如果你是换房、置换、降杠杆、不想继续承担板块供应压力，建议现在进入市场，但要用
              372–382 万首挂、14 天复盘、底价 355–365
              万的纪律执行。如果你不急用钱，也能承受 3–5
              年波动，则不必在当前以明显低于成本的价格急出。
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
