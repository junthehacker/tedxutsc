const scriptURL = 'https://script.google.com/macros/s/AKfycbw-iLISQsCKhF6pzalZuNLrZ3p9Ybc8NrWheucLbENOcL9IHRoX/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, {method: 'POST', mode: 'no-cors', body: new FormData(form)})
        .then(res => {
            if(res.status < 400){
                return;
            } else {
                throw new Error('Fail');
            }
        })
        .then(() => {
            $("#success-message").attr("class", "alert alert-success alert-dismissible");
            document.getElementById("message").innerText = "Success!";
            document.getElementById("submit-to-google-sheet").reset();
            $('.alert').show();
        }).catch(() => {
            $("#success-message").attr("class", "alert alert-danger alert-dismissible");
            document.getElementById("message").innerText = "Error!";
            $('.alert').show();
        });
}); 

function hideMessage() {
    $('.' + $('.close').attr('data-hide')).hide();
}