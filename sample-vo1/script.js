// script.js
document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.product-container', {
    slidesPerView: 4, // 表示されるスライドの数を1に設定
    spaceBetween: 10, // スライド間のスペースを10ピクセルに設定
    freeMode: {
      enabled: true, // フリーモードを有効にする（スライドがスナップしない）
    },
    grabCursor: true, // カーソルをスライドしたときにマウスポインターを表示
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true, //ドラッグ操作を有効にする
    },
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const lineups = document.querySelectorAll('.lineup');
  // const swiperWrapper = document.querySelectorAll('.swiper-wrapper');
  const swiperSlides = document.querySelectorAll('.swiper-slide');

  //デフォルト時は１番目の商品が表示される データcategory1が表示
  const lineup1 = document.querySelector('.lineup1');
  // const swiperWrapper = document.querySelector('.swiper-wrapper');

  // const container1 = document.querySelector('.container1');
  // const category1 = document.querySelector('.container1');
  // const category = button.dataset.category;
  // const category1 = swiperSlides.dataset.category;
  // document.querySelector('.swiper-slide[data-category="category1"]').classList.add('active');
  // const category1 = document.querySelector('.swiper-slide[data-category="category1"]');
  const category1 = document.querySelectorAll('.swiper-slide[data-category="category1"]');


  // それぞれactiveクラスを追加
  lineup1.classList.add('active');
  // swiperWrapper.classList.add('active');

  // category1.classList.add('active');  forEachで回さないと構文エラー、記法が違うだけ
  category1.forEach(cate1 => {
    cate1.classList.add('active');
  });


  // document.querySelectorAll('.category-button').forEach(button => {
  lineups.forEach(li => {
    li.addEventListener('click', () => {
      const category = li.dataset.category;
      li.classList.toggle('active');

      // 商品それぞれに対してactiveを切り替え　フェイドインなし
      // swiperSlides.forEach(swiperSlide => {
      //   if (swiperSlide.dataset.category === category) {
      //     swiperSlide.classList.toggle('active');
      //   }
      // });

      // swiperSlides.forEach(swiperSlide => {
      //   if (swiperSlide.dataset.category === category) {
      //     if (!swiperSlide.classList.contains('active')) {
      //       swiperSlide.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out, visibility 0.5s';
      //     } else {
      //       swiperSlide.style.transition = '';
      //     }
      //     swiperSlide.classList.toggle('active');
      //   } else {
      //     swiperSlide.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out, visibility 0.5s';
      //     swiperSlide.style.opacity = 0;
      //     swiperSlide.style.transform = 'translateY(5%)';
      //     swiperSlide.style.visibility = 'hidden';
      //     setTimeout(() => {
      //       swiperSlide.remove();
      //     }, 500);
      //   }
      // });


      swiperSlides.forEach(swiperSlide => {
        if (swiperSlide.dataset.category === category) {
          if (swiperSlide.classList.contains('active')) {
            swiperSlide.classList.remove('active');
            swiperSlide.style.display = 'none';
            // swiperSlide.style.transform = 'none';
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

  // lineups.forEach((lineup, index) => {
  //   lineup.addEventListener('click', () => {
  //     // すべてのlineupとswiper-slideからactiveクラスを削除
  //     lineups.forEach(l => l.classList.remove('active'));
  //     swiperSlides.forEach(pc => pc.classList.remove('active'));

  //     // クリックされたlineupと対応するswiper-slideにactiveクラスを追加
  //     lineup.classList.add('active');
  //     swiperSlides[index].classList.add('active');


  //     // クリックしたらトグルでactiveクラスを追加
  //     // lineup.classList.toggle('active');
  //     // swiperSlides[index].classList.toggle('active');


  //   });
  // });
});