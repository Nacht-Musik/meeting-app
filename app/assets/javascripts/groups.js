$(document).on('turbolinks:load', function() {
  // メンバー追加ボタン
  $('#group-page').on('click', '#member-add-btn', function () {
    console.log("メンバー追加ボタン押下");

    // 追加するユーザー情報取得
    let user_id = $('#member-selector option:selected').val();
    let authority = $('#authority-selector option:selected').val();
    let admin_flag = $('#admin-selector option:selected').val();

    // DB登録用のid/nameを生成
    let id_com = "group_group_members_attributes";
    let name_com = "group[group_members_attributes]";

    // 固有番号をランダム取得
    let model_num = new Date().getTime().toString(10);
    id_com += "_" + model_num;
    name_com += "[" + model_num.toString(10) + "]";


    // 追加ユーザーのGroupMember Model登録用データ作成
    let member_params_ele = $('#member-block-template').find('.member-params').clone();

    let user_id_ele = member_params_ele.find('.member-user-id');
    user_id_ele.val(user_id);
    user_id_ele.attr('id', id_com + "_user_id");
    user_id_ele.attr('name', name_com + "[user_id]");

    let authority_ele = member_params_ele.find('.member-authority-flag');
    authority_ele.val(authority);
    authority_ele.attr('id', id_com + "_authority_id");
    authority_ele.attr('name', name_com + "[authority_id]");

    let admin_flag_ele = member_params_ele.find('.member-admin-flag');
    admin_flag_ele.val(admin_flag);
    admin_flag_ele.attr('id', id_com + "_admin");
    admin_flag_ele.attr('name', name_com + "[admin]");

    member_params_ele.find('.member-destroy-flag').val('false');
    member_params_ele.find('.member-destroy-flag').attr('id', id_com + "__destroy");
    member_params_ele.find('.member-destroy-flag').attr('name', name_com + "[_destroy]");


    $('#member-params-area').append(member_params_ele);


    // 追加ユーザーの表示用データ取得
    let first_name = $('#member-selector option:selected').attr('data-first-name');
    let last_name = $('#member-selector option:selected').attr('data-last-name');
    let user_name = last_name + " " + first_name;
    let email = $('#member-selector option:selected').attr('data-email');
    let authority_text = $('#authority-selector option:selected').text();
    let admin_text = $('#admin-selector').attr('data-mark');


    // 追加メンバー表示データ展開
    let member_row_ele = $('#member-block-template').find('.member-row').clone();
    member_row_ele.find('.user-name').text(user_name);
    member_row_ele.find('.user-email').text(email);
    member_row_ele.find('.user-authority').text(authority_text);
    member_row_ele.find('.member-edit-btn').attr('data-user-id', user_id);
    member_row_ele.find('.member-del-btn').attr('data-user-id', user_id);

    if(admin_flag === "1"){
      member_row_ele.find('.user-admin').append(admin_text);
    }

    $('#member-list-area').append(member_row_ele);

    // 追加したユーザーをセレクターから削除

  })

  // メンバー削除ボタン
  $('#group-page').on('click', '.member-del-btn', function () {
    console.log("メンバー削除");
    /*
      0. 削除確認メッセージを表示
      1. 表示リストから対象ユーザーブロックを削除
      2. 対象ユーザーの_destroy flagを立てる
      3. member-add-selector に対象ユーザーを追加する
    */

    // 対象ユーザーのID番号を取得
    let user_id = $(this).attr('data-user-id');

    // 対象メンバーの削除フラグ(_destroy)をTrueにする
    let user_params_elems = $('#member-params-area').find('.member-params');
    user_params_elems.each(function(){
      if($(this).attr('data-user-id') == user_id){
        $(this).find('.member-destroy-flag').val('true');
      }
    });

    // 対象メンバーの表示部を削除
    let user_row_ele = $(this).closest('.member-row');
    user_row_ele.remove();

    // メンバー追加セレクターに削除したユーザーを追加する


  });

});


// メンバーセレクターの初期化
function initializationMemberSelector() {
  /*
    1. グループメンバーのuser_idを全て取得する
    2. memberselector 内のoption.val()とmember.user_idが一致したoptionを削除する
   */

}

