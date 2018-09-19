module GroupsHelper
  def update_children_group(parent_group, children_group)
    children_group.each do |child_num|
      if children_group[child_num][:parent_id].present?
        child = Group.find(children_group[child_num][:id])
        child.parent = parent_group
        child.save
      end
    end
  end
end
