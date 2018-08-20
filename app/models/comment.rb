class Comment < ApplicationRecord
  belongs_to :topic
  belongs_to :status, class_name: 'CommentStatus', optional: true
  belongs_to :user, class_name: 'User', optional: true

  has_many :children, :class_name => "Comment", foreign_key: "parent_id", dependent: :destroy
  belongs_to :parent, :class_name => "Comment", foreign_key: "parent_id", optional: true
end
