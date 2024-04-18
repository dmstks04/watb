const backBtn = document.querySelector('.back_btn');
backBtn.addEventListener("click", () => {
    sessionStorage.clear();
    history.back();
});

document.addEventListener('DOMContentLoaded', function () {
    const guestCount = JSON.parse(sessionStorage.getItem("guestCount"));
    const reservationTime = JSON.parse(sessionStorage.getItem("reservationTime"));
    const reservationYear = JSON.parse(sessionStorage.getItem("reservationYear"));
    const reservationMonth = JSON.parse(sessionStorage.getItem("reservationMonth"));
    const reservationDate = JSON.parse(sessionStorage.getItem("reservationDate"));
    const usageTime = JSON.parse(sessionStorage.getItem("usageTime"));
    const optionInfo = JSON.parse(sessionStorage.getItem("optionInfo"));
    const price = JSON.parse(sessionStorage.getItem("price"));

    const sendData = {
        reservationYear: reservationYear,
        guestCount: guestCount, // 인원수
        reservationTime: reservationTime, // 몇시
        reservationDate: reservationDate,   // 몇일
        reservationMonth: reservationMonth, // 몇월
        usageTime: usageTime, // 이용시간
        optionInfo: optionInfo, // 대여물품,
        price: price // 가격
    }

    const countInfo = document.querySelector('.count_info');
    const dateInfo = document.querySelector('.date_info');
    const option = document.querySelector('.option_info');
    const priceInfo = document.querySelector('.price_info');

    date = new Date();
    date.setMonth(reservationMonth - 1);
    date.setDate(reservationDate);
    const formatter = new Intl.DateTimeFormat('kr', {
        weekday: "short"
    })
    dateInfo.innerHTML = `${reservationMonth}.${reservationDate}(${formatter.format(date)}) ${reservationTime} ${usageTime}시간`;
    countInfo.innerHTML = `${guestCount}명`;
    // option.innerHTML = Object.entries(optionInfo).length === 0 ? '없음'
    //     : optionInfo.map(option => ` ${option.name}. ${option.quantity}개`);
    priceInfo.innerHTML = `<strong>${price}원</strong>`;
});