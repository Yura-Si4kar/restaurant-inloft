import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../../utils/customStyledElement';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store/actions/servicesActions';

export function SearchBar() {
    const dispatch = useDispatch();
    
    const setInputString = (e) => {
        const value = e.target.value;
        dispatch(setSearchValue(value));
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onInput={(e) => setInputString(e)}
            />
        </Search>
    )
};