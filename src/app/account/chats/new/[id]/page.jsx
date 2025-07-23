"use client";


import { ServerLoader } from "@/shared/blocks/serverLoader";
import { useToServer } from "@/shared/hooks/useToServer";
import { useSearchParams , useParams , useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    const search = useSearchParams();
    const chat_type = search.get("type"); 


    const pageParams = useParams();
    const name = pageParams.id;

    const [load,data] = useToServer(`/chats/${chat_type}/${name}`);

    if(data) {
        if(chat_type === "direct") {
            setTimeout(() => router.push(`/account/chats/${data}?type=${chat_type}`),300);
            return 
        }
        if(chat_type === "bot") {
            router.push(`/account/chats/${data}?type=${chat_type}`);
            return 
        }
    }

    return (
        <div style={{height: "100%",minHeight:"100svh"}} className="flex flex-row align-center justify-center">
            <ServerLoader />
        </div>
    )
}