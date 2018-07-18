class MeetingController < ApplicationController
  def show
  end

  private
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    # def meeting_params
    #   params.require(:meeting).permit(:title, :user_id, :date)
    # end
end
