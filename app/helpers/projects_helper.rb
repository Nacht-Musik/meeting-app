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
end
