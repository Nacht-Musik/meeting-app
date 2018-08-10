class Comment < ApplicationRecord
  belongs_to :topic

  has_many :children, :class_name => "Comment", foreign_key: "parent_id", dependent: :destroy
  belongs_to :parent, :class_name => "Comment", foreign_key: "parent_id", optional: true
end
