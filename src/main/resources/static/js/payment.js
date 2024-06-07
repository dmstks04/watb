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

let filterOptionInfo = optionInfo.map(item => {
    return {
        size: item.size,
        quantity: item.quantity
    }
});

const onclickPay = async () => { 
    // 1. 예약 저장
    // 2. 예약 중복 방지
    // 3. 결제
    // 4. 결제 검증
    
    $.ajax({
        type: 'POST',
        url: `/reserve/${merchantUid}`,
        contentType: 'application/json',
        data: JSON.stringify({
            guestCount: parseInt(guestCount),
            year: reservationYear,
            month: reservationMonth,
            day: reservationDay,
            reservationTime: parseInt(reservationTime),
            usageTime: parseInt(usageTime),
            optionInfo: filterOptionInfo, 
            amount: parseInt(amount),
            merchantUid: `MID${merchantUid}`
        }),
        success: function () {
            paymentCallback();
        },
        error: function (xhr) {
            alert(xhr.responseJSON.message);
            history.back();
        }
            
    });
}

paymentBtn.addEventListener('click', onclickPay);

// 결제 검증
function paymentCallback() {
    IMP.request_pay({
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: `MID${merchantUid}`,
        name: "구장 예약",
        amount: parseInt(amount), // String 아님 유의
        buyer_email: $("#email").text(), // 얘가 없음
        buyer_name: $("#name").text() // 얘가 없음
    }, function (rsp) { 
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
                success: function () {
                    alert("예약 완료 되었습니다!");
                    window.location.href = `/mypage`;
                },
                error: function (err) {
                    alert("결제 실패");
                    console.log(JSON.parse(err));
                }
            });
        } else {
            // 예약 내역 삭제
            invalidReservation(rsp);
            console.log("결제 취소 되어 예약 내역 삭제")
            // alert(rsp.error_msg);
        }
    });
}

const invalidReservation = (rsp) =>{
    $.ajax({
        url: "/reserve/invalid",
        method: "POST",
        data: {
            "merchantUid": rsp.merchant_uid,
        },
        success: function (response) {
            window.history.back();
        },
        error: function (err) {
            console.log(err);
        }
    });
    
}
