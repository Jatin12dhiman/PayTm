// import { useEffect, useState } from "react"
// import { Button } from "./Button"
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// export const Users = () => {
//     // Replace with backend call
//     const [users, setUsers] = useState([]);
//     const [filter, setFilter] = useState("");

//     useEffect(() => {
//         axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
//             .then(response => {
//                 // console.log(response.data)
//                 setUsers(response.data.users)
//             })
//     }, [filter])

//     return <>
//         <div className="font-bold mt-6 text-lg">
//             Users
//         </div>
//         <div className="my-2">
//             <input onChange={(e) => {
//                 setFilter(e.target.value)
//             }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
//         </div>
//         <div>
//             {users.map(user => <User user={user} />)}
//         </div>
//     </>
// }

// function User({user}) {
//     const navigate = useNavigate();

//     return <div className="flex justify-between">
//         <div className="flex">
//             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                 <div className="flex flex-col justify-center h-full text-xl">
//                     {user.firstName[0]}
//                 </div>
//             </div>
//             <div className="flex flex-col justify-center h-ful">
//                 <div>
//                     {user.firstName} {user.lastName}
//                 </div>
//             </div>
//         </div>

//         <div className="flex flex-col justify-center h-ful">
//             <Button onClick={(e) => {
//                 navigate("/send?id=" + user._id + "&name=" + user.firstName);
//             }} label={"Send Money"} />
//         </div>
//     </div>
// }
import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode"; 


export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");

    // ✅ Decode token to get current user's ID
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const decoded = jwtDecode(token);
                const userId = decoded.userId || decoded._id || decoded.id || "";
                setCurrentUserId(userId);
            }
        } catch (e) {
            console.error("Failed to decode token", e);
        }
    }, []);

    // ✅ Get list of users based on filter
    useEffect(() => {
        axios.get("https://paytm-s016.onrender.com/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.users || []);
            });
    }, [filter]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                placeholder="Search users..."
                className="w-full px-2 py-1 border rounded border-slate-200"
            />
        </div>
        <div>
            {users
                .filter(user => user._id !== currentUserId) // ✅ Filter out current user
                .map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({ user }) {
    const navigate = useNavigate();

    return <div className="flex justify-between my-2">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button onClick={() => {
                navigate(`/send?id=${user._id}&name=${user.firstName}`);
            }} label={"Send Money"} />
        </div>
    </div>
}
