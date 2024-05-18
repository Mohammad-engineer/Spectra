import Loader from './Loader';
import GridPostList from './GridPostList';

type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: any
}

const SearchResult = ({isSearchFetching, searchedPosts}: SearchResultProps) => {

    if(isSearchFetching) return <Loader />

    if (searchedPosts && searchedPosts?.documents.lenght > 0) {
        return(
            <GridPostList posts={searchedPosts.documents}/>
        )
    }

  return (
    <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
  )
}

export default SearchResult