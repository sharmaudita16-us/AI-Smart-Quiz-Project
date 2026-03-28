// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/quiz', (req, res) => {
  console.log('>>> /api/quiz called, body =', req.body);
  const topic = (req.body.topic || "").toLowerCase();

  let data;

  // Java questions
  if (topic.includes("java")) {
    data = [
      { question: "What is JVM?", options: ["Java Virtual Machine","Java Visual Model","Joint Virtual Machine","None"], answer: "Java Virtual Machine" },
      { question: "What is JDK?", options: ["Java Development Kit","Java Document Kit","Joint Dev Kit","None"], answer: "Java Development Kit" },
      { question: "Default value of boolean in Java?", options: ["true","false","0","null"], answer: "false" },
      { question: "Which is not an OOP concept?", options: ["Encapsulation","Inheritance","Polymorphism","Compilation"], answer: "Compilation" },
      { question: "Main method signature in Java?", options: ["public static void main(String[] args)","void main()","static void main()","public void main(String[] args)"], answer: "public static void main(String[] args)" }
    ];

  // DBMS / SQL questions
  } else if (topic.includes("db") || topic.includes("sql") || topic.includes("dbms")) {
    data = [
      { question: "What is normalization?", options: ["Process to reduce redundancy","Encrypting DB","Backup process","None"], answer: "Process to reduce redundancy" },
      { question: "Primary key can be", options: ["Null","Unique","Duplicate","None"], answer: "Unique" },
      { question: "Which SQL command is used to remove a table?", options: ["DROP","DELETE","REMOVE","TRUNCATE"], answer: "DROP" },
      { question: "ACID stands for", options: ["Atomicity, Consistency, Isolation, Durability","Availability, Capacity...","None","All"], answer: "Atomicity, Consistency, Isolation, Durability" },
      { question: "Which normal form removes transitive dependency?", options: ["3NF","2NF","1NF","BCNF"], answer: "3NF" }
    ];

  // OS questions
  } else if (topic.includes("os") || topic.includes("operating")) {
    data = [
      { question: "Which scheduling algorithm uses time slices?", options: ["FCFS", "SJF", "Round Robin", "Priority"], answer: "Round Robin" },
      { question: "Thrashing occurs due to?", options: ["Low CPU", "High swapping", "Low memory", "High priority"], answer: "High swapping" },
      { question: "Deadlock is NOT caused by?", options: ["Mutual Exclusion", "Hold and Wait", "Interrupt", "Circular Wait"], answer: "Interrupt" },
      { question: "Which of the following is a memory management technique?", options: ["Paging", "Buffering", "Polling", "Hashing"], answer: "Paging" },
      { question: "Which is NOT a type of OS?", options: ["Batch", "Distributed", "Clustered", "Network"], answer: "Clustered" }
    ];

  // CN questions
  } else if (topic.includes("network") || topic.includes("cn") || topic.includes("communication")) {
    data = [
      { question: "Which layer uses IP address?", options: ["Data Link Layer", "Network Layer", "Transport Layer", "Physical Layer"], answer: "Network Layer" },
      { question: "TCP is?", options: ["Connectionless", "Connection-oriented", "Best-effort", "None"], answer: "Connection-oriented" },
      { question: "HTTP works on which port?", options: ["20", "21", "25", "80"], answer: "80" },
      { question: "Full form of DNS?", options: ["Domain Name Server", "Domain Naming System", "Dynamic Name Server", "None"], answer: "Domain Name Server" },
      { question: "Which topology uses a central hub?", options: ["Ring", "Mesh", "Star", "Tree"], answer: "Star" }
    ];

  // Default generic CS questions
  } else {
    data = [
      { question: "CPU stands for?", options: ["Central Processing Unit", "Control Program Unit", "Central Program Utility", "Core Processing Unit"], answer: "Central Processing Unit" },
      { question: "Which is NOT a programming language?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML" },
      { question: "Binary number system base?", options: ["2", "8", "10", "16"], answer: "2" },
      { question: "Which is volatile memory?", options: ["ROM", "Cache", "Hard Disk", "SSD"], answer: "Cache" },
      { question: "Which is an input device?", options: ["Monitor", "Keyboard", "Speaker", "Printer"], answer: "Keyboard" }
    ];
  }

  return res.json({ data });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
