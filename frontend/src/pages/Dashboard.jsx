import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }
        axios.get("https://paytm-s016.onrender.com/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setBalance(res.data.balance);
        });
    }, [navigate]);

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance !== null ? balance : "Loading..."} />
            <Users />
        </div>
    </div>
}