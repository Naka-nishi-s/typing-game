"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  // タイピング対象のワード
  const [word, setWord] = useState(["banana", "apple"]);
  const [currentWord, setCurrentWord] = useState("");

  console.log("word", word);
  console.log("currentWord", currentWord);

  // ユーザ入力値
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    setCurrentWord(word[0][0]);
  }, []);

  /**
   * ユーザの入力値を検知し、userInputを更新する
   */
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputWord = e.currentTarget.value;
    setUserInput(userInput);

    // ユーザ入力値と現在選択されている単語の値を比較
    if (inputWord === currentWord) {
      console.log("OK.");
    }
  };

  return (
    <main className={styles.main}>
      <h2>-Typing Game-</h2>
      <input
        type="text"
        name="typing"
        value={userInput}
        onChange={handleUserInput}
      />
    </main>
  );
}
