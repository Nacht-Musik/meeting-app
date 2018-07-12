class FamilyComment < ApplicationRecord
  belongs_to :comment
  belongs_to :child, class_name: :comment
end
