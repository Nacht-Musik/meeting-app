module MeetingsHelper
  # commentをsort番号順に並び替える
  def sort_comments(comments)
    comments.sort do |a, b|
      a.sort_num <=> b.sort_num
    end
  end

  # コメントに親コメントを設定するメソッド
  def set_parent_comments(meeting)
    return if meeting.nil?
    return if meeting.topics.nil?

    meeting.topics.each do |topic|
      parent_comments = Array.new(5)
      topic.comments.each do |comment|
        # 親コメント（自分よりも１つインデント値が小さいコメント）を設定
        comment.parent = parent_comments[comment.indent - 1] if comment.indent != 1
        # 自分と同じインデント値の親コメントを自分に置換
        parent_comments[comment.indent] = comment

        # ---- 以下 デバック表示用 ---- #
        # p "自分：#{comment.name}"
        # p "親：#{comment.parent.name}" if comment.indent != 1
        #
        # p "### 親コメント確認 ###"
        # parent_comments.each_with_index do |parent, idx|
        #   if parent.nil?
        #     p "#{idx}: nil"
        #   else
        #     p "#{idx}: #{parent.name}"
        #   end
        # end
        # p "### 確認終了 ###"
        # ---- ここまで デバッグ表示用 ---- #

      end
    end
  end


  # 始祖コメントを集めるメソッド
  def set_founder_comments (topics)
    founder_comments = Array.new()

    topics.each do |topic|
      if topic.comments.present?
        topic.comments.each do |comment|
          founder_comments.push(comment) if comment.parent.blank?
        end
      end
    end
    return founder_comments
  end


  #####  nested_form用 ###################################
  # 追加ボタン
  def link_to_add_fields(name, f, association, btn_class="", options={})
    # association で渡されたシンボルから、対象のモデルを作る
    new_object = f.object.class.reflect_on_association(association).klass.new

    # Javascript 側で配列のインデックス値とする
    # 追加しまくると、インデックス値がかぶりまくるので、
    # 後に Javascript 側でこのインデックス値は現在時刻をミリ秒にした値で置き換えていく
    id = new_object.object_id

    # f はビューから渡されたフォームオブジェクト
    # fields_for で f の子要素を作る
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize + "_card", f: builder)
    end

    # ボタンの設置。classを指定してJavascriptと連動、fields を渡しておいて、
    # ボタン押下時にこの要素(fields)をJavascript側で増やすようにする
    link_to(name, '', class: "add_fields " + btn_class,
            data: {id: id, fields: fields.gsub("\n","")})
  end

  #削除ボタン
  def link_to_remove_field(name, f, btn_class="", options={})
    # _destroy の hiddenフィールドと削除ボタンを設置
    f.hidden_field(:_destroy) + link_to(name, '', class: "remove_field " + btn_class)
  end
end