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
    "group relative flex min-h-16 w-full items-center justify-center overflow-hidden rounded-2xl text-xl font-semibold select-none transition-all duration-200 ease-out active:scale-90 hover:-translate-y-0.5 sm:min-h-[72px] sm:text-2xl";

  const variantStyles = {
    number:
      "border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 text-white hover:from-slate-700 hover:to-indigo-900 hover:border-indigo-400/20 hover:shadow-lg hover:shadow-indigo-500/10",

    operator:
      "bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-violet-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/30",

    action:
      "border border-white/10 bg-gradient-to-br from-slate-800/60 to-indigo-950/60 text-slate-300 hover:from-slate-700 hover:to-indigo-900 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10",

    equals:
      "bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600 text-white shadow-xl shadow-violet-500/30 hover:from-violet-400 hover:via-indigo-400 hover:to-blue-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/40",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
      aria-label={label}
    >
      <span className="pointer-events-none absolute inset-0 scale-0 rounded-full bg-white/20 opacity-0 transition-all duration-300 group-active:scale-150 group-active:opacity-100" />

      <span className="relative z-10">
        {label}
      </span>
    </button>
  );
};

export default CalculatorButton;