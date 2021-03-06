import { useState } from "react";
import {FiEdit} from "react-icons/fi";
import {MdOutlineDelete} from "react-icons/md";
import Layout from "../../components/layouts/Layout";
import CheckerUserModal from "../../components/user/CheckerUserModal";
import Error from "../../components/utility/Error";
import Limit from "../../components/utility/Limit";
import Loading from "../../components/utility/Loading";
import Pagination from "../../components/utility/Pagination";
import deleteData from "../../services/deleteData";
import useFetch from "../../services/useFetch";

const CheckerUser = () => {

    const [showCheckerUserModal, setShowCheckerUserModal] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    const offset = (page - 1) * limit;

    const [idUserChecker, setIdUserChecker] = useState(0);
    const [changes, setChanges] = useState(0);

    const {data, isLoading, error} = useFetch(`/user/checkers?offset=${offset}&limit=${limit}&keyword=${keyword}`, changes);

    const handleDelete = (id) => {
        deleteData(`/user/checkers/${id}`)
        .then(res => {
          console.log(res);
          setChanges(current => current + 1)
        })
      }

    return (
        <>
        <Layout>
            <div className="bg-secondary pl-5 pr-2 pb-3 w-[84vw]">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl py-3 font-semibold">Data User Checker</h1>
                </div>
                <div className="bg-white h-fit px-3 overflow-x-auto">
                    <div className="flex justify-end gap-5 py-3">
                            <button onClick={() => setShowCheckerUserModal(true)} className="py-1 px-2 bg-button rounded text-white">+ Tambah User Checker</button>
                    </div>
                    {isLoading && <Loading />}
                    <hr />
                        <Limit setLimit={setLimit} limit={limit} setPage={setPage} setKeyword={setKeyword} />

                    <div className="w-full">
                    <div className="flex flex-col">
                            <div className="sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                                        <table className="min-w-full">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        No
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Username
                                                    </th>
                                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {error ?  
                                                <tr>
                                                    <td><Error error={"Data Tidak Ditemukan"} /></td>
                                                </tr> 
                                                
                                                :
                                                
                                                data?.user.map((item, i) => (
                                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                            {i + 1 + offset}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            {item.username}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                            <div className="flex gap-3">  
                                                                <button onClick={() => {setIdUserChecker(item.id); setShowCheckerUserModal(true)}} className="text-button"><FiEdit /></button>
                                                                <button onClick={() => handleDelete(item.id)} className="text-nonActive"><MdOutlineDelete /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Pagination
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        totalData={data?.total}
                    />
                
                </div>
            </div>
            <CheckerUserModal 
                showCheckerUserModal={showCheckerUserModal} 
                setShowCheckerUserModal={setShowCheckerUserModal} 
                idUserChecker={idUserChecker}
                setIdUserChecker={setIdUserChecker}
                setChanges={setChanges}
            />
            </Layout>
        </> 
     );
}
 
export default CheckerUser;