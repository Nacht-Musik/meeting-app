Rails.application.routes.draw do
  root to: 'top_pages#index'

  ### Meeting Controller 関連
  # resources :meetings, only: [:create, :show, :destroy, :new, :edit, :update]
  resources :meetings

  ### devise (User) 関連
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  devise_for :users, :controllers => {
    :sessions => 'users/sessions',
    :registrations => 'users/registrations'
  }

  ### My Controller 関連
  get 'my/page'
  get 'my/meeting'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
