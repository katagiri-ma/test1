console.log(window.bacefook);

// ロード時
window.addEventListener("load", () => {
  let username = localStorage.getItem("username");
  if(!username){
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username);
    if(username.length === 0 || username === null) {
      localStorage.clear();
      const userEl = document.querySelector("h3");
      userEl.innerText = `ユーザー名： unknown`;
      logButtonEl.innerText="ログイン"
    } 
  }
  
  if(username.length !== 0 && username !== null){
    const userEl = document.querySelector("h3");
    userEl.innerText = `ユーザー名： ${username}`;
    logButtonEl.innerText="ログアウト"
  }
  getNews();
});

// 投稿表示
const containerEl = document.querySelector("#newsfeed");
let opentopic = 0;
function getNews() {
  opentopic = bacefook.newsfeed.length;

  for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
    const post = bacefook.newsfeed[index];

    const postingEl = document.createElement("div");
    postingEl.className = "posting";

    const friendEl = document.createElement("div");
    friendEl.className = "friend";
    friendEl.innerText = post.friend + index;

    const timeStampEl = document.createElement("div");
    timeStampEl.className = "timeStamp";
    timeStampEl.innerText = post.timestamp;

    const momentEl = document.createElement("div");
    momentEl.className = "moment";
    momentEl.innerText = moment(post.timestamp).fromNow();

    const feelingEl = document.createElement("div");
    feelingEl.className = "feeling";
    feelingEl.innerText = post.feeling;

    const imgEl = document.createElement("img");
    imgEl.className = "img";
    imgEl.src = post.image;

    const postEl = document.createElement("div");
    postEl.innerText = post.text;
    postingEl.append(friendEl);
    postingEl.append(timeStampEl);
    postingEl.append(feelingEl);
    postingEl.append(imgEl);
    postingEl.append(momentEl);
    postingEl.append(postEl);

    containerEl.append(postingEl);
  }
}

// 更新ボタン
const buttonEl = document.querySelector(".button");
console.log(buttonEl);

buttonEl.addEventListener("click", () => {
  const postingEl = document.querySelectorAll(".posting");
  for (let i = 0; i < postingEl.length; i++) {
    postingEl[i].remove()
  }

  const newTopicEl = document.getElementsByClassName("topic")[0];
  newTopicEl.remove();
  count = 0;

  getNews();
});

// 投稿ボタン
const addButtonEl = document.getElementById("addButton");
console.log(addButtonEl);
addButtonEl.addEventListener("click", () => {
  let textEl = document.getElementById("newTopic");

  const feelings = [
    "happy",
    "smug",
    "lovestruck",
    "gross",
    "scared",
    "tired",
    "angry",
    "frustrated",
    "excited",
    ""
  ];

  const images = [
    "./images/1.jpg",
    "./images/2.png",
    "./images/3.png",
  ];

  const mypost = {
    feeling: feelings[Math.floor(Math.random() * feelings.length)],

    friend: localStorage.getItem("username"),

    image: images[Math.floor(Math.random() * images.length)],

    text: textEl.value,

    timestamp: new Date(),

  }

  window.bacefook.newsfeed.push(mypost);

  const postingEl = document.querySelectorAll(".posting");
  for (let i = 0; i < postingEl.length; i++) {
    postingEl[i].remove()
  }

  const newTopicEl = document.getElementsByClassName("topic")[0];
  newTopicEl.remove();
  count = 0;

  getNews();

  textEl.value = "";
});

// ログイン・ログアウト
const logButtonEl = document.getElementsByClassName("logButton")[0];
console.log("log", logButtonEl);
logButtonEl.addEventListener("click", () => {
  let username = localStorage.getItem("username");

  
  if (!username) {
    username = window.prompt("What is your name?");

    if(username.length === 0 || username === null) {
      localStorage.clear();
      userEl.innerText = `ユーザー名： unknown`;
      logButtonEl.innerText="ログイン"
    } else {
      localStorage.setItem("username", username);
      const userEl = document.querySelector("h3");
      userEl.innerText = `ユーザー名： ${username}`;
      logButtonEl.innerText="ログアウト"
      getNews();
    }
  } else {
    localStorage.clear();
    const userEl = document.querySelector("h3");
    userEl.innerText = `ユーザー名： unknown`;
    logButtonEl.innerText="ログイン"
  }
});

// 新着表示
let count = 0;

const intervalId = setInterval(() => {
  let newTopic = bacefook.newsfeed.length;
  
  if (opentopic !== newTopic){
    const topicEl = document.createElement("div");
    topicEl.className = "topic";
    topicEl.innerText = "新着"+(newTopic - opentopic) + "件あります。";
    
    if (count === 0) {
      console.log("count",count);
      // containerEl.prepend(topicEl);
      containerEl.before(topicEl);
      count = 1;
    } else {
      const newTopicEl = document.getElementsByClassName("topic")[0];
      newTopicEl.innerText = "新着"+(newTopic - opentopic) + "件あります。";
    }
  }
}, 100);

