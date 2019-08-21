/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// import "font-awesome/css/font-awesome.min.css";
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      final: []
    };
  }

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      this.searchCall(event.target.value)
      // () => {
      //   const final = [];
      //   var index;
      //   const { dataList, searchKey } = this.props;
      //   for (let i = dataList.length; i--; ) {
      //     for (index in dataList[i]) {
      //       if (dataList[i][searchKey].includes(this.state.searchString)) {
      //         final.push(dataList[i]);
      //         break;
      //       }
      //     }
      //   }
      //   this.setState({
      //     final
      //   });
      // }
    )
  };

  searchCall = (str) => {
    const final = [];
    const addIndex = new Set();
    const { dataList, searchKey } = this.props;
    const { searchString } = this.state;
    // for (let i = dataList.length; i--; ) {
    //   for (index in dataList[i]) {
    //     if (dataList[i][searchKey].includes(searchString)) {
    //       final.push(dataList[i]);
    //       break;
    //     }
    //   }
    // }
    searchKey.forEach(key => {
      this.addValue(final, addIndex, key, str)
    });

    // }
    // }
    // dataList.forEach((ele, index) => {
    //   if (!addIndex.has(index) && ele[searchKey] && ele[searchKey].includes(searchString)) {
    //     final.push(dataList[ele]);
    //   }
    // });
    // dataList.forEach(element => {
    //   element.forEach(index in dataList[i]){
    //       if(dataList[i][searchKey].includes(searchString)){
    //         final.push(dataList[i])
    //         break;
    //       }
    //     };
    // });
    // console.log(dataList);
    // console.log(searchString);

    // dataList.filter(data => {
    //   console.log(data)
    // })
    this.setState({
      final
    });
  };


  addValue=(final, addIndex, key, str)=>{
    const {dataList} = this.props;
    dataList.forEach((ele, index)=>{
      if(!addIndex.has(index) && ele[key] && ele[key].includes(str)){
        final.push(ele);
        addIndex.add(index);
      }
    })
  }

  render() {
    const { dataList, searchItem, alignSearchItem } = this.props;
    const { searchString, final } = this.state;
    return (
      <div className = "container" >
        {/* style={{ maxWidth: '200px', margin: 'auto' }} */}
        <div className = "input-field">
          {/* <div className="input-icons"> */}
            {searchItem && alignSearchItem === 'left' && <i className="fa fa-search search-icon" />}
            <input
              className="search-input-box"
              type="text"
              name="searchString"
              placeholder=" Search...."
              value={searchString}
              onChange={this.handleChange}
            />
            {searchItem && alignSearchItem === 'right' && <i className="fa fa-search search-icon" />}
          {/* </div> */}
        </div>

        {JSON.stringify(final)
          .split('},')
          .map(item => {
            return (
              <p style={{ textAlign: 'center' }}>{item}</p>
            );
          })}
      </div>
    );
  }
}

export default SearchInput;
