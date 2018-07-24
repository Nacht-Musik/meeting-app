class Comment < ApplicationRecord
  belongs_to :topic

  #### nested_formfields対応
  # has_many :family_comments
  has_many :family_comments, dependent: :destroy
  has_many :children, through: :family_comments, source: :child

  ### nested_formfields対応
  # has_many :reverses_family_comment, class_name: 'FamilyComment', foreign_key: 'child_id'
  has_many :reverses_family_comment, class_name: 'FamilyComment', foreign_key: 'child_id', dependent: :destroy
  has_many :parent, through: :reverses_family_comment, source: :comment
end
