class CreateNoticeCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :notice_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
