import { useState, useEffect } from "react"
import DashboardNavBar from "../../components/DashboardNavBar"
import Spinner from '../../components/Spinner'
import { useAllTransactions } from "../../hooks/useAllTransactions"
import { Link } from "react-router-dom"

const DashboardTransactionPage = () => {
    const {transactions, loadingTransactions} = useAllTransactions()
    const [reset, setReset] = useState(false)
    const [search,setSearch] = useState('')
    const [searchBtn, setSearchBtn] = useState({
    search: search
  })

  const handleReset = () => {
    setSearch('');
    setSearchBtn({
      search: ''
    });
  }

  const resetStatus = () => {
    if(search) {
      setReset(true)
    } else setReset(false)
  }

  useEffect(()=>{
    resetStatus()
  },[search])

  const handleSearch = () => {
    setSearchBtn({
      search: search
    })
  }


    return (
        <div className="flex bg-gray-100 ml-[17%] min-h-screen">
            <DashboardNavBar />
        <div className="flex flex-col justify-start items-center w-full m-3 gap-5">
            <div className="w-full flex h-auto justify-between items-center bg-white shadow-md rounded-md px-7 py-5">
                <p className="text-black text-3xl font-semibold">Transactions</p>
            </div>
            <div className="px-15 w-full flex pb-15 flex-col justify-around h-auto items-center bg-white shadow-md rounded-md">
                <div className='w-full lg:w-[85%] flex flex-col md:flex-row flex-wrap gap-4 rounded-xl bg-white px-6 py-10 justify-between items-center'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='w-full md:w-auto flex-1 border-1 focus:outline-emerald-500 border-gray-400 px-3 py-2 rounded-sm placeholder:text-gray-400' placeholder='Search Transaction by Title'/>
            <button onClick={handleSearch} className='w-full md:w-24 text-white bg-emerald-500 py-2 rounded-sm hover:cursor-pointer'>Search</button> 
            <button disabled={!reset} onClick={handleReset} className={`w-full md:w-24 text-white py-2 rounded-sm ${reset ? 'hover:cursor-pointer bg-gray-900' : 'bg-gray-400 cursor-not-allowed'}`}>Reset</button>
            </div>
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
                        {(() => {
            const filtered = transactions.filter((transaction) => {
            const matchesTitle = transaction.transaction_items?.sport_activities?.title.toLowerCase().includes(searchBtn.search.toLowerCase());

            return matchesTitle;
          });

          if (filtered.length === 0) {
            return (
                <tr>
                <td colSpan="7" className="text-center text-gray-900 text-lg py-15">
                    No transactions found.
                </td>
                </tr>
            );
            }

          return filtered.map((transaction,index) => {
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
                    )})})()}
                    </tbody>
                </table>}
            </div>
        </div>
        </div>
    )
}

export default DashboardTransactionPage
