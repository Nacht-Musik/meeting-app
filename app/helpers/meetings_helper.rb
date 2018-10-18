module MeetingsHelper
  include ApplicationHelper
  include ProjectsHelper
  include GroupsHelper

  ###########################################
  # 状況に合わせた会議参加ユーザー(users)を設定
  def set_optimal_users(type_id, group_id, project_id, scope_id)
    if type_id == PROJECT_MEETING_TYPE_ID
      if scope_id == PROGENY_PROJECT_ID
        users = progeny_project_users(project_id)
      elsif scope_id == RELATION_PROJECT_ID
        users = relation_project_users(project_id)
      else
        users = project_users(project_id)
      end
    elsif type_id == GROUP_MEETING_TYPE_ID
      if scope_id == PROGENY_GROUP_ID
        users = progeny_group_users(group_id)
      elsif scope_id == RELATION_GROUP_ID
        users = relation_group_users(group_id)
      else
        users = group_users(group_id)
      end
    else
      # Free Meeting users
      users = User.all
    end
    return users
  end

  # 指定グループのすべてのユーザーをセット
  def group_users(group_id)
    users = Group.find(group_id).users
    return users
  end

  # 指定グループの子孫グループに所属するすべてのユーザーをセット
  def progeny_group_users(group_id)
    users = Group.find(group_id).users

    progeny_group_ids = find_progeny_group_ids(group_id)
    progeny_group_ids.each do |id|
      users = users + Group.find(id).users if id != group_id
    end
    users.each do |user|
      p user.id
    end
    users = users.uniq
    return users
  end

  # 指定グループの関連グループに所属するすべてのユーザーをセット
  def relation_group_users(group_id)
    users = Group.find(group_id).users
    founder_group = find_founder_group(group_id)
    users = users + founder_group.users

    relation_group_ids = find_progeny_group_ids(founder_group.id)
    relation_group_ids.each do |id|
      users = users + Group.find(id).users if id != group_id
    end
    users.each do |user|
      p user.id
    end
    users = users.uniq
    return users
  end

  def project_users(project_id)
    users = Project.find(project_id).users
    return users
  end

  def progeny_project_users(project_id)
    users = Project.find(project_id).users

    progeny_project_ids = find_progeny_project_ids(project_id)
    progeny_project_ids.each do |id|
      users = users + Project.find(id).users if id != project_id
    end
    users = users.uniq
    return users
  end

  def relation_project_users(project_id)
    users = Project.find(project_id).users
    founder_project = find_founder_project(project_id)
    users = users + founder_project.users

    relation_project_ids = find_progeny_project_ids(founder_project.id)
    relation_project_ids.each do |id|
      users = users + Project.find(id).users if id != project_id
    end
    users = users.uniq
    return users
  end


  # commentをsort番号順に並び替え
  def sort_comments(comments)
    comments.sort do |a, b|
      a.sort_num <=> b.sort_num
    end
  end

  # Topicをsort番号順に並び替え
  def sort_topics (topics)
    topics.sort do |a, b|
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
      end
    end
  end

  # コメントのインデント値に応じたCSS classを返す
  def add_indent_css (indent_val)
    return "indent-" + String(indent_val)
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
  # 削除ボタン
  def link_to_remove_field(name, f, btn_class="", options={})
    # _destroy の hiddenフィールドと削除ボタンを設置
    f.hidden_field(:_destroy) + link_to(name, '', class: "remove_field " + btn_class)
  end

  # 追加ボタン
  def link_to_add_fields(name, f, association, btn_class="", users="", options={})
    # association で渡されたシンボルから、対象のモデルを作る
    new_object = f.object.class.reflect_on_association(association).klass.new

    # Javascript 側で配列のインデックス値とする
    # 追加しまくると、インデックス値がかぶりまくるので、
    # 後に Javascript 側でこのインデックス値は現在時刻をミリ秒にした値で置き換えていく
    id = new_object.object_id

    # f はビューから渡されたフォームオブジェクト
    # fields_for で f の子要素を作る
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize + "_card", f: builder, users: users)
    end

    # ボタンの設置。classを指定してJavascriptと連動、fields を渡しておいて、
    # ボタン押下時にこの要素(fields)をJavascript側で増やすようにする
    link_to(name, '', class: "add_fields " + btn_class,
            data: {id: id, fields: fields.gsub("\n","")})
  end

end
