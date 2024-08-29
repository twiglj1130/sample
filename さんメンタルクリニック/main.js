$(document).ready(function () {
    const $footer = $('.footer_cta');
    const $openbtn1 = $('.openbtn1');
    const showOffset = 200; // フッターを表示するスクロール位置

    $(window).scroll(function () {
        const scrollTop = $(this).scrollTop();

        if (scrollTop > showOffset) {
            // 200pxより下にスクロールした場合
            $footer.css('bottom', '0');
            // $openbtn1.css('bottom', '110%');
            $openbtn1.addClass('a');
            setTimeout(function () {
                $openbtn1.addClass('scrolled');
            }, 100);
        } else {
            // 200px以内の場合
            $footer.css('bottom', '-55px');
            $openbtn1.removeClass('a');
            $openbtn1.removeClass('scrolled');
        }
    });

    // モバイルボタン動作
    $('.openbtn1, .open-text').click(toggleTransform);

    // メニュー内のaタグをクリックしたときにメニューを閉じる
    $('.open a').click(closeMenu);

    // トランスフォームを切り替える関数
    function toggleTransform() {
        const openElement = $('.open'); // .open要素を取得
        const menuIcon = $('.menu-icon'); // .open要素を取得
        const currentTransform = openElement.css('transform'); // .open要素の現在のtransform値を取得

        if (currentTransform === 'matrix(1, 0, 0, 1, 0, 0)' || currentTransform === 'none') {
            // currentTransformが'translateY(0)'に対応する値、または初期値の'none'であれば
            openElement.css('transform', 'translateY(100%)');
            menuIcon.removeClass('active');
        } else {
            openElement.css('transform', 'translateY(0)');
            menuIcon.addClass('active');
        }
    };

    // メニューを閉じる関数
    function closeMenu() {
        const $openElement = $('.open');
        const $menuIcon = $('.menu-icon');

        // $openElement.removeClass('menu-open');
        // $menuIcon.removeClass('active');
        $openElement.css('transform', 'translateY(100%)');
    }

    // スライドショー
    // TOPページの場合、以下の処理を実行
    if ($(document.body).attr('id') === 'top_page') {
        // ここに必要な処理を記述
        $('.clinic_slider').slick({
            dots: false,                  // ドット型のナビゲーションを表示
            infinite: true,              // 無限ループを有効化
            speed: 3000,                 // 切り替えアニメーションの速度（3000ms）
            slidesToShow: 1,             // 一度に表示するスライド数
            autoplay: true,              // 自動再生を有効化
            autoplaySpeed: 3000,         // 自動再生の間隔（5000ms = 3000ms(アニメーション) + 2000ms(表示時間)）
            fade: true,                  // フェードイン/アウトのアニメーションを使用
            arrows: false,               // 切り替え矢印を非表示
            pauseOnHover: false,         // ホバー時に一時停止しない
            pauseOnFocus: false,         // フォーカス時に一時停止しない
            initialDelay: 800,           // 初期遅延（800ms後に自動再生開始）
            cssEase: 'linear',           // リニアなイージングを使用
            // draggable: false,            // ドラッグによる切り替えを無効化
            // swipe: true,                 // スワイプ（クリック）による切り替えを有効化
            touchThreshold: 10,          // タッチ（クリック）の感度を高く設定
            clickToChange: true,         // クリックによる切り替えを明示的に有効化
        });

        // サムネイル用スライダー
        $(".thumbnail_slider").slick({
            slidesToShow: 3, // 一度に表示するスライド数
            asNavFor: ".clinic_slider", // メインスライダーと連動
            infinite: false, // 無限ループを無効化
            focusOnSelect: true, // クリック時にスライドを中央にフォーカス
            arrows: false, // 矢印ナビゲーションを非表示
        });
    }


    // FAQページのトグル動作

    $('.faq_question').on('click', function () {
        const $currentTitle = $(this);
        const $currentContent = $currentTitle.next('.faq_answer');
        const $currentContainer = $currentTitle.closest('.q_container');

        // 他のアコーディオンアイテムを閉じる
        $('.faq_answer').not($currentContent).slideUp();
        $('.faq_question').not($currentTitle).removeClass('active');
        $('.q_container').not($currentContainer).removeClass('active');

        // クリックされたアイテムの表示・非表示を切り替える
        $currentContent.slideToggle();
        $currentTitle.toggleClass('active');
        $currentContainer.toggleClass('active');
    });

    // TOPへ戻るボタン
    // Topフェードイン,アウト
    $(document).on('scroll', function () {
        // スクロール位置を取得
        const scrollTop = $(window).scrollTop();

        if (scrollTop > 350) {
            // フェードインする
            $('.fade').fadeIn(500);
        }

        else if (scrollTop <= 50) {
            // フェードアウトする
            $('.fade').fadeOut(500);
        }
    });

    $('.fade').on('click', function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });


    // スライドイン、フェイドインアニメーション
    // タイトルを左からスライドイン
    function animateSlideIn() {
        const scrollAmount = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('.fade_in_animate_x').each(function () {
            const $element = $(this);
            const position = $element.offset().top;
            if (scrollAmount > position - windowHeight + 100) {
                $element.addClass('fade_in');
            }
        });
    }

    // スクロールしたときに遅延させてフェードイン
    function animateFadeIn() {
        const scrollAmount = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('.fade_in_animate_y').each(function (index) {
            const $element = $(this);
            const position = $element.offset().top;
            if (scrollAmount > position - windowHeight + 100) {
                setTimeout(function () {
                    $element.addClass('fade_in');
                }, 200 * index);
            }
        });
    }

    // アニメーション遅延が被らないようにもう一つ設定
    function animateFadeInDelayed() {
        const scrollAmount = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('.fade_in_animate_y2').each(function (index) {
            const $element = $(this);
            const position = $element.offset().top;
            if (scrollAmount > position - windowHeight + 10) {
                // クラス付与の重複防止：既に fade_in クラスが付与されている要素をスキップ
                if (!$element.hasClass('fade_in')) {
                    setTimeout(function () {
                        $element.addClass('fade_in');
                    }, 200 * index);
                }
            }
        });
    }

    // アニメーション遅延なしver
    function animateFadeInNoDelaye() {
        const scrollAmount = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('.fade_in_animate_y3').each(function () {
            const $element = $(this);
            const position = $element.offset().top;
            if (scrollAmount > position - windowHeight + 10) {
                $element.addClass('fade_in');
            }
        });
    }

    // ９つのカラム用対策
    function animateFadeInDelayed9Columns() {
        const scrollAmount = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        $('.treatment_grid').each(function() {
            const $grid = $(this);
            const gridPosition = $grid.offset().top;
            
            if (scrollAmount > gridPosition - windowHeight + 10) {
                $grid.find('.fade_in_animate_9grid').each(function(index) {
                    const $element = $(this);
                    if (!$element.hasClass('fade_in')) {
                        setTimeout(function() {
                            $element.addClass('fade_in');
                        }, 200 * index);
                    }
                });
            }
        });
    }

    // フェイドインだけの記述を追加
    function animateFadeInOnly() {
        const scrollAmount = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('.fade_in_only').each(function () {
            const $element = $(this);
            const position = $element.offset().top;
            if (scrollAmount > position - windowHeight + 10) {
                $element.addClass('fade_in');
            }
        });
    }

    // 全てのアニメーションを実行する関数
    function runAllAnimations() {
        animateSlideIn();
        animateFadeIn();
        animateFadeInDelayed();
        animateFadeInNoDelaye();
        animateFadeInOnly();
        animateFadeInDelayed9Columns();
    }

    // ページロード時とスクロール時に実行
    runAllAnimations(); // ページロード時に実行
    $(window).on('scroll', runAllAnimations); // スクロール時に実行

});