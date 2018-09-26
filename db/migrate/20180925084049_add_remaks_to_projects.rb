class AddRemaksToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :remarks, :text, after: :parent_id
  end
end
