const billInput = document.getElementById('bill');
const tipGrid = document.getElementById('tip-grid');
const tipButtons = tipGrid.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('custom-tip');
const splitInput = document.getElementById('split');
const splitMinus = document.getElementById('split-minus');
const splitPlus = document.getElementById('split-plus');
const tipAmountEl = document.getElementById('tip-amount');
const totalAmountEl = document.getElementById('total-amount');
const perPersonEl = document.getElementById('per-person');
const resetBtn = document.getElementById('reset-btn');
let selectedTip = 15;
function calculate() {
  const bill = parseFloat(billInput.value) || 0;
  const split = parseInt(splitInput.value, 10) || 1;
  const tipTotal = bill * (selectedTip / 100);
  const total = bill + tipTotal;
  const perPerson = total / split;
  tipAmountEl.textContent = formatMoney(tipTotal);
  totalAmountEl.textContent = formatMoney(total);
  perPersonEl.textContent = formatMoney(perPerson);
}
function formatMoney(amount) {
  return '$' + amount.toFixed(2);
}
function setActiveTipButton(btn) {
  tipButtons.forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
    customTipInput.value = '';
  }
}
billInput.addEventListener('input', calculate);
splitInput.addEventListener('input', calculate);
splitMinus.addEventListener('click', () => {
  let val = parseInt(splitInput.value, 10) || 1;
  if (val > 1) {
    splitInput.value = val - 1;
    calculate();
  }
});
splitPlus.addEventListener('click', () => {
  let val = parseInt(splitInput.value, 10) || 1;
  splitInput.value = val + 1;
  calculate();
});
tipButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    selectedTip = parseFloat(e.target.getAttribute('data-tip'));
    setActiveTipButton(e.target);
    calculate();
  });
});
customTipInput.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  if (!isNaN(val)) {
    selectedTip = val;
    tipButtons.forEach(b => b.classList.remove('active'));
    calculate();
  }
});
resetBtn.addEventListener('click', () => {
  billInput.value = '50.00';
  splitInput.value = '1';
  customTipInput.value = '';
  selectedTip = 15;
  setActiveTipButton(tipButtons[1]);
  calculate();
});
calculate();
