/* eslint-env jest */
import React from 'react'
import { debounceTime } from 'rxjs/operators'
import TestRenderer from 'react-test-renderer'
import SubX from 'subx'
import MarkdownIt from 'markdown-it'
import delay from 'timeout-as-promise'

import { Component } from '../src/index'

const mdi = new MarkdownIt()

const renderHistory = []

class Editor extends Component {
  constructor (props) {
    super(props)
    this.article = props.article
  }
  componentWillMount () {
    super.componentWillMount()
    this.htmlSubscription = this.article.$.pipe(debounceTime(100)).subscribe(event => {
      this.html = this.article.html
      this.forceUpdate()
    })
  }
  componentWillUnmount () {
    super.componentWillUnmount()
    this.htmlSubscription.unsubscribe()
  }
  render () {
    renderHistory.push('render')
    return (
      <div>
        <textarea placeholder='Please enter some markdown...' id='markdown-textarea'
          value={this.article.text} onChange={e => { this.article.text = e.target.value }} />
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: this.html }} />
      </div>
    )
  }
}

const Article = new SubX({
  text: '',
  get html () {
    renderHistory.push('mdi.render')
    return mdi.render(this.text)
  }
})
const article = new Article()

describe('Markdown Editor', () => {
  test('default', async () => {
    const renderer = TestRenderer.create(<Editor article={article} />)
    const textarea = renderer.root.find(el => el.type === 'textarea')
    textarea.props.onChange({ target: { value: '# Hello' } })
    textarea.props.onChange({ target: { value: '# Hello world' } })
    await delay(200)
    expect(renderHistory).toEqual([
      'render',
      'render',
      'render',
      'mdi.render',
      'render'
    ])
  })
})
