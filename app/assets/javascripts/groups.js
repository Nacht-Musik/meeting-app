$(document).on('turbolinks:load', function() {
  // メンバー追加ボタン
  $('#group-page').on('click', '#member-add-btn', function () {
    // セレクターで選択されているユーザー名を取得
    let selected_user_name = $('#member-selector option:selected').text();

    // 選択ユーザー名が空の場合、追加処理を実行しない
    if(selected_user_name === ""){
      return;
    }

    // 追加するユーザー情報取得
    let user_id = $('#member-selector option:selected').val();
    let authority = $('#authority-selector option:selected').val();
    let admin_flag = $('#admin-selector option:selected').val();

    // DB登録用のid/nameを生成
    let id_com = "group_group_members_attributes";
    let name_com = "group[group_members_attributes]";

    // 固有番号を時間関数から取得 ※被らない値ならOK！
    let entry_num = new Date().getTime().toString(10);
    id_com += "_" + entry_num;
    name_com += "[" + entry_num.toString(10) + "]";


    // 追加ユーザーのGroupMember Model登録用データ作成
    let member_params_ele = $('#member-block-template').find('.member-params').clone();
    member_params_ele.attr("data-user-id", user_id);

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
    let admin_mark = $('#admin-selector option:selected').attr('data-mark');

    // 追加メンバー表示データ展開
    let member_row_ele = $('#member-block-template').find('.member-row').clone();
    member_row_ele.attr('data-user-id', user_id);
    member_row_ele.find('.user-name').text(user_name);
    member_row_ele.find('.user-name').attr('data-last-name', last_name);
    member_row_ele.find('.user-name').attr('data-first-name', first_name);
    member_row_ele.find('.user-email').text(email);
    member_row_ele.find('.user-authority').text(authority_text);
    member_row_ele.find('.call-member-edit-modal').attr('data-user-id', user_id);
    member_row_ele.find('.call-member-del-modal').attr('data-user-id', user_id);

    member_row_ele.find('.user-admin').append(admin_mark);
    member_row_ele.find('.user-admin').attr('data-admin-flag', admin_flag);


    $('#member-list-area').append(member_row_ele);

    // 追加したユーザーをセレクターから削除
    $('#member-selector option:selected').remove();

    // セレクターの中身が空になったら、追加ボタンを無効にする
    let option_num = $('#member-selector').children('option').length;
    if(option_num <= 0){
      $(this).addClass("disabled");
    }
  });
});

// メンバー削除関連
$(document).on('turbolinks:load', function() {
  // メンバー削除 実行ボタン
  $('#group-page').on('click', '#member-del-btn', function () {
    // 削除対象メンバーのユーザーid取得
    let user_id = parseInt($(this).attr('data-user-id'));

    // 削除メンバーのユーザー情報を取得
    let user_info = getMemberUserInfo(user_id);
    let user_name = user_info.last_name + " " + user_info.first_name;

    // メンバー追加セレクターに削除したユーザーを追加する
    let add_option_attr = {value: user_id, text: user_name + "（" + user_info.email + "）",
                            'data-last-name': user_info.last_name,
                            'data-first-name': user_info.first_name,
                            'data-email': user_info.email};
    let add_option = $('<option>', add_option_attr);
    $('#member-selector').append(add_option);

    // 対象メンバーの削除フラグ(_destroy)をTrueにする
    let user_params_ele = findMemberParamsEle(user_id);
    user_params_ele.find('.member-destroy-flag').val('true');

    // 対象メンバーの表示部を削除
    let user_row_ele = findMemberRowEle(user_id);
    user_row_ele.remove();

    // メンバー追加ボタンが無効になっていたら有効にする。
    if ($('#member-add-btn').hasClass('disabled')) {
      $('#member-add-btn').removeClass("disabled");
    }
  });

  // メンバー削除画面呼び出し
  $('#group-page').on('click', '.call-member-del-modal', function () {
    // 削除対象メンバーのuser-id を取得
    let user_id = parseInt($(this).attr('data-user-id'));

    // 削除対象メンバーのuser-id を削除ボタンに埋め込む
    $('#member-del-btn').attr('data-user-id', user_id);

    // 対象ユーザーの表示部要素を取得
    let user_row_ele = findMemberRowEle(user_id);

    // ユーザー名をセット
    let user_name = user_row_ele.find('.user-name').text();
    $('#member-del-modal-user-name').text(user_name);

    // ユーザー権限をセット
    let authority = user_row_ele.find('.user-authority').text();
    $('#member-del-modal-authority').text(authority);

    // グループ管理者(true or false)の表示をセット
    let admin_view = user_row_ele.find('.user-admin').children().clone();
    $('#member-del-modal-admin').empty();
    $('#member-del-modal-admin').append(admin_view);
  });
});

// メンバー編集機能
$(document).on('turbolinks:load', function() {
  // メンバー編集 実行ボタン
  $('#group-page').on('click', '#member-edit-btn', function () {
    // user-idを取得
    let user_id = parseInt($(this).attr('data-user-id'));

    /////////////////////////
    // Model保存用のユーザデータを修正
    let authority_val = $('#member-edit-modal').find('.authority-selector option:selected').val();
    let admin_val = $('#member-edit-modal').find('.admin-selector option:selected').val();

    // 対象メンバーのuser-paramsを変更
    let member_params = findMemberParamsEle(user_id);
    member_params.find('.member-authority-flag').val(authority_val);
    member_params.find('.member-admin-flag').val(admin_val);

    ///////////////////////
    // 表示関係
    let authority_text = $('#member-edit-modal').find('.authority-selector option:selected').text();
    let admin_mark = $('#member-edit-modal').find('.admin-selector option:selected').attr('data-mark');

    // 対象メンバーの表示部を変更
    let member_row_ele = findMemberRowEle(user_id);
    member_row_ele.find('.user-authority').text(authority_text);

    member_row_ele.find('.user-admin').empty();
    member_row_ele.find('.user-admin').append(admin_mark);
    member_row_ele.find('.user-admin').attr('data-admin-flag', admin_val);
  });

  // メンバー編集モーダル呼び出し
  $('#group-page').on('click', '.call-member-edit-modal', function () {
    // 編集対象メンバーのuser-id を取得
    let user_id = parseInt($(this).attr('data-user-id'));

    // 編集対象メンバーのuser-id を編集ボタンに埋め込む
    $('#member-edit-btn').attr('data-user-id', user_id);

    // 対象メンバーのユーザー情報を取得
    let user_info = getMemberUserInfo(user_id);

    // // ユーザー名をモーダル表示部にセット
    let user_name = user_info.last_name + " "
                    + user_info.first_name
                    + "（" + user_info.email + "）";
    $('#member-edit-modal-user-name').text(user_name);


    // ユーザー権限の状態をセレクターにセット
    let authority_selector = $('#member-edit-modal').find('.authority-selector');
    let authority_options = authority_selector.children();
    authority_options.each(function(index, option){
      if($.trim($(option).text()) === user_info.authority){
        authority_selector.val($(option).val());
      }
    });

    // グループ管理者の状態をセレクターにセット
    let admin_selector = $('#member-edit-modal').find('.admin-selector');
    admin_selector.val(user_info.admin_flag);
  });
});

// 子グループ追加機能
$(document).on('turbolinks:load', function() {
  // 子グループ追加 実行ボタン
  $('#group-page').on('click', '#child-group-add-btn', function () {
    //////////////////////////////////////////
    // 有効性判定

    let child_id = $('#child-group-selector option:selected').val();
    // セレクター選択値が空の場合終了
    if(child_id === ""){
      return;
    }


    ////////////////////////////////////////
    // 下準備
    let group_id = $(this).attr('data-group-id');


    // DB登録用のid/nameを生成
    let id_com = "group_children_attributes";
    let name_com = "group[children_attributes]";

    // 固有番号を時間関数から取得 ※ 被らない値ならOK！
    let entry_num = new Date().getTime().toString(10);
    id_com += "_" + entry_num;
    name_com += "[" + parseInt(entry_num) + "]";

    // Group Model登録用のデータを作成 -> View内の所定箇所に追加
    let child_group_params = $('#child-group-template').find('.child-group-params').clone();
    child_group_params.attr('data-group-id', child_id);

    let child_group_id_ele = child_group_params.find('.child-group-id');
    child_group_id_ele.val(child_id);
    child_group_id_ele.attr('id', id_com + "_id");
    child_group_id_ele.attr('name', name_com + "[id]");

    let parent_id_ele = child_group_params.find('.parent-group-id');
    parent_id_ele.val(group_id);
    parent_id_ele.attr('id', id_com + "_parent_id");
    parent_id_ele.attr('name', name_com + "[parent_id]");


    $('#children-group-params-area').append(child_group_params);


    // 子グループの表示要素を作成 -> View内の所定箇所に追加
    let child_group_name = $('#child-group-selector option:selected').text();
    let child_group_row_ele = $('#child-group-template').find('.child-group-row').clone();

    child_group_row_ele.find('.group-name').text(child_group_name);
    child_group_row_ele.find('.call-child-group-cancel-modal').attr('data-group-id', child_id);

    $('#children-group-view-area').append(child_group_row_ele);


    // 子グループ候補セレクターから要素を削除
    $('#child-group-selector option:selected').remove();

    // セレクターの中身が空になったら、追加ボタンを無効にする
    let option_num = $('#child-group-selector').children('option').length;
    if(option_num <= 0){
      $(this).addClass("disabled");
    }

  });
});
