module ProjectsHelper
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
    founder_project = Project.find(project_id)

    while true do
      break if founder_project.parent.nil?
      founder_project = Project.find(founder_project.parent_id)
    end
    return founder_project
  end

  # 子孫プロジェクトのidをすべて取得
  def find_progeny_project_ids(project_id)
    return [] if Project.find(project_id).children.blank?
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
    return [] if Project.find(project_id).children.blank?
    children_project_ids = []

    Project.find(project_id).children.each do |child|
      children_project_ids.push(child.id)
    end
    return children_project_ids
  end
end
