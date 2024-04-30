let date = new Date();
let currentMonthDates = [];
let prevMonthDates = [];
let nextMonthDates = [];

let monthIndex = [];
let nextMonthIndex = [];
const initTime = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
let viewYear;
let viewMonth;
const renderCalender = () => {
	
	viewYear = date.getFullYear();
	viewMonth = date.getMonth();
	monthIndex = [];
	nextMonthIndex = [];
	currentMonthDates = [];
	prevMonthDates = [];
	nextMonthDates = [];
	document.querySelector('.title_year').textContent = `${viewYear}.`;
	document.querySelector('.title_month').textContent = `${viewMonth + 1}`;
	document.querySelector('.cal').textContent = `${viewMonth + 1}.(일).(요일) 시간을 선택해 주세요`;
	const previousMonth = new Date(viewYear, viewMonth, 0);
	const currentMonth = new Date(viewYear, viewMonth+1, 0);
	
	const prevMonthLastDate = previousMonth.getDate();
	const prevMonthLastDay = previousMonth.getDay();
	
	const curMonthLastDate = currentMonth.getDate();
	const curMonthLastDay = currentMonth.getDay();
	
	
	currentMonthDates =  [...Array(curMonthLastDate + 1).keys()].slice(1);
	

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
	
	todayNum = currentMonthDates.reduce((acc, num) => {
			if (num == (nDate.getDate())) {
				acc.push(num);
			}
			return acc;
	}, []);
	let temp = parseInt(todayNum);
	let total = 0;
	// 오늘 부터 마지막 까지 날짜 갯수
	total = (currentMonthDates.length - currentMonthDates.indexOf(temp)) + nextMonthDates.length;
	formattedDates.forEach((date, i) => {
		let condition = 'unselectable';
		let todayClass = '';
		
		if (viewMonth === nDate.getMonth()) {
			if (formattedDates.indexOf(temp) <= i) {
				condition = '';
			}
			// if (!((i < todayNum) || (i-1 > currentMonthDates.length + prevMonthDates.length))) {
			// 	condition = '';
			// }
			// month 와 date를 같이 체크 하면 today 한개만 나올듯
			if (i == todayNum) {
				todayClass = 'today';
			}
		} else if (viewMonth == nDate.getMonth()+1) {
			if (i <= (formattedDates.length - (total+1)) ) {
				condition = '';
			}
			
		}
		formattedDates[i] = `<button type="button" value=${i} class="date${condition ? ` ${condition}` : ''}${todayClass ? ` ${todayClass}` : ''} ">
								<span class="sp num">${date}</span>
								<span class="sp text"></span>
							</button>`;
		
		monthIndex.push(i);
		nextMonthIndex = monthIndex.slice(-nextMonthDates.length);
		
	});

	document.querySelector('.dates').innerHTML = formattedDates.join('');
	const otherBtn = document.querySelectorAll('.date.unselectable');
	otherBtn.forEach(e => {
		e.disabled = true;
	})
	
	const btn = document.querySelectorAll('.date');
	btn.forEach(e => {
		if (e.classList.contains('today')) {
			e.querySelector('span.text').textContent = `오늘`;
		}
	})
	
	let isToday = false;
	// createTimeBtns(initTime, isToday);
}
renderCalender();
createTimeBtns(initTime, false);

// 달력 버튼
function calenderBtn(event) {
	const btnClass = event.target;
	if (btnClass.classList.contains('go-prev')) {
		date.setMonth(date.getMonth() - 1);
	} else if(btnClass.classList.contains('go-next')){
		date.setMonth(date.getMonth() + 1);
		
	}
	renderCalender();
	// const currDate = new Date();
	// isToday = false;
	// renderCalender(()=> createTimeBtns(initTime, isToday));
	
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


const saveBtn = document.querySelector('.save_btn');
// let selectedCountBtn = false;
// let selectedTimeBtn = false;

const guestCountBtns = document.querySelectorAll('.count_btn');
const timeBtns = document.querySelectorAll('.time_btn');
const dateBtns = document.querySelectorAll('.date');

// 달력이 변경 됐을 때 기존 이벤트가 없어지는 거 방지
document.addEventListener('click', function(event) {
	if (event.target.classList.contains('date')) {
		const dateBtns = document.querySelectorAll('.date');
		addSelectedClass(event.target, dateBtns);

		let index = parseInt(event.target.value)
		let prevText = event.target.querySelector('.sp.num').textContent.trim();
		// 다음달에 해당하는 날짜 클릭 시
		if (nextMonthIndex.indexOf(index) !== -1) {
			date.setMonth(date.getMonth() + 1);
			renderCalender();
			const nextDateBtns = document.querySelectorAll('.date');
			let found = false;
			
			nextDateBtns.forEach(btn => {
				const nextText = btn.querySelector('.sp.num').textContent.trim();
				if (!found && nextText == prevText) {
						btn.classList.add('selected');
						found = true;
				}
			})
		}
    }
});

guestCountBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		addSelectedClass(btn, guestCountBtns);
	})
})


timeBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		addSelectedClass(btn, timeBtns);
		saveBtn.removeAttribute('disabled');
	})
})

function addSelectedClass(btn, type) {
	const otherBtn = type
	otherBtn.forEach(oBtn => {
		oBtn.classList.remove('selected');
	})
	btn.classList.add('selected');
}


saveBtn.addEventListener('click', () => {
	const dateValue = document.querySelector('.date.selected');
	const countValue = document.querySelector('.count_btn.selected');
	const timeValue = document.querySelector('.time_btn.selected');
	const monthValue = document.querySelector('.title_month').innerHTML;
	const hourValue = document.querySelector('input[name="flexRadioDefault"]:checked');
	
	sessionStorage.setItem('reservationYear', JSON.stringify(viewYear));
	sessionStorage.setItem('guestCount', JSON.stringify(countValue.textContent));
	sessionStorage.setItem('reservationTime', JSON.stringify(timeValue.textContent));
	sessionStorage.setItem("reservationMonth", JSON.stringify(monthValue));
	sessionStorage.setItem("reservationDay", JSON.stringify(dateValue.querySelector('span').textContent));
	sessionStorage.setItem("usageTime", JSON.stringify(hourValue.value));
	sessionStorage.setItem("optionInfo", JSON.stringify(optionInfo));
	
	window.location.href = `/watb/reserve/detail`;
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
	sessionStorage.setItem('price', totalPrice);
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