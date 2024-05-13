// const backBtn = document.querySelector('.back_btn');
// backBtn.addEventListener("click", () => {
//     sessionStorage.clear();
//     history.back();
// });

document.addEventListener('DOMContentLoaded', function () {
    const guestCount = JSON.parse(sessionStorage.getItem("guestCount"));
    const reservationTime = JSON.parse(sessionStorage.getItem("reservationTime"));
    const reservationYear = JSON.parse(sessionStorage.getItem("reservationYear"));
    const reservationMonth = JSON.parse(sessionStorage.getItem("reservationMonth"));
    const reservationDay = JSON.parse(sessionStorage.getItem("reservationDay"));
    const usageTime = JSON.parse(sessionStorage.getItem("usageTime"));
    const optionInfo = JSON.parse(sessionStorage.getItem("optionInfo"));
    const price = JSON.parse(sessionStorage.getItem("price"));
    const countInfo = document.querySelector('.count_info');
    const dateInfo = document.querySelector('.date_info');
    const option = document.querySelector('.option_info');
    const priceInfo = document.querySelector('.price_info');
    date = new Date();
    date.setMonth(reservationMonth - 1);
    date.setDate(reservationDay);
    const formatter = new Intl.DateTimeFormat('kr', {
        weekday: "short"
    })
    dateInfo.innerHTML = `${reservationMonth}.${reservationDay}(${formatter.format(date)}) ${reservationTime}시 ~ ${parseInt(reservationTime)+parseInt(usageTime)}시`;
    countInfo.innerHTML = `${guestCount}명`;
    option.innerHTML = optionInfo.length === 0  || optionInfo === null ? '없음'
        : optionInfo.map(option => `${option.value}(${option.quantity}개)`).join(', ');
    priceInfo.innerHTML = `<strong>${price}원</strong>`;
});