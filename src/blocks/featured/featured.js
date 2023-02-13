import $ from 'jquery';
import Swiper, {Navigation} from "swiper";

$(document).ready(function() {

    const featureSlider = new Swiper('.featured__list', {
        modules: [Navigation],
        navigation: {
            nextEl: '.featured__arrow--right',
            prevEl: '.featured__arrow--left'
        },
        spaceBetween: 40,
        slidesPerView: 'auto',
        centeredSlides: true,
        grabCursor: true,
        initialSlide: getInitialSlide()
    });

    let $allButtons = $('.featured__btn');

    $allButtons.each(function() {
        $(this).on('click', function() {
            $allButtons.each(function () {
                $(this).removeClass('featured__btn--active');
            })
            $(this).addClass('featured__btn--active');

            let buttonType = $(this).data('type');

            $('.featured__item').each(function() {
                if ($(this).data('type').includes(buttonType)) {
                    $(this).css('display', 'block');
                } else {
                    $(this).css('display', 'none');
                }
            })

            featureSlider.update();
        })
    })
})

function getInitialSlide() {
    let num = 0;

    if  (window.matchMedia('(min-width: 576px)').matches) {
        num = 1;
    } else if  (window.matchMedia('(min-width: 1220px)').matches) {
        num = 2;
    }

    return num;
}