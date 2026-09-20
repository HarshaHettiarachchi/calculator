interface DisplayProps {
  value: string;
  expression: string;
  animated?: boolean;
}

const Display = ({
  value,
  expression,
  animated = false,
}: DisplayProps) => {
  return (
    <div className="mb-5 overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 px-5 py-5 shadow-inner shadow-violet-500/10">
      <div className="mb-2 h-6 overflow-hidden text-right text-sm text-slate-400">
        {expression || "\u00A0"}
      </div>

      <div
        className={`overflow-hidden text-ellipsis whitespace-nowrap text-right font-mono text-4xl font-semibold tracking-tight text-violet-300 transition-all duration-200 sm:text-5xl ${
          animated
            ? "scale-[1.03] opacity-100"
            : "scale-100 opacity-90"
        }`}
        title={value}
      >
        {value}
      </div>
    </div>
  );
};

export default Display;