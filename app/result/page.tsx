import styles from "./page.module.css";

export default function Result() {
  return (
    <main className={styles.main}>
      <h1>結果発表</h1>
      <p>クリア時間:</p>
      <p>ミスタイプ:</p>
      <p>スコア:</p>
      <p>ランク:</p>
    </main>
  );
}
