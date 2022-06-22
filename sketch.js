let touchDelay = 20;
let stage = 0;
let buttonTurn = true;
let buttonX = 50;
let buttonY = 100;
let life = 5;
let redlineStart=0;
let cnv;

function setup() {
  cnv = createCanvas(window.innerWidth, 640);
  cnv.elt.addEventListener('click', myTouchStarted)
}

function draw() {
  
  if(touchDelay > 0) touchDelay--;
  switch (stage) {
    case 0:
      introDisplay();
      break;
    case 1:
      //한국사능력검정시험
      labtopDisplay();
      break;
    case 2:
      //마감되었습니다
      labtopDisplay();
      labtopScreen();
      break;
    case 3:
      //또 마감이야
      labtopDisplay();
      labtopScreen();
      labtopTextbox("아! 또 마감이야!");
      break;
    case 4:
      //언제쯤 시험 접수 성공
      labtopDisplay();
      labtopScreen();
      labtopTextbox("도대체 언제쯤 시험 접수에 성공할까?");
      break;
    case 5:
      //게임시작화면
      gameIntro();
      break;
    case 6:
      //게임 설명
      gameExplain();
      break;
    case 7:
      //게임
      if (frameCount % 25 == 0) {
        buttonTurn = !buttonTurn;
      }
      if (buttonTurn == true) {
        if (frameCount % 25 == 0) {
          gameDisplay();
          lifeShow();
          buttonX = random(10, width - 100);
          buttonY = random(80, height - 50);
          buttonDisplay();
        }else{
          gameDisplay();
          lifeShow();
          buttonDisplay();
        }
      }else{
        gameDisplay();
        lifeShow();
      }
      break;
      case 8:
      //시험 신청 성공!
      gameDisplay();
      textAlign(CENTER,CENTER);
      textSize(30);
      textStyle(BOLD);
      fill(255,0,0);
      text("신청 성공!",width/2,height/2);
      
      textSize(15);
      textStyle(NORMAL);
      fill(50);
      text("힌트를 얻으려면 클릭하세요",width/2,height-100);
      redlineStart=0;
      break;
      case 9:
      //시험 신청 실패
      gameDisplay();
      textAlign(CENTER,CENTER);
      textSize(30);
      textStyle(BOLD);
      fill(255,0,0);
      text("신청 실패!",width/2,height/2);
      
      textSize(20);
      textStyle(NORMAL);
      fill(0);
      text("다시 하시겠습니까?",width/2,height-200);
      
      noStroke();
      fill(23, 173, 103);
      rect(width/2-25,height-170,50,30);
      textSize(20);
      fill(250);
      text("YES",width/2,height-155);
      break;
      case 10:
      //체크리스트 3번 지워지기
      checklistDisplay();
      break;

    default:
  }
}

function myTouchStarted() {
  
  if(touchDelay == 0){
    touchDelay = 10;
  switch (stage) {
    case 0:
      stage = 1;
      break;
    case 1:
      stage = 2;
      break;
    case 2:
      stage = 3;
      break;
    case 3:
      stage = 4;
      break;
    case 4:
      stage = 5;
      break;
    case 5:
      stage = 6;
      break;
    case 6:
      stage = 7;
      break;
      case 7:
      if(buttonTurn==true && mouseX>buttonX && mouseX<buttonX+100 && mouseY>buttonY && mouseY<buttonY+50){
        stage = 8;
      }else{
        life-=1;
        if(life == 0){
          stage = 9;
        }
      }
      break;
      case 8:
      stage = 10;
      break;
      case 9:  
      if(mouseX>width/2-25 && mouseX<width/2+25 && mouseY > height-170 && mouseY < height-140){
        stage = 7;
        life = 5;
      }
      break;
      case 10:
      if(mouseX>width/2-50 && mouseX <width/2+50 && mouseY>height-17.5 && mouseY<height-2.5){
        stage =0;
        life = 5;
      }
      break;
    default:
  }
  }
}

function introDisplay() {
  background(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textSize(25);
  fill(255);
  text("때는 몇 달 전...", width / 2, height / 2);

  textSize(15);
  fill(150);
  text("클릭하여 다음 단계로...", width / 2, (height / 4) * 3);
  
  
  
  // textSize(15);
  // fill(150);
  // text("현재 미니게임이 iPhone에서 작동하지 않습니다.\n다른 기기로 테스트 부탁드립니다.", width / 2, (height / 4) * 3 + 50);
}

function labtopDisplay() {
  background(255);

  let labtopX = 60;
  let labtopY = (height * 1) / 10;
  //노트북 겉면
  strokeWeight(1);
  stroke(0, 150);
  fill(245, 245, 245);
  rect(labtopX, labtopY, width - labtopX * 2, (height * 3) / 10);
  quad(
    labtopX,
    labtopY + (height * 3) / 10,
    labtopX - 40,
    labtopY + (height * 5) / 10,
    width - labtopX + 40,
    labtopY + (height * 5) / 10,
    width - labtopX,
    labtopY + (height * 3) / 10
  );
  //노트북 키보드
  fill(30);
  quad(
    labtopX + 10,
    labtopY + (height * 3) / 10 + 10,
    labtopX - 10,
    labtopY + (height * 4) / 10 + 10,
    width - labtopX + 10,
    labtopY + (height * 4) / 10 + 10,
    width - labtopX - 10,
    labtopY + (height * 3) / 10 + 10
  );
  //노트북 화면
  noStroke();
  fill(255);
  rect(
    labtopX + 10,
    labtopY + 10,
    width - (labtopX * 2 + 20),
    (height * 3) / 10 - 20
  );
  textAlign(CENTER, CENTER);
  textSize(20);
  textStyle(NORMAL);
  fill(0);
  text(
    "한국사능력검정시험 접수",
    width / 2,
    labtopY + 2 + (height * 3) / 25
  );

  fill(100);
  // strokeWeight(1);
  textSize(10);
  textAlign(LEFT, TOP);
  text("클릭하여 다음 단계로...", 10, 10);
}

function labtopScreen() {
  let labtopY = (height * 1) / 10;
  textAlign(CENTER, CENTER);
  noStroke();
  fill(200, 0, 0);
  textSize(20);
  textStyle(NORMAL);
  text("마감되었습니다", width / 2, labtopY + (height * 4) / 25);
}
function labtopTextbox(message) {
  let boxX = 20;
  let boxY = (height * 4) / 5;

  //바깥 박스
  stroke(0, 150);
  fill(255, 150);
  rect(boxX, boxY, width - boxX * 2, 80);
  //안쪽 박스
  noFill();
  rect(boxX + 5, boxY + 5, width - boxX * 2 - 10, 70);
  fill(0);
  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(12);
  text(message, boxX + 20, boxY + 25);
}

function gameIntro() {
  background(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  textStyle(BOLD);
  noStroke();
  fill(0);
  text("한국사능력검정시험", width / 2, (height * 2) / 5);
  text("신청하기", width / 2, (height * 2) / 5 + 35);

  textSize(20);
  textStyle(NORMAL);
  fill(100);
  text("시작하려면 클릭하세요", width / 2, (height * 3) / 5 + 20);
}

function gameExplain() {
  background(240, 230, 177);

  fill(255, 0, 0);
  //strokeWeight(1);
  textSize(35);
  textStyle(BOLD)
  textAlign(CENTER, CENTER);
  text("게임 설명", width / 2, (height * 3) / 20);
  
  textAlign(LEFT, TOP);
  textSize(20);
  textStyle(NORMAL);
  fill(30);
  text(
    "빛의 속도로 마감되는 한국사능력검정시험을 신청하라! 갑자기 나타나는 시험 신청 버튼을 사라지기 전에 누르세요. 5회 이상 실패 시, YOU LOSE!!!",
    width / 2 - 100,
    (height * 2) / 5,
    200,
    300
  );
  
  fill(50, 100);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("시작하려면 클릭하세요", width / 2, (height * 9) / 10);

  strokeWeight(3);
  line(
    width / 2 - 55,
    (height * 3) / 20 + 15,
    width / 2 + 55,
    (height * 3) / 20 + 15
  );
}
function buttonDisplay() {
  noStroke();
  fill(255, 0, 0);
  rect(buttonX, buttonY, 100, 50);

  fill(255);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("신청하기", buttonX + 50, buttonY + 25);
}
function gameDisplay(){
  background(255);
  
  noStroke();
  fill(240);
  rect(0,0,width,30);
  fill(100);
  rectMode(CENTER);
  rect(width/2,15,200,20);
  
  fill(237, 46, 28);
  rect(width-15,15,10,10);
  fill(250, 199, 60);
  rect(width-30,15,10,10);
  fill(28, 199, 45);
  rect(width-45,15,10,10)
  rectMode(CORNER);

  textAlign(CENTER,CENTER);
  textStyle(NORMAL);
  textSize(15);
  fill(255);
  text("historyexam.go.kr",width/2,15);
  
  textSize(20);
  textStyle(BOLD);
  fill(100);
  text("<",10,15);
  
  fill(200);
  text(">",25,15);
  
  textStyle(BOLD)
  textSize(30);
  fill(0);
  text("한국사능력검정시험",width/2,60);
}
function lifeShow(){
  textAlign(CENTER,CENTER);
  textSize(15);
  textStyle(NORMAL);
  fill(0);
  text("남은기회",width-30,height-40);
  textSize(30);
  text(life,width-20,height-20);
}
function checklistDisplay(){
    background(255, 255, 179);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(50);
  noStroke();
  fill(102, 51, 0);
  text("체크리스트", width / 2, 50);

  textAlign(LEFT, CENTER);
  textSize(30);
  fill(102, 51, 0);
  text("1.영어공부하기", 30, 150);
  text("2.봉사활동", 30, 200);
  text("3.한국사시험 신청", 30, 250);

  strokeWeight(5);
  stroke(255, 0, 0, 200);
  line(20, 150, 210, 150);
  line(20, 200, 170, 200);

  strokeWeight(5);
  stroke(255, 0, 0, 200);
  line(20, 250, 20 + redlineStart, 250);

  if (frameCount % 5 == 0) {
    if (redlineStart <= 230) {
      redlineStart += 5;
    } else {
      redlineStart = 240;
    }
  }

  if (redlineStart == 240) {
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    noStroke();
    text("비밀번호", width / 2, (height * 2) / 3);

    for (let i = 0; i < 4; i++) {
      fill(255, 200);
      noStroke();
      rect(
        (width * 1) / 13 + width * ((3 * i) / 13),
        (height * 2) / 3 + 60,
        (width * 2) / 15,
        80
      );
    }
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(40);
    text("4", (width * 2) / 13, (height * 2) / 3 + 100);
    text("6",width*5/13,height*2/3+100);
    fill(120);
    text("2",width*8/13,height*2/3+100);
    fill(0);
    text("9",width*11/13,height*2/3+100);
    
    noFill();
    strokeWeight(1);
    stroke(30,150);
    rectMode(CENTER);
    //rect(width/2,height-10,100,15);
    textSize(20);
    textStyle(NORMAL);
    fill(30, 150);
    // text("Menu에서 비밀번호를 입력할 수 있습니다.", width / 2, height - 30);
    rectMode(CORNER);
  }
}
