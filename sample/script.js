// script.js
const productContainer = document.querySelector('.product-container');

let isDown = false;
let startX;
let scrollLeft;

productContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - productContainer.offsetLeft;
  scrollLeft = productContainer.scrollLeft;
});

document.addEventListener('mouseup', () => {
  isDown = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - productContainer.offsetLeft;
  const walk = (x - startX) * 1; // スクロールの速さを調整　walkは、移動量に基づいてスクロール量を計算します。
  productContainer.scrollLeft = scrollLeft - walk; //scrollLeft ドラッグ操作の開始時に記録された要素のスクロール位置。
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