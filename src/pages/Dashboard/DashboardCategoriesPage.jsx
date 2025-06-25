import { useState, useEffect } from "react"
import DashboardNavBar from "../../components/DashboardNavBar"
import Spinner from '../../components/Spinner'
import axios from "axios"
import toast from "react-hot-toast"
import { useAllCategories } from "../../hooks/useAllCategories"
import { FaPlusCircle } from "react-icons/fa";

const DashboardCategoriesPage = () => {
    const {categories, loadingCategories, refetch} = useAllCategories()
    const [editingId, setEditingId] = useState(null)
    const [valid, setValid] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newValid, setNewValid] = useState(false)
    const [valid2, setValid2] = useState(false)
    const token = localStorage.getItem('token')

    const handleValid = () => 
    {
        if(categoryName.trim() !== '') 
        {
            setValid(true)
        }else 
        setValid(false)
    }

    useEffect(() => {
        handleValid()
    },[categoryName])

    const handleValid2 = () => 
    {
        if(newCategory.trim() !== '') 
        {
            setValid2(true)
        }else 
        setValid2(false)
    }

    useEffect(() => {
        handleValid2()
    },[newCategory])

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success('Category Deleted!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
            refetch()
        } catch (err) {
            console.log(err)
            toast.error('Failed to delete!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
        }
    }

    const updateCategory = async (id) => {
        try {
            const payload = {
                name: categoryName
            }
            const res = await axios.post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories/update/${id}`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res)
            toast.success('Category Updated!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
            setEditingId(null)
            setCategoryName('')
            refetch()
        } catch (err) {
            console.log(err)
            toast.error('Failed to update!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
        }
    }

    const addCategory = async () => {
        try {
            const payload = {
                name: newCategory
            }
            const res = await axios.post(`https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/sport-categories/create`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res)
            toast.success('Category Created!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
            setNewValid(false)
            setNewCategory('')
            refetch()
        } catch (err) {
            console.log(err)
            toast.error('Failed to create!', {
                style: {
                    fontSize: '16px',
                    padding: '16px 20px',
                    minWidth: '300px',
                },
            })
        }
    }

    return (
        <div className="flex bg-gray-100 ml-[17%] min-h-screen">
            <DashboardNavBar />
        <div className="flex flex-col justify-start items-center w-full m-3 gap-5">
            <div className="w-full flex h-auto justify-between items-center bg-white shadow-md rounded-md px-7 py-5">
                <p className="text-black text-3xl font-semibold">Categories</p>
            </div>
            <div className="px-25 w-full flex flex-col justify-around py-10 h-auto items-center bg-white shadow-md rounded-md">
                {newValid ? <div className="flex gap-3 mb-10 w-full h-10">
                    <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="border border-gray-400 px-2 py-1 rounded w-[25%]"
                    placeholder="New category name"
                        />
                    <button
                    onClick={() => addCategory()}
                    disabled={!valid2}
                    className={`px-2 py-1 text-center  text-white rounded-md
                        ${valid2 ? 'bg-emerald-500 hover:bg-emerald-300  hover:cursor-pointer duration-100' : 'cursor-not-allowed bg-gray-500'}`}
                >
                    Add
                </button>
                <button
                    onClick={() => setNewValid(false)}
                    className="px-2 py-1 text-center bg-gray-500 text-white rounded-md hover:bg-gray-300  hover:cursor-pointer duration-100"
                >
                    Cancel
                </button>
                    </div> :
                    <button onClick={() => setNewValid(true)} className="w-full flex items-center gap-3 h-10 text-lg 
                    font-semibold hover:text-emerald-500 duration-200 hover:cursor-pointer text-gray-900 py-3 mb-10">
                    <FaPlusCircle className="size-6"/>
                    <p>Add a Category</p>
                    </button>}
                {loadingCategories ? <Spinner /> : categories?.length === 0 ?
                    <p className="py-10 text-center w-full">No categories found.</p>
                    :
                <table className="w-full text-center table-auto border border-gray-300">
                    <thead>
                        <tr className="bg-white">
                            <th className="border border-gray-300 w-[20%] py-4">No</th>
                            <th className="border border-gray-300 w-[50%] py-4">Name</th>
                            <th className="border border-gray-300 w-[30%] py-4">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                        <tr key={category.id}>
                            <td className="border border-gray-300 py-4">{index + 1}</td>
                            <td className="border border-gray-300 py-4">
                                {editingId === category.id ? (
                                    <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        className="border border-gray-400 px-2 py-1 rounded w-[70%]"
                                        placeholder="New category name"
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                        <td className="border border-gray-300 py-4">
                        <div className="flex justify-center gap-5">
                        {editingId === category.id ? (
                            <>
                            <button
                                onClick={() => updateCategory(category.id)}
                                disabled={!valid}
                                className={`px-2 py-1 text-center  text-white rounded-md
                                    ${valid ? 'bg-emerald-500 hover:bg-emerald-300  hover:cursor-pointer duration-100' : 'cursor-not-allowed bg-gray-500'}`}
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setEditingId(null);
                                    setCategoryName('');
                                }}
                                className="px-2 py-1 text-center bg-gray-500 text-white rounded-md hover:bg-gray-300  hover:cursor-pointer duration-100"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setEditingId(category.id);
                                    setCategoryName(category.name);
                                }}
                                className="px-2 py-1 text-center bg-emerald-500 text-white rounded-md hover:bg-emerald-300 hover:cursor-pointer duration-100"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteCategory(category.id)}
                                className="px-2 py-1 text-center bg-red-500 text-white rounded-md hover:bg-red-300 hover:cursor-pointer duration-100"
                            >
                                Delete
                            </button>
                        </>
                        )}
                        </div>
                        </td>
                        </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
        </div>
    )
}

export default DashboardCategoriesPage
