require "csv"

###
# ReceiverType のデータを生成
def setReceiverType
  CSV.foreach('db/seeds_data/receiver_types.csv') do |data|
    next if data[0] == "0"
    ReceiverType.create(name: data[1])
  end
end


###
# MeetingStatus のデータを生成
def setMeetingStatus
  CSV.foreach('db/seeds_data/meeting_statuses.csv') do |data|
    next if data[0] == "0"
    MeetingStatus.create(name: data[1])
  end
end

###
# TopicStatus のデータを生成
def setTopicStatus
  CSV.foreach('db/seeds_data/topic_statuses.csv') do |data|
    next if data[0] == "0"
    TopicStatus.create(name: data[1])
  end
end

###
# CommentStatus のデータを生成
def setCommentStatus
  CSV.foreach('db/seeds_data/comment_statuses.csv') do |data|
    next if data[0] == "0"
    CommentStatus.create(name: data[1])
  end
end

###
# Authority のデータを生成
def setAuthority
  CSV.foreach('db/seeds_data/authorities.csv') do |data|
    next if data[0] == "0"
    Authority.create(name: data[1])
  end
end

###
# サンプル用ユーザーデータを生成
def setSampleUsers
  CSV.foreach('db/seeds_data/users.csv') do |data|
    next if data[0] == "0"
    User.create(name: data[1], email: data[2], password: data[3],
                last_name: data[4], first_name: data[5], authority_id: data[6])
  end
end

###
# サンプル用プロジェクトデータを生成
def setSampleProject
  CSV.foreach('db/seeds_data/projects.csv') do |data|
    next if data[0] == "0"
    Project.create(name: data[1])
  end
end
