import $ from 'jquery';
import Swiper, {Pagination} from "swiper";

$(document).ready(function () {
    new Swiper('.review__slider', {
        modules: [Pagination],
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets'
        },
        spaceBetween: 15,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1,
        autoHeight: true
    })
});