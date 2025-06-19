
# ✨ AI Resume & Cover Letter Builder

A sleek web application that helps users generate **professional resumes** and **personalized cover letters** instantly using **Gemini AI**.

## 🚀 Features

- 🧠 Generate full resumes from basic inputs (name, skills, experience)
- ✉️ Generate cover letters tailored to specific job descriptions
- ⬇️ Download resume or letter as PDF
- 🎨 Beautiful responsive UI with Tailwind CSS
- 🛡️ Daily request rate limiting (2/day)
- ✅ Built using React, Node.js, Express & Gemini API

---



## 🛠️ Tech Stack

| Frontend      | Backend         | AI Engine     |
|---------------|-----------------|---------------|
| React + Vite  | Express.js      | Gemini API    |
| Tailwind CSS  | Node.js         |               |
| Framer Motion | Axios           |               |

---

## 📝 How It Works

1. 🧾 **Resume**: Fill in your name, skills, and experience → get a full resume with summary, skills, projects, education, etc.
2. 💼 **Cover Letter**: Enter the job title, company name, and relevant experience → get a personalized, professional letter.
3. ⬇️ **Download**: Preview and export the content as a clean PDF.

---

## ⚙️ Installation

### 🔧 Backend (Express + Gemini API)

```bash
cd server
npm install
# Add your Gemini API key in `.env`
node index.js
```

### 🌐 Frontend (React)

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Rate Limiting

- Users are limited to **2 requests per day per route** (resume/cover letter).
- Returns `429 Too Many Requests` if exceeded.

---

## 📁 Project Structure

```
├── client/
│   └── React frontend
├── server/
│   └── Express backend + Gemini integration
```

---

## 🔮 Planned Features

- 🔐 Google login (Firebase Auth)
- 📂 “My Documents” dashboard
- 📊 Resume scoring + tips


---

## 🙌 Credits

- Built by **Animesh Rathore**
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Gemini API by Google AI

---

## 📄 License

MIT License
