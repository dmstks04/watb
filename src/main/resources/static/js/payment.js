var IMP = window.IMP;
IMP.init("imp31164474");

var today = new Date();   
var hours = today.getHours();
var minutes = today.getMinutes();  
var seconds = today.getSeconds();  
var milliseconds = today.getMilliseconds();
var makeMerchantUid = hours + minutes + seconds + milliseconds;

const paymentBtn = document.querySelector('.payment_btn');
const onclickPay = async() => {
    var buyer_name = '';
    var buyer_email = '';
    var amount = sessionStorage.getItem("totalPrice");

    IMP.request_pay({
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: "IMP" + makeMerchantUid, // 상점에서 생성한 고유 주문번호
        name: "주문명:결제테스트",
        amount: amount, // Integer, string 아님 유의
        buyer_email: "test@portone.io",
        buyer_name: "구매자이름",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        // notice_url: "https://웹훅수신 URL"
        // m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}"
    }), function (rsp) {
        if (rsp.success) {
            //[1] 서버단에서 결제정보 조회를 위해 jQuery ajax로 imp_uid 전달하기
            jQuery.ajax({
                url: "/payments/complete", //cross-domain error가 발생하지 않도록 주의해주세요
                type: 'POST',
                dataType: 'json',
                data: {
                    imp_uid: rsp.imp_uid,           // 결제 고유번호
                    order_uid: rsp.makeMerchantUid // 주문 번호
                    //기타 필요한 데이터가 있으면 추가 전달
                }
            }).done(function () {
                //[2] 서버에서 REST API로 결제정보확인 및 서비스루틴이 정상적인 경우
                var msg = '결제가 완료되었습니다.';
                alert(msg);
            });
        } else {
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            alert(msg);
        }
    }
}
paymentBtn.addEventListener('click', onclickPay);