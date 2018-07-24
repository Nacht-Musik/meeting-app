class Meeting < ApplicationRecord
  belongs_to :user
  belongs_to :inspector, class_name: 'User'
  belongs_to :approver, class_name: 'User'

  #### nested_formfields対応
  # has_many :topics, class_name: 'Topic'
  has_many :topics, class_name: 'Topic', dependent: :destroy

  accepts_nested_attributes_for :topics
end
