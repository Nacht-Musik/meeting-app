class CreateMeetingScopes < ActiveRecord::Migration[5.1]
  def change
    create_table :meeting_scopes do |t|
      t.string :name

      t.timestamps
    end
  end
end
