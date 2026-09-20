import { useEffect, useMemo, useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";

type Operator = "+" | "-" | "*" | "/" | null;

interface HistoryItem {
  expression: string;
  result: string;
}

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState("");

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [displayAnimating, setDisplayAnimating] = useState(false);

  // Falling numbers
  const rainNumbers = useMemo(
    () =>
      Array.from({ length: 45 }, (_, index) => ({
        id: index,
        number: Math.floor(Math.random() * 10),
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 5 + Math.random() * 6,
        size: 14 + Math.random() * 12,
      })),
    []
  );

  const animateDisplay = () => {
    setDisplayAnimating(false);

    requestAnimationFrame(() => {
      setDisplayAnimating(true);
    });
  };

  const updateDisplay = (value: string) => {
    setDisplay(value);
    animateDisplay();
  };

  const clearCalculator = () => {
    updateDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression("");
  };

  const inputNumber = (number: string) => {
    if (display === "Error") {
      updateDisplay(number);
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      setExpression("");
      return;
    }

    if (waitingForOperand) {
      updateDisplay(number);
      setWaitingForOperand(false);
      return;
    }

    if (display === "0") {
      updateDisplay(number);
    } else if (display.length < 15) {
      updateDisplay(display + number);
    }
  };

  const inputDecimal = () => {
    if (display === "Error") {
      clearCalculator();
      updateDisplay("0.");
      return;
    }

    if (waitingForOperand) {
      updateDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      updateDisplay(display + ".");
    }
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    currentOperator: Operator
  ): number | null => {
    switch (currentOperator) {
      case "+":
        return firstValue + secondValue;

      case "-":
        return firstValue - secondValue;

      case "*":
        return firstValue * secondValue;

      case "/":
        if (secondValue === 0) {
          return null;
        }

        return firstValue / secondValue;

      default:
        return secondValue;
    }
  };

  const formatResult = (result: number): string => {
    if (!Number.isFinite(result)) {
      return "Error";
    }

    return String(Number(result.toPrecision(12)));
  };

  const chooseOperator = (nextOperator: Operator) => {
    if (display === "Error") {
      return;
    }

    const currentValue = Number(display);

    if (
      previousValue !== null &&
      operator !== null &&
      !waitingForOperand
    ) {
      const result = calculate(previousValue, currentValue, operator);

      if (result === null) {
        updateDisplay("Error");
        setPreviousValue(null);
        setOperator(null);
        setExpression("");
        return;
      }

      const formattedResult = formatResult(result);

      updateDisplay(formattedResult);
      setPreviousValue(result);
      setExpression(`${formattedResult} ${nextOperator ?? ""}`);
    } else {
      setPreviousValue(currentValue);
      setExpression(`${display} ${nextOperator ?? ""}`);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const performCalculation = () => {
    if (previousValue === null || operator === null) {
      return;
    }

    const currentValue = Number(display);
    const result = calculate(previousValue, currentValue, operator);

    if (result === null) {
      updateDisplay("Error");
      setPreviousValue(null);
      setOperator(null);
      setExpression("");
      return;
    }

    const formattedResult = formatResult(result);

    const operatorSymbol =
      operator === "*"
        ? "×"
        : operator === "/"
          ? "÷"
          : operator;

    const calculationExpression =
      `${previousValue} ${operatorSymbol} ${currentValue}`;

    setHistory((currentHistory) =>
      [
        {
          expression: calculationExpression,
          result: formattedResult,
        },
        ...currentHistory,
      ].slice(0, 10)
    );

    updateDisplay(formattedResult);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
    setExpression("");
  };

  const handlePercentage = () => {
    if (display === "Error") {
      return;
    }

    const result = Number(display) / 100;
    updateDisplay(formatResult(result));
  };

  const toggleSign = () => {
    if (display === "Error" || display === "0") {
      return;
    }

    if (display.startsWith("-")) {
      updateDisplay(display.slice(1));
    } else {
      updateDisplay(`-${display}`);
    }
  };

  const deleteLastDigit = () => {
    if (display === "Error") {
      clearCalculator();
      return;
    }

    if (waitingForOperand) {
      return;
    }

    if (
      display.length === 1 ||
      (display.length === 2 && display.startsWith("-"))
    ) {
      updateDisplay("0");
      return;
    }

    updateDisplay(display.slice(0, -1));
  };

  const handleButtonClick = (value: string) => {
    if (/^\d$/.test(value)) {
      inputNumber(value);
      return;
    }

    switch (value) {
      case ".":
        inputDecimal();
        break;

      case "AC":
        clearCalculator();
        break;

      case "BACKSPACE":
        deleteLastDigit();
        break;

      case "%":
        handlePercentage();
        break;

      case "+/-":
        toggleSign();
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        chooseOperator(value);
        break;

      case "=":
        performCalculation();
        break;

      default:
        break;
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/^\d$/.test(key)) {
        event.preventDefault();
        inputNumber(key);
        return;
      }

      if (key === ".") {
        event.preventDefault();
        inputDecimal();
        return;
      }

      if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
      ) {
        event.preventDefault();
        chooseOperator(key as Operator);
        return;
      }

      if (key === "%") {
        event.preventDefault();
        handlePercentage();
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        performCalculation();
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        deleteLastDigit();
        return;
      }

      if (key === "Escape") {
        event.preventDefault();
        clearCalculator();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 px-4 py-6 text-white sm:px-6 sm:py-10">

      {/* ============================= */}
      {/* Falling Numbers Background     */}
      {/* ============================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {rainNumbers.map((item) => (
          <span
            key={item.id}
            className="absolute -top-12 font-mono font-bold text-violet-400/20"
            style={{
              left: `${item.left}%`,
              fontSize: `${item.size}px`,
              animation: `numberRain ${item.duration}s linear ${item.delay}s infinite`,
            }}
          >
            {item.number}
          </span>
        ))}
      </div>

      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl" />

      {/* ============================= */}
      {/* Calculator                     */}
      {/* ============================= */}

      <section className="relative z-10 w-full max-w-[420px]">
        <div className="rounded-[2rem] border border-indigo-400/20 bg-slate-950/60 p-4 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl sm:p-6">

          <Display
            value={display}
            expression={expression}
            animated={displayAnimating}
          />

          <ButtonGrid onButtonClick={handleButtonClick} />

          {/* History Controls */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="rounded-xl border border-indigo-400/20 bg-indigo-950/60 px-4 py-2 text-xs text-slate-400 transition-all duration-200 hover:bg-indigo-900/70 hover:text-violet-300 active:scale-95"
            >
              {showHistory ? "Hide History" : "History"}
            </button>

            <p className="text-[11px] text-slate-600">
              Keyboard supported
            </p>
          </div>

          {/* History */}
          {showHistory && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-indigo-400/20 bg-slate-950/70">
              <div className="flex items-center justify-between border-b border-indigo-400/10 px-4 py-3">
                <h2 className="text-sm font-medium text-white">
                  Calculation History
                </h2>

                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-xs text-slate-500 transition-colors hover:text-violet-400"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="px-4 py-6 text-center text-xs text-slate-600">
                    No calculations yet
                  </p>
                ) : (
                  history.map((item, index) => (
                    <div
                      key={`${item.expression}-${index}`}
                      className="border-b border-indigo-400/10 px-4 py-3 last:border-b-0"
                    >
                      <p className="text-right text-xs text-slate-500">
                        {item.expression}
                      </p>

                      <p className="mt-1 text-right font-mono text-lg text-violet-300">
                        = {item.result}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <p className="mt-4 text-center text-[11px] text-slate-600">
            Press Esc to clear
          </p>
        </div>
      </section>
    </main>
  );
};

export default Calculator;