module GroupsHelper
  # 子グループの登録メソッド（子グループのparent_idを更新）
  def update_children_group(children_group)
    children_group.each do |child_num|
      if children_group[child_num][:parent_id].present?
        child = Group.find(children_group[child_num][:id])
        if children_group[child_num][:parent_id] != '0'
          child.parent_id = children_group[child_num][:parent_id]
        else
          child.parent = nil
        end
        child.save
      end
    end
  end


  # 始祖グループを返す
  def find_founder_group(group_id)
    founder_group = Group.find(group_id)

    while true do
      break if founder_group.parent.nil?
      founder_group = Group.find(founder_group.parent_id)
    end
    return founder_group
  end
end
