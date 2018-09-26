// 子グループセレクターの初期化
function initializationChildGroupSelector() {
  // 登録済みの子グループをセレクターから削除
  let child_group_ids = $('#children-group-params-area').find('.children-group-id');
  child_group_ids.each(function(i, child_group_id){
    $('#child-group-selector option[value=' + child_group_id.value + ']').remove();
  });

  // メンバー追加セレクターが空だったら、追加ボタンを無効にする
  let child_group_option_num = $('#children-group-selector').children('option').length;
  if(child_group_option_num <= 0){
    $('#children-group-add-btn').addClass("disabled");
  }
}


// 子グループの表示要素を取得
function findChildGroupRowEle(group_id){
  let child_group_rows = $('#children-group-view-area').find('.child-group-row');
  let child_group_ele = "";

  child_group_rows.each(function(index, child_group){
    if(parseInt($(child_group).attr('data-group-id')) === group_id){
      child_group_ele = $(child_group);
      return false;
    }
  });

  return child_group_ele;
}

// memberパラメータ要素を取得
function findChildGroupParamsEle(group_id) {
  let children_group_params = $('#children-group-params-area').find('.child-group-params');
  let params = '';

  children_group_params.each(function(index, child){
    if(parseInt($(child).attr('data-group-id')) === group_id){
      params = $(child);
      return false;
    }
  });

  return params;
}

