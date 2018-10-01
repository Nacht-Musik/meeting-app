class TopPagesController < ApplicationController
  def index
    if user_signed_in?
      redirect_to my_page_path
    end
  end
end
