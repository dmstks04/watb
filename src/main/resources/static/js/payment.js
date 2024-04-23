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
var makeMerchantUid = years + hours + minutes + seconds + milliseconds;

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
                    console.log("예약 저장 성공");
                    console.log(reserveData);
                    console.log(rsp);

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
                        // data: JSON.stringify(data),
                        success: function (response) {
                            alert("예약 완료 되었습니다!");
                            window.location.href = `/watb`;
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                },
                error: function (err) {
                    console.log("에약 저장 실패" + err);
                }
            })

            
        } else {
            alert('결제 실패!');
        }
    });
}
paymentBtn.addEventListener('click', onclickPay);