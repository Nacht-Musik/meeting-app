module ProjectsHelper
  class FormWithErrorMessageBuilder < ActionView::Helpers::FormBuilder
    # 従来のフォームに加えて、エラーがある場合にエラーメッセージを表示するメソッド
    def input_field_with_error(attribute, options={}, &block)
      # 入力フォームと同じ属性のエラーメッセージを取得する
      error_messages = @object.errors.full_messages_for(attribute)

      # エラーがある場合のみ、エラー用のHTMLにする
      if error_messages.any?
        options[:class] << " error-form"
        error_contents = create_error_div(attribute, error_messages)
      end

      # 従来の入力フォーム と 生成されたエラーメッセージ を連結して返す
      block.call + error_contents || ""
    end

    # エラーメッセージのHTMLタグを作成する
    def create_error_div(attribute, messages)
      # content_tag でHTMLタグを生成
      @template.content_tag(:div, class: "error-message") do
        messages.each do |message|
          @template.concat(@template.content_tag(:div, message))
        end
      end
    end

    # 既存のビューヘルパーメソッドをオーバーライドする
    def text_field(attribute, options={})
      input_field_with_error(attribute, options) do
        super
      end
    end
  end

###########################
# subroutines

  # 子プロジェクトの登録メソッド（子プロジェクトのparent_idを更新）
  def update_children_project(children_project)
    children_project.each do |child_num|
      if children_project[child_num][:parent_id].present?
        child = Project.find(children_project[child_num][:id])
        if children_project[child_num][:parent_id] != '0'
          child.parent_id = children_project[child_num][:parent_id]
        else
          child.parent = nil
        end
        child.save
      end
    end
  end

  # 始祖プロジェクトを返す
  def find_founder_project(project_id)
    founder_project = Project.with_deleted.find(project_id)

    while true do
      break if founder_project.parent.nil?
      founder_project = Project.with_deleted.find(founder_project.parent_id)
    end
    return founder_project
  end

  # 子孫プロジェクトのidをすべて取得
  def find_progeny_project_ids(project_id)
    return [] if Project.with_deleted.find(project_id).children.blank?
    progeny_project_ids = []

    Project.find(project_id).children.each do |child|
      progeny_project_ids.push(child.id)
      next if child.children.blank?

      grandchildren_ids = find_children_project_ids(child.id)
      grandchildren_ids.each do |id|
        progeny_project_ids.push(id)
      end
    end

    return progeny_project_ids
  end

  # 子プロジェクトのidをすべて取得
  def find_children_project_ids(project_id)
    return [] if Project.with_deleted.find(project_id).children.blank?
    children_project_ids = []

    Project.find(project_id).children.each do |child|
      children_project_ids.push(child.id)
    end
    return children_project_ids
  end
end
