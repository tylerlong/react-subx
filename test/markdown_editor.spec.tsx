import React from 'react';
import {debounceTime} from 'rxjs/operators';
import TestRenderer from 'react-test-renderer';
import SubX from 'subx';
import MarkdownIt from 'markdown-it';
import waitFor from 'wait-for-async';

import {Component} from '../src/index';

const mdi = new MarkdownIt();

const renderHistory: string[] = [];

class Editor extends Component<any, any> {
  article: any;
  subscription: any;
  constructor(props: any) {
    super(props);
    this.article = props.article;
    this.state = {
      html: '',
    };
    this.subscription = this.article.$.pipe(debounceTime(30)).subscribe(() =>
      this.setState({html: this.article.html})
    );
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    renderHistory.push('render');
    return (
      <div>
        <textarea
          placeholder="Please enter some markdown..."
          id="markdown-textarea"
          value={this.article.text}
          onChange={e => {
            this.article.text = e.target.value;
          }}
        />
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{__html: this.state.html}}
        />
      </div>
    );
  }
}

const Article = SubX.model({
  text: '',
  get html() {
    renderHistory.push('mdi.render');
    return mdi.render(this.text).trim();
  },
});
const article = Article.create();

describe('Markdown Editor', () => {
  test('default', async () => {
    const renderer = TestRenderer.create(<Editor article={article} />);
    const textarea = renderer.root.find(el => el.type === 'textarea');
    const markdownBody = renderer.root.find(
      el => el.props.className === 'markdown-body'
    );
    textarea.props.onChange({target: {value: '# Hello'}});
    textarea.props.onChange({target: {value: '# Hello world'}});
    expect(markdownBody.props.dangerouslySetInnerHTML.__html).toBe(''); // because of debounce
    await waitFor({interval: 40});
    expect(markdownBody.props.dangerouslySetInnerHTML.__html).toBe(
      '<h1>Hello world</h1>'
    );
    expect(renderHistory).toEqual([
      'render',
      'render',
      'render',
      'mdi.render',
      'render',
    ]);
  });
});
