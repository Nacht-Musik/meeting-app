class RemoveNickNameFromGroup < ActiveRecord::Migration[5.1]
  def change
    remove_column :groups, :nick_name, :string
  end
end
