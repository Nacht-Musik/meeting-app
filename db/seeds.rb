# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "csv"

###
# Receiver Type作成
CSV.foreach('db/seeds_data/receiver_types.csv') do |data|
  next if data[0] == "0"
  ReceiverType.create(name: data[1])
end

###
# Project作成
CSV.foreach('db/seeds_data/projects.csv') do |data|
  next if data[0] == "0"
  Project.create(name: data[1])
end

###
# Meeting Status作成
CSV.foreach('db/seeds_data/meeting_statuses.csv') do |data|
  next if data[0] == "0"
  MeetingStatus.create(name: data[1])
end

###
# Topic Status作成
CSV.foreach('db/seeds_data/topic_statuses.csv') do |data|
  next if data[0] == "0"
  TopicStatus.create(name: data[1])
end

###
# Comment Status作成
CSV.foreach('db/seeds_data/comment_statuses.csv') do |data|
  next if data[0] == "0"
  CommentStatus.create(name: data[1])
end

###
# Authority 作成
CSV.foreach('db/seeds_data/authorities.csv') do |data|
  next if data[0] == "0"
  Authority.create(name: data[1])
end

###
# User作成
# CSV.foreach('db/seeds_data/users.csv') do |data|
#   next if data[0] == "0"
#   User.create(name: data[1], email: data[2], password: data[3],
#               last_name: data[4], first_name: data[5], authority_id: data[6])
# end
