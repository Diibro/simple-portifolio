import Endpoints from "@/services/Endpoints";
import { ClientServer, MainServer } from "@/services/Server";
import { signIn } from "next-auth/react";
import Cookies from 'js-cookie';

export async function customLogin(userEmail:string, password:string) {
     try {
          const res = await ClientServer.post({ userEmail, password }, Endpoints.auth.login);
          if (res) {
               const {token, role} = res; 
               console.log(res);
               const result = await signIn("credentials", {
                    redirect: false, 
                    token: token,  
               });
               Cookies.set("authToken", token, {expires: 1});
               if (result && !result.error) {
                    return role;
               } else {
                    console.error("Error signing in:", result?.error);
                    return null;
               }
          } else {
               console.error("Login failed.");
               return null;
          }
     } catch (error) {
     console.error("Error during login:", error);
     return null;
     }
}

export async function customLogout () {
     try{
          const token = Cookies.get('authToken');
          const res = await ClientServer.get(`${Endpoints.auth.logout}?token=${token}`);
          if(res) {
               Cookies.remove('authToken');
               return res;
          }else {
               return null;
          }
     }catch(error){
          console.log(error);
          return null;
     }
}


async function fetchUserData(token:string) {
     try {
          const res = await MainServer.get(`${Endpoints.auth.getUser}?token=${token}`)
          return res;
     } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
     }
}

export default fetchUserData;

