# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
$:.unshift File.dirname(__FILE__)
require "seeds_modules.rb"

setReceiverType if ReceiverType.all.empty?
setMeetingStatus if MeetingStatus.all.empty?
setTopicStatus if TopicStatus.all.empty?
setCommentStatus if CommentStatus.all.empty?
setAuthority if Authority.all.empty?
setMeetingType if MeetingType.all.empty?
setMeetingScope if MeetingScope.all.empty?

# setSampleUsers