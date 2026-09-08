interface DisplayProps {
  value: string;
  expression: string;
}

const Display = ({ value, expression }: DisplayProps) => {
  return (
    <div className="mb-5 overflow-hidden rounded-3xl border border-white/10 bg-black/50 px-5 py-5 shadow-inner backdrop-blur-md">
      <div className="mb-2 h-6 overflow-hidden text-right text-sm text-neutral-500">
        {expression || "\u00A0"}
      </div>

      <div
        className="overflow-hidden text-ellipsis whitespace-nowrap text-right font-mono text-4xl font-semibold tracking-tight text-amber-400 sm:text-5xl"
        title={value}
      >
        {value}
      </div>
    </div>
  );
};

export default Display;