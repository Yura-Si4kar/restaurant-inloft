import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store/actions/servicesActions';
import MyInput from '../UI/MyInput/MyInput';

export function SearchBar() {
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(value);
  }, [value]);

  const toggleSearchBar = () => {
    setSearching(!searching);
  };

  const clearInput = () => {
    setValue('');
    dispatch(setSearchValue(''));
  };

  const setInputString = (e) => {
    const string = e.target.value;
    setValue(string);
    dispatch(setSearchValue(value));
  };

  return (
    <div className={searching ? 'search search-active' : 'search'}>
      <div className="search-icon" onClick={toggleSearchBar}></div>
      <div className="search-input">
        <MyInput
          value={value}
          type="text"
          placeholder="Search…"
          onInput={(e) => setInputString(e)}
          className="search-field"
          autoComplete="off"
        />
      </div>
      <span className="search-clear" onClick={clearInput}></span>
    </div>
  );
}
