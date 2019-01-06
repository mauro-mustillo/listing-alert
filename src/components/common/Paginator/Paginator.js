import React, { Component } from 'react';
import './Paginator.scss';

// TODO: maybe make this a prop that can be passed in?
const ITEMS_PER_PAGE = 5;

class Paginator extends Component {
  state = {
    page: 1,
    startIndex: 0,
    endIndex: Math.min(ITEMS_PER_PAGE - 1, this.props.data.length - 1),
  };

  renderItems(data) {
    const { startIndex, endIndex } = this.state;
    return data.map((item, index) => {
      if (index >= startIndex && index <= endIndex) {
        return this.props.onRender(item);
      }
      return null;
    });
  }

  firstPage() {
    this.setState({
      page: 1,
      startIndex: 0,
      endIndex: Math.min(ITEMS_PER_PAGE - 1, this.props.data.length - 1),
    });
  }

  prevPage() {
    this.setState((prevState) => {
      return {
        page: prevState.page - 1,
        startIndex: ((prevState.page - 2) * ITEMS_PER_PAGE),
        endIndex: Math.min(((prevState.page - 1) * ITEMS_PER_PAGE) - 1, this.props.data.length - 1),
      };
    });
  }

  nextPage() {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
        startIndex: (prevState.page * ITEMS_PER_PAGE),
        endIndex: Math.min(((prevState.page + 1) * ITEMS_PER_PAGE) - 1, this.props.data.length - 1),
      };
    });
  }

  lastPage() {
    this.setState({
      page: Math.ceil(this.props.data.length / ITEMS_PER_PAGE),
      startIndex: Math.floor(this.props.data.length / ITEMS_PER_PAGE) * ITEMS_PER_PAGE,
      endIndex: this.props.data.length - 1,
    });
  }

  render() {
    const { data } = this.props;
    const { startIndex, endIndex, page } = this.state;
    return (
      <div className="lato">
        <div className="d-flex justify-content-between">
          <div>
            <button onClick={() => this.firstPage()} className="paginator-button mr-2" type="button">&larr; First</button>
            <button disabled={page === 1} onClick={() => this.prevPage()} className="paginator-button" type="button">&larr; Previous</button>
          </div>
          <div>
            <h3>Displaying results {startIndex + 1} to {endIndex + 1}</h3>
          </div>
          <div>
            <button disabled={endIndex === data.length - 1} onClick={() => this.nextPage()} className="paginator-button" type="button">Next &rarr;</button>
            <button onClick={() => this.lastPage()} className="paginator-button ml-2" type="button">Last &rarr;</button>
          </div>
        </div>
        <div className="paginator-body p-4">
          {this.renderItems(data)}
        </div>
        <div className="catamaran h3 mt-3 text-center">
          <p>Total results: {data.length}</p>
        </div>
      </div>
    );
  }
}

export default Paginator;
