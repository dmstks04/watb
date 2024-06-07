let date = new Date();
let currentMonthDates = [];
let prevMonthDates = [];
let nextMonthDates = [];
let monthIndex = [];
let nextMonthIndex = [];
let currentMonthIndex = [];
let prevMonthIndex = [];
let reservationTime = [];
const dateFormatter = new Intl.DateTimeFormat('kr', {
    weekday: "short"
})
const initTime = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
let viewYear;
let viewMonth;
let viewDate;
const renderCalender = () => {
	viewYear = date.getFullYear();
	viewMonth = date.getMonth();
	viewDate = date.getDate();
	monthIndex = [];
	nextMonthIndex = [];
	currentMonthIndex = [];
	prevMonthIndex = [];
	currentMonthDates = [];
	prevMonthDates = [];
	nextMonthDates = [];
	document.querySelector('.title_year').textContent = `${viewYear}.`;
	document.querySelector('.title_month').textContent = `${viewMonth + 1}`;
	document.querySelector('.cal').textContent = `${viewMonth + 1}.${viewDate}.(${dateFormatter.format(date)}) 시간을 선택해 주세요`;
	const previousMonth = new Date(viewYear, viewMonth, 0);
	const currentMonth = new Date(viewYear, viewMonth+1, 0);
	
	const prevMonthLastDate = previousMonth.getDate();
	const prevMonthLastDay = previousMonth.getDay();
	const curMonthLastDate = currentMonth.getDate();
	const curMonthLastDay = currentMonth.getDay();
	// 1 부터 마지막 날 까지 배열로 생성
	currentMonthDates =  [...Array(curMonthLastDate + 1).keys()].slice(1);

	if(prevMonthLastDay !== 6) {
		for(let i = 0; i <= prevMonthLastDay; i++){
			prevMonthDates.unshift(prevMonthLastDate - i);
		}
	}

	// 7 - 마지막날 요일 = 다음달 날짜 출력
	for(let i = 1; i < 7 - curMonthLastDay; i ++) {
		nextMonthDates.push(i);
	}
	let nDate = new Date();
	const formattedDates = prevMonthDates.concat(currentMonthDates, nextMonthDates);
	todayNum = nDate.getDate();
	let todayIndex = parseInt(todayNum);
	let total = 0;
	// 오늘 부터 마지막 까지 날짜 갯수
	total = (currentMonthDates.length - currentMonthDates.indexOf(todayIndex)) + nextMonthDates.length;
	formattedDates.forEach((date, i) => {
		let condition = 'unselectable';
		let todayClass = '';
		
		if (viewMonth === nDate.getMonth()) {
			if (i >= prevMonthDates.length + currentMonthDates.indexOf(todayIndex)) {
				condition = '';
			}
			if (i >= prevMonthDates.length && i < formattedDates.length - nextMonthDates.length && date == todayIndex) {
				todayClass = 'today';
			}
		} else if (viewMonth == nDate.getMonth() + 1) {
			if (i <= (formattedDates.length - total)) {
				condition = '';
			}
		}
		
		formattedDates[i] = `<button type="button" value=${i} class="date${condition ? ` ${condition}` : ''}${todayClass ? ` ${todayClass}` : ''} ">
								<span class="sp num">${date}</span>
								<span class="sp text"></span>
							</button>`;
		
		monthIndex.push(i);
		nextMonthIndex = monthIndex.slice(-nextMonthDates.length);
		currentMonthIndex = monthIndex.slice(prevMonthDates.length).slice(0, -nextMonthDates.length);
		prevMonthIndex = monthIndex.slice(0, prevMonthDates.length);
		
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
}
renderCalender();

// 달력 버튼
function calenderBtn(event) {
	const btnClass = event.target;
	if (btnClass.classList.contains('go-prev')) {
		date.setMonth(date.getMonth() - 1);
	} else if(btnClass.classList.contains('go-next')){
		date.setMonth(date.getMonth() + 1);
		
	}
	renderCalender();
}

// li태그 생성
function createLiElement(time) {
	const liElement = document.createElement('li');
	const btnElement = document.createElement('button');
	liElement.className = 'time_item';
	btnElement.className = 'time_btn';
	btnElement.innerHTML = `${time}:00`;
	btnElement.value = `${time}`;
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
function createTimeBtns(reservationTime, isToday) {
	let ulElement;
	let currentHour = new Date().getHours();
	const timeSlot = document.querySelector('.calender-time-slot');
	// 기존에 있던 버튼 요소 삭제
	while (timeSlot.firstChild) {
		timeSlot.removeChild(timeSlot.firstChild);
	}
	let currentHourIndex = initTime.indexOf(currentHour) + 1;
	isToday ? (currentHourIndex = initTime.indexOf(currentHour) + 1) : (currentHourIndex = 0);

	initTime.slice(currentHourIndex).forEach((time, index) => {
		if (index % 4 === 0) {
			ulElement = createUlElement();
			timeSlot.appendChild(ulElement);
		}
		const liElement = createLiElement(time);
		const timeBtnValue = liElement.querySelector('button').value;
		if (reservationTime.includes(parseInt(timeBtnValue))) {
			liElement.querySelector('button').innerHTML = "예약마감";
			liElement.querySelector('button').disabled = true;
		}
		ulElement.appendChild(liElement);
	});
}	

const saveBtn = document.querySelector('.save_btn');
const guestCountBtns = document.querySelectorAll('.count_btn');
const timeBtns = document.querySelectorAll('.time_btn');
const dateBtns = document.querySelectorAll('.date');

// 달력 날짜 클릭
// 달력이 변경 됐을 때 기존 이벤트가 없어지는 거 방지
document.addEventListener('click', event => {
	if (event.target.classList.contains('date')) {
		const dateBtns = document.querySelectorAll('.date');
		addSelectedClass(event.target, dateBtns);
		
		let index = parseInt(event.target.value)
		let clickText = event.target.querySelector('.sp.num').textContent.trim();
		if (nextMonthIndex.indexOf(index) !== -1) {
			date.setMonth(date.getMonth() + 1);
		} else if (prevMonthIndex.indexOf(index) !== -1) {
			date.setMonth(date.getMonth() - 1);
		}
		
		viewDate = date.setDate(clickText);
		changeMonth(clickText);
		sessionStorage.setItem("reservationDay", clickText);
		renderTimeButtons();
	}

	if (event.target.classList.contains('time_btn')) {
		addSelectedClass(event.target, timeBtns);
		sessionStorage.setItem("reservationTime", event.target.value);
		saveBtn.removeAttribute('disabled');
	}
});

function renderTimeButtons() {
	const year = sessionStorage.getItem("reservationYear");
	const month = sessionStorage.getItem("reservationMonth");
	const day = sessionStorage.getItem("reservationDay");
	
	let today = new Date();
	let select = new Date(year, month - 1, day);
	let isToday = false;
	const dateFormatter = Intl.DateTimeFormat('kr', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	})
	let todayDate = dateFormatter.format(today);
	let selectedDate = dateFormatter.format(select)
	
	if (todayDate === selectedDate) {
		isToday = true;
	}
		
	$.ajax({
		type: 'POST',
		url: '/reserve/date',
		contentType: 'application/json',
		data: JSON.stringify({
			"year" : year,
			"month": month,
			"day" : day
		}),
		success: function (rsp) {
			reservationTime = rsp;
			createTimeBtns(reservationTime, isToday);
		},
		error: function (error) {
			console.log(error)
		}
	})
}


function changeMonth(clickText) {
	renderCalender();
	const nextDateBtns = document.querySelectorAll('.date:not(.unselectable)');
	let found = false;
	nextDateBtns.forEach(btn => {
		const nextText = btn.querySelector('.sp.num').textContent.trim();
		if (!found && nextText == clickText) {
			addSelectedClass(btn, dateBtns);
			found = true;
		}
	})
	sessionStorage.setItem("reservationMonth", JSON.stringify(viewMonth+1));
}

guestCountBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		sessionStorage.setItem("guestCount", btn.value)
		addSelectedClass(btn, guestCountBtns);
	})
})

timeBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		addSelectedClass(btn, timeBtns);
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
	const usageTimeValue = document.querySelector('input[name="flexRadioDefault"]:checked');
	sessionStorage.setItem("usageTime", JSON.stringify(usageTimeValue.value));
	sessionStorage.setItem("optionInfo", JSON.stringify(optionInfo));
	window.location.href = `/detail`;
});

// ==============================

const optionBox = document.getElementById('option-box');
let selectOptValue = null;
let countValue = 1;

const amountFormatter = new Intl.NumberFormat('kr', {
	style: 'currency',
	currency: 'krw'
})

window.addEventListener('load', () => {
	const todayBtn = document.querySelector('.today');
	todayBtn.classList.add('selected');
	const guestBtn = document.querySelector('.count_btn.selected');
	sessionStorage.setItem('reservationYear', JSON.stringify(viewYear));
	sessionStorage.setItem('reservationMonth', JSON.stringify(viewMonth + 1));
	sessionStorage.setItem('reservationDay', JSON.stringify(viewDate));
	sessionStorage.setItem('guestCount', JSON.stringify(guestBtn.value));
	calculatePrice();
	renderTimeButtons();
});

const radioBtn = document.querySelectorAll('input[name="flexRadioDefault"]');
radioBtn.forEach(e => {
	e.addEventListener('change', () => {
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
		size: optValue,
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
	calculatePrice();
}

function removeBox(btn) {
	const box = btn.closest('.opt-detail-box');
	const index = Array.from(box.parentNode.children).indexOf(box);
	box.remove();
	optionInfo.splice(index, 1);
	calculatePrice();
}
