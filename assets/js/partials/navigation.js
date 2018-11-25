// Navigation scroll listener
(function() {
    $(window).scroll(function (e) {
        if($(window).scrollTop() > 200) {
            $(".navbar").addClass("darken");
        } else {
            $(".navbar").removeClass("darken");
        }
    });
})();
