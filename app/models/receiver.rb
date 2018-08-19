class Receiver < ApplicationRecord
  belongs_to :user
  belongs_to :meeting
  belongs_to :type, class_name: "ReceiverType"
end
