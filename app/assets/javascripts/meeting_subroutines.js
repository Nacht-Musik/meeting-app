// コメントの右移動可否を確認
function isCommentMoveRight(cmt_block_ele) {
  /* 移動可能条件
   1. インデント値が上限値である
   2. トップのコメントである（ひとつ上のコメントがない）
   3. ひとつ上のコメントよりも2つ以上下げられない
  */
  var indent_val = getIndentVal(cmt_block_ele);
  var prev_indent_val = parseInt(cmt_block_ele.prev('ul').find('.cmt-indent-num').val(), 10);
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
  var actual_val = parseInt(cmt_block_ele.find('.cmt-indent-num').val(), 10);

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
  var actual_val = parseInt(cmt_block_ele.find('.cmt-indent-num').val(), 10);

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
  if(!isHasChildComment(cmt_block_ele)){
    return NaN;
  } else {
    next_cmt_block_ele = cmt_block_ele.next('ul');
    progency_comments.push(next_cmt_block_ele);
  }
  // 子孫コメントがなくなるまでループ
  while(true){
    next_cmt_block_ele = next_cmt_block_ele.next('ul');
    next_cmt_indent_val = getIndentVal(next_cmt_block_ele);
    if(isNaN(next_cmt_indent_val) || actual_indent_val >= next_cmt_indent_val){
      break;
    }
    progency_comments.push(next_cmt_block_ele);
  }
  return progency_comments;
}

// 子コメントを持っているか否かを判定
function isHasChildComment(cmt_block_ele) {
  var actual_indent_val = getIndentVal(cmt_block_ele);
  var next_cmt_indent_val = getIndentVal(cmt_block_ele.next('ul'));
  // console.log("indent:" + actual_indent_val + ", next_indent:" + next_cmt_indent_val);

  if (isNaN(next_cmt_indent_val) || actual_indent_val >= next_cmt_indent_val) {
    return false;
  }
  return true;
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
  var indent_val_ele = cmt_block_ele.find('.cmt-indent-num');
  return parseInt(indent_val_ele.val(), 10);
}

// インデント値を一つ増やす
function incrementIndentVal(cmt_block_ele) {
  var actual_val = parseInt(cmt_block_ele.find('.cmt-indent-num').val(), 10);
  cmt_block_ele.find('.cmt-indent-num').val(actual_val + 1);
}

// インデント値を一つ下げる
function decrementIndentVal(cmt_block_ele) {
  var actual_val = parseInt(cmt_block_ele.find('.cmt-indent-num').val(), 10);
  cmt_block_ele.find('.cmt-indent-num').val(actual_val - 1);
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

// 親コメントを探すメソッド
function findParentCommentID(cmt_block_ele){
  var indent_val = getIndentVal(cmt_block_ele);
  var prev_cmt_block_ele = cmt_block_ele.find('ul');
  var prev_indent_val = getIndentVal(prev_cmt_block_ele);


  if (indent_val === 1 || isNaN(prev_indent_val)){
    return nil;
  }

  while(true){
    if(isNaN(prev_indent_val)) {
      return nil;
    }
    if (prev_indent_val < indent_val){
      console.log('親コメント発見！')
      // return  親コメントのIDにあたる情報....(どうやって設定する？)
    }
    // もう一個上のコメントを取得
    prev_cmt_block_ele = prev_cmt_block_ele.find('ul');
    prev_indent_val = getIndentVal(prev_cmt_block_ele);
  }
}

