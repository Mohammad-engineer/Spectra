import { Button } from "@/components/ui/button"
import { SignupValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate} from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { userCreateAccount, userSignInAccount} from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {

  const { toast } = useToast()
  const navigate = useNavigate()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
  
  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = userCreateAccount()

  const {mutateAsync: signInAccount, isPending: isSigningInUser} = userSignInAccount()

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
      resolver: zodResolver(SignupValidation),
      defaultValues: {
        name:'',
        username: '',
        email:'',
        password:''
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
      //create User
  
      console.log(values)
      const newUser = await createUserAccount(values);
      if(!newUser){
        return toast({
          title:'Sign up failed. please try again',style:{background:'#050043'},duration:8000
        })
      }
      const session = await signInAccount({email: values.email, password: values.password})

      if(!session){
        toast({title:'you have no account',style:{background:'#050043'},duration:8000})
      }

      const isLoggedIn = await checkAuthUser()
      if (isLoggedIn) {
        form.reset()
        navigate('/')
        return toast({title:`welcome to spectra ${values.name}`,style:{background:'#050043'},duration:8000})
      }else{
        return toast({title:'log in failed, please try again',style:{background:'#050043'},duration:8000 })
      }
    }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create New Account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use SnapGram, please enter your details</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full  shad-button_primary mt-7">
          {isCreatingAccount  || isSigningInUser || isUserLoading ? (
            <div className="flex-center gap-2">
              <Loader /> Loading...
            </div>
          ) : 'Sign Up'}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Alreday Have an account?
          <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1 ">Log in</Link>
        </p>
      </form>
    </div>
  </Form>
  )
}

export default SignupForm