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
    founder_group = Group.with_deleted.find(group_id)

    while true do
      break if founder_group.parent.nil?
      founder_group = Group.with_deleted.find(founder_group.parent_id)
    end
    return founder_group
  end

  # 子孫グループのidをすべて取得
  def find_progeny_group_ids(group_id)
    return [] if Group.with_deleted.find(group_id).children.blank?
    progeny_group_ids = []

    Group.find(group_id).children.each do |child|
      progeny_group_ids.push(child.id)
      next if child.children.blank?

      grandchildren_ids = find_children_group_ids(child.id)
      grandchildren_ids.each do |id|
        progeny_group_ids.push(id)
      end
    end

    return progeny_group_ids
  end

  # 子グループのidをすべて取得
  def find_children_group_ids(group_id)
    return [] if Group.with_deleted.find(group_id).children.blank?
    children_group_ids = []

    Group.find(group_id).children.each do |child|
      children_group_ids.push(child.id)
    end
    return children_group_ids
  end
end
