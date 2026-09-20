interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant?: "number" | "operator" | "action" | "equals";
}

const CalculatorButton = ({
  label,
  onClick,
  variant = "number",
}: CalculatorButtonProps) => {
  const baseStyles =
    "group relative flex min-h-16 w-full items-center justify-center overflow-hidden rounded-2xl select-none font-semibold transition-all duration-200 ease-out active:scale-90 sm:min-h-[72px] touch-manipulation";

  const variantStyles = {
    number:
      "border border-white/10 bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-white shadow-md hover:-translate-y-1 hover:border-indigo-400/30 hover:from-slate-700 hover:to-indigo-900 hover:shadow-lg hover:shadow-indigo-500/20",

    operator:
      "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-1 hover:from-indigo-400 hover:to-violet-500 hover:shadow-xl hover:shadow-violet-500/30",

    action:
      "border border-white/10 bg-gradient-to-br from-slate-800/70 to-indigo-950/70 text-slate-300 shadow-md hover:-translate-y-1 hover:border-violet-400/20 hover:bg-indigo-900/80 hover:text-white hover:shadow-lg hover:shadow-indigo-500/10",

    equals:
      "bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600 text-white shadow-xl shadow-violet-500/30 hover:-translate-y-1 hover:from-violet-400 hover:via-indigo-400 hover:to-blue-500 hover:shadow-2xl hover:shadow-violet-500/40",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {/* Glow */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Ripple */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white/20 opacity-0 transition-all duration-300 group-active:scale-[12] group-active:opacity-100" />

      {/* Button text */}
      <span className="relative z-10 text-xl sm:text-2xl">
        {label}
      </span>
    </button>
  );
};

export default CalculatorButton;