class MyController < ApplicationController
  before_action :set_meeting, only: [:meeting]

  def page
  end

  def meeting
  end


  private
    def set_meeting
      @meetings = Meeting.all
    end
end
