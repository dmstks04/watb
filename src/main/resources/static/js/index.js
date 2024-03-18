let date = new Date();
const initTime = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const renderCalender = (callback) => {
	const viewYear = date.getFullYear();
	const viewMonth = date.getMonth();
	document.querySelector('.title').textContent = `${viewYear}. ${viewMonth + 1}`;
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
	const todayIndex = formattedDates.indexOf(nDate.getDate());
	formattedDates.forEach((date, i) => {
		const today = date === nDate.getDate() && viewMonth === nDate.getMonth() && viewYear === nDate.getFullYear();
		let defaultSelected = 'unselectable';
		let todayLabel =  '';
		let todayClass = '';

		let condition = viewMonth >= nDate.getMonth() ? 'this' : 'other';
		if ( viewMonth === nDate.getMonth() && i < todayIndex) {
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
	
	let isToday = true;
	callback(initTime, isToday, addClickEvent);
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
	renderCalender(()=> createTimeBtns(initTime, isToday, addClickEvent));
}
// 달력 날짜 선택
function clickDate(callback) {
	const dates = document.querySelector('.dates');
	dates.addEventListener('click', e => {
		if(e.target.classList.contains('date')){
			const activeDates = document.querySelectorAll('.date.selected');
			activeDates.forEach((date) => {
	            date.classList.remove('selected');
	        });
			e.target.classList.add('selected');
		}
		const isToday = e.target.classList.contains('today');
		callback(initTime, isToday, addClickEvent);
	});
}
clickDate(createTimeBtns);

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
function createTimeBtns(initTime, isToday, addClickEventCallback) {	
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
	const timeBtns = document.querySelectorAll('.time_btn');
	addClickEventCallback(timeBtns);
}

// =================================================================================================
const countBtns = document.querySelectorAll('.count_btn');
const footerBtn = document.querySelector('.footer_btn');
//let selectedCountBtn = false;
let selectedTimeBtn = false;

function addClickEvent(btns) {
	btns.forEach(function(btn){
		btn.addEventListener('click', function(){
			btns.forEach(function(otherBtn) {
                otherBtn.classList.remove('selected');
            });
            btn.classList.add('selected');
            if(selectedTimeBtn && selectedTimeBtn)footerBtn.removeAttribute('disabled');
		})
	});
}

addClickEvent(countBtns);
//addClickEvent(timeBtns);	

function nextPage() {
	let countBtnValue = localStorage.getItem("countBtnValue");
	let timeBtnValue = localStorage.getItem("timeBtnValue");
	alert(countBtnValue + " " + timeBtnValue);
	window.location.href = "/watb/reserve/detail";
}

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
	const optionPrice = optionPrices.reduce((acc, price) => acc + price, 0);
	const hourBtn = document.querySelector('input[name="flexRadioDefault"]:checked');
	hourlyPrice = hourBtn.value * 50000;
	
	const totalPrice = optionPrice + hourlyPrice;
	document.querySelector('.total-price').innerHTML =`${totalPrice}원`;
}

let optionPrices = [];
function selectOption() {
	const optionDropdown = document.getElementById('options-dropdown');
	optionDropdown.addEventListener('change', () => {
		const optValue = optionDropdown.value;
		if (selectOptValue != optValue) {
			addOption();
			countOption();
		} else {
			alert('이미 선택 되어 있는 옵션입니다.');
			return;
		}
		
		optionDropdown.selectedIndex = 0;
	});
}
selectOption();

const optionDropdown = document.getElementById('options-dropdown');

let optPrice = 3000;
function addOption() {
	const optValue = optionDropdown.value;
	const newBox = document.createElement('div');
	newBox.className = 'opt-detail-box';
	newBox.innerHTML = `<ul class="opt-ul">
						<li class="opt-li">
							<em>풋살화, ${optValue}</em>
							<div class="opt-count-box">
								<a class="opt-a" data-value="-">-</a>
								<input class="opt-input" type="text" value=${countValue}>
								<a class="opt-a" data-value="+">+</a>
							</div>
							<strong class="opt-strong">
								<span class="opt-price">${optPrice}</span>
							</strong>
							<button id="removeBtn" onclick="removeBox(this)">x</button>
						<li>
					</ul>`;
	selectOptValue = optValue;
	optionBox.appendChild(newBox);
	optionPrices.push(optPrice);
		
	calculatePrice();
}

function countOption() {
	let optPriceTotal = 0;
	const countBtn = document.querySelectorAll('.opt-a');
	countBtn.forEach(e => {
		e.addEventListener('click', () => {
			// 옵션이 여러개 일 때 countValue가 중첩되는 거 수정해야함
			console.log('forEach 반복')
			const boxHtml = e.dataset.value;
			const box = e.closest('.opt-detail-box');
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
			
			optionPrices[index] = optPriceTotal;
			console.log(optionPrices);

			calculatePrice();
		});
			
	});
}

function removeBox(btn) {
	const box = btn.closest('.opt-detail-box');
	const index = Array.from(box.parentNode.children).indexOf(box);
	box.remove();
	optionPrices.splice(index, 1);
	calculatePrice();
}