class Meeting < ApplicationRecord
  belongs_to :user
  belongs_to :inspector, class_name: 'User'
  belongs_to :approver, class_name: 'User'
  has_many :topics, class_name: 'Topic'
  accepts_nested_attributes_for :topics
end
