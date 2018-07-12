class Comment < ApplicationRecord
  belongs_to :topic
  # has_many :children, class_name: 'FamilyComment', foreign_key: 'comment_id'
end
