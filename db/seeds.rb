# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

###
# Authority 作成
authorities = ["一般", "審査", "承認"]
authorities.each do |authority|
  Authority.create(name: authority)
end

###
# User作成
10.times do |i|
  user = User.new
  user.name = ""
  user.last_name = ""
  user.first_name = ""
  user.password = "hogehoge"
  user.email = "#{user.name}@mail.jp"
  user.save!
end

###
# Project作成
project_names = ["A-Project", "B-Project", "C-Project", "D-Project", "E-Project"]
project_names.each do |project_name|
  Project.create(name: project_name)
end

###
# Meeting Status作成
# meeting_statuses = ["開催前", "編集中", "審査待ち", "承認待ち", "配布待ち", "配布済み"]
# meeting_statuses.each do |meeting_status|
  # MeetingStatus.create(name: meeting_status)
# end

###
# Topic Status作成
# topic_statuses = ["質問", "意見", "宿題", "決定", "却下"]
# topic_statuses.each do |topic_status|
#  TopicStatus.create(name: topic_status)
# end

###
# Comment Status作成
# comment_statuses = ["質問", "意見", "宿題", "決定", "却下"]
# comment_statuses.each do |comment_status|
#  CommentStatus.create(name: comment_status)
# end

