class AddParentIdDeletedAtToProjects < ActiveRecord::Migration[5.1]
  def change
    add_reference :projects, :parent, foreign_key: { to_table: :projects }, index: true, after: :name
    add_column :projects, :deleted_at, :datetime
    add_index :projects, :deleted_at
  end
end
