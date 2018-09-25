// サブプロジェクトテーブルの表示初期化
function initializationSubProjectView() {
  let sub_projects_num = $('#children-project-view-area').find('.child-project-row').length;

  if( sub_projects_num > 0 ){
    $('#children-project-table').removeClass('d-none');
    $('#sub-project-none-msg').addClass('d-none');
  } else {
    $('#sub-project-none-msg').removeClass('d-none');
    $('#children-project-table').addClass('d-none');
  }
}

// 子プロジェクトセレクターの初期化
function initializationChildProjectSelector() {
  // 登録済みの子プロジェクトをセレクターから削除
  let child_project_ids = $('#children-project-params-area').find('.children-project-id');
  child_project_ids.each(function(i, child_project_id){
    $('#child-project-selector option[value=' + child_project_id.value + ']').remove();
  });

  // サブプロジェクトセレクターが空だったら、子プロジェクト追加機能を無効化
  let child_project_option_num = $('#child-project-selector').children('option').length;
  if(child_project_option_num <= 0){
    disabeleChildProjectAddFunction();
  } else {
    enableChildProjectAddFunction();
  }
}

// 親プロジェクト選択フォームの初期化
function initializationParentProjectForm(){
  let option_num = $('#parent-project').find('.parent-project-selector').children('option').length
  console.log({num: option_num});
  if (option_num > 1) {
    $('#parent-project').removeClass('d-none');
  } else {
    $('#parent-project').addClass('d-none');
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


// サブプロジェクト追加機能を無効化
function disabeleChildProjectAddFunction(){
  $('#child-project-add-modal').find('.add-sub-project-info').addClass('d-none');
  $('#child-project-add-btn').addClass('d-none');
  $('#child-project-add-modal').find('.empty-message').removeClass('d-none');
}

// サブプロジェクト追加機能を有効化
function enableChildProjectAddFunction(){
  $('#child-project-add-modal').find('.add-sub-project-info').removeClass('d-none');
  $('#child-project-add-btn').removeClass('d-none');
  $('#child-project-add-modal').find('.empty-message').addClass('d-none');
}

