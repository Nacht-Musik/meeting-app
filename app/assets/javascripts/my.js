$(document).on('turbolinks:load', function() {
  $('#my-meeting-page').find(".meetings-table").DataTable({
    //状態保持
    // stateSave: true,

    // 標準ソート
    order: [ [ 3, "desc" ] ],

    // 縦方向（X軸）にスクロールを表示
    scrollX: false,
    info: false,
    language: datatables_japanese,
  });
});

// DataTables のキャッシュクリア（戻るボタンでselect2要素が複製される問題の対策）
$(document).on('turbolinks:before-cache', function() {
  $(".meetings-table").DataTable().destroy();
});
