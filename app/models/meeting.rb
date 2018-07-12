class Meeting < ApplicationRecord
  belongs_to :user
  belongs_to :inspector, class_name: 'User'
  belongs_to :authorither, class_name: 'User'
end
