class TopicStatus < ApplicationRecord
  has_many :topics, class_name: 'Topic'
end
