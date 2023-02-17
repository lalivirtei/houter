import $ from 'jquery';

$(document).ready(function () {
    $('.footer__filter').each(function() {
        $(this).click(function (e) {
            e.preventDefault();
            const id = e.target.dataset.id;
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 1000);
            $(`.featured__btn[data-type=${id}]`).click();
        });
    })
})