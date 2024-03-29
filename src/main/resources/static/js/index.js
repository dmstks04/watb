let date = new Date();
const initTime = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const renderCalender = (createTimeBtns) => {
	const viewYear = date.getFullYear();
	const viewMonth = date.getMonth();
	document.querySelector('.title_year').textContent = `${viewYear}.`;
	document.querySelector('.title_month').textContent = `${viewMonth + 1}`;
	document.querySelector('.cal').textContent = `${viewMonth + 1}.(일).(요일) 시간을 선택해 주세요`;
	const previousMonth = new Date(viewYear, viewMonth, 0);
	const currentMonth = new Date(viewYear, viewMonth+1, 0);
	
	const prevMonthLastDate = previousMonth.getDate();
	const prevMonthLastDay = previousMonth.getDay();
	
	const curMonthLastDate = currentMonth.getDate();
	const curMonthLastDay = currentMonth.getDay();
	
	
	const currentMonthDates =  [...Array(curMonthLastDate + 1).keys()].slice(1);
	const prevMonthDates = [];
	const nextMonthDates = [];

	if(prevMonthLastDay !== 6) {
		for(let i = 0; i <= prevMonthLastDay; i++){
			prevMonthDates.unshift(prevMonthLastDate - i);
		}
	}

	for(let i = 1; i < 7 - curMonthLastDay; i ++) {
		nextMonthDates.push(i);
	}
	let nDate = new Date();
	const formattedDates = prevMonthDates.concat(currentMonthDates, nextMonthDates);
	// const todayIndex = formattedDates.indexOf(nDate.getDate());
	const todayIndex = formattedDates.reduce((acc, num, index) => {
		if (num == nDate.getDate()) {
			acc.push(index);
		}
		return acc;
	}, []);
	formattedDates.forEach((date, i) => {
		const today = date === nDate.getDate() && viewMonth === nDate.getMonth() && viewYear === nDate.getFullYear();
		let defaultSelected = 'unselectable';
		let todayClass = '';

		let condition = viewMonth >= nDate.getMonth() ? 'this' : 'other';
		if ( viewMonth === nDate.getMonth() && i < todayIndex[1]) {
			condition = 'other';
		}		
		if (today && condition === 'this') {
			defaultSelected = 'selected';
			todayLabel = '오늘';
			todayClass = 'today'
		}
		
		formattedDates[i] = `<button type="button" class="date ${defaultSelected} ${todayClass}">
								<span class="sp num ${condition}">${date}</span>
								<span class="sp text"></span>
							</button>`;
		
	});
	document.querySelector('.dates').innerHTML = formattedDates.join('');

	const otherBtn = document.querySelectorAll('.other');
	otherBtn.forEach(e => {
		e.parentNode.disabled = true;
	})
	
	const btn = document.querySelectorAll('.date');
	btn.forEach(e => {
		if (e.classList.contains('today')) {
			e.querySelector('span.text').textContent = `오늘`;
		}
	})
	
	let isToday = false;
	createTimeBtns(initTime, isToday);
}
renderCalender(createTimeBtns);


// 달력 버튼
function calenderBtn(event) {
	const btn= event.target;
	const btnText = btn.innerText;
	switch(btnText){
		case '<': date.setMonth(date.getMonth() - 1);   break;
		case '>': date.setMonth(date.getMonth() + 1); 	break;
	}
	const currDate = new Date();
	isToday = false;
	// 현재 달로 돌아왔을 때 시간 필터링 적용
	if(date.getMonth() === currDate.getMonth()){
		isToday = true;
	}
	renderCalender(()=> createTimeBtns(initTime, isToday));
}

// li태그 생성
function createLiElement(time) {
	const liElement = document.createElement('li');
	const btnElement = document.createElement('button');
	liElement.className = 'time_item';
	btnElement.className = 'time_btn';
	btnElement.innerHTML = `${time}:00`;
	liElement.appendChild(btnElement);
	return liElement;
}

// ul태그 생성
function createUlElement() {
	const ulElement = document.createElement('ul');
	ulElement.className = 'time_list';
	return ulElement;
}

// 시간 버튼 로딩
function createTimeBtns(initTime, isToday) {	
	const timeSlot = document.querySelector('.calender-time-slot');
	// 기존에 있던 버튼 요소 삭제
	while(timeSlot.firstChild){
		timeSlot.removeChild(timeSlot.firstChild);
	}
	
	let currentHour = new Date().getHours();
	let ulElement;
	
	let currentHourIndex = initTime.indexOf(currentHour) + 1;
	isToday ? (currentHourIndex = initTime.indexOf(currentHour) + 1) : (currentHourIndex = 0);
 	initTime.slice(currentHourIndex).forEach((time, index) => {
		if(index % 4 === 0){
			ulElement = createUlElement();
			timeSlot.appendChild(ulElement);
		}
		const liElement = createLiElement(time);
		ulElement.appendChild(liElement);
	});
}


const nextBtn = document.querySelector('.next_btn');
// let selectedCountBtn = false;
// let selectedTimeBtn = false;

const countBtns = document.querySelectorAll('.count_btn');
const timeBtns = document.querySelectorAll('.time_btn');
const dateBtns = document.querySelectorAll('.date');
const btnArrays = [countBtns,timeBtns,dateBtns]

function buttonClick(buttons) {
	buttons.forEach(btn => {
		btn.addEventListener('click', () => {
			buttons.forEach(otherBtn => otherBtn.classList.remove('selected'));
			btn.classList.add('selected');
			if (btn.classList.contains('time_btn')) {
				
				nextBtn.removeAttribute('disabled');
			}
			// if (btn.classList.contains('date')) {
			// 	createTimeBtns(initTime, false);
			// }
		})
	})
}
btnArrays.forEach(e => {
	buttonClick(e);
})

//==========================================

// handleButtonClick(dateBtns);
// function toggleSelected(btn, btns) {
//     btns.forEach(other => {
//         other.classList.remove('selected');
//     });
//     btn.classList.add('selected');
//     if (btns === countBtns) {
//         selectedCountBtn = true;
//     } else if (btns === timeBtns) {
//         selectedTimeBtn = true;
//     }
// }

nextBtn.addEventListener('click', () => {
	const dateValue = document.querySelector('.date.selected');
	const countValue = document.querySelector('.count_btn.selected');
	const timeValue = document.querySelector('.time_btn.selected');
	const month = document.querySelector('.title_month').innerHTML;
	const hourValue = document.querySelector('input[name="flexRadioDefault"]:checked');

	sessionStorage.setItem('timeBtnValue', JSON.stringify(timeValue.textContent));
	sessionStorage.setItem('countBtnValue', JSON.stringify(countValue.textContent));
	sessionStorage.setItem("monthValue", JSON.stringify(month));
	sessionStorage.setItem("dateValue", JSON.stringify(dateValue.querySelector('span').textContent));
	sessionStorage.setItem("hourValue", JSON.stringify(hourValue.value));
	sessionStorage.setItem("optionInfo", JSON.stringify(optionInfo));
	
	window.location.href = "/watb/reserve/detail";
});
// ==============================

const optionBox = document.getElementById('option-box');
let selectOptValue = null;
let countValue = 1;

const formatter = new Intl.NumberFormat('kr', {
	style: 'currency',
	currency: 'krw'
})

window.addEventListener('load', () => {
	calculatePrice();
});

const radioBtn = document.querySelectorAll('input[name="flexRadioDefault"]');
radioBtn.forEach(e => {
	e.addEventListener('change', () => {
		// 계산 실행 함수
		calculatePrice()
	})
})

function calculatePrice() {
	const optionPrice = optionInfo.reduce((acc, value) => acc + value.price, 0);
	const hourBtn = document.querySelector('input[name="flexRadioDefault"]:checked');
	hourlyPrice = hourBtn.value * 50000;
	
	const totalPrice = optionPrice + hourlyPrice;
	sessionStorage.setItem('totalPrice', totalPrice);
	document.querySelector('.total-price').innerHTML =`${totalPrice}원`;
}


let optionDropdown = document.getElementById('options-dropdown');

function selectOption() {
	optionDropdown = document.getElementById('options-dropdown');
	optionDropdown.addEventListener('change', () => {
		const optValue = optionDropdown.value;
		if (selectOptValue != optValue) {
			addOption();
		} else {
			alert('이미 선택 되어 있는 옵션입니다.');
			return;
		}
		optionDropdown.selectedIndex = 0;
	});
}
selectOption();

let optionInfo = [];
let optPrice = 3000;
function addOption() {
	const optValue = optionDropdown.value;
	const newBox = document.createElement('div');
	newBox.className = 'opt-detail-box';
	newBox.innerHTML = `<ul class="opt-ul">
						<li class="opt-li">
							<em>풋살화, ${optValue}</em>
							<div class="opt-count-box">
								<a class="opt-a" data-value="-" onclick="countOption(this)">-</a>
								<input class="opt-input" type="text" value=${countValue}>
								<a class="opt-a" data-value="+" onclick="countOption(this)">+</a>
							</div>
							<strong class="opt-strong">
								<span class="opt-price">${optPrice}</span>
							</strong>
							<button id="removeBtn" onclick="removeBox(this)">x</button>
						<li>
					</ul>`;
	selectOptValue = optValue;
	optionBox.appendChild(newBox);
	optionInfo.push({
		name: optValue,
		quantity: countValue,
		price: optPrice
	});
	
	calculatePrice();
}

let countOptionAdded = false;

function countOption(btn) {
	const boxHtml = btn.innerHTML;
	const box = btn.closest('.opt-detail-box');
	const input = box.querySelector('.opt-input');
	const priceElement = box.querySelector('.opt-price');
	let countValue = parseInt(input.value);

	if (!(countValue === 1 && boxHtml === '-')) {
		countValue = boxHtml === '+' ? countValue + 1 : Math.max(countValue - 1, 1);
		optPriceTotal = 3000 * countValue;
		
	} else {
		optionDropdown.selectedIndex = 0;
		alert('더 이상 줄일 수 없습니다.');
	}
	priceElement.textContent = optPriceTotal;
	input.value = countValue;
	const index = Array.from(box.parentNode.children).indexOf(box);
	optionInfo[index].quantity = countValue;
	optionInfo[index].price = optPriceTotal;
	console.log(optionInfo);

	calculatePrice();
}

function removeBox(btn) {
	const box = btn.closest('.opt-detail-box');
	const index = Array.from(box.parentNode.children).indexOf(box);
	box.remove();
	optionInfo.splice(index, 1);
	calculatePrice();
}