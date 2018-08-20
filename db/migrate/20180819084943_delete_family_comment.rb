class DeleteFamilyComment < ActiveRecord::Migration[5.1]
  def change
    drop_table :family_comments
  end
end
