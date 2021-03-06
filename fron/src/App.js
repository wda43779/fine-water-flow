import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'

import Home from './Home'
import Notice from './Notice'
import THome from './THome'
import ArticlePage from './ArticlePage'
import ArticleOwnerPage from './ArticleOwnerPage'
import Profile from './Profile'
import Visit from './Visit'
import Editor1 from './Editor'
import SignIn from './SignIn'

import textEditorPage from './Page/textEditorPage'
import Join from './Page/Join'
import SettingProfile from './Page/SettingProfile'
import SettingAccount from './Page/SettingAccount'
import Agreement from './Page/Agreement'
import BookPage from './Page/BookPage'
import MoviePage from './Page/MoviePage'
import BookDetailPage from './Page/BookDetailPage'
import MovieDetailPage from './Page/MovieDetailPage'
import FigureDetailPage from './Page/FigureDetailPage'
import BookEditorPage from './Page/BookEditorPage'
import MovieEditorPage from './Page/MovieEditorPage'
import ResetPassword from './Page/ResetPassword'
import ReviseArticle from './Page/ReviseArticle'

import withTracker from './components/withTracker'

import './Global.css'
import EditorGuidance from './Page/EditorGudiance'
import TodayArticle from './Page/TodayArticle'
import JsonPage from './Page/JsonPage'
import PokerPage from './Page/PokerPage'
import QRcodePage from './Page/QRcodePage'
import ChartPage from './Page/ChartPage'
import DevicePage from './Page/DevicePage'
import BrandPage from './Page/BrandPage'
import AdobePage from './Page/AdobePage'
import ComputerList from './Page/ComputerList'
import EarphoneList from './Page/EarphoneList'
import PhoneList from './Page/PhoneList'
import Computer from './Page/Computer'
import Earphone from './Page/Earphone'
import Phone from './Page/Phone'
import Cpu from './Page/Cpu'
import Gpu from './Page/Gpu'
import GobangPage from './Page/GobangPage'
import OwnerCollectionPage from './Page/OwnerCollectionPage'
import CreateCollectionPage from './Page/CreateCollectionPage'
import PubCollectionPage from './Page/PubCollectionPage'

const MainPage = props => {
  const token = window.localStorage.getItem('token')
  const { history } = props
  if (token) {
    return <THome component={history} />
  } else {
    return <Home component={history} />
  }
}

class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={withTracker(MainPage)} />
            <Route path='/notice' component={withTracker(Notice)} />
            <Route exact path='/book' component={withTracker(BookPage)} />
            <Route path='/book/:id' component={withTracker(BookDetailPage)} />
            <Route exact path='/movie' component={withTracker(MoviePage)} />
            <Route path='/movie/:id' component={withTracker(MovieDetailPage)} />
            <Route path='/figure/:id' component={withTracker(FigureDetailPage)} />
            <Route path='/join' component={withTracker(Join)} />
            <Route path='/sign_in' component={withTracker(SignIn)}></Route>
            <Route path='/textEditorPage' component={withTracker(textEditorPage)} />
            <Route path='/article/:id' component={withTracker(ArticlePage)} />
            <Route path='/owner_article/:id' component={withTracker(ArticleOwnerPage)} />
            <Route path='/profile/:id' component={withTracker(Profile)} />
            <Route path='/visit/:id' component={withTracker(Visit)} />
            <Route path='/settings/profile' component={withTracker(SettingProfile)} />
            <Route path='/settings/account' component={withTracker(SettingAccount)} />
            <Route path='/agreement' component={withTracker(Agreement)} />
            <Route path='/editor_guidance' component={withTracker(EditorGuidance)} />
            <Route path='/editor' component={withTracker(Editor1)} />
            <Route path='/book_editor_page' component={withTracker(BookEditorPage)} />
            <Route path='/movie_editor_page' component={withTracker(MovieEditorPage)} />
            <Route path='/reset_password' component={withTracker(ResetPassword)} />
            <Route path='/revise_article/:id' component={withTracker(ReviseArticle)} />
            <Route path='/today_article' component={withTracker(TodayArticle)} />
            <Route path='/json_page' component={withTracker(JsonPage)} />
            <Route path='/poker_page' component={withTracker(PokerPage)} />
            <Route path='/qrcode_page' component={withTracker(QRcodePage)} />
            <Route path='/chart_page' component={withTracker(ChartPage)} />
            <Route path='/device_page' component={withTracker(DevicePage)} />
            <Route path='/adobe_page' component={withTracker(AdobePage)} />
            <Route path='/gobang_page' component={withTracker(GobangPage)} />
            <Route path='/create_collection_page' component={withTracker(CreateCollectionPage)} />
            <Route path='/pub_collection_page/:id' component={withTracker(PubCollectionPage)} />
            <Route path='/owner_collection_page/:id' component={withTracker(OwnerCollectionPage)} />
            <Route path='/brand/:id' component={withTracker(BrandPage)} />
            <Route path='/笔记本/:genre/:brand' component={withTracker(ComputerList)} />
            <Route path='/耳机/:genre/:brand' component={withTracker(EarphoneList)} />
            <Route path='/手机/:genre/:brand' component={withTracker(PhoneList)} />
            <Route path='/computer/:id' component={withTracker(Computer)} />
            <Route path='/earphone/:id' component={withTracker(Earphone)} />
            <Route path='/phone/:id' component={withTracker(Phone)} />
            <Route path='/cpu/:id' component={withTracker(Cpu)} />
            <Route path='/Gpu/:id' component={withTracker(Gpu)} />
            <Route component={withTracker(NoMatch)} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
