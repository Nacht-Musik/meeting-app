// 子プロジェクトセレクターの初期化
function initializationChildProjectSelector() {
  // 登録済みの子プロジェクトをセレクターから削除
  let child_project_ids = $('#children-project-params-area').find('.children-project-id');
  child_project_ids.each(function(i, child_project_id){
    $('#child-project-selector option[value=' + child_project_id.value + ']').remove();
  });

  // メンバー追加セレクターが空だったら、追加ボタンを無効にする
  let child_project_option_num = $('#children-project-selector').children('option').length;
  if(child_project_option_num <= 0){
    $('#children-project-add-btn').addClass("disabled");
  }
}

// 子プロジェクトの表示要素を取得
function findChildProjectRowEle(project_id){
  let child_project_rows = $('#children-project-view-area').find('.child-project-row');
  let child_project_ele = "";

  child_project_rows.each(function(index, child_project){
    if(parseInt($(child_project).attr('data-project-id')) === project_id){
      child_project_ele = $(child_project);
      return false;
    }
  });

  return child_project_ele;
}

// memberパラメータ要素を取得
function findChildProjectParamsEle(project_id) {
  let children_project_params = $('#children-project-params-area').find('.child-project-params');
  let params = '';

  children_project_params.each(function(index, child){
    if(parseInt($(child).attr('data-project-id')) === project_id){
      params = $(child);
      return false;
    }
  });

  return params;
}
