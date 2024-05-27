'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//ブラウザのbodyタグ内の幅を取得
const winWidth = window.parent.innerWidth;
const winHeight = window.parent.innerHeight

//main-containerのサイズを定義
const mainContainer = document.getElementById("main-container");
const mainBord = document.getElementById("mainBord");
mainContainer.style.width = `${winWidth}px`;
mainContainer.style.height = winHeight;
document.getElementById("childContainer").style.width = `${winWidth - 300}px`;

//1枚目のカードのオブジェクトを取得
const firstCard = document.getElementsByClassName("card")[0];
const firstCardTitle = document.getElementsByClassName("card_title")[0];
const firstCardTitleEdit = document.getElementsByClassName("card_titleInput")[0];
const firstAddDetailsBox = document.getElementsByClassName("addDetailsBox")[0];
const firstCard_detailContainer = document.getElementsByClassName("card_detailContainer")[0];
const firstCardDetailsBox = document.getElementsByClassName("card_detailsBox")[0];
const firstCardDetails = document.getElementsByClassName("card_details")[0];
const firstEditDetails = document.getElementsByClassName("edit_detail")[0];


//カード内のタイトルを編集するイベントリスナー
const editTitleVisible = (cardTitleElm, editTitleElm) => {
    cardTitleElm.addEventListener("click",
        () => {
            editTitleElm.style.visibility = "visible";
            cardTitleElm.style.visibility = "hidden";
        }
    )
}

//カード内のタイトル編集をオフにするイベントリスナー
const editTitleVisibleOff = (cardTitleElm, editTitleElm) => {
    editTitleElm.addEventListener("keydown",
        (e) => {
            if (e.key === "Enter") {
                cardTitleElm.innerText = editTitleElm.value;
                editTitleElm.style.visibility = "hidden";
                cardTitleElm.style.visibility = "visible";
            }
        }
    )
}

//カード内の詳細を編集するイベントリスナー
const editDetailOn = (detailElm, editDetailElm) => {
    detailElm.addEventListener("click",
        () => {
            editDetailElm.style.visibility = "visible";
            detailElm.style.visibility = "hidden";
        }
    )
}

//カード内の詳細編集をオフにするイベントリスナー
const editDetailOff = (detailElm, editDetailElm) => {
    editDetailElm.addEventListener("keydown",
        (e) => {
            if (e.key === "Enter") {
                detailElm.innerText = editDetailElm.value;
                editDetailElm.style.visibility = "hidden";
                detailElm.style.visibility = "visible";
            }
        }
    )
}


//要素を作成しクラス名をつける関数
const createElement = (element, className) => {
    const paragraph = document.createElement(element);
    paragraph.className = className;
    return paragraph
}

//カード内の要素を作成するイベントリスナー
const addDetail = (addDetailsBox, card_detailContainer, card,cardHeight) => {
    let clickCounter = 0;
    addDetailsBox.addEventListener("click",
        () => {
            clickCounter = clickCounter + 1;
            const NewCard_detailsBox = createElement("div", "card_detailsBox");
            const NewCard_Details = createElement("h4", "card_details");
            const NewCard_EditDetail = createElement("input", "edit_detail");
            card_detailContainer.appendChild(NewCard_detailsBox);
            NewCard_detailsBox.appendChild(NewCard_Details);
            NewCard_detailsBox.appendChild(NewCard_EditDetail);
            card_detailContainer.appendChild(addDetailsBox);
            card.style.height = `${cardHeight + (70 * clickCounter)}px`;
            editDetailOn(NewCard_Details, NewCard_EditDetail);
            editDetailOff(NewCard_Details, NewCard_EditDetail);
        }
    )

}


//1枚目のカード内のオブジェクトにイベントリスナーを追加
editTitleVisible(firstCardTitle, firstCardTitleEdit);
editTitleVisibleOff(firstCardTitle, firstCardTitleEdit);
addDetail(firstAddDetailsBox, firstCard_detailContainer, firstCard,150);
editDetailOn(firstCardDetails, firstEditDetails);
editDetailOff(firstCardDetails, firstEditDetails);

//カードを配置するchildContainerの要素を取得
const childContainer = document.getElementById("childContainer");
const addCardBtn = document.getElementById("card_add");


//カードを生成する関数
const addCard = (memo,title) => {
    //カードの外枠とタイトル、中枠を作成
    const card = createElement("div", "card");
    const card_title = createElement("h2", "card_title");
    const card_titleInput = createElement("input", "card_titleInput");
    card_titleInput.value = "input_title";
    const card_detailContainer = createElement("div", "card_detailContainer");
    //DBのタイトルが引数にあればタイトルに表示
    if(typeof(title) === "string"){
        card_title.innerText = `${title}`;
        card_titleInput.value =  `${title}`;
    }else {card_title.innerText = "Title"}
    //作成したタイトルにイベントリスナを設定
    editTitleVisible(card_title, card_titleInput);
    editTitleVisibleOff(card_title, card_titleInput);
    //作成した外枠とタイトル中枠を追加    
    childContainer.appendChild(card);
    card.appendChild(card_title);
    card.appendChild(card_titleInput);
    card.appendChild(card_detailContainer);
    //カードの高さを初期化
    let cardHeight =0;
    if (typeof (memo.length) === "number") {
        for (let i = 0; i <= memo.length-1; i++) {
            //子要素を作成
            const card_detailsBox = createElement("div", "card_detailsBox");
            const card_Details = createElement("h4", "card_details");
            const edit_detail = createElement("input", "edit_detail");
            //DBのmemoの要素を表示
            card_Details.innerText = `${memo[i]}`;
            edit_detail.value = `${memo[i]}`;
            //子要素にイベントリスナを設定    
            editDetailOn(card_Details, edit_detail);
            editDetailOff(card_Details, edit_detail);
            //子要素を中枠に追加
            card_detailContainer.appendChild(card_detailsBox);
            card_detailsBox.appendChild(card_Details);
            card_detailsBox.appendChild(edit_detail);
            cardHeight = (i*70);
        }
    } else {
        //子要素を作成
        const card_detailsBox = createElement("div", "card_detailsBox");
        const card_Details = createElement("h4", "card_details");
        const edit_detail = createElement("input", "edit_detail");
        //子要素にイベントリスナを設定    
        editDetailOn(card_Details, edit_detail);
        editDetailOff(card_Details, edit_detail);
        //子要素を中枠に追加
        card_detailContainer.appendChild(card_detailsBox);
        card_detailsBox.appendChild(card_Details);
        card_detailsBox.appendChild(edit_detail);
       
    }
    cardHeight = 150+cardHeight;
    card.style.height = `${cardHeight}px`;
    //子要素の追加ボタンを作成
    const addDetailsBox = createElement("div", "addDetailsBox");
    const addDetails = createElement("h4", "addDetails");
    //追加ボタンのイベントリスナを設定
    addDetail(addDetailsBox, card_detailContainer, card,cardHeight);
    addDetails.innerText = "+カードの追加";
    //追加ボタンを中枠最後に追加    
    card_detailContainer.appendChild(addDetailsBox);
    addDetailsBox.appendChild(addDetails);
    //カードの追加ボタンを最後へ移動
    childContainer.appendChild(addCardBtn);
}


//カードの追加を押すと要素を生成    
addCardBtn.addEventListener("click", addCard);

//データベース読み込み
const DBswitch = document.getElementsByClassName("DB")[0];
DBswitch.addEventListener("click",
    () => {
        for (let i = 0; i <= DB.length - 1; i++) {
            addCard(DB[i].memo,DB[i].title);
        }
        firstCard.style.visibility = "hidden";
        firstCard.style.width = `${0}px`;
        document.getElementById("menu-list").style.visibility = "visible";
    }
   
)




//データベース
const DB =
    [
        {
            title: "自己紹介",
            memo: ["名前 山口智也", "出身地 愛知県豊田市", "住所 名古屋市昭和区",
                "家族 妻と保護猫2引", "職場 上郷エンジン鋳造部"]
        },
        {
            title: "仕事内容",
            memo: ["現場向けのDXツール制作", "DX関連の困りごと対応、改善"]
        },
        {
            title:"なぜDIGを受講したのか",
            memo: ["PowerPlatformだけで出来ることに限りがあるから",
                "現場で使うデジタルアイテムは現場で作りたい",
                "スキルを身に着けて出来ることを増やしたい"
            ]
        },
        {
            title:"受講してよかったこと",
            memo:["一からWebコンテンツを作れるようになった",
               "プログラミング言語習得の敷居が下がった",
               "工場外、社外で横の繋がりが出来た"   
            ]
        },
        {
            title:"苦戦したこと",
            memo:["教育と業務の両立"]
        },
        {
            title:"今後挑戦したいこと",
            memo:["DBや外部とのデータの連携",
            "3Dモデルを扱えるライブラリ(Three.jsや)pytonの物体検知のライブラリなど組み込んだアプリを作りたい",
            ]
        }
    ]
