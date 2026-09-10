
function normalizeImageSources(){
  document.querySelectorAll('img[src$=".webp"]').forEach(img=>{
    img.src = img.getAttribute('src').replace(/\.webp$/, '.svg');
  });
}
normalizeImageSources();

const KEY = "mokomoko_summerland_horror_v1";
const WARNING_KEY = "mokomoko_content_warning_seen";
let S = JSON.parse(localStorage.getItem(KEY) || '{"phase":0,"count":0,"seen":{},"mapSeen":false,"recruitSeen":false,"autoApplied":false,"warningSeen":false,"completionShown":false}');
if(typeof S.warningSeen === "undefined") S.warningSeen = false;
if(typeof S.completionShown === "undefined") S.completionShown = false;

const PHOTO = {
  ferris: {
    day:"assets/ferris_day.svg", night:"assets/ferris_night.svg",
    code:"FERRIS WHEEL", title:"きらめき観覧車",
    normal:"空の上から、パークを一望できます。",
    dark:"夜間ライトアップを実施しています。点灯していないゴンドラには乗車しないでください。"
  },
  teacup: {
    day:"assets/teacup_day.svg", night:"assets/teacup_night.svg",
    code:"TEA CUP", title:"くるくるティーパーティ",
    normal:"カラフルなカップでくるくる回る、人気のキッズライド。",
    dark:"停止後も回転しているカップには乗らないでください。"
  },
  train: {
    day:"assets/train_day.svg", night:"assets/train_night.svg",
    code:"PARK TRAIN", title:"しゅぽぽトレイン",
    normal:"園内をゆっくり一周する、小さなパークトレインです。",
    dark:"終点を過ぎても降車案内がない場合、そのままお待ちください。"
  },
  carousel: {
    day:"assets/carousel_day.svg", night:"assets/carousel_night.svg",
    code:"CAROUSEL", title:"ふわふわメリー",
    normal:"やさしい音楽に合わせて回る、パステルカラーのメリーゴーランド。",
    dark:"乗車中は絶対に後ろを振り返らないでください。"
  },
  surprise: {
    day:"assets/surprise_day.svg", night:"assets/surprise_night.svg",
    code:"SURPRISE HOUSE", title:"びっくりハウス",
    normal:"プレゼントみたいな外観が目印。中にはおもちゃみたいな不思議がいっぱい。",
    dark:"展示されているお人形にはお手を触れないでください。"
  }
};

function save(){ localStorage.setItem(KEY, JSON.stringify(S)); }

function setPhase(n){
  S.phase = Math.max(S.phase, n);
  document.body.classList.remove("dusk","night","deep");
  if(S.phase === 1) document.body.classList.add("dusk");
  if(S.phase === 2) document.body.classList.add("night");
  if(S.phase >= 3) document.body.classList.add("deep");

  const h = document.getElementById("hoursTop");
  const rideLabel = document.getElementById("rideLabel");
  const illuminationLabel = document.getElementById("illuminationLabel");
  const illuminationHours = document.getElementById("illuminationHours");
  const accessSmall = document.getElementById("accessSmall");
  const news = document.getElementById("glitchNews");
  const attractionLead = document.getElementById("attractionLead");
  const mapLead = document.getElementById("mapLead");
  const newsIllumi = document.getElementById("newsIllumi");
  const lostNews = document.getElementById("lostNews");

  if(S.phase < 2){
    h.textContent = "9:00 - 21:00";
    rideLabel.textContent = "のりもの";
    illuminationLabel.textContent = "イルミネーション";
    illuminationHours.textContent = "9:00 - 21:00";
    accessSmall.textContent = "電車・バス・お車でのご案内";
    news.textContent = "また明日もお越しください";
    attractionLead.textContent = "夜になるとキラキライルミネーションに彩られます。";
    mapLead.textContent = "園内マップは現在準備中です。公開まで今しばらくお待ちください。";
    newsIllumi.textContent = "ナイトイルミネーション開催のお知らせ";
    lostNews.textContent = "園内で迷子になった場合のご案内";
  }

  if(S.phase === 2){
    h.textContent = "9:00 - 縺?1:00";
    rideLabel.textContent = "のりもの";
    illuminationLabel.textContent = "繧､繝ｫ繝溘ロ繝ｼ繧ｷ繝ｧ繝ｳ";
    illuminationHours.textContent = "??:?? - 縺?1:00";
    accessSmall.textContent = "邱丞粋諠?蝣ｱ繧貞叙蠕励＠縺ｦ縺?∪縺?";
    news.textContent = "縺ｾ縺溘?譁?譁?縺ｧ縺ゅ＞縺ｾ縺励ｇ縺?";
    attractionLead.textContent = "螟懈婿縺ｮ繧､繝ｫ繝溘ロ繝ｼ繧ｷ繝ｧ繝ｳ縺ｯ迚ｹ蛯･蜈牙ｹｴ縺ｧ縺吶?";
    mapLead.textContent = "蝨貞?繝槭ャ繝励?迴ｾ蝨ｨ貅門ｙ荳ｭ縺ｧ縺吶?";
    newsIllumi.textContent = "繝翫う繝医う繝ｫ繝溘ロ繝ｼ繧ｷ繝ｧ繝ｳ髢句ぎ";
    lostNews.textContent = "蝨貞?縺ｧ縺ｾ縺?蟄舌↓縺ｪ縺｣縺溘?蜿門ｾ励";
  }

  if(S.phase >= 3){
    h.textContent = "縺? : 縺? - 2? : ??";
    rideLabel.textContent = "縺ｮ繧翫ｂ縺ｮ";
    illuminationLabel.textContent = "繧､?繝ｫ?繝溘?繧ｷ?繝ｧ?";
    illuminationHours.textContent = "??:?? - ?? : ??";
    accessSmall.textContent = "縺薙?邱丞粋縺ｯ隱ｭ縺ｿ霎ｼ繧√∪縺帙ｓ";
    news.textContent = "縺ｾ縺溘?逡後〒縺ゅ＞縺ｾ縺励ｇ縺?";
    attractionLead.textContent = "縺ｾ縺溘?縺ｿ縺､縺代※縺上ｌ縺溘?";
    mapLead.textContent = "PARK MAP : ERROR / 縺ｾ縺?譁?譁?";
    newsIllumi.textContent = "ERROR_17:00 / 繧､繝ｫ繝溘ロ繝ｼ繧ｷ繝ｧ繝ｳ";
    lostNews.textContent = "縺ｿ縺､縺九ｉ縺ｪ縺? / 繧ｭ繝｣繧ｹ繝医?蜿｣";
    illuminationLabel.classList.add("night-red","night-flicker");
    illuminationHours.classList.add("night-red","night-flicker");
    accessSmall.classList.add("night-red");
    lostNews.classList.add("night-red");
  }

  if(S.autoApplied){
    document.getElementById("applyStatus").textContent = "応募済み";
    document.getElementById("recruitNews").textContent = "採用受付が完了しました";
    const btn = document.getElementById("jobApplyBtn");
    if(btn){
      btn.textContent = "応募ありがとうございました";
      btn.disabled = true;
      btn.style.cursor = "default";
    }
  }
  save();
}

function advance(kind){
  S.count += 1;
  if(kind) S.seen[kind] = true;
  const unique = Object.keys(S.seen).length;
  if(S.count >= 2 || unique >= 2) setPhase(1);
  if(unique >= 4 && S.count >= 7) setPhase(2);
  if(S.count >= 15 || (S.recruitSeen && S.count >= 13)) setPhase(3);
  maybeAutoApply();
  maybeShowCompletion();
  save();
}

function openApplicationPopup(mode="thanks"){
  const title = document.getElementById("applicationTitle");
  const text = document.getElementById("applicationText");
  const strong = document.getElementById("applicationStrong");
  if(mode === "auto"){
    title.textContent = "応募ありがとうございました";
    text.innerHTML = "もこもこランド キャスト採用係<br>応募を受け付けました。";
    strong.textContent = "当日は心よりお待ち申し上げております";
  } else {
    title.textContent = "応募ありがとうございました";
    text.innerHTML = "募集要項の確認が完了しました。<br>あなたの応募を受け付けました。";
    strong.textContent = "当日は心よりお待ち申し上げております";
  }
  document.getElementById("applicationModal").classList.add("open");
}

function maybeShowCompletion(){
  if(S.completionShown) return;
  const allAttractionsSeen = ["carousel","teacup","train","surprise"].every(k => S.seen && S.seen[k]);
  if(S.phase >= 3 && S.recruitSeen && allAttractionsSeen && S.count >= 15){
    S.completionShown = true;
    save();
    setTimeout(()=>{ document.getElementById("completionModal").classList.add("open"); }, 1200);
  }
}

function maybeAutoApply(){
  if(S.autoApplied) return;
  if(S.recruitSeen && S.phase >= 2 && S.count >= 12){
    setTimeout(()=>{
      if(S.autoApplied) return;
      S.autoApplied = true;
      save();
      document.getElementById("applyStatus").textContent = "応募済み";
      document.getElementById("recruitNews").textContent = "採用受付が完了しました";
      openApplicationPopup("auto");
      maybeShowCompletion();
    }, 900);
  }
}

window.addEventListener("load", ()=>{
  const warningSeen = localStorage.getItem(WARNING_KEY) === "1";
  if(!warningSeen) document.getElementById("entryWarning").classList.add("open");
  setPhase(S.phase);
});
document.getElementById("continueBtn").addEventListener("click", ()=>{
  S.warningSeen = true;
  localStorage.setItem(WARNING_KEY, "1");
  save();
  document.getElementById("entryWarning").classList.remove("open");
});
document.getElementById("backBtn").addEventListener("click", ()=>{
  S.warningSeen = true;
  localStorage.setItem(WARNING_KEY, "1");
  save();
  if(history.length > 1) history.back();
  else document.getElementById("entryWarning").classList.remove("open");
});

const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add("in"); });
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const recruitObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !S.recruitSeen){
      S.recruitSeen = true;
      S.count += 1;
      save();
      if(S.phase >= 1) advance();
      maybeAutoApply();
    }
  });
},{threshold:.48});
recruitObserver.observe(document.querySelector(".recruit-observer"));

const modal = document.getElementById("photoModal");
document.querySelectorAll(".photo-open").forEach(el=>{
  el.addEventListener("click", ()=>{
    const kind = el.dataset.kind;
    advance(kind);
    const d = PHOTO[kind];
    document.getElementById("modalDay").src = d.day;
    document.getElementById("modalNight").src = d.night;
    document.getElementById("modalCode").textContent = d.code;
    document.getElementById("modalTitle").textContent = d.title;
    document.getElementById("modalText").textContent = S.phase >= 2 ? d.dark : d.normal;
    modal.classList.add("open");
  });
});
document.getElementById("photoClose").addEventListener("click",()=>modal.classList.remove("open"));
modal.addEventListener("click",e=>{ if(e.target === modal) modal.classList.remove("open"); });

document.querySelectorAll(".access-link,.access-nav").forEach(link=>{
  link.addEventListener("click", ()=>{
    S.count += 1;
    const unique = Object.keys(S.seen).length;
    if(S.phase >= 1 && unique >= 4 && S.count >= 7) setPhase(2);
    if(S.phase >= 2 && S.count >= 15) setPhase(3);
    save();
  });
});

document.getElementById("jobApplyBtn").addEventListener("click", ()=>{
  S.autoApplied = true;
  S.count += 1;
  save();
  document.getElementById("applyStatus").textContent = "応募済み";
  document.getElementById("recruitNews").textContent = "採用受付が完了しました";
  const btn = document.getElementById("jobApplyBtn");
  btn.textContent = "ご応募ありがとうございました";
  btn.disabled = true;
  btn.style.cursor = "default";
  openApplicationPopup("thanks");
  maybeShowCompletion();
});

document.getElementById("applicationClose").addEventListener("click", ()=>{
  document.getElementById("applicationModal").classList.remove("open");
  S.count += 1;
  save();
  maybeShowCompletion();
});

document.getElementById("completionReset").addEventListener("click", ()=>{
  localStorage.removeItem(KEY);
  localStorage.removeItem(WARNING_KEY);
  location.href = "index.html";
});

document.getElementById("applicationModal").addEventListener("click",e=>{
  if(e.target.id === "applicationModal") e.currentTarget.classList.remove("open");
});

document.getElementById("reset").addEventListener("click", ()=>{
  localStorage.removeItem(KEY);
  location.reload();
});

setPhase(S.phase);