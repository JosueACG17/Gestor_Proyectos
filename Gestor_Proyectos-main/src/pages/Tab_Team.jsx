import React from "react";
import Sidebar from "../components/Dashboard/Sidebar"
import TablaTeam from "../components/Dashboard/TablaTeam"

function Tab_Team() {
    return (
        <>
            <Sidebar></Sidebar>
            <div class="ml-auto  lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
                    <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
                        <h5 hidden class="text-2xl mt-1 text-gray-600 font-medium lg:block">Dashboard</h5>
                        <button class="w-12 h-16 -mr-2 border-r lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div >
            <TablaTeam></TablaTeam>
        </>
    )

}

export default Tab_Team;