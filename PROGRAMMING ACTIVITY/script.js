// script.js
$(document).ready(function () {
    $('.ac-title').on('click', function () {
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

// 複数の場合
// JavaScriptで.menu-iconをクリックしたら.openのtranslateY(100%)を切り替える
// .menu-iconにイベントリスナーを追加
document.querySelector('.menu-icon').addEventListener('click', toggleTransform);

// すべての.open-text要素にイベントリスナーを追加
document.querySelectorAll('.open-text').forEach(function (element) {
    element.addEventListener('click', toggleTransform);
});

// トランスフォームを切り替える関数
function toggleTransform() {
    const openElement = document.querySelector('.open'); // .open要素を取得
    const menuIcon = document.querySelector('.menu-icon'); // .open要素を取得
    const currentTransform = window.getComputedStyle(openElement).transform; // .open要素の現在のtransform値を取得

    if (currentTransform === 'matrix(1, 0, 0, 1, 0, 0)' || currentTransform === 'none') {
        // currentTransformが'translateY(0)'に対応する値、または初期値の'none'であれば
        openElement.style.transform = 'translateY(100%)'; // transformを'translateY(100%)'に変更
        menuIcon.classList.remove('active'); // なぜかわからないけどローディング画面の実装終わったら×が逆になったからadd removeを入れ替えて修正した。
    } else {
        openElement.style.transform = 'translateY(0)'; // 上記以外の場合、transformを'translateY(0)'に変更
        menuIcon.classList.add('active');
    }
};


// $(".openbtn1").click(function () {
//     $(this).toggleClass('active');
// });

// 一つだけ
// JavaScriptで.menu-iconをクリックしたら.openのtranslateY(100%)を切り替える
// document.querySelector('.menu-icon').addEventListener('click', function() {
//     const openElement = document.querySelector('.open'); // .open要素を取得
//     const currentTransform = window.getComputedStyle(openElement).transform; // .open要素の現在のtransform値を取得

//     if (currentTransform === 'matrix(1, 0, 0, 1, 0, 0)' || currentTransform === 'none') {
//         // currentTransformが'translateY(0)'に対応する値、または初期値の'none'であれば
//         openElement.style.transform = 'translateY(100%)'; // transformを'translateY(100%)'に変更
//     } else {
//         openElement.style.transform = 'translateY(0)'; // 上記以外の場合、transformを'translateY(0)'に変更
//     }
// });

// $(window).on('load', function () {
//     // h2のアニメーション制御
//     const h2 = document.querySelector('h2');
//     const h2Text = h2.textContent;
//     h2.innerHTML = '<span>' + h2Text.split('').join('</span><span>') + '</span>';

//     setTimeout(() => {
//       h2.classList.add('appear');

//       setTimeout(() => {
//         h2.classList.remove('appear');
//         h2.classList.add('disappear');

//         setTimeout(() => {
//           h2.classList.add('text-appear');
//         }, 600); // 背景が縮むアニメーションが終わるのを待つ
//       }, 600); // 背景が伸びるアニメーションが終わるのを待つ
//     }, 1800); // bodyのappearクラス追加後、少し待ってからh2のアニメーションを開始
//   });


$(window).on('load', function () {
    // 全てのh2要素を取得
    const h2Elements = document.querySelectorAll('h2');

    h2Elements.forEach(h2 => {
        const h2Text = h2.textContent;
        h2.innerHTML = '<span>' + h2Text.split('').join('</span><span>') + '</span>';
    });

    function animateH2() {
        h2Elements.forEach(h2 => {
            const rect = h2.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                setTimeout(() => {
                    h2.classList.add('appear');

                    setTimeout(() => {
                        h2.classList.remove('appear');
                        h2.classList.add('disappear');

                        setTimeout(() => {
                            h2.classList.add('text-appear');
                        }, 300); // 背景が縮むアニメーションが終わるのを待つ
                    }, 300); // 背景が伸びるアニメーションが終わるのを待つ
                }, 300); // h2が画面に入ってからのアニメーションを開始までの時間管理
            }
        });
    }

    // スクロールイベントリスナーを追加
    $(window).on('scroll', animateH2);

    // ページ読み込み時にアニメーションを実行
    animateH2();
});


// ローディング画面
$(window).on('load', function () {

    $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述

    //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    const spLogo = document.querySelector('#splash-logo');
    setTimeout(() => {
        spLogo.classList.add('appear');

        setTimeout(() => {
            spLogo.classList.remove('appear');
            spLogo.classList.add('disappear');

            setTimeout(() => {
                spLogo.classList.add('text-appear');
            }, 300); // 背景が縮むアニメーションが終わるのを待つ
        }, 300); // 背景が伸びるアニメーションが終わるのを待つ
    }, 600); // spLogoのアニメーションを開始までの時間管理

    $("#splash").delay(1500).fadeOut('slow', function () {//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述

        $('body').addClass('fade-in');//フェードアウト後bodyにappearクラス付与

    });
    //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

    //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
    $('.splashbg').on('animationend', function () {
        //この中に動かしたいJSを記載
    });
    //=====ここまで背景が伸びた後に動かしたいJSをまとめる

});