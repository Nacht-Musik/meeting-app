class AddAuthorityToGroupMembers < ActiveRecord::Migration[5.1]
  def change
    add_reference :group_members, :authority, foreign_key: true, index: true, after: :user_id
  end
end
