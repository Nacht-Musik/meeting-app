class AddAuthorityToUser < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :authority, foreign_key: true, index: true, after: :first_name
  end
end
