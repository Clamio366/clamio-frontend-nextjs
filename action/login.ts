"use server";
import axios, { AxiosError } from 'axios'
import z from "zod";
import { LoginSchema, TLogin } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError, CredentialsSignin } from "next-auth";
import { cookies} from 'next/headers'
import { signIn, signOut } from "@/auth";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  console.log(validatedFields);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  try {
   const result = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    console.log("result>>>>>>>", result);

    return {message: 'user logged in successfully', success: true}
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return { error: "Invalid credentials!" };
    //     default:
    //       return { error: "Something went wrong!" };
    //   }
    // }
    // throw error; //to get redirected, mentioned in official authjs docs
  
    const someError = error as CredentialsSignin;
    const errorMessage = someError.cause?.err?.message || "Unknown error occurred";
    console.log('errorMessage>>>>>>>>', errorMessage);
    console.log('someError.cause>>>>>>>>', someError.cause);
    console.log('someError>>>>>>>>', someError);
    
  
    return {message: errorMessage, success: false};
  }
};



//login route to backend
export async function credentialLogin(input:TLogin) {
  try {
    const response = await axios.post(`${process.env.BASE_API_URL}/api/v1/user-auth/login`,{email:input.email, password: input.password});
    const data = response.data;
    console.log("data in credentialLogin>>>>>>>>>>", data);

    console.log("cookies in credentialLogin>>>>>>>>>>", response.headers['set-cookie']);

    const userCookie = response.headers['set-cookie']?.find((cookie: string) => cookie.startsWith('user='));

    
    return {data, userCookie};

  } catch (error: any) {
    console.error("error in credentialLogin>>>>>>>>:", error.response?.data);

    // Return error object with the message from the API response
    return { 
      error: error.response?.data?.message || "Login failed", 
      statusCode: error.response?.status || 500 
    };
  }
}







export async function handleSignOut() {
  cookies().delete('user')
  await signOut();
}