/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    const { dataList } = this.props;
    this.state = {
      result: [...Array(dataList.length).keys()],
      inputStr: ''
    };
    this.searchStr = this.searchStr.bind(this);
    this.insertObject = this.insertObject.bind(this);
    this.handelChange = this.handelChange.bind(this);
    this.handelOnClick = this.handelOnClick.bind(this);
  }

  /**
   * It updates the value of Input element and searches for the value.
   * @param {Event} evt - A react event.
   */
  handelChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    this.searchStr(evt.target.value);
  }

  handelOnClick(evt) {
    const { textContent } = evt.target;
    this.setState({ inputStr: textContent, result: [] });
  }

  /**
   * It will search given string in dataList.
   * @param {String} str - Search string.
   */
  searchStr(str) {
    const indexList = [];
    const addedIndex = new Set();
    const { searchKey } = this.props;
    searchKey.forEach(key => {
      this.insertObject(indexList, addedIndex, key, str);
    });
    this.setState({ result: indexList });
  }

  /**
   * It will append the index of objects which have str in the value of key
   * @param {Array} indexList - List of index of objects which are already selected.
   * @param {Set} addedIndex - Set of index of selected objects.
   * @param {String} key - The property of object where we have to search.
   * @param {String} str - The string which we have to search.
   */
  insertObject(indexList, addedIndex, key, str) {
    const { dataList } = this.props;
    dataList.forEach((value, index) => {
      if (!addedIndex.has(index) && value[key] && value[key].includes(str)) {
        indexList.push(index);
        addedIndex.add(index);
      }
    });
  }

  render() {
    const { result, inputStr } = this.state;
    const { dataList, placeholder, searchIcon, alignSearchIcon } = this.props;
    const data = result.map(element => {
      return (
        <div className="Search-result-object" onClick={this.handelOnClick}>
          {JSON.stringify(dataList[element])}
        </div>
      );
    });
    return (
      <div className="Search">
        <div className="Search-input">
          {searchIcon && alignSearchIcon === 'left' && (
            <i className="fa fa-search Search-search-icon" />
          )}
          <input
            className="Search-input-field"
            name="inputStr"
            value={inputStr}
            onChange={this.handelChange}
            placeholder={placeholder}
          />
          <i className="fa fa-caret-down Search-triangle-icon" aria-hidden="true" />
          {searchIcon && alignSearchIcon === 'right' && (
            <i className="fa fa-search Search-search-icon" />
          )}
        </div>
        <div className="Search-results">{data}</div>
      </div>
    );
  }
}

Search.propTypes = {
  /** Array of objects where we have to perform search.
   * */
  dataList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  /** Array of keys in which we have to search.
   * */
  searchKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Placeholder for input element.
   * - Default - ```Search Something```
   * */
  placeholder: PropTypes.string,
  /** Display search icon or not.
   * - Options - ```true``` | ```false```
   * - Default - ```false```
   * */
  searchIcon: PropTypes.bool,
  /** Alignment of search icon.
   * - Options - ```left``` | ```right```
   * - Default - ```left```
   * */
  alignSearchIcon: PropTypes.string
};

Search.defaultProps = {
  placeholder: 'Search Something',
  searchIcon: false,
  alignSearchIcon: 'left'
};

export default Search;