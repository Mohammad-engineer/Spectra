import Loader from '@/components/shared/Loader'
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
                <PostCard post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home