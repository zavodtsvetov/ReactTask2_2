import styles from "./app.module.css";
import data from "./data.json";
import { act, useState } from "react";

export const App = () => {
  // Два состояния: шаги и индекс, определяющий шаг
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);
  // const [isFirstStep, setIsFirstStep] = useState(true);
  // const [isLastStep, setIsLastStep] = useState(false);

  // Обработчики событий: клик назад, клик вперед и клик сначала
  const lastStepCLick = () => {
    setActiveIndex(activeIndex - 1);
  };
  const nextStepClick = () => {
    setActiveIndex(activeIndex + 1);
  };
  const toStartClick = () => {
    setActiveIndex(0);
  };
  const currentStep = (index) => {
    setActiveIndex(index);
  };

  // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
  let isFirstStep = true;
  let isLastStep = false;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {data[activeIndex]["content"]}
          </div>
          <ul className={styles["steps-list"]}>
            {steps.map((step, idx) => (
              <li
                key={step.id}
                className={
                  activeIndex > idx - 1
                    ? styles["steps-item"] +
                      " " +
                      (activeIndex === idx
                        ? styles.done + " " + styles.active
                        : styles.done)
                    : styles["steps-item"]
                }
              >
                <button
                  onClick={() => currentStep(idx)}
                  className={styles["steps-item-button"]}
                >
                  {idx + 1}
                </button>
                {step.title}
              </li>
            ))}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              onClick={lastStepCLick}
              className={styles.button}
              disabled={activeIndex === 0 ? isFirstStep : !isFirstStep}
            >
              Назад
            </button>
            {activeIndex === steps.length - 1 ? (
              (!isLastStep,
              (
                <button onClick={toStartClick} className={styles.button}>
                  Начать сначала
                </button>
              ))
            ) : (
              <button onClick={nextStepClick} className={styles.button}>
                Далее
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
