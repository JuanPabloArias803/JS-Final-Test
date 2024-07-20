import { LoginScene } from "../Scenes/Public/Login/loginScene";
import { RegisterScene } from "../Scenes/Public/Register/registerScene";
import { NotFoundScene } from "../Scenes/Public/notFoundScene";
import { DashboardScene } from "../Scenes/Private/Dashboard/dashboardScene";
import { CreateFlightScene } from "../Scenes/Admin/Create-Flight/createFlight";
import { ModifyFlightScene } from "../Scenes/Admin/Modify-Flight/modifyFlight";

export const routes ={
    public:[
        {path:'/login',scene:LoginScene},
        {path:'/register',scene:RegisterScene},
        {path:'/not-found',scene:NotFoundScene}
    ],
    private:[
        {path:'/dashboard',scene:DashboardScene},
    ],
    admin:[
        {path:'/create-flight',scene:CreateFlightScene},
        {path:'/modify-flight',scene:ModifyFlightScene}
    ]
}