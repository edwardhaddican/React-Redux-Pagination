import React from 'react';
import Article from './Article';

export default class extends React.Component {

    constructor () {
        super();
        this.state = {
          articles: []
        }
    }

    render () {
        return (
            <div>
                <h1>Today's Articles:</h1>
                {
                  this.state.articles
                    .map(a => <Article key={a.id} fullArticle={a} />)
                }
            </div>
        );
    }

}
