import PostForms from "@/components/forms/PostForms";
import { useUserContext } from "@/context/AuthContext";

const EditPost = () => {
  const {user} = useUserContext()
  //console.log({user})
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add-post"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
