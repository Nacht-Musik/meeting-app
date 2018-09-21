class AddDeletedAtToGroupMember < ActiveRecord::Migration[5.1]
  def change
    add_column :group_members, :deleted_at, :datetime
    add_index :group_members, :deleted_at
  end
end
