// Simple JavaScript logic for the workshop tool

let currentStep = 1;
const totalSteps = 13;

// Data stores for dynamic tables
const payments = [];
const deductions = [];
const redundancies = [];
const payrollReports = [];
const interfaces = [];

// Award data by industry and award details
const awardsByIndustry = {
  education: [
    'Teachers Award',
    'Education Services (Post‑Secondary) Award',
  ],
  health: [
    'Nurses Award',
    'Aged Care Award',
    'Health Services Award',
  ],
  it: [
    'Professional Services Award',
    'Clerks—Private Sector Award',
  ],
  retail: [
    'General Retail Award',
    'Fast Food Industry Award',
  ],
  hospitality: [
    'Hospitality Industry (General) Award',
    'Restaurant Industry Award',
  ],
};

const awardDetails = {
  'Teachers Award':
    'This award sets the minimum pay and conditions for teachers employed in non‑government schools. It includes provisions for overtime, allowances and leave.',
  'Education Services (Post‑Secondary) Award':
    'Applicable to staff working in universities and colleges. It covers pay rates, classifications and allowances for administrative and academic roles.',
  'Nurses Award':
    'Provides minimum pay and employment conditions for nurses and midwives across Australia, including shift penalties and allowances.',
  'Aged Care Award':
    'Covers aged care employees such as personal carers and support staff. It outlines pay scale, allowances and rostering provisions.',
  'Health Services Award':
    'Applies to allied health, administrative and ancillary employees in the health sector. It details entitlements like overtime and allowances.',
  'Professional Services Award':
    'Covers professionals working in consulting and IT services. It includes classifications, pay scales and overtime provisions.',
  'Clerks—Private Sector Award':
    'Applies to clerical and administrative employees across many industries, with provisions for ordinary hours, penalties and leave.',
  'General Retail Award':
    'Sets minimum pay rates and conditions for employees in the retail sector, including penalty rates for weekends and public holidays.',
  'Fast Food Industry Award':
    'Applies to businesses selling takeaway food. It outlines pay rates, allowances and overtime conditions for employees.',
  'Hospitality Industry (General) Award':
    'Provides pay and conditions for hospitality workers such as hotel and catering staff, covering allowances and penalty rates.',
  'Restaurant Industry Award':
    'Applies to employees in restaurants and cafés. It sets out pay rates, classifications and penalty provisions.',
};

// Config options and explanations
const configOptions = {
  tax: {
    'tax-scale': 'The tax scale determines how much income tax is withheld from an employee’s pay based on residency and TFN declaration.',
    'tax-threshold': 'The tax threshold sets the income level at which tax becomes payable; earnings below this threshold are tax‑free.',
  },
  stp: {
    'rfb': 'Reportable fringe benefits settings ensure that taxable value of fringe benefits is correctly reported to the ATO via STP.',
    'foreign-income': 'Configure foreign income options for employees working overseas so that correct values are reported for tax and STP purposes.',
  },
  payslip: {
    'deduction-display': 'Controls how deductions (e.g. salary sacrifice, garnishees) are presented on employee payslips.',
    'year-to-date': 'Enables or disables year‑to‑date amounts on payslips for earnings, deductions and super.',
  },
};

/**
 * Updates the visual state of the stepper based on the current step.
 */
function updateStepper() {
  const items = document.querySelectorAll('#stepper .step-item');
  items.forEach((item) => {
    const step = parseInt(item.dataset.step);
    item.classList.remove('active');
    item.classList.remove('completed');
    if (step === currentStep) {
      item.classList.add('active');
    } else if (step < currentStep) {
      item.classList.add('completed');
    }
  });
}

/**
 * Shows the current step section and updates navigation buttons.
 */
function showStep() {
  document.querySelectorAll('.form-section').forEach((section) => {
    section.classList.remove('active');
  });
  const currentSection = document.getElementById(`step-${currentStep}`);
  if (currentSection) currentSection.classList.add('active');
  updateStepper();
  // Update buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  prevBtn.disabled = currentStep === 1;
  // When on the last step, hide the Next button and show the Submit button
  if (currentStep === totalSteps) {
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
  }
  nextBtn.textContent = currentStep === totalSteps ? 'Finish' : 'Next';
}

function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep();
  } else {
    // End of wizard - could implement export or summary
    alert('You have completed all steps! You can now review your entries.');
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep();
  }
}

// --- Payment functions ---
function addPayment() {
  const name = document.getElementById('payment-name').value.trim();
  const desc = document.getElementById('payment-desc').value.trim();
  const taxable = document.getElementById('payment-taxable').value;
  const superVal = document.getElementById('payment-super').value;
  if (!name) {
    alert('Please enter a payment name.');
    return;
  }
  payments.push({ name, desc, taxable, super: superVal });
  document.getElementById('payment-name').value = '';
  document.getElementById('payment-desc').value = '';
  renderPayments();
}

function renderPayments() {
  const tbody = document.getElementById('payment-table-body');
  tbody.innerHTML = '';
  payments.forEach((p, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2 border">${p.name}</td>
      <td class="p-2 border">${p.desc}</td>
      <td class="p-2 border text-center">${p.taxable}</td>
      <td class="p-2 border text-center">${p.super}</td>
      <td class="p-2 border text-center"><button class="text-red-600" onclick="removePayment(${idx})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removePayment(index) {
  payments.splice(index, 1);
  renderPayments();
}

// --- Deduction functions ---
function addDeduction() {
  const name = document.getElementById('deduction-name').value.trim();
  const desc = document.getElementById('deduction-desc').value.trim();
  if (!name) {
    alert('Please enter a deduction name.');
    return;
  }
  deductions.push({ name, desc });
  document.getElementById('deduction-name').value = '';
  document.getElementById('deduction-desc').value = '';
  renderDeductions();
}

function renderDeductions() {
  const tbody = document.getElementById('deduction-table-body');
  tbody.innerHTML = '';
  deductions.forEach((d, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2 border">${d.name}</td>
      <td class="p-2 border">${d.desc}</td>
      <td class="p-2 border text-center"><button class="text-red-600" onclick="removeDeduction(${idx})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removeDeduction(index) {
  deductions.splice(index, 1);
  renderDeductions();
}

// --- Redundancy functions ---
function addRedundancy() {
  const yearsInput = document.getElementById('redundancy-years');
  const weeksInput = document.getElementById('redundancy-weeks');
  const years = parseFloat(yearsInput.value);
  const weeks = parseFloat(weeksInput.value);
  if (isNaN(years) || isNaN(weeks)) {
    alert('Please enter both years of service and redundancy pay.');
    return;
  }
  redundancies.push({ years, weeks });
  yearsInput.value = '';
  weeksInput.value = '';
  renderRedundancies();
}

function renderRedundancies() {
  const tbody = document.getElementById('redundancy-table-body');
  tbody.innerHTML = '';
  redundancies.forEach((r, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2 border text-center">${r.years}</td>
      <td class="p-2 border text-center">${r.weeks}</td>
      <td class="p-2 border text-center"><button class="text-red-600" onclick="removeRedundancy(${idx})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removeRedundancy(index) {
  redundancies.splice(index, 1);
  renderRedundancies();
}

// --- Award selection logic ---
document.getElementById('industry-select').addEventListener('change', function () {
  const industry = this.value;
  const awardSelect = document.getElementById('award-select');
  awardSelect.innerHTML = '<option value="">Choose an award...</option>';
  if (awardsByIndustry[industry]) {
    awardsByIndustry[industry].forEach((award) => {
      const opt = document.createElement('option');
      opt.value = award;
      opt.textContent = award;
      awardSelect.appendChild(opt);
    });
  }
});

function analyseAward() {
  const award = document.getElementById('award-select').value;
  const result = document.getElementById('award-result');
  if (!award) {
    result.textContent = '';
    result.classList.add('hidden');
    alert('Please select an award to analyse.');
    return;
  }
  const details = awardDetails[award] || 'No details available for the selected award.';
  result.innerHTML = `<h4 class="font-semibold mb-2">${award}</h4><p>${details}</p>`;
  result.classList.remove('hidden');
}

// --- AI Config Explainer logic ---
function populateConfigValues() {
  const area = document.getElementById('config-area').value;
  const valueSelect = document.getElementById('config-value');
  valueSelect.innerHTML = '';
  if (!area || !configOptions[area]) {
    return;
  }
  Object.keys(configOptions[area]).forEach((key) => {
    const opt = document.createElement('option');
    opt.value = key;
    // Human readable label: replace hyphens with spaces and capitalise
    const label = key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    opt.textContent = label;
    valueSelect.appendChild(opt);
  });
}

function explainConfig() {
  const area = document.getElementById('config-area').value;
  const value = document.getElementById('config-value').value;
  const output = document.getElementById('config-output');
  if (!area || !value) {
    output.textContent = '';
    output.classList.add('hidden');
    alert('Please select a configuration area and setting.');
    return;
  }
  const explanation = configOptions[area][value];
  output.innerHTML = `<h4 class="font-semibold mb-2">${value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</h4><p>${explanation}</p>`;
  output.classList.remove('hidden');
}

// --- Payroll reports logic ---
function addPayrollReport() {
  const inScope = document.getElementById('report-in-scope').value;
  const name = document.getElementById('report-name').value.trim();
  const program = document.getElementById('report-program').value.trim();
  const transaction = document.getElementById('report-transaction').value.trim();
  if (!name) {
    alert('Please enter a report name.');
    return;
  }
  payrollReports.push({ inScope, name, program, transaction });
  document.getElementById('report-name').value = '';
  document.getElementById('report-program').value = '';
  document.getElementById('report-transaction').value = '';
  renderPayrollReports();
}

function renderPayrollReports() {
  const tbody = document.getElementById('payroll-reports-body');
  tbody.innerHTML = '';
  payrollReports.forEach((r, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2 border text-center">${r.inScope}</td>
      <td class="p-2 border">${r.name}</td>
      <td class="p-2 border">${r.program}</td>
      <td class="p-2 border">${r.transaction}</td>
      <td class="p-2 border text-center"><button class="text-red-600" onclick="removePayrollReport(${idx})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removePayrollReport(index) {
  payrollReports.splice(index, 1);
  renderPayrollReports();
}

// --- Interfaces logic ---
function addInterface() {
  const direction = document.getElementById('interface-direction').value;
  const system = document.getElementById('interface-system').value.trim();
  const desc = document.getElementById('interface-desc').value.trim();
  if (!system) {
    alert('Please enter an interface system.');
    return;
  }
  interfaces.push({ direction, system, desc });
  document.getElementById('interface-system').value = '';
  document.getElementById('interface-desc').value = '';
  renderInterfaces();
}

function renderInterfaces() {
  const tbody = document.getElementById('interface-table-body');
  tbody.innerHTML = '';
  interfaces.forEach((i, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="p-2 border text-center">${i.direction}</td>
      <td class="p-2 border">${i.system}</td>
      <td class="p-2 border">${i.desc}</td>
      <td class="p-2 border text-center"><button class="text-red-600" onclick="removeInterface(${idx})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });
}

function removeInterface(index) {
  interfaces.splice(index, 1);
  renderInterfaces();
}

// --- Payslip logic ---
let payslipLoaded = false;
function togglePayslip() {
  const container = document.getElementById('payslip-container');
  const img = document.getElementById('payslip-image');
  if (!payslipLoaded) {
    // Set the image source on first open
    img.src = 'payslip.png';
    payslipLoaded = true;
  }
  container.classList.toggle('hidden');
}

// Initialise on page load
document.addEventListener('DOMContentLoaded', () => {
  showStep();
  renderPayments();
  renderDeductions();
  renderRedundancies();
  renderPayrollReports();
  renderInterfaces();
});

/**
 * Gather all form data from the wizard and send it to the backend service.
 * The backend is expected to be running on localhost:3000/submit.
 */
function submitData() {
  // Collect values from all inputs, textareas and selects using their placeholder as a key
  const data = {};
  const elements = document.querySelectorAll('input, textarea, select');
  elements.forEach((el) => {
    // Skip buttons
    if (el.type === 'button' || el.type === 'submit' || el.type === 'reset') return;
    // Determine key
    const key = el.name || el.id || el.placeholder || el.dataset.label || `field_${Math.random().toString(36).substr(2, 5)}`;
    let value;
    if (el.type === 'checkbox') {
      value = el.checked;
    } else {
      value = el.value;
    }
    // If key already exists and is not an array, convert to array
    if (data[key] !== undefined) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });
  // Attach dynamic table data
  data.payments = payments;
  data.deductions = deductions;
  data.redundancies = redundancies;
  data.payrollReports = payrollReports;
  data.interfaces = interfaces;
  // Send data to backend
  fetch('http://localhost:3000/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((resData) => {
      alert(resData.message || 'Data submitted successfully!');
    })
    .catch((err) => {
      console.error(err);
      alert('There was an error submitting your data. Please ensure the backend is running.');
    });
}