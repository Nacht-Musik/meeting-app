class CreateNotices < ActiveRecord::Migration[5.1]
  def change
    create_table :notices do |t|
      t.references :user, foreign_key: true
      t.references :notifier, foreign_key: { to_table: :users }
      t.references :category, foreign_key: { to_table: :notice_categories }
      t.boolean :acknowledge, null: false, default: false
      t.string :body
      t.string :url

      t.timestamps
    end
  end
end
