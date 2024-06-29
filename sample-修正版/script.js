// script.js
// const productContainer = document.querySelector('.product-container');

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.product-container', {
    slidesPerView: 4.3, // 表示されるスライドの数を1に設定
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
  const productContainers = document.querySelectorAll('.product-container');

  //デフォルト時は１番目の商品が表示される
  const lineup1 = document.querySelector('.lineup1');
  const container1 = document.querySelector('.container1');

  lineup1.classList.add('active');
  container1.classList.add('active');

  lineups.forEach((lineup, index) => {
    lineup.addEventListener('click', () => {
      // すべてのlineupとproduct-containerからactiveクラスを削除
      lineups.forEach(l => l.classList.remove('active'));
      productContainers.forEach(pc => pc.classList.remove('active'));

      // クリックされたlineupと対応するproduct-containerにactiveクラスを追加
      lineup.classList.add('active');
      productContainers[index].classList.add('active');

    });
  });
});