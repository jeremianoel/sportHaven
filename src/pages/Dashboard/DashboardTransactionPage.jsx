import { useState, useEffect } from "react"
import DashboardNavBar from "../../components/DashboardNavBar"
import Spinner from '../../components/Spinner'
import axios from "axios"
import toast from "react-hot-toast"
import { useAllTransactions } from "../../hooks/useAllTransactions"
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom"

const DashboardTransactionPage = () => {
    const {transactions, loadingTransactions} = useAllTransactions()
    const token = localStorage.getItem('token')

    return (
        <div className="flex bg-gray-100 ml-[17%] min-h-screen">
            <DashboardNavBar />
        <div className="flex flex-col justify-start items-center w-full m-3 gap-5">
            <div className="w-full flex h-auto justify-between items-center bg-white shadow-md rounded-md px-7 py-5">
                <p className="text-black text-3xl font-semibold">Transactions</p>
            </div>
            <div className="px-15 w-full flex flex-col justify-around py-10 h-auto items-center bg-white shadow-md rounded-md">
                {loadingTransactions ? <Spinner /> : transactions?.length === 0 ?
                    <p className="py-10 text-center w-full">No transactions found.</p>
                    :
                <table className="w-full text-center table-auto border border-gray-300">
                    <thead>
                        <tr className="bg-white">
                            <th className="border border-gray-300 w-[10%] py-4">No</th>
                            <th className="border border-gray-300 w-[20%]  py-4">Title</th>
                            <th className="border border-gray-300 w-[20%]  py-4">Invoice ID</th>
                            <th className="border border-gray-300 w-[15%]  py-4">Price</th>
                            <th className="border border-gray-300 w-[15%]  py-4">Date</th>
                            <th className="border border-gray-300 w-[10%]  py-4">Status</th>
                            <th className="border border-gray-300 w-[10%]  py-4">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => {                         
                        const formattedPrice = Number(transaction.total_amount).toLocaleString('id-ID');   
                        return(        
                        <tr key={transaction.id}>
                            <td className="border border-gray-300 py-4">{index + 1}</td>
                            <td className="border border-gray-300 py-4">{transaction.transaction_items?.sport_activities?.title}</td>
                            <td className="border border-gray-300 py-4">{transaction.invoice_id}</td>
                            <td className="border border-gray-300 py-4">Rp{formattedPrice}</td>
                            <td className="border border-gray-300 py-4">{transaction.order_date}</td>
                            <td className={`border border-gray-300 py-4`}>
                                <p className={`${transaction.status === 'pending'
                                    ? 'text-amber-500'
                                    : transaction.status === 'success'
                                    ? 'text-emerald-500'
                                    : 'text-red-500'
                                } font-semibold`}>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                    </p></td>
                            <td className="border border-gray-300 py-4">
                            <div className="flex justify-center gap-5">
                            <>
                                <Link
                                    to={`/dashboard/transaction/edit/${transaction.id}`}
                                    className="px-2 py-1 text-center bg-emerald-500 text-white rounded-md hover:bg-emerald-300 hover:cursor-pointer duration-100"
                                >
                                    Edit
                                </Link>
                            </>
                            </div>
                        </td>
                        </tr>
                        )})}
                    </tbody>
                </table>}
            </div>
        </div>
        </div>
    )
}

export default DashboardTransactionPage
