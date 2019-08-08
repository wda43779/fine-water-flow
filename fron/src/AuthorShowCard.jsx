import React, { Component } from 'react'
import { Card, Avatar } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

const { Meta } = Card

class AuthorShowCard extends Component {
  state = {
    data: [],
    urlAvatar: '',
    username: '',
    bio: '',
    id: ''
  }

  componentDidUpdate (prevProps) {
    if (prevProps.authorId !== this.props.authorId) { this.getProfileData() }
  }

  getProfileData = async (v) => {
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/user/' + this.props.authorId + '?format=json'
      )
      this.data = response.data.results
      this.setState({
        urlAvatar: response.data.last_name,
        username: response.data.username,
        bio: response.data.profile.bio,
        id: response.data.id
      })
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
      <Card title={<div style={{ fontWeight: 'bold' }}>关于作者</div>} bordered style={{ background: '#fff', fontWeight: 'bold', borderRadius: '1px', boxShadow: '0 1px 3px rgba(26,26,26,.1)' }}>
        <Meta
          avatar={<Link to={(this.state.id + '' === window.localStorage.getItem('user_id') ? '/profile/' : '/visit/') + this.state.id}><Avatar shape='square' src={this.state.urlAvatar} /></Link>}
          title={this.state.username}
          description={this.state.bio}
        />
      </Card>
    )
  }
}

export default AuthorShowCard
