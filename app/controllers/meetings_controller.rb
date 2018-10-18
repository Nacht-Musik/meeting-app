class MeetingsController < ApplicationController
  include MeetingsHelper
  before_action :set_meeting, only: [:show, :edit, :update, :destroy]
  before_action :set_users, only: [:edit]
  before_action :set_projects, only: [:new, :edit]
  before_action :set_comment_statuses, only: [:new, :edit]
  before_action :set_topic_statuses, only: [:new, :edit]
  before_action :set_receiver_type, only: [:new, :edit]

  before_action :authenticate_user!, only: [:new, :edit]
  before_action :set_meeting_type, only: [:type_select]

  def show
    # ソート番号順に並んだTopicsを取得
    @topics = sort_topics(@meeting.topics)
    # 始祖コメントを全て取得
    @founder_comments = set_founder_comments(@topics)
  end

  def type_select
    @meeting = Meeting.new
  end

  def new
    # ログイン中か否かを判別する条件式を追加すること。
    @meeting = Meeting.new

    # Topic枠を一つ作成
    @meeting.topics.build

    # 会議作成ユーザーを担当者に設定
    @meeting.user_id = current_user.id

    # 会議作成ユーザーを参加者に登録
    attendee = @meeting.attendees.build
    attendee.user_id = current_user.id

    # 会議作成ユーザーを配信先(To)に登録
    receiver = @meeting.receiveres.build
    receiver.user_id = current_user.id
    receiver.type_id = TO_TYPE_ID

    # type_select で選択した情報を設定
    scope_id = params[:scope_id].to_i
    type_id = params[:type_id].to_i
    project_id = params[:project_id].to_i
    group_id = params[:group_id].to_i
    @meeting.type_id = type_id
    @meeting.project_id = project_id if type_id == PROJECT_MEETING_TYPE_ID
    @meeting.group_id = group_id if type_id == GROUP_MEETING_TYPE_ID

    @users = set_optimal_users(type_id, group_id, project_id, scope_id)
    @groups = Group.all
  end

  def create
    params = meeting_params
    meeting = Meeting.new(params)

    # 各コメントに親コメントを設定
    set_parent_comments(meeting)

    if meeting.save
      # Meeting Save成功時の処理
      flash = {success: '会議録を保存しました。'}
      redirect_to my_meeting_path, flash: flash
    else
      # Meeting Save失敗時の処理
    end
  end

  def edit
    # ログイン中のユーザーが編集権限を持っているかを判別すること！
    @groups = Group.all
  end

  def update
    # p 'updateアクション実行'
    params = meeting_params

    # 各コメントに親コメントを設定
    set_parent_comments(@meeting)

    if @meeting.update(params)
      # Meeting Update成功時の処理
      flash = {success: '会議録を保存しました。'}
      redirect_to my_meeting_path, flash: flash
    else
      # Meeting Update失敗時の処理
    end
  end

  def destroy
    @meeting.destroy
    redirect_to my_meeting_path, notice: '会議録を削除しました'
  end

  private
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    def set_users
      @users = User.all
    end

    def set_projects
      @projects = Project.all
    end

    def set_comment_statuses
      @comment_statuses = CommentStatus.all
    end

    def set_topic_statuses
      @topic_statuses = TopicStatus.all
    end

    def set_receiver_type
      @receiver_type = ReceiverType.all
    end

    def set_meeting_type
      @meeting_type = MeetingType.all
    end

    # Strong parameters
    def meeting_params
      params.require(:meeting).permit(:id,
                                      :title,
                                      :type_id,
                                      :date,
                                      :start_time,
                                      :finish_time,
                                      :place,
                                      :project_id,
                                      :group_id,
                                      :user_id,
                                      :inspector_id,
                                      :approver_id,
                                      :note,
                                      :scope_id,
                                      attendees_attributes: [
                                        :id,
                                        :meeting_id,
                                        :user_id,
                                        :_destroy
                                      ],
                                      receiveres_attributes: [
                                          :id,
                                          :type_id,
                                          :user_id,
                                          :meeting_id,
                                          :_destroy
                                      ],
                                      topics_attributes: [
                                        :id,
                                        :meeting_id,
                                        :status_id,
                                        :name,
                                        :sort_num,
                                        :_destroy,
                                        comments_attributes: [
                                          :id,
                                          :status_id,
                                          :user_id,
                                          :name,
                                          :sort_num,
                                          :indent,
                                          :_destroy
                                        ]
                                      ]
                                    )
    end
end
