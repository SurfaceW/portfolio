export default function OpenClawCheatSheet() {
  const sections = [
    {
      title: 'Gateway',
      items: [
        ['Start gateway', 'openclaw gateway'],
        ['Install service', 'openclaw gateway install --force'],
        ['Status', 'openclaw status --all'],
        ['Logs', 'openclaw logs --follow'],
        ['Restart', 'pkill -f openclaw && openclaw gateway']
      ]
    },
    {
      title: 'Debug',
      items: [
        ['Auto-fix', 'openclaw doctor --fix'],
        ['Health check', 'openclaw doctor'],
        ['New token', 'openclaw doctor --generate-gateway-token'],
        ['Check port', 'lsof -i :18789'],
        [
          'Hard reset',
          'pkill -f openclaw && rm -rf ~/.openclaw/tmp && openclaw doctor --fix && openclaw gateway'
        ]
      ]
    },
    {
      title: 'Devices',
      items: [
        ['List', 'openclaw devices list'],
        ['Approve latest', 'openclaw devices approve --latest'],
        ['Reject', 'openclaw devices reject <requestId>'],
        ['Remove', 'openclaw devices remove <deviceId>'],
        ['Clear all', 'openclaw devices clear --yes']
      ]
    },
    {
      title: 'Agents',
      items: [
        ['List', 'openclaw agents list'],
        ['Run task', 'openclaw run "your task"'],
        [
          'Run w/ gateway',
          'openclaw run "task" --url ws://127.0.0.1:18789 --token <TOKEN>'
        ]
      ]
    },
    {
      title: 'Skills',
      items: [
        ['List', 'openclaw skills list'],
        ['Install', 'openclaw skills install <skill-name>'],
        ['Remove', 'openclaw skills remove <skill-name>']
      ]
    },
    {
      title: 'Config',
      items: [
        ['Show config', 'openclaw config show'],
        ['Set mode', 'openclaw config set gateway.mode local'],
        ['Config path', '~/.openclaw/openclaw.json'],
        ['Local URL', 'http://127.0.0.1:18789']
      ]
    },
    {
      title: 'macOS Service',
      items: [
        ['Check agent', 'launchctl list | grep openclaw'],
        [
          'Restart service',
          'launchctl unload ~/Library/LaunchAgents/com.openclaw.gateway.plist && launchctl load ~/Library/LaunchAgents/com.openclaw.gateway.plist'
        ]
      ]
    },
    {
      title: 'Quick Flow',
      items: [
        ['First setup', 'openclaw doctor --fix && openclaw gateway'],
        ['Daily run', 'openclaw gateway && openclaw run "your task"'],
        [
          'Gateway unreachable',
          'openclaw logs --follow && lsof -i :18789 && openclaw doctor --fix'
        ]
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-5 flex items-end justify-between gap-4 border-b border-zinc-800 pb-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              OpenClaw CLI Cheatsheet
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Compact one-screen reference for common operations
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500">
            <span className="px-2 py-1 rounded-full border border-zinc-800">
              Gateway
            </span>
            <span className="px-2 py-1 rounded-full border border-zinc-800">
              Debug
            </span>
            <span className="px-2 py-1 rounded-full border border-zinc-800">
              Devices
            </span>
            <span className="px-2 py-1 rounded-full border border-zinc-800">
              Agents
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/70 shadow-lg shadow-black/20 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900 sticky top-0">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                  {section.title}
                </h2>
              </div>
              <div className="p-3 space-y-2">
                {section.items.map(([label, cmd]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-2.5"
                  >
                    <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500 mb-1">
                      {label}
                    </div>
                    <code className="block text-[12px] md:text-[12.5px] leading-5 text-zinc-100 break-all font-mono">
                      {cmd}
                    </code>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
