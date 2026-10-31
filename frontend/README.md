# OmniCore • Minimalist Cyberpunk Python Suite Frontend

A sleek, minimalist, 2-color frontend web interface built strictly in pure deep black and bright neon cyberpunk pink for the 3 backend Python tools:
- `atm.py` (ATM Vault System)
- `contactbook.py` (Nexus Contact Book)
- `sample calculate.py` (Binary Arithmetic Sandbox)

> **Backend Safety Guarantee**: All 3 original backend Python files (`atm.py`, `contactbook.py`, `sample calculate.py`) remain **100% untouched and unmodified**. All UI code resides exclusively inside this `frontend/` directory.

---

## 🎨 Minimalist 2-Color Design

1. **Strict 2-Color Cyberpunk Palette**:
   - **Background**: Pure Deep Black (`#000000`, with subtle carbon surfaces `#09090b` / `#111115`).
   - **Primary Accent**: Bright Electric Cyberpunk Pink (`#FF007F`, with luminous glow `rgba(255, 0, 127, 0.45)`).
   - Crisp white / silver-white for typography and high-contrast readability.

2. **Clean Minimalism**:
   - Stripped away unnecessary bloat, multi-colored gradients, and heavy shadows.
   - Clean, razor-thin pink border lines, minimalist card layouts, and subtle cyber-grid backdrop.

3. **Custom Bespoke Vector Icons**:
   - Uniquely designed minimalist stroke SVG icons styled consistently with the neon pink aesthetic.

4. **Interactive Features**:
   - **ATM Vault**: Exact `balance = 10000` initialization, `check_balance()`, `deposit()`, `withdraw()`, and audit trail.
   - **Nexus Contacts**: Exact `d = {}` dictionary, 10-digit strict validation, `add_contact()`, `search_contact()`, `update_contact()`, `delete_contact()`, and `view_contacts()`.
   - **Quantum Calc**: Direct mapping to `add()`, `sub()`, `multi()`, `div()`, `mod()` with zero-division error handling (`Cannot divide by zero`) + minimalist cyber-keypad.
   - **CLI Console Mirror**: Slide-up drawer echoing stdout in real time.
   - **Python Source Inspector**: Clean viewer for the 3 original scripts with copy functionality.
   - **Tactile Audio Feedback**: Synthesized Web Audio API haptics (can be toggled on/off).

---

## 🚀 How to Run

### Option 1: Direct in Browser
Simply double-click [`frontend/index.html`](index.html) in your file explorer.

### Option 2: Local Server
Run in your terminal:
```bash
python frontend/serve.py
```
This serves on `http://localhost:8000` and opens your browser.
