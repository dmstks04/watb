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
// var makeMerchantUid = years + hours + minutes + seconds + milliseconds;
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
            guestCount: guestCount,
            year: reservationYear,
            month: reservationMonth,
            day: reservationDay,
            reservationTime: reservationTime,
            usageTime: usageTime,
            // optionInfo: optionInfo,             // 대여물품
            amount: parseInt(amount),
            merchantUid: `MID${merchantUid}`          // 주문번호
        }),
        success: function (id) {
            console.log("예약 저장 성공 ! " + id);
            IMP.request_pay({
                pg: "kakaopay",
                pay_method: "card",
                merchant_uid: `MID${merchantUid}`,
                name: "예약테스트",
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
                    console.log("결제 실패");
                    console.log(rsp.error_msg);
                }
            });
        },
        error: function (xhr) {
            // 오류 응답을 처리하는 코드
            alert(xhr.responseJSON.message);
            history.back();
        }
            
    });
}
/* 
const onclickPay = async () => {
    IMP.request_pay({
        pg: "kakaopay",
        pay_method: "card",
        // makeMerchantUid가 문제, 컨트롤러에서 넘어온 애를 전달 받아야함
        merchant_uid: `MID${makeMerchantUid}`,
        name: "예약테스트",
        amount: parseInt(amount), // String 아님 유의
        buyer_email: $("#email").val(),
        buyer_name: $("#name").val()
    }, function (rsp) {
        if (rsp.success) {
            console.log(JSON.stringify(rsp));
            // 결제 성공 시
            // 1. 예약 내역 저장
            merchantUid = rsp.merchant_uid;
            $.ajax({
                type: 'POST',
                url: `/watb/reserve/${merchantUid}`,
                data: JSON.stringify({
                    guestCount: guestCount,             // 인원수
                    year: reservationYear,   // 년
                    month: reservationMonth, // 월
                    day: reservationDay,   // 일
                    // reservationDate: formattedDate,
                    reservationTime: reservationTime,   // 시
                    usageTime: usageTime,               // 이용시간
                    // optionInfo: optionInfo,             // 대여물품
                    amount: parseInt(amount),             // 금액
                    merchantUid: merchantUid,            // 주문번호
                    // impUid: impUid
                }),
                contentType: "application/json",
                success: function (reserveData) {
                    console.log(reserveData);
                    //결제 검증
                    $.ajax({
                        url: "/payment",
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        data: JSON.stringify({
                            "amount": rsp.paid_amount,
                            "impUid": rsp.imp_uid,      // 결제 고유번호
                            "merchantUid": rsp.merchant_uid,   // 주문번호
                            "paidAt": rsp.paid_at,
                            "status": rsp.status
                        }),
                        success: function (response) {
                            alert("예약 완료 되었습니다!");
                            window.location.href = `/watb/mypage`;
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                },
                error: function (error) {
                    console.log("예약 저장 실패:");
                    // console.error(error);
                    // console.error("status:", error.status);
                    let responseText = JSON.parse(error.responseText);
                    // console.log(responseText);
                    // console.log(responseText.trace);
                    if (JSON.stringify(responseText).includes("java.sql.SQLIntegrityConstraintViolationException")) {
                        console.log("예약 중복 방지")
                    } else {
                        console.log("관리자 문의")
                    }
                }
            })

            
        } else {
            alert('결제 취소!');
        }
    });
}
*/

paymentBtn.addEventListener('click', onclickPay);
