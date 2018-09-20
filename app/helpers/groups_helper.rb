module GroupsHelper
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
end
