$(document).ready(function () {

    // アコーディオン
    $('.accordion-item').on('click', function () {
        const $currentItem = $(this);
        const $currentContent = $currentItem.find('.ac-box');

        // 他のアコーディオンアイテムを閉じる
        $('.ac-box').not($currentContent).slideUp();
        $('.accordion-item').not($currentItem).removeClass('active');

        // クリックされたアイテムの表示・非表示を切り替える
        $currentContent.slideToggle();
        $currentItem.toggleClass('active');
    });


});