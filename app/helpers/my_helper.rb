module MyHelper
  def group_admin? (user, group)
    return GroupMember.where(user_id: user.id, group_id: group.id, admin: 1).present?
  end
  def project_admin? (user, project)
    return ProjectMember.where(user_id: user.id, project_id: project.id, admin: 1).present?
  end
end
