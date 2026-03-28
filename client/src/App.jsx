import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  // Apply theme class on body
  useEffect(() => {
    const cls = "theme-dark";
    if (dark) document.documentElement.classList.add(cls);
    else document.documentElement.classList.remove(cls);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  // Generate quiz by calling server
  const generateQuiz = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic!");
      return;
    }
    setLoading(true);
    setQuiz(null);
    setAnswers({});
    setScore(null);

    try {
      const res = await fetch("http://127.0.0.1:4000/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error("Server returned " + res.status);
      const json = await res.json();
      setQuiz(json.data || []);
      setTimeout(() => {
        const el = document.getElementById("quiz-list");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    } catch (err) {
      console.error("Generate error ->", err);
      alert("Error generating quiz. Check server console.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (i, option) => {
    setAnswers((p) => ({ ...p, [i]: option }));
  };

  const submitQuiz = () => {
    if (!quiz) return;
    let sc = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) sc++;
    });
    setScore(`${sc}/${quiz.length}`);
    setTimeout(() => {
      const el = document.getElementById("score");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const resetAll = () => {
    setTopic("");
    setQuiz(null);
    setAnswers({});
    setScore(null);
  };

  const quickSet = (t) => {
    setTopic(t);
  };

  return (
    <div className="app-root">
      <header className="hero">
        <div className="hero-inner">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <h1 className="title">AI Smart Quiz</h1>
              <p className="subtitle">Generate quick MCQ quizzes on any CS topic — Java, DBMS, OS and more.</p>
            </div>

            {/* Dark mode toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, color: "var(--muted)" }}>{dark ? "Dark" : "Light"}</span>
              <button
                className={`toggle ${dark ? "on" : ""}`}
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
              >
                <span className="toggle-ball" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="two-col">
          <div className="left-col">
            <section className="controls">
              <input
                className="topic-input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic e.g. Java, DBMS, OS"
              />
              <div className="btn-row">
                <button className="btn primary" onClick={generateQuiz} disabled={loading}>
                  {loading ? "Generating..." : "Generate Quiz"}
                </button>
                <button className="btn ghost" onClick={resetAll}>Reset</button>
              </div>
            </section>

            {quiz && (
              <section id="quiz-list" className="quiz-list">
                {quiz.length === 0 && <p>No questions returned from server.</p>}
                {quiz.map((q, i) => (
                  <article key={i} className="card">
                    <div className="q-header">
                      <span className="q-index">{i + 1}.</span>
                      <h3 className="q-text">{q.question}</h3>
                    </div>

                    <div className="options">
                      {q.options.map((opt, idx) => {
                        const checked = answers[i] === opt;
                        return (
                          <label key={idx} className={`option ${checked ? "selected" : ""}`}>
                            <input
                              type="radio"
                              name={`q${i}`}
                              onChange={() => handleSelect(i, opt)}
                              checked={checked}
                            />
                            <span className="opt-text">{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </article>
                ))}

                <div className="actions">
                  <button onClick={submitQuiz} className="btn success">Submit</button>
                </div>
              </section>
            )}

            {score && (
              <div id="score" className="result">
                <h2>Your Score: <span className="score-badge">{score}</span></h2>
              </div>
            )}
          </div>

          {/* RIGHT SIDE — Smart Helper Box */}
          <aside className="right-col">
            <div className="illustration-wrap">
              <div className="orb orb-1"></div>
              <div className="orb orb-2"></div>
              <div className="robot">🤖</div>
            </div>

            <div className="info-box">
              <h2>✨ Smart Quiz Helper</h2>
              <p>Enter any Computer Science topic (Java, DBMS, OS, CN, DSA) and click <strong>Generate Quiz</strong>.</p>

              <h3>Quick Tips</h3>
              <ul>
                <li>Use short topic words: <em>Java</em>, <em>DBMS</em>, <em>OS</em>.</li>
                <li>Submit to see score instantly.</li>
                <li>Use the chips below to quickly fill topic.</li>
              </ul>

              <h3>Try these</h3>
              <div className="chip-row" style={{ marginTop: 6 }}>
                <button className="chip" onClick={() => quickSet("Java")}>Java</button>
                <button className="chip" onClick={() => quickSet("DBMS")}>DBMS</button>
                <button className="chip" onClick={() => quickSet("OS")}>OS</button>
                <button className="chip" onClick={() => quickSet("CN")}>CN</button>
                <button className="chip" onClick={() => quickSet("DSA")}>DSA</button>
              </div>

              <hr style={{ margin: "14px 0", borderColor: "rgba(15,23,42,0.06)" }} />
              <p style={{fontSize:13, color:"var(--muted)"}}>Made with ❤️ — AI Smart Quiz</p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <small>Made with ❤️ — AI Smart Quiz (Vite + React)</small>
      </footer>
    </div>
  );
}

