// DOM 초기화
const canvas = document.querySelector("canvas");    // html의 canvas 태그를 바로 가져올 수 있게 canvas 변수에 호출
const ctx = canvas.getContext("2d");                // mdn canvas 사용

const colorBtns = document.querySelectorAll(".palette button");
const eraserBtn = document.querySelector("#eraser");
const downloadBtn = document.querySelector("#download");

// 그리기 설정
let isDrawing = false;
let isErasing = false;

ctx.lineWidth = 5;
ctx.strokeStyle = "red";

// 이벤트 리스너
function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();                    // 그리기 시작
    ctx.moveTo(e.offsetX, e.offsetY);   // offset X&Y를 통해 e의 좌표값 찾기
}

function drawing(e) {
    if (!isDrawing) return;
    if (isErasing) {    // 지우개
        ctx.clearRect(e.offsetX, e.offsetY, 20, 20);        // clearRect : 투명한 사각형 그리기 지우개의 크기 20
    } else {            // 그리기
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();                    // 그리기 중단
}

function startErasing(e) {
    isErasing = true;
    colorBtns.forEach((button) => button.classList.remove("selected"));
    e.currentTarget.classList.add("selected");
}

function changeColor(e) {
    isErasing = false;                                  // 색상 선택 => 지우기 모드 false
    ctx.strokeStyle = e.currentTarget.dataset.color;    // 내가 클릭한 색의 속성값을 가져오기
    colorBtns.forEach(button => {                       // 내가 선택한 색상 활성화
        if (button === e.currentTarget) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
    earaserBtn.classList.remove("selected");            // 지우개 모드의 selected 제거
}

function downloadCanvas() {                             // 파일 다운로드!! 매우 중요
    const image = canvas.toDataURL("image/png", 1.0);   // 그림을 png 이미지 주소로 만들기
    const linkEl = document.createElement('a');         // a 태그를 생성
    linkEl.href = image;                                // a 태그의 href 속성 생성
    linkEl.download = 'PaintApp';                       // a 태그의 download 속성 생성
    linkEl.click();                                     // 클릭하게 함
}


// 이벤트 연결
canvas.addEventListener("mousedown", startDrawing)  // 마우스를 누르면 startDrawing 함수 실행
canvas.addEventListener("mousemove", drawing)       // 마우스를 누르고 움직이면 drawing 함수 실행
canvas.addEventListener("mouseup", stopDrawing)     // 마우스를 떼면 stopDrawing 함수 실행
colorBtns.forEach(button => button.addEventListener("click", changeColor));     // 색상을 선택하면 changeColor 함수 실행
eraserBtn.addEventListener("click", startErasing);
downloadBtn.addEventListener("click", downloadCanvas);