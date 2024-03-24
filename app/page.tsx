"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import QuizJson from "./quiz.json";

type Quiz = {
  title: string;
  answer: string;
};

export default function Home() {
  // ルーター
  const router = useRouter();

  // 問題の読み込み
  const quizJson = QuizJson;

  // 問題の上限
  const QUIZ_MAX_COUNT = 3;

  // 対象文字列の塊
  const [quizArray, setQuizArray] = useState<Quiz[]>([]);
  // タイピング対象のワード
  const [currentWord, setCurrentWord] = useState("");
  // タイピング対象の問題文
  const [currentTitle, setCurrentTitle] = useState("");
  // ユーザ入力値
  const [userInput, setUserInput] = useState("");
  // ミスタイピング数
  const [missCount, setMissCount] = useState(0);
  // 現在何問目か
  const [currentQuizNumber, setCurrentQuizNumber] = useState(0);

  useEffect(() => {
    // 問題をまぜて、10個の配列にしたい
    const quizArray = quizJson;
    setQuizArray(quizArray);
  }, [quizJson]);

  useEffect(() => {
    if (quizArray.length > 0) {
      setCurrentTitle(quizArray[currentQuizNumber].title);
      setCurrentWord(quizArray[currentQuizNumber].answer);
    }
  }, [quizArray, currentQuizNumber]);

  /**
   * ユーザの入力値を検知し、正解と比較
   * 間違っている場合はmissCountを増やす
   * ユーザ入力値が正解と完全一致で、問題番号(currentQuizNumber)を更新
   */
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputWord = e.currentTarget.value;
    const inputLength = inputWord.length;

    // テキストボックスを更新
    setUserInput(inputWord);

    // 完全一致で問題番号(currentQuizNumber)を更新し、次の問題へ進む
    if (inputWord === currentWord) {
      // 問題数が上限に達したら、結果表示画面へ遷移
      if (currentQuizNumber + 1 === QUIZ_MAX_COUNT) {
        return router.push("/result");
      }

      setCurrentQuizNumber((prev) => prev + 1);
      setUserInput("");
      return;
    }

    // 比較
    if (inputWord[inputLength - 1] !== currentWord[inputLength - 1]) {
      console.log("ミスタイピング");
      setMissCount((prev) => prev + 1);
    }
  };

  return (
    <main className={styles.main}>
      <h2>-Typing Game-</h2>
      <div style={{ textAlign: "center" }}>
        <h2>{currentTitle}</h2>
        <h3>{currentWord}</h3>
      </div>
      <input
        type="text"
        name="typing"
        value={userInput}
        onChange={handleUserInput}
        style={{ height: "40px", fontSize: "20px", padding: "10px" }}
      />
      <h3>ミス:{missCount}</h3>
    </main>
  );
}
