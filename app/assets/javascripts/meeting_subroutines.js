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

// 指定コメント要素の子孫コメントの要素を全て取得
function findProgenyComments(cmt_block_ele) {
  var progency_comments = [];

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
