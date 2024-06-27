// ドラッグ範囲の最小・最大座標
const minX = -100
const maxX = 100
const minY = -100
const maxY = 100

// ドラッグ対象のオブジェクト
const target = document.getElementById('target')

target.addEventListener('touchstart', prevent)
target.addEventListener('pointerdown', onPointerDown)
target.addEventListener('pointermove', onPointerMove)
target.addEventListener('pointerup', onPointerUp)
target.addEventListener('pointercancel', onPointerUp)
target.addEventListener('lostpointercapture', onPointerUp)

let isDragging = false

// ドラッグ開始時の座標を記録
let startX = 0
let startY = 0

// ドラッグ対象の現在の座標を記録
let targetX = 0
let targetY = 0

// value が min, max を越えたらその範囲に収まる値を返す
function clamp(min, value, max) {
    return Math.max(min, Math.min(value, max))
}

// 座標をドラッグ対象のオブジェクトに適用
function setOffset(x, y) {
    targetX = x
    targetY = y
    target.style.transform = `translate(${x}px, ${y}px)`
}

// モバイルでスクロールさせないようにする
function prevent(event) {
    event.preventDefault()
}

function onPointerDown(event) {
    isDragging = true
    startX = event.clientX - targetX
    startY = event.clientY - targetY
    target.setPointerCapture(event.pointerId)
}

function onPointerMove(event) {
    if (!isDragging) {
        return
    }

    // 指定した範囲内に収まるようにオブジェクトの座標をセット
    //   const x = clamp(minX, event.clientX - startX, maxX)
    //   const y = clamp(minY, event.clientY - startY, maxY)
    //   setOffset(x, y)

    // clamp していた部分をラバーバンド効果に変更
    const x = rubberBand(event.clientX - startX, minX, maxX)
    const y = rubberBand(event.clientY - startY, minY, maxY)
    setOffset(x, y)
}


function rubberBand(value, min, max) {
    if (value < min) {
        // min を下回ったら下回った分を補正
        return min - rubber(min - value)
    }

    if (value > max) {
        // max を上回ったら上回った分を補正
        return max + rubber(value - max)
    }

    // min、max の範囲内ならば補正しない
    return value
}

function rubber(distance) {
    // デフォルトでどれだけ引っ張るか
    // 0 だと clamp と同じになる
    // 1 だと distance に応じた補正だけになる
    const rubberFactor = 0.85

    // distance の大きさに対してどれだけ引っ張るか
    // 0 だと distance に応じた補正を行わない
    // この値が大きくなるほど distance が大きくなった時の引っ張る補正が大きく働く
    const distanceFactor = 0.002

    // distance が大きくなればなるほど引っ張る力が大きくなるように式を組む
    return (distance * rubberFactor) / (distance * distanceFactor + 1)
}


function onPointerUp(event) {
    if (!isDragging) {
        return
    }
    isDragging = false

    // 指定した範囲内に収まるようにオブジェクトの座標をセット
    //   const x = clamp(minX, event.clientX - startX, maxX)
    //   const y = clamp(minY, event.clientY - startY, maxY)
    //   setOffset(x, y)

    // ラバーバンド効果で範囲内に戻すアニメーションを開始
    startMomentum()
}

function startMomentum() {
    let x = targetX
    let y = targetY

    function momentum() {
        const nextX = rubberBand(x, minX, maxX)
        const nextY = rubberBand(y, minY, maxY)
        setOffset(nextX, nextY)

        // 十分範囲に近づいたら終了する
        if (Math.abs(x - nextX) < 0.1 && Math.abs(y - nextY) < 0.1) {
            return
        }

        // x, y を更新し繰り返す
        x = nextX
        y = nextY
        requestAnimationFrame(momentum)
    }
    requestAnimationFrame(momentum)
}

function startMomentum() {
    let x = targetX
    let y = targetY
    let lastTime

    function momentum(time) {
        // 初回実行時は lastTime を保存するだけにして繰り返す
        if (!lastTime) {
            lastTime = time
            requestAnimationFrame(momentum)
            return
        }

        // 期待するフレームレートを 60 として、前回の実行からの経過フレームを計算
        const elapsedFrame = ((time - lastTime) / 1000) * 60

        // ラバーバンド効果で座標を範囲に近づける
        // elapsedFrame を引数に渡し、経過フレームを考慮した補正を行う
        const nextX = rubberBand(x, minX, maxX, elapsedFrame)
        const nextY = rubberBand(y, minY, maxY, elapsedFrame)
        setOffset(nextX, nextY)

        // 十分範囲に近づいたら終了する
        if (Math.abs(x - nextX) < 0.1 && Math.abs(y - nextY) < 0.1) {
            return
        }

        // lastTime, x, y を更新し繰り返す
        lastTime = time
        x = nextX
        y = nextY

        requestAnimationFrame(momentum)
    }
    requestAnimationFrame(momentum)
}


// 引数に frame を追加し、経過フレームによって補正量を調整可能にする
function rubberBand(value, min, max, frame = 1) {
    if (value < min) {
        // min を下回ったら下回った分を補正
        return min - rubber(min - value, frame)
    }

    if (value > max) {
        // max を上回ったら上回った分を補正
        return max + rubber(value - max, frame)
    }

    // min、max の範囲内ならば補正しない
    return value
}

function rubber(distance, frame) {
    // デフォルトでどれだけ引っ張るか
    // 0 だと clamp と同じになる
    // 1 だと distance に応じた補正だけになる
    const rubberFactor = 0.85

    // distance の大きさに対してどれだけ引っ張るか
    // 0 だと distance に応じた補正を行わない
    // この値が大きくなるほど distance が大きくなった時の引っ張る補正が大きく働く
    const distanceFactor = 0.002

    // 以前の式を distance の漸化式とみなして一般項に書きかえたもの
    // 経過フレーム（frame）によって補正する量を調整することができる
    const a = 1 / rubberFactor
    const b = distanceFactor / (rubberFactor - 1)
    return 1 / ((1 / distance - b) * a ** frame + b)
}