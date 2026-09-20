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
    "flex min-h-16 w-full items-center justify-center rounded-2xl text-xl font-semibold select-none transition-all duration-200 ease-out active:scale-90 hover:-translate-y-0.5 sm:min-h-[72px] sm:text-2xl";

  const variantStyles = {
    number:
      "border border-white/10 bg-white/10 text-white hover:bg-white/20 hover:border-white/20 hover:shadow-lg hover:shadow-white/5",

    operator:
      "bg-amber-400 text-black shadow-lg shadow-amber-400/10 hover:bg-amber-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/20",

    action:
      "border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/15 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5",

    equals:
      "bg-amber-500 text-black shadow-xl shadow-amber-500/20 hover:bg-amber-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/30",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;