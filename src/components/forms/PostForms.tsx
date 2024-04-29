import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUploader from "../shared/FileUploader";
import { Textarea } from "../ui/textarea";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";


type PostFormProps = {
    post?: Models.Document ;
    user?: any;
    action: 'Create' | 'Update';
}

const PostForms = ({ post ,user , action}: PostFormProps) => {

  console.log({post})
    const {mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost();
    const { toast } = useToast()
    const navigate = useNavigate()
    
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post.tags.join(',') : ''
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    console.log({values})
    //const { user } = useUserContext()
    console.log({user})

  

    const newPost = await createPost({
        ...values,
        userId: user.id
    })

    if (!newPost) {
        toast({
            title: 'please try again'
        })
    }

    navigate('/')

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custome-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="teext" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma ",")
              </FormLabel>
              <FormControl>
                <Input
                  type="teext"
                  className="shad-input"
                  placeholder="Art, Expression, Learn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4  items-center justify-end">
            <Button type="button" className="shad-button_dark_4">Calcel</Button>
            <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForms;
