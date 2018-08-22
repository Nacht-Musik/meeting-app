// コメントの右移動可否を確認
function isCommentMoveRight(cmt_block_ele) {
  /* 移動不可能条件
   1. インデント値が上限値である
   2. トップのコメントである（ひとつ上のコメントがない）
   3. ひとつ上のコメントよりも2つ以上下げられない
  */
  var indent_val = getIndentVal(cmt_block_ele);
  var prev_cmt_block_ele = findPrevCmtBlockEle(cmt_block_ele);
  var prev_indent_val = getIndentVal(prev_cmt_block_ele);
  var diff_val = indent_val - prev_indent_val;

  if (indent_val >= MAX_INDENT || isNaN(prev_indent_val) || diff_val > 0) {
    return false;
  }
  return true;
}

// コメントの左移動可否を確認
function isCommentMoveLeft(cmt_block_ele) {
  var indent_val = getIndentVal(cmt_block_ele);

  /* 条件
   1. インデント値が下限値(最左)である
  */
  if (indent_val <= MIN_INDENT) {
    return false;
  }
  return true;
}

// 指定コメントを右に移動させる
function commentMoveRight(cmt_block_ele) {
  // 1. 現在のインデント値を取得
  var actual_val = parseInt(cmt_block_ele.find('.cmt-form-indent').val(), 10);

  // 2.View(見かけ)のインデントを変更
  var indent_area = cmt_block_ele.find('.indent-area');
  indent_area.removeClass("indent-" + actual_val.toString(10));
  indent_area.addClass("indent-" + (actual_val + 1).toString(10));

  // 3. 指定コメントのインデント値を一つ上げる
  incrementIndentVal(cmt_block_ele);
}

// 指定コメントを左に移動させる
function commentMoveLeft(cmt_block_ele) {
  // 1. 現在のインデント値を取得
  var actual_val = parseInt(cmt_block_ele.find('.cmt-form-indent').val(), 10);

  // 2.View(見かけ)のインデントを変更
  var indent_area = cmt_block_ele.find('.indent-area');
  indent_area.removeClass("indent-" + actual_val.toString(10));
  indent_area.addClass("indent-" + (actual_val - 1).toString(10));

  // 3. 指定コメントのインデント値を一つ下げる
  decrementIndentVal(cmt_block_ele);
}

// 指定コメント要素の子孫コメント要素を全て取得
function findProgenyComments(cmt_block_ele) {
  var progency_comments = [];
  var actual_indent_val = getIndentVal(cmt_block_ele);
  var next_cmt_block_ele;
  var next_cmt_indent_val;

  // 子コメントを1つ以上持っているかを確認。１つもなかったらNaNを返す.
  if(!hasChildComment(cmt_block_ele)){
    return NaN;
  } else {
    // next_cmt_block_ele = cmt_block_ele.next('ul');
    next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
    progency_comments.push(next_cmt_block_ele);
  }
  // 子孫コメントがなくなるまでループ
  while(true){
    // next_cmt_block_ele = next_cmt_block_ele.next('ul');
    next_cmt_block_ele = findNextCmtBlockEle(next_cmt_block_ele);
    next_cmt_indent_val = getIndentVal(next_cmt_block_ele);
    if(isNaN(next_cmt_indent_val) || actual_indent_val >= next_cmt_indent_val){
      break;
    }
    progency_comments.push(next_cmt_block_ele);
  }
  return progency_comments;
}

// 子コメントを持っているか否かを判定
function hasChildComment(cmt_block_ele) {
  var actual_indent_val = getIndentVal(cmt_block_ele);
  var next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
  var next_cmt_indent_val = getIndentVal(next_cmt_block_ele);

  if (isNaN(next_cmt_indent_val) || actual_indent_val >= next_cmt_indent_val) {
    return false;
  }
  return true;
}

// 直前のコメントブロック要素を取得
function findPrevCmtBlockEle(cmt_block_ele) {
  var prev_cmt_block_ele = cmt_block_ele.prev();

  // 前の要素がある限り探し続ける
  while(prev_cmt_block_ele.length == 1) {
    if(prev_cmt_block_ele.hasClass('cmt-block')){
      break;
    }

    prev_cmt_block_ele = prev_cmt_block_ele.prev();
  }
  return prev_cmt_block_ele;
}

// 直後のコメントブロック要素を取得
function findNextCmtBlockEle(cmt_block_ele) {
  var next_cmt_block_ele = cmt_block_ele.next();

  // 次の要素がある限り探し続ける
  while(next_cmt_block_ele.length == 1) {
    if(next_cmt_block_ele.hasClass('cmt-block')){
      break;
    }

    next_cmt_block_ele = next_cmt_block_ele.next();
  }
  return next_cmt_block_ele;
}

// コメント左移動ボタン要素を取得
function findCmtLeftMoveBtnEle(cmt_block_ele) {
  return cmt_block_ele.find('.cmt-indent-left-btn');
}

// コメント右移動ボタン要素を取得
function findCmtRightMoveBtnEle(cmt_block_ele) {
  return cmt_block_ele.find('.cmt-indent-right-btn');
}

// コメントのインデント値を取得
function getIndentVal(cmt_block_ele) {
  var indent_val_ele = cmt_block_ele.find('.cmt-form-indent');
  return parseInt(indent_val_ele.val(), 10);
}

// インデント値を一つ増やす
function incrementIndentVal(cmt_block_ele) {
  var actual_val = parseInt(cmt_block_ele.find('.cmt-form-indent').val(), 10);
  cmt_block_ele.find('.cmt-form-indent').val(actual_val + 1);
}

// インデント値を一つ下げる
function decrementIndentVal(cmt_block_ele) {
  var actual_val = parseInt(cmt_block_ele.find('.cmt-form-indent').val(), 10);
  cmt_block_ele.find('.cmt-form-indent').val(actual_val - 1);
}

// 全てのコメント移動ボタンの状態を適切な状態に変更
function changeStateAllCommentMoveBtn(){
  // Topicカードの要素を全て取得
  var topic_cards = findTopicCards();
  // 全てのコメントブロックを取得
  var comments = new Array(topic_cards.length);
  $.each(topic_cards, function(i) {
    comments[i] = findCommentBlocks($(this));
  });

  $.each(comments, function(){
    $.each($(this), function(){
      changeStateOfMoveLeftBtn($(this));
      changeStateOfMoveRightBtn($(this));
    });
  });
}

// 右移動ボタンの状態変更
function changeStateOfMoveRightBtn(cmt_block_ele){
  var right_btn_ele = findCmtRightMoveBtnEle(cmt_block_ele);

  if (!isCommentMoveRight(cmt_block_ele)) {
    right_btn_ele.addClass("disabled");
  } else {
    right_btn_ele.removeClass("disabled");
  }
}

// 左移動ボタンの状態変更
function changeStateOfMoveLeftBtn(cmt_block_ele) {
  var left_btn_ele = findCmtLeftMoveBtnEle(cmt_block_ele);

  if (!isCommentMoveLeft(cmt_block_ele)) {
    left_btn_ele.addClass("disabled");
  } else {
    left_btn_ele.removeClass("disabled");
  }
}

// トピックカードを全て取得
function findTopicCards() {
  return $('#topic-area').find('.topic-card');
}

// コメントブロックを全て取得
function findCommentBlocks(topic_card_ele) {
  return topic_card_ele.find('.cmt-block');
}

// 全てのTopicにソート番号を設定
function setSortNumForTopics() {
  let topic_cards = findTopicCards();

  $.each(topic_cards, function(i){
    $(this).find('.topic-sort-num').val(i);
  });
}

// 指定Topic内の全てのCommentにソート番号を設定
function setSortNumForComments(topic_card_ele) {
  let cmt_blocks = findCommentBlocks(topic_card_ele);
  $.each(cmt_blocks, function(i){
    $(this).find('.cmt-form-sort-num').val(i);
  });
}

///////////////////////////////////////////////////////////////////////////////
//// 子コメント追加ボタン関連

// 子コメントのID/Nameを設定する
function makeChildCmtEle(cmt_block_ele){
  // コメントブロックのコピーを作成
  var child_cmt_ele = cmt_block_ele.clone();

  var id_components = getChildCmtIdComponents(cmt_block_ele);
  var child_id_com = makeChildCmtId(id_components);
  var child_name_com = makeChildCmtName(id_components);
  var cmt_items = findCmtFormItemNames(cmt_block_ele);


  $.each(cmt_items, function(i, item_name){
    let child_id = child_id_com + "_" + item_name;
    let child_name = child_name_com + "[" + item_name + "]";

    child_cmt_ele.find("[id$=" + item_name + "]").attr('id', child_id);
    child_cmt_ele.find("[id$=" + item_name + "]").attr('name', child_name);

    // コメント内容をクリアする
    if(item_name === "name"){
      child_cmt_ele.find("[id$=" + item_name + "]").val('');
    }

    // indentをひとつ変更
    if(item_name === "indent"){
      let current_val = Number(child_cmt_ele.find("[id$=" + item_name + "]").attr('value'));
      if(current_val < MAX_INDENT){
        commentMoveRight(child_cmt_ele);
      }
    }
  });

  return child_cmt_ele
}

// 対象コメントのIDを取得
function getChildCmtIdComponents(cmt_block_ele){
  var ele = cmt_block_ele.find("[class^=cmt-form]");
  var name = ele.attr('name');
  name = name.replace(/]/g, "")

  var components = name.split('[');
  // 最後の要素は項目名なので不要
  components.pop();

  // 新規Commentの識別子を設定
  var time = new Date().getTime();
  components[components.length - 1] = time.toString(10);

  return components;
}

// コメントForm用のidを作成
function makeChildCmtId(id_components){
  var child_id = "";

  for(let i = 0; i < id_components.length; i++){
    if( i !== id_components.length - 1){
      child_id += id_components[i] + "_";
    }else{
      child_id += id_components[i];
    }
  }
  return child_id;
}

// コメントForm用のnameを作成
function makeChildCmtName(id_components){
  var name = "";
  for(let i = 0; i < id_components.length; i++){
    if( i === 0){
      name += id_components[i];
    }else{
      name += "[" + id_components[i] + "]";
    }
  }
  return name;
}

// コメントフォーム内のItem名を全て取得
function findCmtFormItemNames(cmt_block_ele){
  var cmt_forms = cmt_block_ele.find("[class^=cmt-form]");
  var item_names = [];

  cmt_forms.each(function(i, ele){
    let name = getCmtFormItemName(ele);
    item_names.push(name);
  });

  return item_names;
}

// 指定フォームのItem名を取得
function getCmtFormItemName(item_ele){
  var ele_name = item_ele.name;

  ele_name = ele_name.replace(/]/g, "");
  var name_components = ele_name.split('[');

  //取得したname値の最後の要素のみを返す
  return name_components.pop();
}