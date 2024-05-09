const cancelBtn = document.querySelectorAll('.cancelBtn');
cancelBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const impUid = btn.getAttribute('data-impUid');
        if (confirm("예약을 취소하시겠습니까?")) {
            const id = btn.value;
            $.ajax({
                type: 'POST',
                url: '/watb/reserve/cancel',
                data: {
                    "id": id
                },
                success: function (compare) {
                    console.log(compare)
                    if (compare > 0) {
                        // =============
                        $.ajax({
                        url: '/payment/remove',
                        type: 'POST',
                        data: {
                            "impUid": impUid
                        },
                        success: function (rsp) {
                            console.log(JSON.stringify(rsp))
                            $.ajax({
                                url: '/payment/cancel',
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "impUid": rsp.response.impUid,
                                    "merchantUid": rsp.response.merchantUid,
                                    "amount": rsp.response.amount
                                }),
                                success: function (cancelResponse) {
                                    console.log(JSON.stringify(cancelResponse));
                                    if (cancelResponse.code != 0) {
                                        alert(cancelResponse.message);
                                    } else {
                                        alert("예약이 취소 되었습니다!")
                                        window.location.href = '/watb/mypage';
                                    }
                                },
                                error: function (err) {
                                    console.log("취소 실패")
                                    console.log(JSON.stringify(err));
                                }
                            })
                        },
                        error:  function (error) {
                            console.log("실패 " + error)
                        }
                        })
                        // ==============
                    } else {
                        alert("취소 가능한 기간이 아닙니다.")
                    }
                }
            })

            
        }
        
    })
})

const paymentCancel = (impUid) => {
    
}