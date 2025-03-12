# AI-Powered Medical Lab Results Parser

## 📋 Overview

This app leverages **OpenAI's GPT model** to **parse and summarize medical lab results** like CBC, BMP, and other tests into structured JSON and formatted tables. It automatically extracts data and generates a summary for better understanding and visualization.

### ✨ Features

- ✅ Parse complex lab result texts into structured JSON.  
- ✅ Display results as responsive and interactive tables (MUI based).  
- ✅ Auto-generated clinical summaries for quick insights.  
- ✅ Fallback to plain text view if tables are not available.  
- ✅ Easy to copy or export parsed data.  
- ✅ Supports flexible AI model configuration via OpenAI API.  

---

## 🚀 Demo

![App Screenshot](/hcmd-patient-prompter/public/demo.PNG)  


---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **UI Components**: Material-UI (MUI)  
- **AI/LLM Backend**: OpenAI GPT-3.5 Turbo (via API)  
- **Language**: JavaScript (ES6+), JSX  

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (>= 14.x)  
- npm or yarn  
- OpenAI API key  

### 1. Clone the Repository

```bash  
git clone https://github.com/your-username/your-repo-name.git  
cd your-repo-name  
```

### 2. Install Dependencies

```bash  
npm install  
# OR  
yarn install  
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:  

```bash  
REACT_APP_OPENAI_API_KEY=your-openai-api-key  
```

> ⚠️ **Important:** Do NOT commit your API key to the repository.  

### 4. Start the App

```bash  
npm start  
# OR  
yarn start  
```

The app will be available at `http://localhost:3000`.  

---

## 🧠 How It Works

1. **Input**: Paste raw lab results text (e.g., CBC, BMP).  
2. **AI Parsing**: The app sends the text to OpenAI API to extract structured data.  
3. **Display**: Results are rendered as interactive tables and summaries.  
4. **Switch Views**: Toggle between **table view** and **plain text view** for flexibility.  

---

## ⚙️ Configuration

You can adjust model parameters inside `api.js`:  

```javascript  
const response = await openai.chat.completions.create({  
  model: "gpt-3.5-turbo-0125",  
  temperature: 0.7,  
  max_tokens: 1024,  
  ...  
});  
```

---

## 🧰 File Structure

```
/src  
  ├── components/      # React components (DataView, InputForm, etc.)  
  ├── api/             # API call handlers to OpenAI  
  ├── App.js           # Main React component  
  ├── index.js         # App entry point  
  └── utils/           # Helper functions  
```

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.  

---

## 📄 License

MIT License — free to use and modify.  

---

## ✉️ Contact

For questions or collaborations, reach out via [GitHub Issues](https://github.com/your-username/your-repo-name/issues).
