const backBtn = document.querySelector('.back_btn');
backBtn.addEventListener("click", () => {
    sessionStorage.clear();
    history.back();
});

document.addEventListener('DOMContentLoaded', function () {
    const countBtnValue = JSON.parse(sessionStorage.getItem("countBtnValue"));
    const timeBtnValue = JSON.parse(sessionStorage.getItem("timeBtnValue"));
    const dateValue = JSON.parse(sessionStorage.getItem("dateValue"));
    const monthValue = JSON.parse(sessionStorage.getItem("monthValue"));
    const hourValue = JSON.parse(sessionStorage.getItem("hourValue"));
    const optionInfo = JSON.parse(sessionStorage.getItem("optionInfo"));
    const totalPrice = JSON.parse(sessionStorage.getItem("totalPrice"));

    const sendData = {
        countBtnValue: countBtnValue, // 인원수
        timeBtnValue: timeBtnValue, // 몇시
        dateValue: dateValue,   // 몇일
        monthValue: monthValue, // 몇월월
        hourValue: hourValue, // 이용시간
        optionInfo: optionInfo, // 대여물품,
        totalPrice: totalPrice // 가격
    }

    document.getElementById("sendButton").addEventListener("click", function () {
        $.ajax({
            type: 'POST',
            url: "/watb/postData",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (rsp) {
                alert(rsp);
            },
            error: function (error) {
                alert(error);
            }
        })
    });
    
    const countInfo = document.querySelector('.count_info');
    const dateInfo = document.querySelector('.date_info');
    const option = document.querySelector('.option_info');
    const priceInfo = document.querySelector('.price_info');

    date = new Date();
    date.setMonth(monthValue - 1);
    date.setDate(dateValue);
    const formatter = new Intl.DateTimeFormat('kr', {
        weekday: "short"
    })
    dateInfo.innerHTML = `${monthValue}.${dateValue}(${formatter.format(date)}) ${timeBtnValue} ${hourValue}시간`;
    countInfo.innerHTML = `${countBtnValue}명`;
    option.innerHTML = Object.entries(optionInfo).length === 0 ? '없음'
        : optionInfo.map(option => ` ${option.name}. ${option.quantity}개`);
    priceInfo.innerHTML = `<strong>${totalPrice}원</strong>`;
});