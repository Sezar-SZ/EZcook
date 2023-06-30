import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "./getQueryClient";

// export default async function HydratedPosts() {
//     const queryClient = getQueryClient();
//     await queryClient.prefetchQuery(["posts"], getPosts);
//     const dehydratedState = dehydrate(queryClient);

//     return (
//         <Hydrate state={dehydratedState}>
//             <Posts />
//         </Hydrate>
//     );
// }
