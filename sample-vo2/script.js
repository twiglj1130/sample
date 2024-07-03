// script.js
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.product-container', {
    spaceBetween: 10, // スライド間のスペースを10ピクセルに設定
    freeMode: {
      enabled: true, // フリーモードを有効にする（スライドがスナップしない）
    },
    grabCursor: true, // カーソルをスライドしたときにマウスポインターを表示
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true, //ドラッグ操作を有効にする
    },
    // スライドの表示枚数：768px未満の場合
    slidesPerView: 2.3,
    breakpoints: {
      // スライドの表示枚数：768px以上の場合
      768: {
        slidesPerView: 4,
      },
    },
    touchEventsTarget: 'container',//iPhoneでスクロールしないため
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const lineups = document.querySelectorAll('.lineup');
  const swiperSlides = document.querySelectorAll('.swiper-slide');

  //デフォルト時は１番目の商品が表示される データcategory1が表示
  const lineup1 = document.querySelector('.lineup1');

  const category1 = document.querySelectorAll('.swiper-slide[data-category="category1"]');


  // それぞれactiveクラスを追加
  lineup1.classList.add('active');

  category1.forEach(cate1 => {
    cate1.classList.add('active');
  });


  lineups.forEach(li => {
    li.addEventListener('click', () => {
      const category = li.dataset.category;
      li.classList.toggle('active');

      swiperSlides.forEach(swiperSlide => {
        if (swiperSlide.dataset.category === category) {
          if (swiperSlide.classList.contains('active')) {
            swiperSlide.classList.remove('active');
            swiperSlide.style.display = 'none';
          } else {
            swiperSlide.style.display = 'flex';

            // リフローをトリガーしてトランジションを適用
            swiperSlide.offsetHeight;
            swiperSlide.classList.add('active');
          }
        }
      });
    });
  });
});