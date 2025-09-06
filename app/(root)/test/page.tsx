// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { createUserAction } from "@/lib/action";
// import { Eye, EyeClosed, EyeIcon, LucideEye } from "lucide-react";
// import React, { useActionState, useState } from "react";

// type Errors = {
//   fullname?: string;
//   email?: string;
//   aboutme?: string;
//   password?: string;
// };

// export type FormState = {
//   erros?: Errors;
//   success?: boolean;
// };

// export const initialState: FormState = { erros: {}, success: false };
// const TestPage = () => {
//   const [isHidden, setHidden] = useState(false);

//   const [state, formAction, isPending] = useActionState(
//     createUserAction,
//     initialState
//   );

//   return (
//     <div className="max-w-7xl mx-auto mt-10 flex flex-col items-center justify-center">
//       {/* form   */}
//       <p className="text-3xl font-semibold">About U</p>

//       <form action={formAction} className=" w-[600px] flex flex-col gap-5">
//         <div className=" flex flex-col gap-2">
//           <Label> FullName</Label>
//           <Input name="fullname" placeholder="Enter your fullname" />
//           <div>
//             {state.success !== true && state.erros?.fullname && (
//               <p>{state.erros.fullname}</p>
//             )}
//           </div>
//         </div>
//         <div className=" flex flex-col gap-2">
//           <Label> Email</Label>
//           <Input name="email" placeholder="Enter your email" type="email" />
//         </div>
//         <div className=" flex flex-col gap-2">
//           <Label> About me</Label>
//           <Textarea name="bio" placeholder="write about you within 200 words" />
//         </div>
//         <div className=" flex flex-col gap-2">
//           <Label> Password</Label>
//           <div className="relative">
//             <Input
//               placeholder=""
//               name="password"
//               type={isHidden ? "password" : ""}
//             />
//             <Button
//               onClick={() => setHidden(!isHidden)}
//               type="button"
//               variant={"ghost"}
//               className="absolute right-0 top-0"
//             >
//               {isHidden ? <EyeClosed /> : <Eye />}
//             </Button>
//           </div>
//         </div>
//         <Button> {isPending ? "Submitting" : "Submit"}</Button>
//       </form>
//     </div>
//   );
// };

// export default TestPage;
