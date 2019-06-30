import React, { Component } from 'react'
import { Layout, Row, Col, Typography, Tag, List, Collapse, Icon, Divider, BackTop } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import Advertisement from '../Advertisement'
import CategoryList from '../CategoryList'

const CheckableTag = Tag.CheckableTag
const { Title } = Typography
const count = 12
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
}
const Panel = Collapse.Panel

class BookPage extends Component {
  page = 1
  state = {
    cache: [],
    selectedTags: [],
    loading: true,
    tags: [],
    count: 0
  }

  componentDidMount = async (v) => {
    await this.getData()
    this.setState({ loading: false })
  }

  getData = async (v) => {
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/books/?format=json' + '&page=' + this.page + '&page_size=' + count
      )
      const temp = []
      for (let index = 0; index < response.data.count; index++) {
        temp.push({ title: '', cover: '', author: '', id: index })
      }
      this.setState({
        cache: temp
      })
      for (let index = 0; index < response.data.results.length; index++) {
        temp[index] = response.data.results[index]
      }
      this.setState({
        cache: temp,
        count: response.data.count
      })
      const responseTag = await axios.get(
        'https://finewf.club:8080/api/bookblocks/?format=json' + (this.state.selectedTags.length === 0 ? '' : '123')
      )
      this.setState({ tags: responseTag.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleBook = async (page) => {
    this.setState({
      loading: true
    })
    try {
      const response = await axios.get(
        'https://finewf.club:8080/api/books/?format=json' + '&page=' + page + '&page_size=' + count
      )
      let temp = this.state.cache
      let i = (page - 1) * count
      for (let index = 0; index < response.data.results.length; index++) {
        temp[i] = response.data.results[index]
        i++
      }
      this.setState({
        cache: temp,
        loading: false
      })
      console.log(this.state.cache)
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = async (tag, checked) => {
    const { selectedTags } = this.state
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)
    await this.setState({
      selectedTags: nextSelectedTags,
      loading: true
    })
    if (nextSelectedTags.length !== 0) {
      const temp = []
      for (let i of nextSelectedTags) {
        temp.push(i.id)
      }
      const fliterTag = '&tag=' + temp.join('&tag=')
      try {
        const response = await axios.get(
          'https://finewf.club:8080/api/books/?format=json' + '&page=' + this.page + '&page_size=' + count + fliterTag
        )
        this.setState({ cache: response.data.results, loading: false })
      } catch (error) {
        console.log(error)
      }
    } else {
      this.getData()
      this.setState({
        loading: false
      })
    }
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <BackTop />
        <div style={{ flex: '1 0 ', backgroundColor: '#ffffff' }}>
          <Row style={{ paddingBottom: '30px' }}>
            <Col xxl={{ span: 16, offset: 4 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }} />
          </Row>
          <Row style={{ paddingTop: '0px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 11, offset: 4 }} xl={{ span: 13, offset: 2 }} xs={{ span: 22, offset: 1 }} style={{ paddingTop: '0px', paddingBottom: '30px' }}>
              <Title level={4}>FWF 全库</Title>
              <Divider />
              <QueueAnim>
                <List
                  itemLayout='vertical'
                  loading={this.state.loading}
                  grid={{
                    gutter: 28,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 2
                  }}
                  pagination={{
                    onChange: this.handleBook,
                    pageSize: count,
                    total: this.state.count,
                    showQuickJumper: true
                  }}
                  size='large'
                  dataSource={this.state.cache}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <div style={{ padding: '20px 0px' }}>
                        <Link to={'/book/' + item.id} >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div style={{ fontSize: '16px', color: '#3377aa' }}>
                                {item.title}
                              </div>
                              <div style={{ fontSize: '13px', color: 'grey', paddingTop: '5px' }}>
                                {item.author}
                              </div>
                              <div style={{ paddingTop: '5px', display: 'flex', flexWrap: 'wrap' }}>
                                {item.tag && (item.tag.map(tag => (
                                  <Tag key={tag.title} color='#f7f7f7' style={{ margin: '5px 5px', color: 'black' }}>
                                    {tag.title}
                                  </Tag>
                                )))}
                              </div>
                            </div>
                            <div alt={item.title} style={{ width: '32%', paddingBottom: '46%', borderRadius: '10px', backgroundClip: 'border-box', backgroundSize: 'contain', backgroundPosition: 'center', backgroundImage: `url(${item.cover})` }} />
                          </div>
                        </Link>
                        <div style={{ fontSize: '14px', color: 'grey', paddingTop: '5px' }}>
                          {item.overview && item.overview.slice(0, 42) + '...'}
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </QueueAnim>
            </Col>
            <Col xxl={{ span: 4, offset: 1 }} xl={{ span: 6, offset: 1 }} xs={{ span: 22, offset: 1 }}>
              <CategoryList />
              <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type='caret-right' rotate={isActive ? 90 : 0} />}
                style={{ paddingTop: '10px 0' }}
              >
                <Panel header={<Title level={4}>全部标签</Title>} key='1' style={customPanelStyle}>
                  <List
                    size='small'
                    dataSource={this.state.tags}
                    renderItem={item => (
                      <List.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ backgroundColor: '#ff5c38', borderRadius: '16px 0 16px 16px', padding: '5px 15px', color: 'white', margin: '0 24px 0 0' }}>{item.title}
                          </span>
                          {item.tags.map(tag => (
                            <CheckableTag
                              style={{ padding: '5px 10px', borderRadius: '20px' }}
                              key={tag}
                              checked={this.state.selectedTags.indexOf(tag) > -1}
                              onChange={checked => this.handleChange(tag, checked)}
                            >
                              {tag.title}
                            </CheckableTag>
                          ))}
                        </div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
              <Advertisement />
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}
export default BookPage
