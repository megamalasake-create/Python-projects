# Python Projects Suite & Cyberpunk Minimalist Frontend

[![Repository](https://img.shields.io/badge/GitHub-Repository-FF007F?style=for-the-badge&logo=github)](https://github.com/megamalasake-create/Python-projects.git)
[![Python](https://img.shields.io/badge/Python-3.x-white?style=for-the-badge&logo=python&logoColor=FF007F)](https://www.python.org/)
[![UI Theme](https://img.shields.io/badge/Theme-Black%20%26%20Neon%20Pink-000000?style=for-the-badge)](frontend/index.html)

A collection of interactive Python programs paired with a custom **minimalist cyberpunk frontend** styled in pure black and neon pink (`#FF007F`).

---

## 📂 Repository Structure

```
Python-projects/
├── atm.py                 # Core ATM banking script (balance, deposit, withdraw)
├── contactbook.py         # Phone contact book manager (CRUD in dictionary)
├── sample calculate.py    # Binary arithmetic calculation script (add, sub, multi, div, mod)
├── README.md              # Project documentation and guide
├── .gitignore             # Ignored temporary files & cache
└── frontend/              # Minimalist Cyberpunk Web UI (does not alter Python scripts)
    ├── index.html         # Main dashboard layout with custom SVG icons
    ├── styles.css         # Pure black + neon pink styling & micro-animations
    ├── app.js             # State logic mirroring the 3 Python scripts + terminal mirror
    └── serve.py           # Lightweight local server launcher
```

---

## ⚡ Quick Start: Commands to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/megamalasake-create/Python-projects.git
cd Python-projects
```

---

### 2. Launch the Cyberpunk Web Frontend

You can run the web dashboard using either of the following methods:

#### Method A: Using the Python Server Launcher (Recommended)
Runs a local server and automatically launches your browser:
```bash
python frontend/serve.py
```
*The app will open at: [http://localhost:8000](http://localhost:8000)*

#### Method B: Direct Browser Launch (Zero Dependencies)
Open `frontend/index.html` directly in your browser:
- **Windows (PowerShell)**:
  ```powershell
  Start-Process frontend/index.html
  ```
- Or simply double-click `frontend/index.html` in File Explorer.

---

### 3. Running the Python Backend Scripts (Terminal / CLI)

Each backend script can also be executed directly in your terminal:

#### 🏦 1. ATM Banking System (`atm.py`)
```bash
python atm.py
```
- **Features**: Initial balance of $10,000, check balance, deposit with positive amount check, and withdrawal with insufficient funds validation.

#### 📇 2. Contact Book (`contactbook.py`)
```bash
python contactbook.py
```
- **Features**: Add, search, update, delete, and view contacts stored in a dictionary with strict 10-digit phone number validation.

#### 🧮 3. Calculator Engine (`sample calculate.py`)
```bash
python "sample calculate.py"
```
- **Features**: Performs `add`, `sub`, `multi`, `div`, and `mod` operations with zero-division error handling.

---

## 🎨 Frontend Features & Aesthetic

- **Minimalist 2-Color Palette**: Pure deep black (`#000000`) and electric cyberpunk pink (`#FF007F`).
- **Interactive Modules**: Tab switching between ATM Vault, Contact Book, Calculator, and Python Source Inspector.
- **Python Console Mirror**: Real-time terminal drawer that logs `stdout` outputs just like the Python shell.
- **Bespoke Vector Icons**: Custom handcrafted SVG icons.
- **Tactile Audio Feedback**: Synthesized Web Audio API sound haptics (toggleable via the sidebar).
- **Backend Integrity**: All original Python files remain 100% untouched and preserved.

---

## 🔗 Repository URL
- GitHub: [https://github.com/megamalasake-create/Python-projects.git](https://github.com/megamalasake-create/Python-projects.git)
