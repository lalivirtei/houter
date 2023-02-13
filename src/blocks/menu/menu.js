import $ from 'jquery';

$(document).ready(function () {
    const $body = $('.body');
    const $menu = $('.menu');
    const $menuButton = $('.menu__button');
    const $select = $('.menu__select');

    $select.select2({
        placeholder: 'Property',
        minimumResultsForSearch: Infinity,
        width: '122px'
    });

    $select.on('select2:select', function (e) {
        let data = e.params.data;
        toggleMenu();

        $('html, body').animate({
            scrollTop: $('#featured').offset().top
        }, 1000);
        $(`.featured__btn[data-type=${data.id}]`).click();
    });

    $menuButton.on('click', function () {
        toggleMenu();
    });

    $('.menu__btn-link').each(function () {
        $(this).click(function() {
            toggleMenu();

            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 1000);
        })
    });

    function toggleMenu() {
        if (window.matchMedia('(max-width: 767px)').matches) {
            $menu.toggleClass('menu--open');
            $body.toggleClass('body--no-scroll');
        }
    }
})