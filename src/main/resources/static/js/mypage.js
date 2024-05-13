const cancelBtn = document.querySelectorAll('.cancelBtn');
cancelBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (confirm("예약을 취소하시겠습니까?")) {
            confirmCancellation(btn);
        }
    })
})

const confirmCancellation = (btn) => {
    let impUid = btn.getAttribute('data-impUid');
    let id = btn.value;
    $.ajax({
        type: 'POST',
        url: '/reserve/cancel',
        data: { "id": id },
        success: function (compare) {
            if (compare > 0) {
                // 예약취소 가능 기간 확인
                getReservationByImpUid(impUid);
            } else {
                alert("취소 가능한 기간이 아닙니다.")
            }
        }
    });
}

// 예약취소 가능 기간 확인
const getReservationByImpUid = (impUid) => {
    $.ajax({
        url: '/payment/remove',
        type: 'POST',
        data: {
            "impUid": impUid
        },
        success: function (iamportResponse) {
            console.log(JSON.stringify(iamportResponse))
            cancelPayment(iamportResponse);
        },
        error: function (error) {
            console.log("실패 " + error)
        }
    });   
}

// 결제 취소 및 결제 상태 업데이트
const cancelPayment = (iamportResponse) => {
    $.ajax({
        url: '/payment/cancel',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "impUid": iamportResponse.response.impUid,
            "merchantUid": iamportResponse.response.merchantUid,
            "amount": iamportResponse.response.amount
        }),
        success: function (cancelResponse) {
            if (cancelResponse.code != 0) {
                alert(cancelResponse.message);
            } else {
                alert("예약이 취소 되었습니다!")
                window.location.href = '/mypage';
            }
        },
        error: function (err) {
            alert("취소 실패")
        }
    });
}