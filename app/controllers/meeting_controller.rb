class MeetingController < ApplicationController
  before_action :set_meeting, only: [:show]

  def show
  end

  private
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    # Strong parameters設定
    # def meeting_params
    #   params.require(:meeting).permit(:title, :user_id, :date)
    # end
end
