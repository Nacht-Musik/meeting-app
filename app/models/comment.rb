class Comment < ApplicationRecord
  belongs_to :topic

  has_many :family_comments
  has_many :children, through: :family_comments, source: :child
  # has_many :reverses_family_comment, class_name: 'FamilyComment', foreign_key: 'child_id'
  # has_many :parents, through: :reverses_family_comment, source: :comment
end
