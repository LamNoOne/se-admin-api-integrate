import ActiveTable from "../components/ActiveTable"
import Chart from "../components/Chart"
import TotalCard from "../components/TotalCard"
import RecentOrder from "../components/RecentOrder"
const DashBoard = () => {
    return (
        <>
            <section className="flex flex-col gap-6">
                <h1 className="text-[28px] font-medium">Dashboard</h1>
                <div className="flex sm:flex-col xl:flex-row gap-6">
                    <TotalCard
                        name="Total sells"
                        total={3799.0}
                        percent={34.7}
                        from="2023-10-11"
                    />
                    <TotalCard
                        name="Average order value"
                        total={272.98}
                        percent={12.0}
                        from="2023-10-11"
                    />
                    <TotalCard
                        name="Total sells"
                        total={578}
                        percent={27.9}
                        from="2023-10-11"
                    />
                </div>
                <div className="income-chart px-4 py-4 border shadow-sm bg-white">
                    <h1 className="text-xl font-medium py-4">
                        Income statistics
                    </h1>
                    <Chart />
                </div>
                <div className="recent-order flex items-start gap-6">
                    <RecentOrder />
                    <div className="sm:hidden xl:block active-user min-w-[260px]">
                        <ActiveTable />
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashBoard
