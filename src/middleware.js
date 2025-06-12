// import { NextResponse } from "next/server"; 

// export async function middleware(req) {
//     try{
//         const token = req.cookies.get("auth-token")?.value;
        
//         if(!token) {
//             return NextResponse.redirect(new URL("/login",req.url));
//         }

//         console.log(token);

//         return NextResponse.next();
//     } catch(err) {
//         console.error(err)
//     }
// }

// export const config = {
//     matcher: ["/account"]
// }