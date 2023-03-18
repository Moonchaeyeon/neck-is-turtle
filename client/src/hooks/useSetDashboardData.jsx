import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MissionApi from "../apis/MissionApi";

export const useSetDashboardData = () => {
    const missionApi = new MissionApi();
    const auth = useSelector(state=>state.userData.auth);
    const [dayMissionList, setDayMissionList] = useState([]);

    const get3MonthMission = async () => {
        const res = await missionApi.get3MonthMission();
        setDayMissionList(res);
    }

    useEffect(()=>{
        get3MonthMission();
    }, [auth])

    return { dayMissionList };
}