// script.js
$(document).ready(function() {
    $('.ac-title').on('click', function() {
        const $currentTitle = $(this);
        const $currentContent = $currentTitle.next('.ac-box');

        // 他のアコーディオンアイテムを閉じる
        $('.ac-box').not($currentContent).slideUp();
        $('.ac-title').not($currentTitle).removeClass('active');
        
        // クリックされたアイテムの表示・非表示を切り替える
        $currentContent.slideToggle();
        $currentTitle.toggleClass('active');
    });
});


// $(document).ready(function() {
//     $('.ac-title').on('click', function() {
//         他のアコーディオンアイテムを閉じる
//         $('.ac-box').not($(this).next()).slideUp();

//         クリックされたアイテムの表示・非表示を切り替える
//         $(this).next().slideToggle();
//     });
// });

// 上と同じ書き方
// $(document).ready(() => {
//     $('.ac-title').on('click', (event) => {
//         const $currentTitle = $(event.currentTarget);
//         const $currentContent = $currentTitle.next('.ac-box');

//         他のアコーディオンアイテムを閉じる
//         $('.ac-box').not($currentContent).slideUp();
//         $('.ac-title').not($currentTitle).removeClass('active');

//         クリックされたアイテムの表示・非表示を切り替える
//         $currentContent.slideToggle();
//         $currentTitle.toggleClass('active');
//     });
// });

