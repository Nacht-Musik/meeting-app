class AddAdminToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :admin, :boolean, after: :authority_id
    add_index :users, :admin
  end
end
