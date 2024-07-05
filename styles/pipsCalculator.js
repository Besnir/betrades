const modeSelect = document.getElementById('mode');
const normalCalculator = document.getElementById('normalCalculator');
const pipsCalculator = document.getElementById('pipsCalculator');

modeSelect.addEventListener('change', function() {
	if (modeSelect.value === 'normal') {
		normalCalculator.style.display = 'flex';
		pipsCalculator.style.display = 'none';
	} else if (modeSelect.value === 'pips') {
		normalCalculator.style.display = 'none';
		pipsCalculator.style.display = 'flex';
	}
});

const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		if (value == "clear") {
			input = "";
			display_input.innerHTML = "";
			display_output.innerHTML = "";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			display_input.innerHTML = CleanInput(input);
		} else if (value == "=") {
			let result = eval(PerpareInput(input));

			display_output.innerHTML = CleanOutput(result);
		} else if (value == "brackets") {
			if (
				input.indexOf("(") == -1 || 
				input.indexOf("(") != -1 && 
				input.indexOf(")") != -1 && 
				input.lastIndexOf("(") < input.lastIndexOf(")")
			) {
				input += "(";
			} else if (
				input.indexOf("(") != -1 && 
				input.indexOf(")") == -1 || 
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") > input.lastIndexOf(")")
			) {
				input += ")";
			}

			display_input.innerHTML = CleanInput(input);
		} else {
			if (ValidateInput(value)) {
				input += value;
				display_input.innerHTML = CleanInput(input);
			}
		}
	})
}

document.addEventListener('keydown', function(event) {
	const value = event.key;

	if (value === "Escape") { // Clear
			input = "";
			display_input.innerHTML = "";
			display_output.innerHTML = "";
	} else if (value === "Backspace") { // Backspace
			input = input.slice(0, -1);
			display_input.innerHTML = CleanInput(input);
	} else if (value === "=" || value === "Enter") { 
		result = eval(PerpareInput(input));

		display_output.innerHTML = CleanOutput(result);
	} else if (value === "(" || value === ")") { // Brackets
		if (
				input.indexOf("(") === -1 ||
				(input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") < input.lastIndexOf(")")
		)) {
				input += value;
		} else if (
				(input.indexOf("(") !== -1 && input.indexOf(")") === -1) ||
				(input.indexOf("(") !== -1 && input.indexOf(")") !== -1 && input.lastIndexOf("(") > input.lastIndexOf(")")
		)) {
				input += value;
		}
		display_input.innerHTML = CleanInput(input);
	} else {
		if (!isNaN(key)) {
			return true;
		} else if (isNaN(key)) {
			event.preventDefault();
		} else if (ValidateInput(value)) {
			input += value;
			display_input.innerHTML = CleanInput(input);
		}	
	}
});

function CleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;

	for (let i = 0; i < input_array_length; i++) {
		if (input_array[i] == "*") {
			input_array[i] = ` <span class="operator">x</span> `;
		} else if (input_array[i] == "/") {
			input_array[i] = ` <span class="operator">÷</span> `;
		} else if (input_array[i] == "+") {
			input_array[i] = ` <span class="operator">+</span> `;
		} else if (input_array[i] == "-") {
			input_array[i] = ` <span class="operator">-</span> `;
		} else if (input_array[i] == "(") {
			input_array[i] = `<span class="brackets">(</span>`;
		} else if (input_array[i] == ")") {
			input_array[i] = `<span class="brackets">)</span>`;
		} else if (input_array[i] == "%") {
			input_array[i] = `<span class="percent">%</span>`;
		}
	}

	return input_array.join("");
}

function CleanOutput (output) {
	let output_string = output.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];

	let output_array = output_string.split("");

	if (output_array.length > 3) {
		for (let i = output_array.length - 3; i > 0; i -= 3) {
			output_array.splice(i, 0, ",");
		}
	}

	if (decimal) {
		output_array.push(".");
		output_array.push(decimal);
	}

	return output_array.join("");
}

function ValidateInput (value) {
	let last_input = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	if (value == "." && last_input == ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}

function PerpareInput (input) {
	let input_array = input.split("");

	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}

	return input_array.join("");
}

//Position Sizing Calculator
const category = document.getElementById('category');
const currencyPair = document.querySelector('.items__asset .currency');
const asset = document.querySelector('.items__asset .asset');
const indexOrBasket = document.querySelector('.items__asset .index--basket');

const currencySection = document.getElementById('currencyPair');
const assetSection = document.getElementById('asset');
const indexOrBasketSection = document.getElementById('indexOrBasket');
const accountCurrencySection = document.getElementById('accont_currency');

let currentAsset = "";
let traderPreferedCurrency = accountCurrencySection.value;

function checksetCurrentAsset() {
	if (category.value === 'Forex') {
		currentAsset = currencySection.value;
	} else if (category.value === 'Commodities') {
		currentAsset = assetSection.value;
	} else if (category.value === 'Deriv') {
		currentAsset = indexOrBasketSection.value;
	}
	return currentAsset;
}
accountCurrencySection.addEventListener('change', function() {
	traderPreferedCurrency = accountCurrencySection.value;
})

category.addEventListener('change', function() {
	if (category.value === 'Forex') {
		currencyPair.style.display = 'inline';
		asset.style.display = 'none';
		indexOrBasket.style.display = 'none';
	} else if (category.value === 'Commodities') {
		currencyPair.style.display = 'none';
		asset.style.display = 'inline';
		indexOrBasket.style.display = 'none';
	} else if (category.value === 'Deriv') {
		currencyPair.style.display = 'none';
		asset.style.display = 'none';
		indexOrBasket.style.display = 'inline';
	}
});

let accountBalance = "";
let pips ="";
let riskAmount = "";

const next_button = document.querySelector('.doneBtn');
const next_button1 = document.querySelector('.doneBtn1');
const pipsInput = document.querySelector('.input2.pipsInput');
const balanceInput = document.querySelector('.input2.Balance');
const percentageSpan = document.querySelector('.theInput .percentage')
const percentageRiskInput = document.querySelector('.input2.percentageInput');
const moneySpan = document.querySelector('.theInput .money')
const moneyRiskInput = document.querySelector('.input2.moneyInput');
const switchButton = document.querySelector('.switch-risk .switch');
const outputDisplay = document.querySelector('.output1'); 

async function calculateLotSize(pips, riskAmount) {
    const currencyPairQuote = currencySection.value;
    const baseCurrency = currencyPairQuote.substring(0, 3);
    const quoteCurrency = currencyPairQuote.substring(3, 6);
    let exchangeRate = "";

    try {
			const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
			const data = await response.json();
			exchangeRate = data.rates[quoteCurrency];

			let pipValue = "";
			let lotSize = "";

			if (category.value === 'Forex' || category.value === 'Commodities') {
					if (category.value === 'Commodities') {
							pipValue = 1;
					} else if (currencyPairQuote.endsWith('JPY')) {
							pipValue = (0.01 / exchangeRate) * 100000;
					} else {
							pipValue = (0.0001 / exchangeRate) * 100000;
					}

					lotSize = riskAmount / (pips * pipValue);

					outputDisplay.innerHTML = `
						<p>To risk <span class="riskAmount">${riskAmount}&nbsp;${traderPreferedCurrency}</span> out of <span class="accountBalance">${accountBalance}&nbsp;${traderPreferedCurrency}</span> in '${currentAsset}', use a lot size of <span><strong>${lotSize.toFixed(2)}</strong></span>.</p>
						<p>Units: <span class="unitsParagraph">${(lotSize * 100000).toFixed(2)}</span></p>
					`;
					console.log(exchangeRate);
			}
	} catch (error) {
		console.error('Error fetching exchange rate:', error);
	}
}



let nextButton2Visibility = false;

function nextButtonToggle() {

	if (nextButton2Visibility === true) {
		next_button1.style.display = 'none';
	} else if (pipsInput.style.border === 'none') {
		next_button.style.display = 'none';
		next_button1.style.display = 'inline';
	} else {
		next_button.style.display = 'inline';
	}
}

function promptAccountBalance() {
	next_button.style.display = 'none';
	balanceInput.style.display = 'inline';
	pipsInput.style.border = 'none';
	pipsInput.style.color = '#898888';
	pips = input1;
	display_input1 = document.querySelector('.display1 .Balance');
	input1 = "";
	return pips;
}

function promptRisk() {
	next_button.style.display = 'none';
	next_button1.style.display = 'none';
	nextButton2Visibility = true;
	percentageRiskInput.style.display = 'inline';
	switchButton.style.display = 'inline-block';
	balanceInput.style.border = 'none';
	balanceInput.style.color = '#898888';
	accountBalance = input1;
	display_input1 = document.querySelector('.display1 .percentageInput');
	input1 = "";
	return accountBalance;
}

function toggleRisk() {
	if (switchButton.innerHTML === 'Switch to Money') {
		switchButton.innerHTML = 'Switch to %';
		percentageSpan.style.display = 'none';
		percentageRiskInput.style.display = 'none';
		moneySpan.style.display = 'inline';
		moneyRiskInput.style.display = 'inline';
		display_input1 = document.querySelector('.display1 .moneyInput');
		input1 = "";
		moneyRiskInput.innerHTML = `<p>Dial&nbsp;risk&nbsp;amount</p>`;
	} else if (switchButton.innerHTML === 'Switch to %') {
		switchButton.innerHTML = 'Switch to Money';
		percentageSpan.style.display = 'inline';
		percentageRiskInput.style.display = 'inline';
		moneySpan.style.display = 'none';
		moneyRiskInput.style.display = 'none';
		display_input1 = document.querySelector('.display1 .percentageInput');
		input1 = "";
		percentageRiskInput.innerHTML = `<p>Dial&nbsp;%&nbsp;risk</p>`;
	}
}

const keys1 = document.querySelectorAll('.key1');
let display_input1 = document.querySelector('.display1 .pipsInput');
const display_output1 = document.querySelector('.display1 .output1');

let input1 = "";

for (let key of keys1) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		nextButtonToggle();

		if (value == "clear") {
			category.value = 'Forex';
			currencyPair.style.display = 'inline';
			asset.style.display = 'none';
			indexOrBasket.style.display = 'none';
			currencySection.value = 'EURUSD';
			assetSection.value = 'XAUUSD';
			indexOrBasketSection.value = 'Volatility 10 1s';
			accountCurrencySection.value = 'USD';
			currentAsset = "";
			input1 = "";
			accountBalance = "";
			pips ="";
			riskAmount = "";
			next_button.style.display = 'none';
			next_button1.style.display = 'none';
			balanceInput.style.display = 'none';
			percentageRiskInput.style.display = 'none';
			switchButton.style.display = 'none';
			pipsInput.style.border = '1px solid #898888a0';
			balanceInput.style.border = '1px solid #898888a0';
			percentageRiskInput.style.border = '1px solid #898888a0';
			moneyRiskInput.style.border = '1px solid #898888a0';
			pipsInput.style.color = 'black';
			balanceInput.style.color = 'black';
			percentageRiskInput.style.color = 'black';
			display_input1 = document.querySelector('.display1 .pipsInput');
			input1 = "";
			pipsInput.innerHTML = `<p>Dial&nbsp;stoploss&nbsp;pips</p>`;
			balanceInput.innerHTML = `<p>Dial&nbsp;a/c&nbsp;balance</p>`;
			percentageRiskInput.innerHTML = `<p>Dial&nbsp;%&nbsp;risk</p>`;
			outputDisplay.innerHTML ="";
			outputDisplay.style.display = 'none';
			switchButton.innerHTML = 'Switch to Money';
			percentageSpan.style.display = 'inline';
			moneySpan.style.display = 'none';
			moneyRiskInput.style.display = 'none';
			nextButton2Visibility = false;
			
		} else if (value == "backspace") {
			input1 = input1.slice(0, -1);
			display_input1.innerHTML = CleanInput(input1);
		} else if (value == "=") {
			let result1 = eval(PerpareInput(input1));

			if (pipsInput.style.border !== 'none' && input1 === "") {
				pipsInput.innerHTML = `<p>This field is required<p>`;
				next_button.style.display = 'none';
			} else if (display_input1 === document.querySelector('.display1 .Balance') && riskAmount === "" && input1 !== "") {
				next_button1.style.display = 'none';
				balanceInput.style.border = 'none';
				balanceInput.style.color = '#898888';
				percentageRiskInput.style.display = 'inline';
				percentageRiskInput.innerHTML = `<p>This field is required</p>`;
				switchButton.style.display = 'inline-block';
				accountBalance = input1;
				display_input1 = document.querySelector('.display1 .percentageInput');
				input1 = "";
				nextButton2Visibility = true;
			} else if (accountBalance === "" && riskAmount === "") {
				promptAccountBalance();
				next_button1.style.display = 'none';
				balanceInput.innerHTML = `<p>This field is required</p>`;
			} else if (balanceInput.style.border !== 'none' && input1 === "") {
				promptRisk();
				balanceInput.innerHTML = `<p>This field is required<p>`;
				next_button1.style.display = 'none';
			} else if (percentageRiskInput.style.border !== 'none' && input1 === "") {
				percentageRiskInput.innerHTML = `<p>This field is required<p>`;
				next_button1.style.display = 'none';
			} else {
				riskAmount = (input1 * accountBalance) / 100;
				percentageRiskInput.style.border = 'none';
				moneyRiskInput.style.border = 'none';
				moneyRiskInput.style.color = '#898888';
				percentageRiskInput.style.color = '#898888';
	
				switchButton.style.display = 'none';
				display_input1 = "";
				console.log(pips);
				console.log(riskAmount);
				checksetCurrentAsset();
				calculateLotSize(pips, riskAmount);
				outputDisplay.style.display = 'inline';
				next_button.style.display = 'none';
				nextButton2Visibility = true;
			}

		} else if (value == "brackets") {
			if (
				input1.indexOf("(") == -1 || 
				input1.indexOf("(") != -1 && 
				input1.indexOf(")") != -1 && 
				input1.lastIndexOf("(") < input1.lastIndexOf(")")
			) {
				input1 += "(";
			} else if (
				input1.indexOf("(") != -1 && 
				input1.indexOf(")") == -1 || 
				input1.indexOf("(") != -1 &&
				input1.indexOf(")") != -1 &&
				input1.lastIndexOf("(") > input1.lastIndexOf(")")
			) {
				input1 += ")";
			}

			display_input1.innerHTML = CleanInput(input1);
		} else {
			if (ValidateInput(value)) {
				input1 += value;
				display_input1.innerHTML = CleanInput(input1);
			}
		}
	})
}

function CleanInput(input1) {
	let input_array1 = input1.split("");
	let input_array_length1 = input_array1.length;

	for (let i = 0; i < input_array_length1; i++) {
		if (input_array1[i] == "*") {
			input_array1[i] = ` <span class="operator">x</span> `;
		} else if (input_array1[i] == "/") {
			input_array1[i] = ` <span class="operator">÷</span> `;
		} else if (input_array1[i] == "+") {
			input_array1[i] = ` <span class="operator">+</span> `;
		} else if (input_array1[i] == "-") {
			input_array1[i] = ` <span class="operator">-</span> `;
		} else if (input_array1[i] == "(") {
			input_array1[i] = `<span class="brackets">(</span>`;
		} else if (input_array1[i] == ")") {
			input_array1[i] = `<span class="brackets">)</span>`;
		} else if (input_array1[i] == "%") {
			input_array1[i] = `<span class="percent">%</span>`;
		}
	}

	return input_array1.join("");
}

function CleanOutput (output1) {
	let output_string1 = output1.toString();
	let decimal1 = output_string1.split(".")[1];
	output_string1 = output_string1.split(".")[0];

	let output_array1 = output_string1.split("");

	if (output_array1.length > 3) {
		for (let i = output_array1.length - 3; i > 0; i -= 3) {
			output_array1.splice(i, 0, ",");
		}
	}

	if (decimal1) {
		output_array1.push(".");
		output_array1.push(decimal1);
	}

	return output_array1.join("");
}

function ValidateInput (value1) {
	let last_input1 = input1.slice(-1);
	let operators1 = ["+", "-", "*", "/"];

	if (value1 == "." && last_input1 == ".") {
		return false;
	}

	if (operators1.includes(value1)) {
		if (operators1.includes(last_input1)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}

function PerpareInput (input1) {
	let input_array1 = input1.split("");

	for (let i = 0; i < input_array1.length; i++) {
		if (input_array1[i] == "%") {
			input_array1[i] = "/100";
		}
	}

	return input_array1.join("");
}
