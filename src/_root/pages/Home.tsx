import Loader from '@/components/shared/Loader'
import PostCard from '@/components/shared/PostCard'
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations'

const Home = () => {

  const {data: posts, isPending: isPostLoading, isError: isPostError} = useGetRecentPosts()

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {isPostLoading && !posts ? (<Loader />) : (
            <ul className='flex flex-1 flex-col gap-9 w-full'>
              {posts?.documents.map(post=>(
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
          {isPostError && (
            <p className='text-light-4 mt-10 text-center w-full'>There is not post yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home