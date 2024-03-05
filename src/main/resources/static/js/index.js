let date = new Date();
const initTime = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const renderCalender = (callback) => {
	const viewYear = date.getFullYear();
	const viewMonth = date.getMonth();
	document.querySelector('.calender_title').textContent = `${viewYear}. ${viewMonth + 1}`;
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

	const formattedDates = prevMonthDates.concat(currentMonthDates, nextMonthDates);
	const firstDateIndex = formattedDates.indexOf(1);
	const lastDateIndex = formattedDates.lastIndexOf(curMonthLastDate);
	
	let nDate = new Date();
	
	formattedDates.forEach((date, i) => {
		const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
		const today = date === nDate.getDate() && viewMonth === nDate.getMonth() && viewYear === nDate.getFullYear();
		let defaultSelected =  '';
		let todayLabel =  '';
		let todayClass = '';
		
		if (today && condition === 'this') {
			defaultSelected = 'selected';
			todayLabel = '오늘';
			todayClass = 'today'
		}
		
		formattedDates[i] = `<button type="button" class="date ${defaultSelected} ${todayClass}">
								<span class="sp ${condition}">${date}</span>
								<span class="sp text">${todayLabel}</span>
							</button>`;
	});
	document.querySelector('.dates').innerHTML = formattedDates.join('');
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
//		case 'Today': date = new Date(); 				break;
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
	dates.addEventListener('click', (e) => {
		if(e.target.classList.contains('date')){
			const activeDates = document.querySelectorAll('.selected');
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
const optionDropdown = document.getElementById('options-dropdown');
const optionBox = document.getElementById('option-box');
let selectOptValue = null;
let countValue = 1;
let optPrice = 3000;
function addOption(optValue){
	// 옵션 중복 체크
	if(selectOptValue === optValue){
		alert('이미 선택 되어 있는 옵션입니다.');
		return;
	}
	const newBox = document.createElement('div');
	newBox.className = 'opt-detail-box';
	newBox.innerHTML = `<ul class="opt-ul">
							<li class="opt-li">
								<em>풋살화, ${optValue}</em>
								<div class="opt-count-box">
									<a class="opt-a" onclick="countBtn(this)">-</a>
									<input class="opt-input" type="text" value=${countValue}>
									<a class="opt-a" onclick="countBtn(this)">+</a>
								</div>
								<strong class="opt-strong">
									<span class="opt-price">${optPrice}</span>
									<span>원</span>
								</strong>
								<button id="removeBtn" onclick="removeBox(this)">x</button>
							<li>
						</ul>`;
	selectOptValue = optValue;							
	optionBox.appendChild(newBox);						
	
}

// 옵션 선택
optionDropdown.addEventListener('change', function() {
	const optValue = optionDropdown.value;
	addOption(optValue);
	// 셀렉트 옵션 초기화
	optionDropdown.selectedIndex = 0;
	calculateTotalPrice();
}) 

// 옵션 삭제
function removeBox(removeBtn){
	const box = removeBtn.closest('.opt-detail-box');
	box.remove();
}

// 옵션 수량 조절
function countBtn(countBtn) {
	const box = countBtn.closest('.opt-detail-box');
	const input = box.querySelector('.opt-input');
	const priceElement = box.querySelector('.opt-price');
	let countValue = parseInt(input.value);

	if(countValue === 1 && countBtn.innerHTML === '-') {
		alert('더 이상 줄일 수 없습니다.');
	} else {
		countValue = countBtn.innerHTML === '+' ? countValue + 1 : Math.max(countValue -1, 1);
		updatePrice(priceElement, countValue);
		calculateTotalPrice();
	}
	
	input.value = countValue;
}

// 옵션 비용 계산
function updatePrice(priceElement, countValue) {
	const updateOptPrice =  3000 * countValue;
	priceElement.textContent = updateOptPrice;
	return updateOptPrice;
}

let pricePerHour;
// 총 비용 계산
function calculateTotalPrice() {
	let totalPrice = 0;
	const optDetailBoxes = document.querySelectorAll('.opt-detail-box');
	
	optDetailBoxes.forEach((box) => {
		const priceElement = box.querySelector('.opt-price');
		const optPrice = parseInt(priceElement.textContent);
		totalPrice += optPrice;
	});
	totalPrice += pricePerHour;
	document.querySelector('.total-price').innerHTML = totalPrice;
}

// 시간당 계산
function timeRadioCheck() {
	const defaultChecked = document.querySelector('input[name="flexRadioDefault"]:checked');
	pricePerHour = defaultChecked.value * 50000;
	calculateTotalPrice();
	
	const radioBtn = document.querySelectorAll('.form-check-input');
	radioBtn.forEach((rbtn) => {
		rbtn.addEventListener('change', function() {
			pricePerHour  = this.value * 50000;
			calculateTotalPrice();
		})
	})
}
timeRadioCheck();
