/**
 * OmniCore Studio • Cyberpunk 2-Color Minimalist Python Controller
 * Strictly mirrors the logic of:
 * - atm.py
 * - contactbook.py
 * - sample calculate.py
 * Without altering the original Python files.
 */

// ============================================================================
// SOUND SYNTHESIS ENGINE (Tactile Audio Feedback)
// ============================================================================
class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  play(type = 'click') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx || this.audioCtx.state === 'suspended') {
        this.audioCtx?.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.03);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.06); // A5
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.14);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }
}

const sfx = new SoundEffects();

// ============================================================================
// CONSOLE & TOAST SYSTEM (MINIMALIST 2-COLOR)
// ============================================================================
const terminalBody = document.getElementById('terminalBody');
const toastContainer = document.getElementById('toastContainer');

function logTerminal(message, type = 'stdout') {
  if (!terminalBody) return;
  const line = document.createElement('div');
  line.className = `term-line ${type}`;
  const time = new Date().toLocaleTimeString();
  line.textContent = `[${time}] ${message}`;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

function showToast(message, type = 'info') {
  if (type === 'success') sfx.play('success');
  else if (type === 'error') sfx.play('error');
  else sfx.play('click');

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeToastOut 0.25s forwards';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// ============================================================================
// MODULE 1: ATM SYSTEM (atm.py)
// Original python state: balance = 10000
// ============================================================================
class ATMSystem {
  constructor() {
    this.balance = 10000; // Exact match to atm.py: balance=10000
    this.mode = 'deposit'; // 'deposit' | 'withdraw' | 'check'
    this.history = [
      {
        type: 'check',
        title: 'Initial Balance Sync',
        amount: 10000,
        time: new Date().toLocaleTimeString(),
        note: 'Default state initialized'
      }
    ];

    this.balanceDisplay = document.getElementById('atmBalanceValue');
    this.amountInput = document.getElementById('atmAmountInput');
    this.submitBtn = document.getElementById('atmSubmitBtn');
    this.btnText = document.getElementById('atmBtnText');
    this.historyList = document.getElementById('atmHistoryList');
    this.txCount = document.getElementById('atmTxCount');
    this.lastTxTime = document.getElementById('lastTxTime');

    this.initEventListeners();
    this.render();
  }

  // Exact Python function: check_balance()
  check_balance() {
    const msg = `Your current balance is: ${this.balance}`;
    logTerminal(msg, 'stdout');
    showToast(msg, 'info');
    this.history.unshift({
      type: 'check',
      title: 'Balance Enquiry',
      amount: this.balance,
      time: new Date().toLocaleTimeString(),
      note: 'Checked vault reserves'
    });
    this.render();
  }

  // Exact Python function: deposit(amount)
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      const msg = `Deposited: ${amount}. New balance: ${this.balance}`;
      logTerminal(msg, 'success');
      showToast(msg, 'success');
      this.history.unshift({
        type: 'deposit',
        title: 'Vault Deposit',
        amount: amount,
        time: new Date().toLocaleTimeString(),
        note: `Credited $${amount.toLocaleString()}`
      });
      this.animateCardGlow();
    } else {
      const err = "Deposit amount must be morethan 0.";
      logTerminal(err, 'error');
      showToast(err, 'error');
    }
    this.render();
  }

  // Exact Python function: withdraw(amount)
  withdraw(amount) {
    if (amount > 0) {
      if (amount <= this.balance) {
        this.balance -= amount;
        const msg = `Withdrew: ${amount}. New balance: ${this.balance}`;
        logTerminal(msg, 'success');
        showToast(msg, 'success');
        this.history.unshift({
          type: 'withdraw',
          title: 'Cash Withdrawal',
          amount: -amount,
          time: new Date().toLocaleTimeString(),
          note: `Debited $${amount.toLocaleString()}`
        });
        this.animateCardGlow();
      } else {
        const err = "Insufficient funds.";
        logTerminal(err, 'error');
        showToast(err, 'error');
      }
    } else {
      const err = "Withdrawal amount must be more than 0.";
      logTerminal(err, 'error');
      showToast(err, 'error');
    }
    this.render();
  }

  animateCardGlow() {
    const card = document.getElementById('creditCard');
    if (!card) return;
    card.style.boxShadow = `0 0 30px var(--neon-pink-glow)`;
    setTimeout(() => {
      card.style.boxShadow = '';
    }, 1000);
  }

  setMode(newMode) {
    this.mode = newMode;
    const modeBtns = document.querySelectorAll('[data-atm-mode]');
    modeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-atm-mode') === newMode);
    });

    const inputGroup = document.getElementById('atmAmountInputGroup');
    const presetsGroup = document.getElementById('atmPresets');

    if (newMode === 'check') {
      inputGroup.style.display = 'none';
      presetsGroup.style.display = 'none';
      this.btnText.textContent = 'Enquire Balance (check_balance)';
    } else if (newMode === 'withdraw') {
      inputGroup.style.display = 'block';
      presetsGroup.style.display = 'flex';
      this.btnText.textContent = 'Confirm Withdrawal';
    } else {
      inputGroup.style.display = 'block';
      presetsGroup.style.display = 'flex';
      this.btnText.textContent = 'Execute Deposit';
    }
  }

  initEventListeners() {
    document.querySelectorAll('[data-atm-mode]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sfx.play('click');
        const mode = e.currentTarget.getAttribute('data-atm-mode');
        this.setMode(mode);
      });
    });

    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        sfx.play('click');
        const val = parseFloat(chip.getAttribute('data-amount'));
        this.amountInput.value = val;
      });
    });

    document.getElementById('atmClearInput')?.addEventListener('click', () => {
      sfx.play('click');
      this.amountInput.value = '';
      this.amountInput.focus();
    });

    this.submitBtn?.addEventListener('click', () => {
      sfx.play('click');
      if (this.mode === 'check') {
        this.check_balance();
      } else {
        const val = parseFloat(this.amountInput.value);
        if (isNaN(val)) {
          showToast('Please enter a valid numeric amount.', 'error');
          return;
        }
        if (this.mode === 'deposit') {
          this.deposit(val);
        } else if (this.mode === 'withdraw') {
          this.withdraw(val);
        }
        this.amountInput.value = '';
      }
    });

    this.amountInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.submitBtn.click();
      }
    });
  }

  render() {
    if (this.balanceDisplay) {
      this.balanceDisplay.textContent = this.balance.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      });
    }

    if (this.txCount) {
      this.txCount.textContent = `${this.history.length} transaction${this.history.length === 1 ? '' : 's'}`;
    }

    if (this.lastTxTime && this.history.length > 0) {
      this.lastTxTime.textContent = `Last: ${this.history[0].time}`;
    }

    if (this.historyList) {
      this.historyList.innerHTML = this.history.map(item => {
        const isPos = item.amount > 0;
        const sign = item.type === 'check' ? '' : (isPos ? '+' : '-');
        const amtStr = item.type === 'check' 
          ? `$${item.amount.toLocaleString()}`
          : `${sign}$${Math.abs(item.amount).toLocaleString()}`;

        return `
          <div class="history-item">
            <div>
              <div class="history-title">${item.title}</div>
              <div class="history-time">${item.time} • ${item.note}</div>
            </div>
            <div class="history-amount">
              ${amtStr}
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

// ============================================================================
// MODULE 2: CONTACT BOOK (contactbook.py)
// Original python state: d = {}
// ============================================================================
class ContactBookSystem {
  constructor() {
    this.d = {}; // Exact match to contactbook.py: d={}
    this.editTarget = null;

    this.form = document.getElementById('contactForm');
    this.nameInput = document.getElementById('contactNameInput');
    this.phoneInput = document.getElementById('contactPhoneInput');
    this.saveBtn = document.getElementById('contactSaveBtn');
    this.btnText = document.getElementById('contactBtnText');
    this.cancelEditBtn = document.getElementById('contactCancelEditBtn');
    this.formTitle = document.getElementById('contactFormTitle');
    this.container = document.getElementById('contactsContainer');
    this.countBadge = document.getElementById('contactCountBadge');

    this.searchInput = document.getElementById('contactSearchInput');
    this.searchBtn = document.getElementById('contactSearchBtn');
    this.searchResultDisplay = document.getElementById('searchResultDisplay');

    this.initEventListeners();
    this.seedDefaultData();
    this.render();
  }

  // Exact Python function: add_contact()
  add_contact(name, phone) {
    if (this.d.hasOwnProperty(name)) {
      const err = "Contact already exists.";
      logTerminal(err, 'error');
      showToast(err, 'error');
      return false;
    } else if (String(phone).length !== 10) {
      const err = "Phone number must be 10 digits.";
      logTerminal(err, 'error');
      showToast(err, 'error');
      return false;
    } else {
      this.d[name] = parseInt(phone, 10);
      const msg = "Contact added successfully.";
      logTerminal(msg, 'success');
      showToast(msg, 'success');
      this.render();
      return true;
    }
  }

  // Exact Python function: search_contact()
  search_contact(name) {
    logTerminal(`Executing search_contact("${name}")`, 'stdout');
    if (this.d.hasOwnProperty(name)) {
      const msg = `Name: ${name}, Phone: ${this.d[name]}`;
      logTerminal(msg, 'success');
      showToast(`Found: ${name} (${this.d[name]})`, 'success');
      
      this.searchResultDisplay.style.display = 'block';
      this.searchResultDisplay.innerHTML = `
        <span style="color: var(--neon-pink); font-weight: 700;">MATCH FOUND:</span><br>
        Name: ${name} | Phone: ${this.d[name]}
      `;
      this.highlightCard(name);
    } else {
      const err = "Contact not found.";
      logTerminal(err, 'error');
      showToast(err, 'error');
      this.searchResultDisplay.style.display = 'block';
      this.searchResultDisplay.innerHTML = `
        <span>Contact not found for "${name}".</span>
      `;
    }
  }

  // Exact Python function: update_contact()
  update_contact(name, newPhone) {
    if (this.d.hasOwnProperty(name)) {
      if (String(newPhone).length !== 10) {
        const err = "Phone number must be 10 digits.";
        logTerminal(err, 'error');
        showToast(err, 'error');
        return false;
      } else {
        this.d[name] = parseInt(newPhone, 10);
        const msg = "Contact updated successfully.";
        logTerminal(msg, 'success');
        showToast(msg, 'success');
        this.render();
        return true;
      }
    } else {
      const err = "Contact not found.";
      logTerminal(err, 'error');
      showToast(err, 'error');
      return false;
    }
  }

  // Exact Python function: delete_contact()
  delete_contact(name) {
    if (this.d.hasOwnProperty(name)) {
      delete this.d[name];
      const msg = "Contact deleted successfully.";
      logTerminal(msg, 'success');
      showToast(msg, 'success');
      this.render();
      return true;
    } else {
      const err = "Contact not found.";
      logTerminal(err, 'error');
      showToast(err, 'error');
      return false;
    }
  }

  // Exact Python function: view_contacts()
  view_contacts() {
    const keys = Object.keys(this.d);
    if (keys.length > 0) {
      logTerminal("=== Contact Book Directory ===", 'stdout');
      keys.forEach(name => {
        logTerminal(`Name: ${name}, Phone: ${this.d[name]}`, 'stdout');
      });
      showToast(`Refreshed ${keys.length} contacts.`, 'info');
    } else {
      const msg = "No contacts found.";
      logTerminal(msg, 'error');
      showToast(msg, 'error');
    }
    this.render();
  }

  seedDefaultData() {
    this.d = {
      "Ada Lovelace": 9876543210,
      "Alan Turing": 9812345678,
      "Guido van Rossum": 9988776655
    };
  }

  highlightCard(name) {
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach(card => {
      if (card.getAttribute('data-name') === name) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        card.style.borderColor = 'var(--neon-pink)';
        card.style.boxShadow = '0 0 20px var(--neon-pink-glow)';
        setTimeout(() => {
          card.style.borderColor = '';
          card.style.boxShadow = '';
        }, 2000);
      }
    });
  }

  startEdit(name) {
    sfx.play('click');
    this.editTarget = name;
    this.nameInput.value = name;
    this.nameInput.disabled = true;
    this.phoneInput.value = this.d[name];
    this.formTitle.textContent = `Update: ${name}`;
    this.btnText.textContent = 'Update Contact';
    this.cancelEditBtn.style.display = 'inline-flex';
    this.phoneInput.focus();
  }

  cancelEdit() {
    this.editTarget = null;
    this.nameInput.value = '';
    this.nameInput.disabled = false;
    this.phoneInput.value = '';
    this.formTitle.textContent = 'Add Contact';
    this.btnText.textContent = 'Save Contact';
    this.cancelEditBtn.style.display = 'none';
  }

  initEventListeners() {
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      sfx.play('click');
      const name = this.nameInput.value.trim();
      const phone = this.phoneInput.value.trim();

      if (!name || !phone) {
        showToast('Please fill in both name and phone number.', 'error');
        return;
      }

      if (this.editTarget) {
        const success = this.update_contact(this.editTarget, phone);
        if (success) this.cancelEdit();
      } else {
        const success = this.add_contact(name, phone);
        if (success) {
          this.nameInput.value = '';
          this.phoneInput.value = '';
        }
      }
    });

    this.cancelEditBtn?.addEventListener('click', () => {
      sfx.play('click');
      this.cancelEdit();
    });

    this.searchBtn?.addEventListener('click', () => {
      sfx.play('click');
      const q = this.searchInput.value.trim();
      if (!q) {
        showToast('Enter a name to search.', 'error');
        return;
      }
      this.search_contact(q);
    });

    this.searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.searchBtn.click();
      }
    });

    document.getElementById('viewAllBtn')?.addEventListener('click', () => {
      sfx.play('click');
      this.view_contacts();
    });

    document.getElementById('seedSampleContacts')?.addEventListener('click', () => {
      sfx.play('click');
      this.seedDefaultData();
      this.render();
      showToast('Sample contacts loaded into d={}', 'info');
      logTerminal('Restored sample records into d={}', 'info');
    });
  }

  render() {
    const keys = Object.keys(this.d);
    if (this.countBadge) {
      this.countBadge.textContent = `${keys.length} registered`;
    }

    if (!this.container) return;

    if (keys.length === 0) {
      this.container.innerHTML = `
        <div class="empty-contacts-state">
          <p>No contacts found in d={}.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = keys.map(name => {
      const phone = this.d[name];
      const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'U';

      return `
        <div class="contact-card" data-name="${name}">
          <div class="contact-top-row">
            <div class="contact-avatar">${initials}</div>
            <div class="contact-details">
              <div class="contact-name-text" title="${name}">${name}</div>
              <div class="contact-phone-text">${phone}</div>
            </div>
          </div>
          <div class="contact-actions-row">
            <button class="card-action-btn edit" data-edit-name="${name}">Edit</button>
            <button class="card-action-btn delete" data-delete-name="${name}">Delete</button>
          </div>
        </div>
      `;
    }).join('');

    this.container.querySelectorAll('[data-edit-name]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const name = e.currentTarget.getAttribute('data-edit-name');
        this.startEdit(name);
      });
    });

    this.container.querySelectorAll('[data-delete-name]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sfx.play('click');
        const name = e.currentTarget.getAttribute('data-delete-name');
        if (confirm(`Delete contact "${name}"?`)) {
          this.delete_contact(name);
        }
      });
    });
  }
}

// ============================================================================
// MODULE 3: CALCULATOR (sample calculate.py)
// Original python functions: add(a,b), sub(a,b), multi(a,b), div(a,b), mod(a,b)
// ============================================================================
class CalculatorSystem {
  constructor() {
    this.selectedOp = 'add';
    
    this.inputA = document.getElementById('calcInputA');
    this.inputB = document.getElementById('calcInputB');
    this.executeBtn = document.getElementById('calcExecuteBtn');
    this.runAllBtn = document.getElementById('calcRunAllBtn');
    this.formulaDisplay = document.getElementById('calcFormula');
    this.resultDisplay = document.getElementById('calcResultDisplay');
    this.footnote = document.getElementById('calcFootnote');
    this.opStatus = document.getElementById('calcOpStatus');

    this.keypadHistory = document.getElementById('keypadHistory');
    this.keypadCurrent = document.getElementById('keypadCurrent');
    this.kpA = null;
    this.kpOp = null;
    this.kpOverwrite = true;

    this.initEventListeners();
    this.execute();
  }

  add(a, b) {
    const res = a + b;
    logTerminal(`add ${res}`, 'stdout');
    return res;
  }

  sub(a, b) {
    const res = a - b;
    logTerminal(`sub ${res}`, 'stdout');
    return res;
  }

  multi(a, b) {
    const res = a * b;
    logTerminal(`multi ${res}`, 'stdout');
    return res;
  }

  div(a, b) {
    if (b === 0) {
      logTerminal("Cannot divide by zero", 'error');
      return "Cannot divide by zero";
    }
    const res = a / b;
    logTerminal(`div ${res}`, 'stdout');
    return res;
  }

  mod(a, b) {
    if (b === 0) {
      logTerminal("Cannot divide by zero", 'error');
      return "Cannot divide by zero";
    }
    const res = a % b;
    logTerminal(`mod ${res}`, 'stdout');
    return res;
  }

  execute() {
    sfx.play('click');
    const a = parseFloat(this.inputA.value) || 0;
    const b = parseFloat(this.inputB.value) || 0;

    let result;
    let label;

    switch (this.selectedOp) {
      case 'add':
        result = this.add(a, b);
        label = `add(${a}, ${b})`;
        break;
      case 'sub':
        result = this.sub(a, b);
        label = `sub(${a}, ${b})`;
        break;
      case 'multi':
        result = this.multi(a, b);
        label = `multi(${a}, ${b})`;
        break;
      case 'div':
        result = this.div(a, b);
        label = `div(${a}, ${b})`;
        break;
      case 'mod':
        result = this.mod(a, b);
        label = `mod(${a}, ${b})`;
        break;
      default:
        result = 0;
        label = 'Undefined';
    }

    this.formulaDisplay.textContent = label;
    this.resultDisplay.textContent = result;
    this.footnote.textContent = `Terminal print: ${this.selectedOp} ${result}`;

    if (result === "Cannot divide by zero") {
      this.opStatus.textContent = 'DIV/0 ERROR';
      showToast("Cannot divide by zero", 'error');
    } else {
      this.opStatus.textContent = 'EVALUATED';
    }
  }

  runAll() {
    sfx.play('success');
    const a = parseFloat(this.inputA.value) || 0;
    const b = parseFloat(this.inputB.value) || 0;

    logTerminal(`--- Running All Functions with a=${a}, b=${b} ---`, 'info');
    this.add(a, b);
    this.sub(a, b);
    this.multi(a, b);
    this.div(a, b);
    this.mod(a, b);
    showToast(`Executed all 5 functions on a=${a}, b=${b}`, 'success');
  }

  handleKeypad(k) {
    sfx.play('click');
    const current = this.keypadCurrent.textContent;

    if (k === 'clear') {
      this.keypadCurrent.textContent = '0';
      this.keypadHistory.textContent = 'Ready';
      this.kpA = null;
      this.kpOp = null;
      this.kpOverwrite = true;
      return;
    }

    if (k === 'del') {
      if (current.length > 1) {
        this.keypadCurrent.textContent = current.slice(0, -1);
      } else {
        this.keypadCurrent.textContent = '0';
      }
      return;
    }

    if (['add', 'sub', 'multi', 'div', 'mod'].includes(k)) {
      this.kpA = parseFloat(current) || 0;
      this.kpOp = k;
      const symbols = { add: '+', sub: '−', multi: '×', div: '÷', mod: '%' };
      this.keypadHistory.textContent = `${this.kpA} ${symbols[k]}`;
      this.kpOverwrite = true;
      return;
    }

    if (k === 'equal') {
      if (this.kpOp && this.kpA !== null) {
        const b = parseFloat(current) || 0;
        let res;
        switch (this.kpOp) {
          case 'add': res = this.add(this.kpA, b); break;
          case 'sub': res = this.sub(this.kpA, b); break;
          case 'multi': res = this.multi(this.kpA, b); break;
          case 'div': res = this.div(this.kpA, b); break;
          case 'mod': res = this.mod(this.kpA, b); break;
        }
        const symbols = { add: '+', sub: '−', multi: '×', div: '÷', mod: '%' };
        this.keypadHistory.textContent = `${this.kpA} ${symbols[this.kpOp]} ${b} =`;
        this.keypadCurrent.textContent = res;
        this.kpA = null;
        this.kpOp = null;
        this.kpOverwrite = true;
      }
      return;
    }

    if (this.kpOverwrite) {
      this.keypadCurrent.textContent = k === '.' ? '0.' : k;
      this.kpOverwrite = false;
    } else {
      if (k === '.' && current.includes('.')) return;
      this.keypadCurrent.textContent = current === '0' && k !== '.' ? k : current + k;
    }
  }

  initEventListeners() {
    document.querySelectorAll('.op-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sfx.play('click');
        document.querySelectorAll('.op-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedOp = btn.getAttribute('data-op');
        this.execute();
      });
    });

    this.executeBtn?.addEventListener('click', () => this.execute());
    this.runAllBtn?.addEventListener('click', () => this.runAll());

    [this.inputA, this.inputB].forEach(inp => {
      inp?.addEventListener('input', () => this.execute());
    });

    document.querySelectorAll('.k-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const k = e.currentTarget.getAttribute('data-k');
        this.handleKeypad(k);
      });
    });
  }
}

// ============================================================================
// MODULE 4: PYTHON SOURCE CODE INSPECTOR
// Holds the 100% exact original Python scripts untouched.
// ============================================================================
const PYTHON_SOURCES = {
  atm: `balance=10000
def check_balance():
    print(f"Your current balance is: {balance}")
def deposit(amount):
    global balance
    if amount > 0:
        balance += amount
        print(f"Deposited: {amount}. New balance: {balance}")
    else:
        print("Deposit amount must be morethan 0.")
def withdraw(amount):
    global balance
    if amount>0:
        if amount<=balance:
            balance-=amount
            print(f"Withdrew: {amount}. New balance: {balance}")
        else:
            print("Insufficient funds.")
def show_menu():
    print("\\n")
    print("Welcome to the Bank")
    print("1. Check Balance")
    print("2. Deposit")
    print("3. Withdraw")
    print("4. Exit")

while True:
    show_menu()
    option = int(input("Choose an option: "))
    if option==1:
        check_balance()
    elif option==2:
        amount = float(input("Enter amount to deposit: "))
        deposit(amount)
    elif option==3:
        amount = float(input("Enter amount to withdraw: "))
        withdraw(amount)
    elif option==4:
        print("Thank you for using the Bank. Goodbye!")
        break
    else:
        print("Invalid option. Please try again.")`,

  contacts: `d={}

def add_contact():
    global d
    name=input("Enter name: ")
    phone=int(input("Enter phone number: "))
    if name in d:
        print("Contact already exists.")
    elif len(str(phone))!=10:
        print("Phone number must be 10 digits.")
    else:
        d[name]=phone
        print("Contact added successfully.")
def search_contact():
    global d
    name=input("Enter name to search: ")
    if name in d:
        print(f"Name: {name}, Phone: {d[name]}")
    else:
        print("Contact not found.")
def update_contact():
    global d
    name=input("Enter name to update: ")
    if name in d:
        phone=int(input("Enter new phone number: "))
        if len(str(phone))!=10:
            print("Phone number must be 10 digits.")
        else:
            d[name]=phone
            print("Contact updated successfully.")
    else:
        print("Contact not found.")

def delete_contact():
    global d
    name=input("Enter name to delete: ")
    if name in d:
        d.pop(name)
        print("Contact deleted successfully.")
    else:
        print("Contact not found.")
def view_contacts():
    global d
    if d:
        for name, phone in d.items():
            print(f"Name: {name}, Phone: {phone}")
    else:
        print("No contacts found.")

while True:
    print("\\n")
    print("Contact Book Menu")
    print("1. Add Contact")
    print("2. Search Contact")
    print("3. Update Contact")
    print("4. Delete Contact")
    print("5. View All Contacts")
    print("6. Exit")
    print("\\n")

    option=int(input("Choose an option: "))
    if option==1:
        add_contact()
    elif option==2:
        search_contact()
    elif option==3:
        update_contact()
    elif option==4:
        delete_contact()
    elif option==5:
        view_contacts()
    elif option==6:
        print("Exiting...")
        break
    else:
        print("Invalid option. Please try again.")`,

  calc: `def add(a, b):
    print("add",a+b)
    return a+b
def sub(a,b):
    print("sub",a-b)
    return a-b
def multi(a,b):
    print("multi",a*b)
    return a*b
def div(a,b):
    print("div",a/b)
    return a/b
def mod(a,b):
    print("mod",a%b)
    return a%b
a=int(input("enter first num:"))
b=int(input("enter second num:"))
add(a,b)
sub(a,b)
multi(a,b)
div(a,b)
mod(a,b)
option =input("enter your option add/sub/multi/div:")
if option==add:
    print("add=",add(a,b))
elif option==sub:
    print("sub=",sub(a,b))
elif option==multi:
    print("multi=",multi(a,b))
elif option==div:
    print("div=",div(a,b))
elif option==mod:
    print("mod=",mod(a,b))
    if b != 0:
        print("mod=", mod(a, b))
else:
    print("Cannot divide by zero")`
};

class SourceInspector {
  constructor() {
    this.activeSource = 'atm';
    this.lineNumbersEl = document.getElementById('sourceLineNumbers');
    this.codeBlock = document.getElementById('sourceCodeBlock');
    this.copyBtn = document.getElementById('copySourceBtn');

    this.initEventListeners();
    this.render();
  }

  highlightPython(code) {
    const escapeHtml = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const lines = code.split('\n');
    
    return lines.map(line => {
      let l = escapeHtml(line);
      if (l.includes('#')) {
        const parts = l.split('#');
        return `${parts[0]}<span class="syn-cmt">#${parts.slice(1).join('#')}</span>`;
      }
      l = l.replace(/\b(def|return|if|elif|else|while|True|False|global|in|break|not)\b/g, '<span class="syn-kw">$1</span>');
      l = l.replace(/\b(print|input|int|float|str|len)\b/g, '<span class="syn-built">$1</span>');
      l = l.replace(/(".*?"|'.*?'|f".*?"|f'.*?)/g, '<span class="syn-str">$1</span>');
      l = l.replace(/\b(\d+)\b/g, '<span class="syn-num">$1</span>');
      return l;
    }).join('\n');
  }

  render() {
    const code = PYTHON_SOURCES[this.activeSource] || '';
    const lineCount = code.split('\n').length;
    
    if (this.lineNumbersEl) {
      this.lineNumbersEl.innerHTML = Array.from({ length: lineCount }, (_, i) => `<div>${i + 1}</div>`).join('');
    }

    if (this.codeBlock) {
      this.codeBlock.innerHTML = this.highlightPython(code);
    }
  }

  initEventListeners() {
    document.querySelectorAll('[data-source-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sfx.play('click');
        document.querySelectorAll('[data-source-target]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeSource = btn.getAttribute('data-source-target');
        this.render();
      });
    });

    this.copyBtn?.addEventListener('click', () => {
      sfx.play('click');
      const code = PYTHON_SOURCES[this.activeSource] || '';
      navigator.clipboard.writeText(code).then(() => {
        showToast('Python source code copied!', 'success');
      }).catch(() => {
        showToast('Failed to copy code.', 'error');
      });
    });
  }
}

// ============================================================================
// NAVIGATION
// ============================================================================
const TAB_CONFIG = {
  atm: {
    title: 'Apex Bank & Vault',
    file: 'atm.py'
  },
  contacts: {
    title: 'Nexus Contacts Pro',
    file: 'contactbook.py'
  },
  calc: {
    title: 'Quantum Calc Sandbox',
    file: 'sample calculate.py'
  },
  source: {
    title: 'Source Code Inspector',
    file: '3 Python Files'
  }
};

function initNavigation() {
  const pageTitle = document.getElementById('pageTitle');
  const activeFileName = document.getElementById('activeFileName');

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      sfx.play('click');
      const tabKey = item.getAttribute('data-tab');
      if (!tabKey) return;

      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (TAB_CONFIG[tabKey]) {
        pageTitle.textContent = TAB_CONFIG[tabKey].title;
        activeFileName.textContent = TAB_CONFIG[tabKey].file;
      }

      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      const targetPanel = document.getElementById(`tab-${tabKey}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }

      logTerminal(`Workspace view: [${tabKey.toUpperCase()}]`, 'info');
    });
  });

  const soundBtn = document.getElementById('soundToggle');
  soundBtn?.addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    soundBtn.classList.toggle('active', sfx.enabled);
    soundBtn.querySelector('span').textContent = sfx.enabled ? 'HAPTICS ON' : 'HAPTICS OFF';
    showToast(sfx.enabled ? 'Haptics Activated' : 'Haptics Muted', 'info');
  });

  const terminalDrawer = document.getElementById('terminalDrawer');
  const toggleTerminalBtn = document.getElementById('toggleTerminalBtn');
  const terminalHandle = document.getElementById('terminalHandle');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');

  const toggleTerminal = () => {
    sfx.play('click');
    terminalDrawer.classList.toggle('collapsed');
  };

  toggleTerminalBtn?.addEventListener('click', toggleTerminal);
  terminalHandle?.addEventListener('click', toggleTerminal);

  clearTerminalBtn?.addEventListener('click', () => {
    sfx.play('click');
    terminalBody.innerHTML = `
      <div class="term-line info">Console logs cleared.</div>
    `;
    showToast('Logs cleared.', 'info');
  });
}

// ============================================================================
// BOOTSTRAP INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  window.atm = new ATMSystem();
  window.contacts = new ContactBookSystem();
  window.calc = new CalculatorSystem();
  window.source = new SourceInspector();

  logTerminal("OmniCore Cyberpunk Session initialized.", "success");
  logTerminal("Connected to atm.py, contactbook.py, sample calculate.py.", "prompt");
});
