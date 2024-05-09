var IMP = window.IMP;
IMP.init("imp31164474");

// 예약 정보
const guestCount = JSON.parse(sessionStorage.getItem("guestCount"));
const reservationTime = JSON.parse(sessionStorage.getItem("reservationTime"));
const reservationYear = JSON.parse(sessionStorage.getItem("reservationYear"));
const reservationMonth = JSON.parse(sessionStorage.getItem("reservationMonth"));
const reservationDay = JSON.parse(sessionStorage.getItem("reservationDay"));
const usageTime = JSON.parse(sessionStorage.getItem("usageTime"));
const optionInfo = JSON.parse(sessionStorage.getItem("optionInfo"));
const amount = JSON.parse(sessionStorage.getItem("price"));

const paymentBtn = document.querySelector('.payment_btn');

var today = new Date();
var year = today.getFullYear() - 2000;
var years = year.toString(); 
var hours = today.getHours().toString();
var minutes = today.getMinutes().toString();
var seconds = today.getSeconds().toString();
var milliseconds = today.getMilliseconds().toString();
var merchantUid = years + hours + minutes + seconds + milliseconds;

const onclickPay = async () => { 
    // 1. 예약 저장
    // 2. 예약 중복 방지
    // 3. 결제
    // 4. 결제 검증
    $.ajax({
        type: 'POST',
        url: `/watb/reserve/${merchantUid}`,
        contentType: 'application/json',
        data: JSON.stringify({
            guestCount: parseInt(guestCount),
            year: reservationYear,
            month: reservationMonth,
            day: reservationDay,
            reservationTime: parseInt(reservationTime),
            usageTime: parseInt(usageTime),
            optionInfo: optionInfo, 
            amount: parseInt(amount),
            merchantUid: `MID${merchantUid}`
        }),
        success: function (response) {
            console.log(response)
            IMP.request_pay({
                pg: "kakaopay",
                pay_method: "card",
                merchant_uid: `MID${merchantUid}`,
                name: "구장 예약",
                amount: parseInt(amount), // String 아님 유의
                buyer_email: $("#email").val(),
                buyer_name: $("#name").val()
            }, function (rsp) { // IMP.request_pay 콜백 함수
                console.log(rsp);
                if (rsp.success) {
                    $.ajax({
                        url: "/payment",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        data: JSON.stringify({
                            "amount": rsp.paid_amount,
                            "impUid": rsp.imp_uid,
                            "merchantUid": rsp.merchant_uid,
                            "paidAt": rsp.paid_at,
                            "status": rsp.status
                        }),
                        success: function (response) {
                            console.log(response);
                            alert("예약 완료 되었습니다!");
                            window.location.href = `/watb/mypage`;
                        },
                        error: function (err) {
                            console.log("결제 실패");
                            console.log(JSON.parse(err));
                        }
                    });
                } else {
                    console.log(rsp.error_msg);
                }
            });
        },
        error: function (xhr) {
            alert(xhr.responseJSON.message);
            history.back();
        }
            
    });
}

paymentBtn.addEventListener('click', onclickPay);
